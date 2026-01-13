import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hammer, Calendar, Users, Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import { apiPost } from '@/lib/api';

const volunteerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  interests: z.string().min(50, 'Please tell us more about your interests (at least 50 characters)'),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const Plans = () => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      toast.success('Thank you for your interest! We will contact you soon.');
      form.reset();
      setContent('');
    } catch (err: any) {
      console.error('Failed to submit volunteer application', err);
      toast.error(err?.message || 'Failed to submit your application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
          {t('nav.plans')}
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Join us in preserving and promoting Portuguese cultural heritage
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Hammer className="h-16 w-16 text-primary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">Renovations</h2>
              <p className="text-muted-foreground text-center">
                Ongoing improvements to facilities and exhibition spaces
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">New Exhibitions</h2>
              <p className="text-muted-foreground text-center">
                Upcoming temporary exhibitions and special collections
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Users className="h-16 w-16 text-accent mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">Community Programs</h2>
              <p className="text-muted-foreground text-center">
                Educational initiatives and outreach activities
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="initiatives" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="initiatives">
                <Hammer className="h-4 w-4 mr-2" />
                Current Initiatives
              </TabsTrigger>
              <TabsTrigger value="volunteer">
                <Send className="h-4 w-4 mr-2" />
                Volunteer Application
              </TabsTrigger>
            </TabsList>

            <TabsContent value="initiatives">
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-2xl">Current Initiatives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Digital Archive Project</h4>
                      <p className="text-muted-foreground">
                        Digitizing our entire collection to make it accessible online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Conservation Workshop</h4>
                      <p className="text-muted-foreground">
                        Establishing a textile conservation workshop for restoration work
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Educational Outreach</h4>
                      <p className="text-muted-foreground">
                        Developing programs for schools and community groups
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volunteer">
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Become a Volunteer</CardTitle>
                  <p className="text-muted-foreground">
                    We're always looking for passionate individuals to help with exhibitions,
                    educational programs, events, and preservation work. No experience necessary -
                    just enthusiasm for cultural heritage!
                  </p>
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
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
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
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
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
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="+351 XXX XXX XXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormLabel>Tell Us About Your Interests</FormLabel>
                        <RichTextEditor
                          value={content}
                          onChange={(value) => {
                            setContent(value);
                            form.setValue('interests', value, { shouldValidate: true });
                          }}
                          placeholder="What areas would you like to help with? What skills or experience do you have? What are your interests in cultural heritage?"
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
                        {isSubmitting ? 'Submitting...' : 'Submit Volunteer Application'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
};

export default Plans;
