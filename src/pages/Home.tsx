import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Palette, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-costumes.jpg';
import embroideryImage from '@/assets/embroidery-detail.jpg';
import exhibitionImage from '@/assets/exhibition-preview.jpg';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Museum costumes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/exhibitions">{t('hero.cta')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
              <Link to="/tours">{t('hero.secondaryCta')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-lg text-muted-foreground">{t('stats.items')}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">35</div>
              <div className="text-lg text-muted-foreground">{t('stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">12</div>
              <div className="text-lg text-muted-foreground">{t('stats.regions')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">{t('about.title')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t('about.description')}
              </p>
              <div className="bg-accent/20 border-l-4 border-accent p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">{t('about.mission')}</h3>
                <p className="text-muted-foreground">{t('about.missionText')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src={embroideryImage}
                alt="Portuguese embroidery"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src={exhibitionImage}
                alt="Museum exhibition"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            {t('exhibitions.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Palette className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{t('exhibitions.permanent')}</h3>
                <p className="text-muted-foreground mb-4">{t('exhibitions.permanentDesc')}</p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link to="/exhibitions/permanent">Learn More →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Calendar className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">{t('exhibitions.temporary')}</h3>
                <p className="text-muted-foreground mb-4">{t('exhibitions.temporaryDesc')}</p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link to="/exhibitions/temporary">View Current →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">{t('tours.title')}</h3>
                <p className="text-muted-foreground mb-4">{t('tours.description')}</p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link to="/tours">Book Now →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">{t('donate.title')}</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link to="/donate">{t('nav.donate')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
