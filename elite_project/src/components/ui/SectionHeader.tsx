import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../constants/animations';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  centered = false,
  className 
}) => {
  return (
    <motion.div 
      variants={FADE_UP} 
      className={cn("mb-12", centered && "text-center", className)}
    >
      <h2 className={cn("mb-4 text-4xl font-black uppercase text-primary lg:text-5xl", centered && "mx-auto")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg text-secondary max-w-2xl", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
