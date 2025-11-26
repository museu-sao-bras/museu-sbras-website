import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import museumLogo from '@/assets/museum-logo.jpg';

export const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={museumLogo} alt="Museu do Traje" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-foreground">{t('hero.title')}</div>
              <div className="text-xs text-muted-foreground">{t('hero.subtitle')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/exhibitions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.exhibitions')}
            </Link>
            <Link to="/tours" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.tours')}
            </Link>
            <Link to="/activities" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.activities')}
            </Link>
            <Link to="/plans" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.plans')}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
            <Button asChild variant="default" size="sm" className="bg-secondary hover:bg-secondary/90">
              <Link to="/donate">{t('nav.donate')}</Link>
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/exhibitions"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.exhibitions')}
              </Link>
              <Link
                to="/tours"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.tours')}
              </Link>
              <Link
                to="/activities"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.activities')}
              </Link>
              <Link
                to="/plans"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.plans')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {t('nav.contact')}
              </Link>
              <Button asChild variant="default" size="sm" className="bg-secondary hover:bg-secondary/90 w-full">
                <Link to="/donate" onClick={() => setIsOpen(false)}>
                  {t('nav.donate')}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
