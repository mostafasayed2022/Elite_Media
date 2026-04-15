import React from 'react';
import { motion } from 'framer-motion';
import { STAGGER_CONTAINER, FADE_UP } from '../../constants/animations';
import { Container } from './Container';
import { Branding } from './Branding';
import { cn } from '../../lib/utils';

interface PageHeroProps {
  badge: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  badge, 
  title, 
  subtitle, 
  centered = false, 
  children,
  className 
}) => {
  return (
    <section className={cn("py-20 lg:py-32 overflow-hidden", className)}>
      <Container className={cn(centered && "text-center")}>
        <motion.div 
          variants={STAGGER_CONTAINER} 
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.span 
            variants={FADE_UP}
            className="inline-block rounded-full bg-primary-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-primary"
          >
            {badge}
          </motion.span>
          
          <motion.h1 
            variants={FADE_UP}
            className="text-5xl font-black leading-tight text-primary lg:text-7xl"
          >
            {title}
          </motion.h1>

          <Branding centered={centered} />

          {subtitle && (
            <motion.div variants={FADE_UP} className={cn("max-w-2xl text-lg leading-relaxed text-secondary", centered && "mx-auto")}>
              {subtitle}
            </motion.div>
          )}

          {children && (
            <motion.div variants={FADE_UP} className="pt-4">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
