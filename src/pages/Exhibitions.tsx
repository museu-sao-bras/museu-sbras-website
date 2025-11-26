import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Archive, Eye } from 'lucide-react';

const Exhibitions = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-8 text-center">
          {t('exhibitions.title')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <Eye className="h-16 w-16 text-primary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.permanent')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.permanentDesc')}
              </p>
              <Button asChild className="w-full">
                <Link to="/exhibitions/permanent">View Collection</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all border-2 border-secondary">
            <CardContent className="p-8">
              <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.temporary')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.temporaryDesc')}
              </p>
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                <Link to="/exhibitions/temporary">See Current</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <Archive className="h-16 w-16 text-accent mb-6 mx-auto" />
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.previous')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.previousDesc')}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/exhibitions/previous">Browse Archive</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            3D Models Coming Soon
          </h3>
          <p className="text-center text-muted-foreground">
            We're working on adding interactive 3D models of our costume collection. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Exhibitions;
