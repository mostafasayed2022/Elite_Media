import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../constants/animations';
import { cn } from '../../lib/utils';

interface BrandingProps {
  className?: string;
  centered?: boolean;
}

export const Branding: React.FC<BrandingProps> = ({ className, centered = false }) => {
  return (
    <motion.div 
      variants={FADE_UP} 
      className={cn(
        "flex items-center space-x-4 text-2xl font-bold text-primary",
        centered ? "justify-center" : "justify-start",
        className
      )}
    >
      <span className="text-4xl text-black">Made By</span>
      <span className="text-primary opacity-50 text-5xl font-light">|</span>
      <span className="text-lg uppercase tracking-widest leading-none">
        Elites <br className={centered ? "hidden" : "block"} /> For Elites
      </span>
    </motion.div>
  );
};
