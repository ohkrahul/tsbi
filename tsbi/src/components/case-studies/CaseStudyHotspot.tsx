'use client';
import { motion } from 'framer-motion';

interface Props { onClick: () => void; }

export default function CaseStudyHotspot({ onClick }: Props) {
  return (
    <motion.button
      className="cs-hotspot"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.1 }}
    >
      View<br />Case Study
    </motion.button>
  );
}
