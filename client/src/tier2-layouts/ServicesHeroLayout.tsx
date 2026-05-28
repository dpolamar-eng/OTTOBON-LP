import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedSection } from '../tier1-components/AnimatedSection';
import { ContactModal } from '@/components/ContactModal';

interface SocialProof {
  avatars: string[];
  rating: string;
  text: string;
}

interface HeroData {
  headline: string;
  sub_headline: string;
  ctas: { text: string; link: string; primary: boolean }[];
  image?: string;
  social_proof?: SocialProof;
}

export function ServicesHeroLayout({ data }: { data: HeroData }) {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden flex flex-col items-center justify-center">
      {/* Parallax Background Image */}
      {data.image && (
        <motion.div 
          className="absolute -top-[400px] -bottom-[400px] inset-x-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${data.image})`, y: yImage, scale: 1.1 }}
        />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#060B19]/40 via-[#060B19]/80 to-[#060B19]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
        }}
      />

      {/* Hero Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-20 w-full -mt-24">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Top Badge */}
          <AnimatedSection direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center text-[10px] font-bold text-white border border-yellow-400/50">B</div>
              <span className="text-gray-200 text-sm font-medium tracking-wide">Ottobon Professional Services</span>
            </div>
          </AnimatedSection>
          
          {/* Headline - Allows explicit line breaks via \\n */}
          <AnimatedSection direction="up" delay={0.2} duration={0.8}>
            <h1 className="whitespace-pre-line text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400 tracking-tight mb-6 leading-tight">
              {data.headline}
            </h1>
          </AnimatedSection>
          
          {/* Subheadline */}
          <AnimatedSection direction="up" delay={0.4} duration={0.8}>
            <p className="text-base md:text-xl text-blue-100/80 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {data.sub_headline}
            </p>
          </AnimatedSection>
          
          {/* CTA and Social Proof Container */}
          <AnimatedSection direction="up" delay={0.6} duration={0.8}>
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center mt-4">
              
              {/* Generate Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {data.ctas.map((cta, index) => {
                  const CtaContent = (
                    <a
                      key={index}
                      href={cta.link === "#contact" ? undefined : cta.link}
                      className={`group relative px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-2 overflow-hidden cursor-pointer ${
                        cta.primary 
                          ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30' 
                          : 'bg-transparent text-white border border-white/30 hover:border-white/60 hover:bg-white/5 backdrop-blur-md'
                      }`}
                    >
                      {cta.primary && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      )}
                      <span className="relative z-10">{cta.text}</span>
                      {!cta.primary && (
                        <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      )}
                    </a>
                  );

                  if (cta.link === "#contact" || cta.text.toLowerCase().includes("talk to us")) {
                    return (
                      <ContactModal key={index}>
                        {CtaContent}
                      </ContactModal>
                    );
                  }
                  
                  return CtaContent;
                })}
              </div>

              {/* Social Proof matching the reference image style */}
              {data.social_proof && (
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-3">
                  <div className="flex -space-x-3">
                    {data.social_proof.avatars.map((avatar, i) => (
                      <img 
                        key={i} 
                        src={avatar} 
                        alt="User" 
                        className={`w-10 h-10 rounded-full border-2 border-[#060B19] object-cover ring-2 ring-blue-500/20`}
                        style={{ zIndex: 10 - i }}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col items-start text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <span className="font-bold text-white">{data.social_proof.rating}</span>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="text-gray-400 text-xs">{data.social_proof.text}</span>
                  </div>
                </div>
              )}

            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
