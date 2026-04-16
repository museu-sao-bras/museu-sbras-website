import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import museumLogo from '@/assets/logo-only.svg';

export const Navigation = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-[50px] border border-white/20 dark:border-white/10 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <img src={museumLogo} alt="Museu do Traje" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary">{t('hero.title')}</div>
              <div className="text-xs text-primary/80">{t('hero.subtitle')}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.home')}
            </Link>
            <Link to="/exhibitions" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.exhibitions')}
            </Link>
            <Link to="/tours" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.tours')}
            </Link>
            <Link to="/activities" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.activities')}
            </Link>
            <Link to="/plans" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.plans')}
            </Link>
            <Link to="/contact" className="text-sm font-medium text-primary hover:opacity-90 transition-opacity">
              {t('nav.contact')}
            </Link>
            <Button asChild variant="default" size="sm" className="bg-secondary hover:bg-secondary/90 text-white">
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
          <div className="lg:hidden py-3 border-t border-white/10 bg-white/50 dark:bg-black/30 rounded-b-3xl text-primary">
            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-1"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/exhibitions"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-2"
              >
                {t('nav.exhibitions')}
              </Link>
              <Link
                to="/tours"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-2"
              >
                {t('nav.tours')}
              </Link>
              <Link
                to="/activities"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-2"
              >
                {t('nav.activities')}
              </Link>
              <Link
                to="/plans"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-2"
              >
                {t('nav.plans')}
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:opacity-90 transition-opacity py-2"
              >
                {t('nav.contact')}
              </Link>
              <Button asChild variant="default" size="sm" className="bg-secondary hover:bg-secondary/90 text-white w-full">
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
