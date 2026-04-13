import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  offset?: number;
}

export function ParallaxImage({ src, alt, className = '', offset = 50 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Dramatic but constrained Parallax Transforms (Mind-blowing smooth vertical slide)
  const y = useTransform(scrollYProgress, [0, 1], [-offset * 4, offset * 4]);
  // Toned down the scale so we don't zoom in too much and lose image context
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

  return (
    <div ref={ref} className={`overflow-hidden relative rounded-2xl ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[150%] object-cover absolute top-[-25%] left-0"
        style={{ y, scale, rotate }}
      />
    </div>
  );
}
