import React, { useMemo, useState } from "react";
import { useLocation } from "wouter";
import HomeHeader from "./HomeHeader";
import { GraduationCap, BriefcaseBusiness, Check, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "../tier1-components/TiltCard";

export default function GatewayPortal() {
  const [, navigate] = useLocation();

  // Memoize bubble positions/sizes so background doesn't change on hover-induced re-renders
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        left: Math.random() * 100,
        bottomVh: Math.random() * 80, // 0–80vh from bottom
      })),
    [],
  );

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <HomeHeader />

      {/* Hero Video Section - Responsive Height */}
      <section className="relative h-auto md:h-screen w-full overflow-hidden pt-20 sm:pt-24 md:pt-0">
        <div className="relative md:absolute md:inset-0">
          <video
            className="w-full h-auto md:h-full object-contain md:object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Scroll indicator - Desktop only */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
          <div className="animate-bounce">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Hero Content Section - Below Video */}
      <section className="relative z-10 py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
              <img
                src="/assets/logo.png"
                alt="Ottobon Logo"
                className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain"
              />
              <div className="font-extrabold text-white tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                OTTOBON
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl text-blue-100 font-light mb-4">
              Empowering the Future of AI-Driven Consulting
            </h1>
            <p className="text-lg text-blue-200 mb-6 max-w-3xl mx-auto">
              Learn from AI to become faster, smarter, and more effective.
              Transform into an independent consultant or enhance your
              professional services with cutting-edge skills.
            </p>
            <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Background effects for sections below */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Static particles (no animation) */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className="gateway-bubble"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                left: `${b.left}%`,
                bottom: `${b.bottomVh}vh`,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))",
              }}
            />
          ))}
        </div>
      </div>

      {/* About / Our Vision */}
      <section
        id="about"
        className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4">
          {/* Heading outside the content container for parity with Services */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
               Our Vision
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>

          <div className="max-w-4xl mx-auto text-blue-100 space-y-4 text-center">
            <p className="text-base md:text-lg leading-relaxed">
              Ottobon exists to help people and teams perform like top-tier
              technology consultants. We combine human mentorship with AI
              acceleration so you learn faster, practice on real scenarios, and
              make better decisions from day one.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our work spans two pillars: Ottobon Academy (career launch and
              upskilling) and Ottobon Professional Services (PSO) for working
              consultants and firms. Together they form a continuous system,
              learn the craft, apply it in the field, and keep advancing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services (Academy + Professional Services) */}
      

      <section
        id="services-overview"
        className="relative z-10 pt-10 pb-20 scroll-mt-20 md:scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Our Services
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-6 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            <p className="text-blue-100/80 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              Two complementary tracks. Academy turns students and freshers into
              job-ready consultants with guided paths, projects, and interview
              prep. PSO equips working professionals and firms with AI-powered
              operations—so your delivery, marketing, and admin run with
              enterprise-grade efficiency.
            </p>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Academy */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <TiltCard className="flex-1 rounded-[20px] overflow-hidden border border-white/10 bg-[#0A0D14] transition-all duration-300 hover:border-blue-500/50 group h-full">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                </div>

                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center ring-1 ring-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Ottobon Academy
                    </h3>
                  </div>

                  <p className="text-blue-100/70 text-sm sm:text-base mb-6 leading-relaxed flex-grow">
                    Transform students and freshers into independent consultants
                    with job-ready skills in high-demand technologies.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {['AI-Powered Skill Growth', 'Land Your Dream Job', 'Thrive With Expert Guidance'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-blue-400" />
                        </div>
                        <span className="text-white/90 text-sm sm:text-base font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-white/5">
                    <button
                      onClick={() => window.location.href = "https://academy.ottobon.in"}
                      className="group/btn relative w-full overflow-hidden rounded-lg bg-blue-600 px-5 py-3 transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-white text-base">
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <TiltCard className="flex-1 rounded-[20px] overflow-hidden border border-white/10 bg-[#0A0D14] transition-all duration-300 hover:border-purple-500/50 group h-full">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors duration-500" />
                </div>

                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center ring-1 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <BriefcaseBusiness className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Ottobon Services
                    </h3>
                  </div>

                  <p className="text-purple-100/70 text-sm sm:text-base mb-6 leading-relaxed flex-grow">
                    Empowering working professionals to transition into
                    consultant providers with advanced tech learning and
                    professional services.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {['Transform Health with Innovation', 'Driving Innovation with Expertise', 'Legal & Finance'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-purple-400" />
                        </div>
                        <span className="text-white/90 text-sm sm:text-base font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-white/5">
                    <button
                      onClick={() => {
                        navigate("/services");
                        window.scrollTo(0, 0);
                      }}
                      className="group/btn relative w-full overflow-hidden rounded-lg bg-purple-600 px-5 py-3 transition-all hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-white text-base">
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>




      

      {/* Footer */}
      <div className="relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-2">
          {/* First row: links */}
          <div className="flex space-x-6 order-1">
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Contact
            </a>
          </div>
          {/* Second row: copyright */}
          <div className="text-white/60 text-sm order-2">
            © {new Date().getFullYear()} Ottobon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}