import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP, STAGGER_CONTAINER } from '../../constants/animations';
import { Container } from './Container';
import { cn } from '../../lib/utils';

interface BannerProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  bgImage?: string;
  bgVideo?: string|null;
  bgColor?: string;
  cta?: React.ReactNode;
  className?: string;
  height?: string;
}

export const Banner: React.FC<BannerProps> = ({ 
  title, 
  subtitle, 
  bgImage, 
  bgVideo, 
  bgColor = "bg-primary", 
  cta, 
  className,
  height = "py-24"
}) => {
  return (
    <section className={cn("relative overflow-hidden", bgColor, height, className)}>
      {bgImage && (
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src={bgImage} 
          alt="Banner Background" 
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-100"
        />
      )}
      {bgVideo && (
        <video 
          src={bgVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      )}
      {(bgImage || bgVideo) && <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />}
      
      <Container className="relative z-20">
        <motion.div 
          variants={STAGGER_CONTAINER} 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "flex flex-col items-center justify-between gap-12 text-center lg:flex-row lg:text-left",
            !cta && "text-center lg:text-center justify-center"
          )}
        >
          <div className="flex-1 space-y-6">
            <motion.h4 variants={FADE_UP} className="text-4xl font-black uppercase text-white lg:text-6xl tracking-tight">
              {title}
            </motion.h4>
            {subtitle && (
              <motion.p variants={FADE_UP} className="text-xl text-white/90 lg:text-2xl font-medium">
                {subtitle}
              </motion.p>
            )}
          </div>
          {cta && (
            <motion.div variants={FADE_UP}>
              {cta}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
