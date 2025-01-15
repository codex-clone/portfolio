'use client';

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Variants,
} from 'framer-motion';
import React from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

export interface TextEffectProps {
  children: React.ReactNode;
  preset: "fade" | "slide" | "scale";
  trigger?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export function TextEffect({
  children,
  preset = "fade",
  trigger = true,
  delay = 0,
  duration = 0.5,
  className,
  as: Component = "div",
}: TextEffectProps) {
  const presets = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: duration, delay }
    },
    slide: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
      transition: { duration: duration, delay }
    },
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
      transition: { duration: duration, delay }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <motion.div
          initial={presets[preset].initial}
          animate={presets[preset].animate}
          exit={presets[preset].exit}
          transition={presets[preset].transition}
          className={className}
        >
          {Component === "div" ? children : <Component>{children}</Component>}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 