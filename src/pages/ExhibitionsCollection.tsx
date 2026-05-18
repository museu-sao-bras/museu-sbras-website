import { useTranslation } from 'react-i18next';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';
import { fadeUp } from '@/lib/motion';
import { useState, useEffect } from 'react';

const mapParamToCollection = (param?: string) => {
  if (!param) return undefined;
  const p = param.toLowerCase();
  if (p === 'permanent') return 'permanent';
  if (p === 'temporary') return 'temporary';
  if (p === 'previous' || p === 'archived') return 'archived';
  return undefined;
};

const ExhibitionsCollection = () => {
  const { t } = useTranslation();
  const { collectionType } = useParams();

  const collectionQuery = mapParamToCollection(collectionType);
  const [searchParams] = useSearchParams();
  const previewParam = searchParams.get('preview');

  const q = useQuery({
    queryKey: ['exhibitions', collectionQuery ?? 'all', previewParam ?? 'false'],
    queryFn: () => {
      const base = '/exhibition';
      const params: string[] = [];
      if (collectionQuery) params.push(`collection_type=${encodeURIComponent(collectionQuery)}`);
      params.push(`preview=${encodeURIComponent(previewParam ?? 'false')}`);
      const url = params.length ? `${base}?${params.join('&')}` : base;
      return apiGet(url);
    },
    enabled: !!collectionQuery,
  });

  const items = q.data?.items ?? [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const exhibitions = items;

  // normalize current exhibition and images early so hooks order is stable
  const ex = exhibitions[activeIdx];
  const imgs: string[] = (ex?.images ?? []).map((img: any) => (typeof img === 'string' ? img : img?.public_url)).filter(Boolean);



  // when switching exhibitions reset the image index
  useEffect(() => setImgIndex(0), [activeIdx]);

  // clamp activeIdx when exhibitions change
  useEffect(() => {
    if (activeIdx >= exhibitions.length) setActiveIdx(0);
  }, [exhibitions.length]);

  if (q.isLoading) {
    return (
      <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <div className="container mx-auto px-4 py-16 text-center">Loading…</div>
      </motion.div>
    );
  }

  if (q.isError) {
    return (
      <motion.div className="min-h-screen pt-20" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        <div className="container mx-auto px-4 py-16 text-center text-red-600">Error loading exhibitions</div>
      </motion.div>
    );
  }

  if (!exhibitions || exhibitions.length === 0) {
    return (
      <motion.div className="container mx-auto min-h-screen pt-[120px] pb-16 flex flex-col items-center justify-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <h1 className="text-4xl font-bold mb-8 text-center">{collectionQuery ? t(`exhibitions.${collectionType ?? ''}`) : t('exhibitions.title')}</h1>
        <p className="text-muted-foreground">No exhibitions found.</p>
      </motion.div>
    );
  }
  const prev = () => setImgIndex(i => (i - 1 + imgs.length) % imgs.length);
  const next = () => setImgIndex(i => (i + 1) % imgs.length);

  return (
    <motion.div className="min-h-screen pt-[120px] pb-16 flex flex-col" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      <h1 className="text-4xl font-bold mb-8 text-center">{collectionQuery ? t(`exhibitions.${collectionType ?? ''}`) : t('exhibitions.title')}</h1>

      {/* Toggle bar */}
      <div className="flex overflow-x-auto border-b border-muted mb-8 px-4">
        {exhibitions.map((e: any, idx: number) => (
          <button
            key={e.id ?? idx}
            className={`px-4 py-2 whitespace-nowrap font-semibold transition-colors ${activeIdx === idx ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => { setActiveIdx(idx); setImgIndex(0); }}
          >
            {e.title}
          </button>
        ))}
      </div>

      {/* import React, { useState, useEffect, useCallback } from 'react'; const Carousel = ({ images = [] }) => { const [currentIndex, setCurrentIndex] = useState(0); const nextSlide = useCallback(() => { setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }, [images.length]); const prevSlide = () => { setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }; useEffect(() => { const timer = setInterval(nextSlide, 5000); return () => clearInterval(timer); }, [nextSlide]); return ( <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl group"> <div className="flex transition-transform duration-500 ease-out h-96" style={{ transform: `translateX(-${currentIndex * 100}%)` }}> {images.map((img, index) => ( <div key={index} className="min-w-full h-full"> <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" /> </div> ))} </div> <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"> &#10094; </button> <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"> &#10095; </button> <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2"> {images.map((_, index) => ( <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50'}`} /> ))} </div> </div> ); }; export default Carousel; */}

      {/* Full screen exhibition with motion carousel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {imgs.length > 0 && (
          <div className="relative w-full max-w-4xl mb-8">
            <div className="overflow-hidden rounded">
              <motion.div
                className="flex"
                animate={{ x: imgs.length ? `-${(imgIndex * 100) / imgs.length}%` : '0%' }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.45 }}
                style={{ width: `${imgs.length * 100}%` }}
              >
                {imgs.map((src, i) => (
                  <div key={i} style={{ width: `${100 / imgs.length}%` }} className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${ex.title} ${i + 1}`} className="w-full h-[40vh] md:h-[60vh] object-contain bg-white" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* controls */}
            {imgs.length > 1 && (
              <>
                <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">‹</button>
                <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow">›</button>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2">
                  {imgs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-primary' : 'bg-white/60'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4 text-center">{ex.title}</h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl whitespace-pre-line">{ex.description}</p>
      </div>
    </motion.div>
  );
};

export default ExhibitionsCollection;
