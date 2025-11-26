import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.about')}</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <div className="flex flex-col gap-2">
              <Link to="/exhibitions" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {t('nav.exhibitions')}
              </Link>
              <Link to="/tours" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {t('nav.tours')}
              </Link>
              <Link to="/activities" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {t('nav.activities')}
              </Link>
              <Link to="/plans" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {t('nav.plans')}
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('contact.title')}</h3>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>{t('contact.addressLine1')}</div>
                  <div>{t('contact.addressLine2')}</div>
                  <div>{t('contact.addressLine3')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+351 289 840 100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@museu-sbras.pt</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/80">
          © {currentYear} Museu do Traje. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};
