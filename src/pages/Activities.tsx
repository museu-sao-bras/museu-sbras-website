import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { apiPost } from '@/lib/api';

const Activities = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');

  const eventSchema = z.object({
    title: z.string().min(1, t('activities.form.errors.title')),
    date: z.string().min(1, t('activities.form.errors.date')),
    organizer: z.string().min(1, t('activities.form.errors.organizer')),
    email: z.string().email(t('activities.form.errors.email')),
    description: z.string().min(50, t('activities.form.errors.description')),
  });

  type EventFormData = z.infer<typeof eventSchema>;

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      organizer: '',
      email: '',
      description: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: EventFormData) => {
    const payload = { ...data, description: content };
    try {
      setSubmitting(true);

      const params: string[] = [];
      params.push(`title=${encodeURIComponent(payload.title)}`);
      if (payload.organizer) params.push(`organizer_name=${encodeURIComponent(payload.organizer)}`);
      if (payload.email) params.push(`organizer_email=${encodeURIComponent(payload.email)}`);
      // no phone field in this form, but include if present
      // description
      if (payload.description) params.push(`description=${encodeURIComponent(payload.description)}`);
      // date -> convert to ISO datetime
      if (payload.date) {
        const iso = new Date(payload.date).toISOString();
        params.push(`date=${encodeURIComponent(iso)}`);
      }

      await apiPost(`/smtp/event-request?${params.join('&')}`, {});

      toast.success(t('activities.form.success'));
      form.reset();
      setContent('');
    } catch (err: any) {
      toast.error(err?.message ?? t('activities.form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
          {t('nav.activities')}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t('activities.subtitle')}
        </p>

        <Tabs defaultValue="events" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              {t('activities.tabs.events')}
            </TabsTrigger>
            <TabsTrigger value="submit">
              <Send className="h-4 w-4 mr-2" />
              {t('activities.tabs.submit')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
                  <h2 className="text-2xl font-bold mb-4">{t('activities.events.heading')}</h2>
                  <p className="text-muted-foreground mb-6">{t('activities.events.description')}</p>
                  <Button disabled>{t('activities.events.buttonComingSoon')}</Button>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('activities.submit.title')}</CardTitle>
                <p className="text-muted-foreground">{t('activities.submit.description')}</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('activities.form.title')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('activities.form.placeholder.title')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('activities.form.date')}</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organizer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('activities.form.organizer')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('activities.form.placeholder.organizer')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('activities.form.email')}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t('activities.form.placeholder.email')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel>{t('activities.form.description')}</FormLabel>
                      <RichTextEditor
                        value={content}
                        onChange={(value) => {
                          setContent(value);
                          form.setValue('description', value, { shouldValidate: true });
                        }}
                        placeholder={t('activities.form.placeholder.description')}
                        className="min-h-[300px]"
                      />
                      {form.formState.errors.description && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">{t('activities.preview.title')}</h3>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: content || `<p class="text-muted-foreground">${t('activities.preview.empty')}</p>` }}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? t('activities.form.submitting') : t('activities.form.submit')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-secondary/20 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">{t('activities.host.title')}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t('activities.host.description')}</p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="mailto:info@museu-sbras.pt">{t('activities.host.contact')}</a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Activities;
