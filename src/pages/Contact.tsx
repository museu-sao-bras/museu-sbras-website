import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-12 text-center">
            {t('contact.title')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.address')}</h3>
                    <p className="text-muted-foreground">
                      {t('contact.addressLine1')}<br />
                      {t('contact.addressLine2')}<br />
                      {t('contact.addressLine3')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.hours')}</h3>
                    <p className="text-muted-foreground">
                      Tuesday - Sunday<br />
                      10:00 - 13:00 / 14:00 - 18:00<br />
                      Closed Mondays
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.phone')}</h3>
                    <p className="text-muted-foreground">
                      +351 289 840 100
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{t('contact.email')}</h3>
                    <p className="text-muted-foreground">
                      geral@museu-sbras.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.9978597646414!2d-7.885788100000001!3d37.152750399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1aaedb2a747e0b%3A0xa118742ece82861b!2sAlgarve%20Costume%20Museum!5e0!3m2!1sen!2spt!4v1776243214393!5m2!1sen!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Museum Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
