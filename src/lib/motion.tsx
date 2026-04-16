import type { Variants } from 'framer-motion';

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const subtleScale: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45 } },
};

export default {};
