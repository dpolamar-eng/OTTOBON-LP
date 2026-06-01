import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const highlights = [
  'Replicates expert reasoning patterns & escalation instincts',
  'Enables scalable oversight and decision handling across cohorts',
  'Full auditability and traceability with guaranteed escalation procedures',
  'Domains scaling across diverse fields: Ed, Clinical, Engineering, Legal, Compliance, etc.',
];

export function ExpertCognitiveScalingLayout() {
  return (
    <section className="relative overflow-hidden bg-[#050b18] py-20 md:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,91,196,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-start gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(430px,0.94fr)] lg:gap-16 lg:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:pt-1"
        >
          <div className="relative aspect-[1.7/1] overflow-hidden rounded-[28px] border border-white/8 bg-[#0d1427] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
            <img
              src="/images/digital_twin.jpeg"
              alt="Professional standing in front of an AI mirror reflection"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(66,111,196,0.18),transparent_28%,rgba(255,250,220,0.08)_100%)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:max-w-[720px] lg:pt-1"
        >
          <div className="mb-7 inline-flex w-fit items-center rounded-full border border-[#2b58c8]/55 bg-[#0d2355] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#a9c3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            Expert Cognitive Scaling
          </div>

          <h2 className="max-w-[19ch] text-xl font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[2.0rem] xl:text-[2.5rem]">
            Your professional presence,<br className="hidden lg:block" /> amplified at infinite scale.
          </h2>

          <p className="mt-8 max-w-[38rem] text-lg leading-[1.75] text-slate-300 lg:text-[1.02rem]">
            Scale your intuition and professional boundaries. From routine reviews and targeted interventions to ambiguous case surfacing and auditing, our platform replicates your expert judgment, extending it across hundreds of simultaneous interactions while preserving your final word.
          </p>

          <ul className="mt-10 space-y-6">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-4 text-base leading-[1.6] text-slate-100">
                <span className="mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-sky-500/16 text-sky-300 shadow-[0_0_0_1px_rgba(56,189,248,0.08)]">
                  <Check className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul> 
        </motion.div>
      </div>
    </section>
  );
}
