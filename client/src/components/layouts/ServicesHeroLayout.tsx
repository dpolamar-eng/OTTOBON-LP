import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedSection } from '../../tier1-components/AnimatedSection';

interface HeroData {
  headline: string;
  sub_headline: string;
  ctas: { text: string; link: string; primary: boolean }[];
  image: string;
}

export function ServicesHeroLayout({ data }: { data: HeroData }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gray-950/80 z-10" />
        <img 
          src={data.image} 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up" delay={0.2} duration={0.8}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
              {data.headline.split('. ').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && '.'}
                  <br className="hidden md:block" />
                </React.Fragment>
              ))}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.4} duration={0.8}>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              {data.sub_headline}
            </p>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={0.6} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.ctas.map((cta, index) => (
                <a
                  key={index}
                  href={cta.link}
                  className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    cta.primary 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {cta.text}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/50 text-sm font-medium mb-2 uppercase tracking-widest">Scroll</span>
        <motion.div 
          className="w-[1px] h-12 bg-white/30"
          animate={{ height: ["0px", "48px"], y: [0, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  );
}
