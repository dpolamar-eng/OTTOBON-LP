import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Globe, Heart, Zap, Brain, TrendingDown, Target, Settings } from 'lucide-react';

// Icon Map for dynamic icon rendering based on the string name from JSON
const IconMap: { [key: string]: React.ElementType } = {
  Users,
  Globe,
  Heart,
  Zap,
  Brain,
  TrendingDown,
  Target,
  Settings
};

// Interfaces based on the tier 3 data structure
interface StatData {
  value: string;
  label: string;
}

interface ValueData {
  title: string;
  description: string;
  icon: string;
}

interface LeadershipData {
  name: string;
  role: string;
  description: string;
  image: string;
  color: string;
}

interface AboutUsData {
  hero: {
    headline: string;
    sub_headline: string;
  };
  stats: StatData[];
  values: ValueData[];
  leadership: LeadershipData[];
}

export const ServicesAboutUsLayout: React.FC<{ data: AboutUsData }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Parallax
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="about-us"
      ref={containerRef}
      className="relative w-full bg-slate-900 text-white overflow-hidden py-16 sm:py-24"
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{ y: yBg }}
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Hero & Story Section --- */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500 animate-gradient-x">
              {data.hero.headline}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light"
          >
            {data.hero.sub_headline}
          </motion.p>
        </div>

        {/* --- Stats Counter Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 md:mb-24">
          {data.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-emerald-400 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Values Grid (4 Cards) --- */}
        <div className="mb-16 md:mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-12 text-white border-l-4 border-amber-500 pl-6"
          >
            Core Values
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.values.map((value, idx) => {
              const IconComponent = IconMap[value.icon] || Users;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <IconComponent className="w-8 h-8 text-amber-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-200 transition-colors">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Leadership Grid (6 Cards) --- */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-12 text-white border-l-4 border-purple-500 pl-6"
          >
            Leadership Team
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.leadership.map((leader, idx) => {
              // Map color string to actual Tailwind classes
              const borderColorMap: Record<string, string> = {
                purple: "hover:border-purple-500",
                emerald: "hover:border-emerald-500",
                yellow: "hover:border-amber-500",
              };

              const badgeBgMap: Record<string, string> = {
                purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                yellow: "bg-amber-500/20 text-amber-300 border-amber-500/30",
              };

              const hoverBorder = borderColorMap[leader.color] || borderColorMap.purple;
              const badgeClasses = badgeBgMap[leader.color] || badgeBgMap.purple;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`group relative overflow-hidden rounded-3xl bg-slate-800/80 backdrop-blur-md border border-slate-700 transition-all duration-300 ${hoverBorder}`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover object-[center_20%] grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-6 relative z-10 -mt-12">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-sm mb-4 ${badgeClasses} transform group-hover:-translate-y-1 transition-transform`}>
                      {leader.role}
                    </span>
                    <h4 className="text-2xl font-bold text-white mb-2">{leader.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {leader.description}
                    </p>
                  </div>

                  {/* Subtle Glow Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 group-hover:animate-pulse pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
