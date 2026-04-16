import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {/* About */}
          {/* <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.about')}</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t('footer.aboutText')}
            </p>
          </div> */}

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.links')}</h3>
            <div className="flex flex-col gap-2">
              <Link to="https://amigosdomuseu.com" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Amigos do Museu
              </Link>
              <Link to="/tours" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Museum Club
              </Link>
              <Link to="https://www.cm-sbras.pt/pt/10451/a-conversa-com-o-grupo-jasmim.aspx" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Jasmim Choir
              </Link>
              <Link to="/veredas-da-memoria" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Veredas da Memória
              </Link>
              <Link to="https://visitalgarve.pt/en/3294/museums.aspx" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Museums in the Algarve
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
                <span>geral@museu-sbras.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('footer.followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/museudotraje.sba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/museudotraje_sba"
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
          © {currentYear} Museu do Traje. {t('footer.rights')}<br></br>
          Created by <a className='underline' href="https://jamestwose.com">James Twose</a>
        </div>
      </div>
    </footer>
  );
};
