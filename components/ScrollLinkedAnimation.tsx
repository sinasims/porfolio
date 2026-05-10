'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

const ScrollLinkedAnimation = ({ children }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start -200px", "end"]
  });

  const y = useTransform(scrollYProgress, [0, 300], [0, 0]); 
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollLinkedAnimation;