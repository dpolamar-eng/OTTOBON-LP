import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';

// Manual wrap utility since @motionone/utils might not be exported
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ServicesPositioningLayoutProps {
  quote: string;
}

export function ServicesPositioningLayout({ quote }: ServicesPositioningLayoutProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const baseVelocity = -2.5; // Increased speed as requested

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Change direction if scrolling up
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="py-8 bg-gray-950 border-b border-t border-white/5 relative overflow-hidden flex items-center">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Endless Marquee Text */}
      <div className="w-full flex overflow-hidden whitespace-nowrap opacity-80">
        <motion.div
          className="flex whitespace-nowrap items-center text-base md:text-lg lg:text-xl font-medium tracking-wide text-gray-300 m-0"
          style={{ x }}
        >
          {/* Repeat the quote multiple times to make sure it loops smoothly */}
          <span className="px-8">{quote}</span>
          <span className="px-8 text-blue-500/50">•</span>
          <span className="px-8">{quote}</span>
          <span className="px-8 text-blue-500/50">•</span>
          <span className="px-8">{quote}</span>
          <span className="px-8 text-blue-500/50">•</span>
          <span className="px-8">{quote}</span>
          <span className="px-8 text-blue-500/50">•</span>
        </motion.div>
      </div>
    </section>
  );
}
