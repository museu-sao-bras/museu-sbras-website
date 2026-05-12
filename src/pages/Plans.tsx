import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hammer, Calendar, Users, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { apiPost } from '@/lib/api';

// validation schema will be created inside the component so it can use localized messages

const Plans = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const volunteerSchema = z.object({
    name: z.string().min(1, t('plans.form.errors.name')),
    email: z.string().email(t('plans.form.errors.email')),
    phone: z.string().optional(),
    interests: z.string().min(50, t('plans.form.errors.interests')),
  });

  type VolunteerFormData = z.infer<typeof volunteerSchema>;

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interests: '',
    },
  });

  const onSubmit = async (data: VolunteerFormData) => {
    // Construct payload matching the server shape
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: content || data.interests,
    };

    setIsSubmitting(true);
    try {
      await apiPost('/smtp/volunteer-application', payload);

      toast.success(t('plans.form.success'));
      form.reset();
      setContent('');
    } catch (err: any) {
      console.error('Failed to submit volunteer application', err);
      toast.error(err?.message || t('plans.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
          {t('nav.plans')}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t('plans.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Hammer className="h-16 w-16 text-primary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('plans.cards.renovations.title')}</h2>
              <p className="text-muted-foreground text-center">{t('plans.cards.renovations.desc')}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('plans.cards.exhibitions.title')}</h2>
              <p className="text-muted-foreground text-center">{t('plans.cards.exhibitions.desc')}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Users className="h-16 w-16 text-accent mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('plans.cards.community.title')}</h2>
              <p className="text-muted-foreground text-center">{t('plans.cards.community.desc')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="initiatives" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="initiatives">
                <Hammer className="h-4 w-4 mr-2" />
                {t('plans.tabs.initiatives')}
              </TabsTrigger>
              <TabsTrigger value="volunteer">
                <Send className="h-4 w-4 mr-2" />
                {t('plans.tabs.volunteer')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="initiatives">
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('plans.initiatives.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('plans.initiatives.items.0.title')}</h4>
                      <p className="text-muted-foreground">{t('plans.initiatives.items.0.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('plans.initiatives.items.1.title')}</h4>
                      <p className="text-muted-foreground">{t('plans.initiatives.items.1.desc')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{t('plans.initiatives.items.2.title')}</h4>
                      <p className="text-muted-foreground">{t('plans.initiatives.items.2.desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volunteer">
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">{t('plans.volunteer.title')}</CardTitle>
                  <p className="text-muted-foreground">{t('plans.volunteer.description')}</p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('plans.form.name')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('plans.form.placeholder.name')} {...field} />
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
                              <FormLabel>{t('plans.form.email')}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={t('plans.form.placeholder.email')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('plans.form.phone')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('plans.form.placeholder.phone')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormLabel>{t('plans.form.interests')}</FormLabel>
                        <RichTextEditor
                          value={content}
                          onChange={(value) => {
                            setContent(value);
                            form.setValue('interests', value, { shouldValidate: true });
                          }}
                          placeholder={t('plans.form.placeholder.interests')}
                          className="min-h-[300px]"
                        />
                        {form.formState.errors.interests && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.interests.message}
                          </p>
                        )}
                      </div>

                      {/* <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Preview</h3>
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: content || '<p class="text-muted-foreground">Your interests and message will appear here...</p>' }}
                        />
                      </div> */}

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmitting ? t('plans.form.submitting') : t('plans.form.submit')}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </motion.div>
  );
};

export default Plans;
