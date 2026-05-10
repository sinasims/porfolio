'use client';

import { useScroll, useTransform, useSpring, motion, Transition } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type AnimationValues = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?:number;
};

type ScrollRevealProps = {
  children: ReactNode;
  from?: AnimationValues;
  to?: AnimationValues;
  offset?: Parameters<typeof useScroll>[0]['offset']; // تایپ دقیق از خود framer-motion
  smooth?: boolean;
  springConfig?: { stiffness?: number; damping?: number };
  transition?: Transition;
};

const ScrollReveal = ({
  children,
  from = { opacity: 0, x: 100, y: 0, scale:0 },
  to = { opacity: 1, x: 0, y: 0, scale:1 },
  offset = ['start end', 'start center'],
  smooth = true,
  transition = { delay: 0.1 },
  springConfig = { stiffness: 100, damping: 20 },
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any, // type assertion برای رفع خطای readonly
  });

  const progress = smooth ? useSpring(scrollYProgress, springConfig) : scrollYProgress;

  const transforms: Record<string, any> = {};

  if (from.opacity !== undefined && to.opacity !== undefined) {
    transforms.opacity = useTransform(progress, [0, 1], [from.opacity, to.opacity]);
  }
  if (from.x !== undefined && to.x !== undefined) {
    transforms.x = useTransform(progress, [0, 1], [from.x, to.x]);
  }
  if (from.y !== undefined && to.y !== undefined) {
    transforms.y = useTransform(progress, [0, 1], [from.y, to.y]);
  }
  if (from.scale !== undefined && to.scale !== undefined) {
    transforms.scale = useTransform(progress, [0, 1], [from.scale, to.scale]);
  }

  return (
    <div ref={ref}>
      <motion.div style={transforms}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;