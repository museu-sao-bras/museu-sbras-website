import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Archive, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';
import { fadeUp } from '@/lib/motion';

const Exhibitions = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const previewParam = searchParams.get('preview');
  // fetch exhibitions by collection_type using the API, include optional preview flag from URL
  const permanent = useQuery({
    queryKey: ['exhibitions', 'permanent', previewParam ?? 'false'],
    queryFn: () => {
      const params = ['collection_type=permanent'];
      params.push(`preview=${encodeURIComponent(previewParam ?? 'false')}`);
      return apiGet(`/exhibition?${params.join('&')}`);
    },
  });

  const temporary = useQuery({
    queryKey: ['exhibitions', 'temporary', previewParam ?? 'false'],
    queryFn: () => {
      const params = ['collection_type=temporary'];
      params.push(`preview=${encodeURIComponent(previewParam ?? 'false')}`);
      return apiGet(`/exhibition?${params.join('&')}`);
    },
  });

  const archived = useQuery({
    queryKey: ['exhibitions', 'archived', previewParam ?? 'false'],
    queryFn: () => {
      const params = ['collection_type=archived'];
      params.push(`preview=${encodeURIComponent(previewParam ?? 'false')}`);
      return apiGet(`/exhibition?${params.join('&')}`);
    },
  });

  return (
    <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-foreground mb-8 text-center">
          {t('exhibitions.title')}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <Eye className="h-16 w-16 text-primary mb-6 mx-auto" />
              <div className="mb-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {t('exhibitions.permanent')}
                  <span className="ml-2 text-xs font-normal text-primary/80">{permanent.isLoading ? '…' : permanent.data?.total ?? 0}</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.permanent')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.permanentDesc')}
              </p>
              <Button asChild className="w-full">
                <Link to="/exhibitions/permanent">{t('exhibitions.viewCollection')}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all border-2 border-secondary">
            <CardContent className="p-8">
              <Calendar className="h-16 w-16 text-secondary mb-6 mx-auto" />
              <div className="mb-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary">
                  {t('exhibitions.temporary')}
                  <span className="ml-2 text-xs font-normal text-secondary/80">{temporary.isLoading ? '…' : temporary.data?.total ?? 0}</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.temporary')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.temporaryDesc')}
              </p>
              <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                <Link to="/exhibitions/temporary">{t('exhibitions.seeCurrent')}</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <Archive className="h-16 w-16 text-accent mb-6 mx-auto" />
              <div className="mb-4 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent/10 text-accent">
                  {t('exhibitions.previous')}
                  <span className="ml-2 text-xs font-normal text-accent/80">{archived.isLoading ? '…' : archived.data?.total ?? 0}</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold text-center mb-4">{t('exhibitions.previous')}</h2>
              <p className="text-muted-foreground text-center mb-6">
                {t('exhibitions.previousDesc')}
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/exhibitions/previous">{t('exhibitions.browseArchive')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* <div className="mt-16 bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-4">
            3D Models Coming Soon
          </h3>
          <p className="text-center text-muted-foreground">
            We're working on adding interactive 3D models of our costume collection. Check back soon!
          </p>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Exhibitions;
