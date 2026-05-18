import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Palette, Heart, Facebook, Instagram, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { container, fadeUp, subtleScale } from '@/lib/motion';
import heroImage from '@/assets/museu-front-3.jpg';
import embroideryImage from '@/assets/new-exhibit.jpg';
import exhibitionImage from '@/assets/new-exhibit-2.jpg';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section - split layout (text left, image right) */}
      <section className="relative overflow-hidden pt-32 min-h-[60vh]">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8">
            {/* Left: Text */}
            <motion.div className="flex items-center" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <motion.div className="max-w-xl" variants={container}>
                <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4" variants={fadeUp}>{t('hero.title')}</motion.h1>
                <motion.p className="text-xl md:text-2xl text-foreground/90 mb-4" variants={fadeUp}>{t('hero.subtitle')}</motion.p>
                <motion.p className="text-lg text-foreground/80 mb-6" variants={fadeUp}>{t('hero.description')}</motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeUp}>
                  <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <Link to="/exhibitions">{t('hero.cta')}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-foreground/5 text-foreground border-foreground/30 hover:bg-foreground/10 hover:text-primary">
                    <Link to="/tours">{t('hero.secondaryCta')}</Link>
                  </Button>
                </motion.div>
                <motion.div className="mt-6 flex items-center gap-3" variants={fadeUp}>
                  <a
                    href="https://www.facebook.com/museudotraje.sba"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/museudotraje_sba"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Image card with floating decorations */}
            <motion.div className="flex items-center justify-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              {/* outer container allows overflow so badges can sit outside rounded image */}
              <motion.div className="w-full h-72 md:h-[80vh] rounded-lg shadow-lg relative overflow-visible" variants={subtleScale}>
                {/* inner clipped wrapper keeps image rounded while letting decorations overflow */}
                <div className="w-full h-full rounded-lg overflow-hidden relative z-10">
                  <img src={heroImage} alt="Museum costumes" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* subtle rotating blurred blob behind image (z-0) */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0.5, scale: 0.9, rotate: 0 }}
                  animate={{ rotate: 360, scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="pointer-events-none absolute -left-20 -top-20 w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl z-0"
                />

                {/* floating badge 1 (z-20) */}
                {/* <motion.div
                  animate={{ y: [0, 14, 0], rotate: [0, 0, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-6 -right-6 z-20 bg-white rounded-2xl border border-black/5 p-3 shadow-xl flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                    <div className="text-sm">
                      <div className="text-[10px] font-bold uppercase text-black/40">{t('hero.badges.status.label')}</div>
                      <div className="text-sm font-bold">{t('hero.badges.status.collection')}</div>
                    </div>
                </motion.div> */}

                {/* floating badge 2 (z-20) */}
                {/* <motion.div
                  animate={{ y: [0, 14, 0], x: [0, 0, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute top-1/2 -left-14 z-20 bg-white rounded-2xl border border-black/5 p-3 shadow-xl flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <div className="text-[10px] font-bold uppercase text-black/40">{t('hero.badges.visitors.label')}</div>
                    <div className="text-sm font-bold">{t('hero.badges.visitors.count')}</div>
                  </div>
                </motion.div> */}

                {/* floating metric pill (z-20) */}
                {/* <motion.div
                  animate={{ scale: [1, 1.05, 1], y: [0, 0, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                  className="absolute bottom-6 -right-6 z-20 bg-white rounded-2xl border border-black/5 p-4 shadow-2xl"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase text-black/40">{t('hero.badges.display.label')}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{t('hero.badges.display.count')}</span>
                    <span className="text-xs text-muted-foreground font-bold">{t('hero.badges.display.unit')}</span>
                  </div>
                </motion.div> */}
              </motion.div>
            </motion.div>
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
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section (lighter, less white-on-green) */}
      {/* <section className="py-20 bg-primary/8 dark:bg-primary/12">
        <div className="container mx-auto px-4 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl font-bold mb-4 text-foreground">{t('donate.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('donate.subtitle')}
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-dark">
            <Link to="/donate">{t('nav.donate')}</Link>
          </Button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
