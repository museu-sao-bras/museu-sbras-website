// Update this page (the content is just a fallback if you fail to update the page)

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

const Index = () => {
  return (
    <motion.div className="flex min-h-screen items-center justify-center bg-background" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to Your Blank App</h1>
        <p className="text-xl text-muted-foreground">Start building your amazing project here!</p>
      </div>
    </motion.div>
  );
};

export default Index;
