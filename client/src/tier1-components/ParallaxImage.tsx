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

  // Pronounced Parallax Transforms (Highly visible 'proper' effect)
  const y = useTransform(scrollYProgress, [0, 1], ["-12.5%", "12.5%"]);
  // Subtle scale and rotation to add depth
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0.8, -0.8]);

  return (
    <div ref={ref} className={`overflow-hidden relative rounded-2xl ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[125%] object-cover absolute top-[-12.5%] left-0"
        style={{ y, scale, rotate }}
      />
    </div>
  );
}
