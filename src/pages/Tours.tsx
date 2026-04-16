import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiPost } from '@/lib/api';

const Tours = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    people: 10,
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (formData.people < 10) {
      toast({
        title: "Error",
        description: "Minimum 10 people required for group tours",
        variant: "destructive"
      });
      return;
    }

    (async () => {
      try {
        setSubmitting(true);

        const params: string[] = [];
        params.push(`name=${encodeURIComponent(formData.name)}`);
        params.push(`email=${encodeURIComponent(formData.email)}`);
        if (formData.phone) params.push(`phone=${encodeURIComponent(formData.phone)}`);
        if (formData.message) params.push(`message=${encodeURIComponent(formData.message)}`);
        if (formData.people) params.push(`visitor_count=${encodeURIComponent(String(formData.people))}`);
        if (formData.date) {
          // convert date to ISO datetime (server expects date-time)
          const iso = new Date(formData.date).toISOString();
          params.push(`date_of_visit=${encodeURIComponent(iso)}`);
        }

        await apiPost(`/smtp/booking-request?${params.join('&')}`, {});

        toast({
          title: "Success!",
          description: t('tours.form.success')
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          people: 10,
          message: ''
        });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err?.message ?? 'Failed to send booking request',
          variant: 'destructive'
        });
      } finally {
        setSubmitting(false);
      }
    })();
  };

  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-4 text-center">
            {t('tours.title')}
          </h1>
          <p className="text-xl text-muted-foreground text-center mb-12">
            {t('tours.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('tours.minimum')}</h3>
                <p className="text-sm text-muted-foreground">{t('tours.groupNote')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-secondary mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('tours.duration')}</h3>
                <p className="text-sm text-muted-foreground">{t('tours.durationDesc')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-12 w-12 text-accent mx-auto mb-3" />
                <h3 className="font-bold mb-2">{t('tours.booking')}</h3>
                <p className="text-sm text-muted-foreground">{t('tours.bookingDesc')}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t('tours.form.submit')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{t('tours.form.name')}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">{t('tours.form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">{t('tours.form.phone')}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">{t('tours.form.date')}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="people">{t('tours.form.people')}</Label>
                    <Input
                      id="people"
                      type="number"
                      min="10"
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">{t('tours.form.message')}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t('tours.form.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tours;
