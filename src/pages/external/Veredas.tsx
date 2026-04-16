import React from 'react';
import { motion } from 'framer-motion';
import { container, fadeUp, subtleScale } from '../../lib/motion';

const Veredas = () => {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="min-h-screen bg-gradient-to-b from-background via-background to-muted-50 text-foreground">
      <div className="container mx-auto px-4 py-32">
        {/* Banner */}
        <motion.div variants={fadeUp} className="rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-primary/10 to-secondary/8 p-6 mb-10">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Veredas da Memória</h1>
              <p className="text-sm text-muted-foreground">Grupo Musical residente no Museu do Traje</p>
            </div>
            <div className="ml-auto hidden md:block">
              <a href="mailto:filomena@museu-sbras.com" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow">Contactar</a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.article variants={fadeUp} className="lg:col-span-2 bg-card/60 p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Apresentação</h2>
            <p className="text-muted-foreground mb-4">
              O Grupo Musical Veredas da Memória foi fundado em 2001 e a sua primeira apresentação pública foi
              precisamente no Museu do Traje. O seu crescimento, os altos e baixos, as crises e os sucessos foram
              sempre vividos pelo Museu com grande proximidade.
            </p>
            <p className="text-muted-foreground mb-4">
              Em inícios de 2012, o Veredas da Memória integrou oficialmente a estrutura do Museu e passou a ser
              o grupo de música popular residente.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold">Membros</h3>
                <p className="text-muted-foreground">
                  Somos um grupo de 12 amigos e adoramos a música tradicional portuguesa: Vitorino Lopes, Inês Cruz,
                  Madalena Neves, Anabela Ribeiro, Filomena Mendonça, Bráulio Jesus, Magali Mendonça, Orlando Silva,
                  David Mendonça, Telma Ramos e Ana Paula.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Contacto</h3>
                <p className="text-muted-foreground">Filomena Mendonça — <a href="mailto:filomena@museu-sbras.com" className="text-primary">filomena@museu-sbras.com</a></p>
                <p className="text-muted-foreground">Tel. 289 840 100</p>
                <p className="text-muted-foreground mt-2">Museu do Traje, Rua Dr. José Dias Sancho, n.61, 8150-141 São Brás de Alportel</p>
              </div>
            </div>
          </motion.article>

          <motion.aside variants={fadeUp} className="bg-card p-6 rounded-lg shadow-sm">
            <img src="https://museu-sbras.com/veredas-foto2.jpg" alt="Veredas da Memória" className="w-full rounded-lg object-cover mb-4" />
            <div className="text-sm text-muted-foreground">Foto do grupo</div>
          </motion.aside>
        </div>

        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Momentos Vídeo</h3>
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'https://www.youtube.com/embed/AJHPeFHqYEs?list=UUh1ddRI2ZB4TUYZiF3ohAgA',
              'https://www.youtube.com/embed/IJoG3hNDj_o',
              'https://www.youtube.com/embed/qfnF2W52dTQ',
              'https://www.youtube.com/embed/iDjgKvwK0vM'
            ].map((src, i) => (
              <motion.div key={i} variants={subtleScale} className="aspect-video rounded-lg overflow-hidden shadow">
                <iframe className="w-full h-full" src={src} title={`veredas-${i}`} frameBorder="0" allowFullScreen />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Veredas;
