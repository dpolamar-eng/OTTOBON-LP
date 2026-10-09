import React, { useRef } from 'react';
import { ArrowRight, Settings, Repeat } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { TiltCard } from '../tier1-components/TiltCard';
import { FloatingBackground } from '../tier1-components/FloatingBackground';
import servicesContent from '../tier3-content/services-content.json';

interface SectionCard {
  title: string;
  bullets?: string[];
}

interface ExecutionSection {
  badge: string;
  headline: string;
  body: string;
  cards: SectionCard[];
  cta: {
    text: string;
    link: string;
  };
}

interface ExecutionSupportData {
  id: string;
  section_1: ExecutionSection;
  section_2: ExecutionSection;
}

export function ExecutionSupportLayout({ data }: { data: ExecutionSupportData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  // Scroll-driven background transition (dark → white)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['#0A0E27', '#FFFFFF']
  );

  // Text color transitions
  const headlineColor = useTransform(scrollYProgress, [0, 1], ['#FFFFFF', '#0A0E27']);
  const bodyColor = useTransform(scrollYProgress, [0, 1], ['#CBD5E1', '#475569']);

  // Parallax for image stack
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const img1Y = useTransform(parallaxProgress, [0, 1], [40, -30]);
  const img2Y = useTransform(parallaxProgress, [0, 1], [60, -50]);
  const img3Y = useTransform(parallaxProgress, [0, 1], [20, -70]);
  const headerY = useTransform(parallaxProgress, [0, 1], [0, -40]);
  const cardsY = useTransform(parallaxProgress, [0, 1], [0, -30]);

  const btnBorderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['rgba(255,255,255,0.2)', 'rgba(0,0,0,0.2)']
  );

  const cardBorderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['rgba(255,255,255,0.1)', 'rgba(0,0,0,0.08)']
  );

  // Stagger animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Stacked images for left column - UI/UX design style collage
  const stackImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop',
  ];

  // Stacked images for right column (second section) - Prototype/Product focused
  const stackImages2 = [
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop', // Product design/prototyping
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', // Data / charts
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', // Digital network / AI cloud
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="execution-support"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Floating Background Effects */}
      <FloatingBackground />

      {/* Morphing Shape */}
      <div
        className="es-animate-morph absolute w-[400px] h-[400px] opacity-[0.05] pointer-events-none hidden lg:block"
        style={{
          background: 'linear-gradient(135deg, var(--es-primary-blue), var(--es-accent-purple))',
          top: '10%',
          left: '0%',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ===== ROW 1: Images Left, Content Right ===== */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

            {/* ===== LEFT COLUMN: Stacked Image Collage ===== */}
            <motion.div
              className="w-full lg:w-[48%] will-change-transform flex justify-center"
              variants={slideInLeft}
            >
              <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] xl:aspect-square">
                {/* Main large image */}
                <motion.div
                  className="absolute z-10 rounded-[20px] overflow-hidden shadow-2xl bg-gray-200"
                  style={{ y: img1Y, top: '10%', left: '0', width: '80%', height: '65%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages[0]}
                      alt="Team collaboration"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>

                {/* Second stacked image - offset right & down */}
                <motion.div
                  className="absolute z-20 rounded-[16px] overflow-hidden shadow-xl border-4 border-white/80 bg-gray-200"
                  style={{ y: img2Y, bottom: '5%', right: '0', width: '60%', height: '45%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages[1]}
                      alt="Business meeting"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                {/* Third accent image - small, top right */}
                <motion.div
                  className="absolute z-30 rounded-[12px] overflow-hidden shadow-lg border-4 border-white/80 bg-gray-200"
                  style={{ y: img3Y, top: '0', right: '5%', width: '35%', height: '30%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages[2]}
                      alt="Design workspace"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                {/* Decorative accent dot */}
                <div
                  className="absolute w-16 h-16 rounded-full opacity-30 z-0 hidden md:block"
                  style={{
                    background: 'var(--es-primary-blue)',
                    top: '5%',
                    left: '-3%',
                    filter: 'blur(8px)',
                  }}
                />
              </div>
            </motion.div>

            {/* ===== RIGHT COLUMN: Content ===== */}
            <div className="w-full lg:w-[52%]">
              {/* Badge */}
              <motion.div
                variants={slideInRight}
                style={{ y: headerY }}
                className="will-change-transform"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5 relative overflow-hidden es-animate-shimmer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(59,130,246,0.3)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <motion.span
                    className="text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: headlineColor }}
                  >
                    {data.section_1.badge}
                  </motion.span>
                </div>
              </motion.div>

              {/* Headline — compact */}
              <motion.div
                variants={slideInRight}
                style={{ y: headerY }}
                className="will-change-transform"
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4"
                  style={{ color: headlineColor }}
                >
                  {data.section_1.headline}
                </motion.h2>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={slideInRight}>
                <motion.p
                  className="text-base md:text-lg leading-relaxed mb-6 max-w-xl"
                  style={{ color: bodyColor }}
                >
                  {data.section_1.body}
                </motion.p>
              </motion.div>

              {/* Service Model Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 will-change-transform"
                style={{ y: cardsY }}
                variants={slideInRight}
              >
                {data.section_1.cards.map((sub, i) => (
                  <div key={i} className={`flex flex-col w-full h-full ${i === 2 ? 'sm:col-span-2' : ''}`}>
                    <TiltCard
                      className="rounded-[16px] p-4 md:p-5 border bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:bg-white/10 flex-1 flex flex-col"
                      style={{ borderColor: cardBorderColor }}
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Card Title */}
                        <motion.h4
                          className="text-base md:text-lg font-bold mb-3 leading-tight"
                          style={{ color: headlineColor }}
                        >
                          {sub.title}
                        </motion.h4>

                        {/* Bullets */}
                        {sub.bullets && sub.bullets.length > 0 && (
                          <ul className="space-y-2">
                            {sub.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span
                                  className="es-animate-pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                                  style={{
                                    backgroundColor: 'var(--es-primary-blue)',
                                    animationDelay: `${idx * 0.3}s`,
                                  }}
                                />
                                <motion.span
                                  className="text-[13px] md:text-sm leading-relaxed"
                                  style={{ color: bodyColor }}
                                >
                                  {bullet}
                                </motion.span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </motion.div>

              {/* Button Below Cards */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8 will-change-transform"
                style={{ y: cardsY }}
                variants={slideInRight}
              >
                <motion.a
                  href={data.section_1.cta.link}
                  className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:-translate-y-1 whitespace-nowrap bg-yellow-500 text-white border-2 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 shadow-[0_4px_16px_rgba(234,179,8,0.35)] hover:shadow-[0_6px_24px_rgba(234,179,8,0.5)]"
                >
                  <span>{data.section_1.cta.text}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* ===== ROW 1.5: Operate & Transfer Service Cards ===== */}
          <div className="mt-24 mb-16 will-change-transform">
             <motion.div 
               className="grid grid-cols-1 md:grid-cols-2 gap-8"
               variants={slideInRight}
               style={{ y: cardsY }}
             >
               {servicesContent.operate_transfer.cards.map((card, i) => (
                 <TiltCard key={i} 
                   className="flex-1 p-8 rounded-[20px] border bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:bg-white/10 flex flex-col group relative overflow-hidden"
                   style={{ borderColor: cardBorderColor }}
                 >
                   <div className="relative z-10 flex flex-col h-full">
                     <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                       {i === 0 ? <Settings className="w-6 h-6" /> : <Repeat className="w-6 h-6" />}
                     </div>
                     <motion.h3 
                       className="text-2xl font-extrabold mb-4"
                       style={{ color: headlineColor }}
                     >
                       {card.title}
                     </motion.h3>
                     <motion.p 
                       className="mb-6 leading-relaxed"
                       style={{ color: bodyColor }}
                     >
                       {card.description}
                     </motion.p>
                     <ul className="space-y-3 mb-8">
                       {card.highlights.map((highlight, idx) => (
                         <li key={idx} className="flex items-start gap-3">
                           <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                           <motion.span 
                             className="text-sm leading-relaxed"
                             style={{ color: bodyColor }}
                           >
                             {highlight}
                           </motion.span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </TiltCard>
               ))}
             </motion.div>
          </div>

          {/* ===== ROW 2: Content Left, Images Right ===== */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center mt-32">
            
            {/* ===== LEFT COLUMN: Content ===== */}
            <div className="w-full lg:w-[52%] order-2 lg:order-1">
              
              <motion.div
                variants={slideInLeft}
                style={{ y: headerY }}
                className="will-change-transform"
              >
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5 relative overflow-hidden es-animate-shimmer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(59,130,246,0.3)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <motion.span
                    className="text-xs font-bold tracking-[0.15em] uppercase"
                    style={{ color: headlineColor }}
                  >
                    {data.section_2.badge}
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                variants={slideInLeft}
                style={{ y: headerY }}
                className="will-change-transform"
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight mb-4"
                  style={{ color: headlineColor }}
                >
                  {data.section_2.headline}
                </motion.h2>
              </motion.div>

              <motion.div variants={slideInLeft}>
                <motion.p
                  className="text-base md:text-lg leading-relaxed mb-6 max-w-xl"
                  style={{ color: bodyColor }}
                >
                  {data.section_2.body}
                </motion.p>
              </motion.div>

              {/* Service Model Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 will-change-transform"
                style={{ y: cardsY }}
                variants={slideInLeft}
              >
                {data.section_2.cards.map((sub, i) => (
                  <div key={i} className={`flex flex-col w-full h-full ${i === 2 ? 'sm:col-span-2' : ''}`}>
                    <TiltCard
                      className="rounded-[16px] p-4 md:p-5 border bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-black/20 hover:bg-white/10 flex-1 flex flex-col"
                      style={{ borderColor: cardBorderColor }}
                    >
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Card Title */}
                        <motion.h4
                          className="text-base md:text-lg font-bold mb-3 leading-tight"
                          style={{ color: headlineColor }}
                        >
                          {sub.title}
                        </motion.h4>

                        {/* Bullets */}
                        {sub.bullets && sub.bullets.length > 0 && (
                          <ul className="space-y-2">
                            {sub.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span
                                  className="es-animate-pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                                  style={{
                                    backgroundColor: 'var(--es-primary-blue)',
                                    animationDelay: `${idx * 0.3}s`,
                                  }}
                                />
                                <motion.span
                                  className="text-[13px] md:text-sm leading-relaxed"
                                  style={{ color: bodyColor }}
                                >
                                  {bullet}
                                </motion.span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </motion.div>

              {/* Button Below Cards */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8 will-change-transform"
                style={{ y: cardsY }}
                variants={slideInLeft}
              >
                <motion.a
                  href={data.section_2.cta.link}
                  className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:-translate-y-1 whitespace-nowrap bg-transparent border-2 hover:bg-blue-600 hover:border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] backdrop-blur-sm"
                  style={{ color: 'var(--es-primary-blue)', borderColor: btnBorderColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--es-primary-blue)';
                  }}
                >
                  <span>{data.section_2.cta.text}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
            </div>

            {/* ===== RIGHT COLUMN: Stacked Image Collage (Mirrored) ===== */}
            <motion.div
              className="w-full lg:w-[48%] will-change-transform flex justify-center order-1 lg:order-2"
              variants={slideInRight}
            >
              <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] xl:aspect-square">
                {/* Main large image */}
                <motion.div
                  className="absolute z-10 rounded-[20px] overflow-hidden shadow-2xl bg-gray-200"
                  style={{ y: img1Y, top: '10%', right: '0', width: '80%', height: '65%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages2[0]}
                      alt="Product strategy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>

                {/* Second stacked image - offset left & down */}
                <motion.div
                  className="absolute z-20 rounded-[16px] overflow-hidden shadow-xl border-4 border-white/80 bg-gray-200"
                  style={{ y: img2Y, bottom: '5%', left: '0', width: '60%', height: '45%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages2[1]}
                      alt="Data metrics"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                {/* Third accent image - small, top left */}
                <motion.div
                  className="absolute z-30 rounded-[12px] overflow-hidden shadow-lg border-4 border-white/80 bg-gray-200"
                  style={{ y: img3Y, top: '0', left: '5%', width: '35%', height: '30%' }}
                >
                  <div className="w-full h-full group">
                    <img
                      src={stackImages2[2]}
                      alt="Cloud architecture"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </motion.div>

                {/* Decorative accent dot (Mirrored) */}
                <div
                  className="absolute w-16 h-16 rounded-full opacity-30 z-0 hidden md:block"
                  style={{
                    background: 'var(--es-primary-blue)',
                    top: '5%',
                    right: '-3%',
                    filter: 'blur(8px)',
                  }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
