import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, Sparkles, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';

const eventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  date: z.string().min(1, 'Event date is required'),
  organizer: z.string().min(1, 'Organizer name is required'),
  email: z.string().email('Valid email is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
});

type EventFormData = z.infer<typeof eventSchema>;

const Activities = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  
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

  const onSubmit = (data: EventFormData) => {
    console.log('Event submission:', { ...data, description: content });
    toast.success('Event submitted successfully! We will review it shortly.');
    form.reset();
    setContent('');
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
          {t('nav.activities')}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          The museum grounds host various cultural events and activities throughout the year
        </p>

        <Tabs defaultValue="events" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="submit">
              <Send className="h-4 w-4 mr-2" />
              Submit Event
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
                <h2 className="text-2xl font-bold mb-4">Browse Events</h2>
                <p className="text-muted-foreground mb-6">
                  View and register for upcoming cultural events, workshops, and exhibitions
                </p>
                <Button disabled>View Events (Coming Soon)</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Submit Your Event</CardTitle>
                <p className="text-muted-foreground">
                  Share your cultural event with our community. All submissions will be reviewed by museum staff.
                </p>
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
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter event title" {...field} />
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
                            <FormLabel>Event Date</FormLabel>
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
                            <FormLabel>Organizer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name or organization" {...field} />
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
                            <FormLabel>Contact Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel>Event Description</FormLabel>
                      <RichTextEditor
                        value={content}
                        onChange={(value) => {
                          setContent(value);
                          form.setValue('description', value, { shouldValidate: true });
                        }}
                        placeholder="Describe your event in detail..."
                        className="min-h-[300px]"
                      />
                      {form.formState.errors.description && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.description.message}
                        </p>
                      )}
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Preview</h3>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: content || '<p class="text-muted-foreground">Your event description will appear here...</p>' }}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Event for Review
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Host Your Event at Our Museum
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our beautiful grounds and facilities are available for cultural events, workshops, 
              exhibitions, and educational activities. Contact us to discuss your event.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <a href="mailto:info@museu-sbras.pt">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
