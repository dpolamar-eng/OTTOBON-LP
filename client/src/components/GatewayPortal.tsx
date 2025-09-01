import React, { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import HomeHeader from './HomeHeader';

export default function GatewayPortal() {
  const [, navigate] = useLocation();
  const [hoverState, setHoverState] = useState<'academy' | 'services' | null>(null);
  const [pressing, setPressing] = useState<'academy' | 'services' | null>(null);

  // Memoize bubble positions/sizes so background doesn't change on hover-induced re-renders
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        left: Math.random() * 100,
        bottomVh: Math.random() * 80, // 0–80vh from bottom
      })),
    []
  );

  return (
  <div className="relative min-h-screen bg-black flex flex-col">
      <HomeHeader />
  {/* Spacer to create breathing room below fixed header */}
  <div className="h-16 md:h-20"></div>
      {/* Background effects */}
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
                background: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))',
              }}
            />
          ))}
        </div>
      </div>

      {/* Logo and Title */}
      <div className="relative z-10 text-center pt-20 pb-12">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain" />
            <div className="font-extrabold text-white tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              OTTOBON
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-xl sm:text-2xl text-blue-100 font-light mt-3 sm:mt-4 mb-4">
            Empowering the Future of AI-Driven Consulting
          </h1>
          <p className="text-lg text-blue-200 mb-6 max-w-3xl mx-auto">
            Learn from AI to become faster, smarter, and more effective. Transform into an independent consultant or enhance your professional services with cutting-edge skills.
          </p>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-2"></div>
          <p className="text-sm text-blue-300 italic">
            "Learning from AI makes things easier, faster, and smarter"
          </p>
        </div>
      </div>

  {/* Gateway Options removed: cards moved to Services section for single-source layout */}

      {/* About / Our Vision */}
  <section id="about" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          {/* Heading outside the content container for parity with Services */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              About Us • Our Vision
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>

          <div className="max-w-4xl mx-auto text-blue-100 space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              Ottobon exists to help people and teams perform like top-tier technology consultants. We combine human mentorship with AI acceleration so you learn faster, practice on real scenarios, and make better decisions from day one.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our work spans two pillars: Ottobon Academy (career launch and upskilling) and Ottobon Professional Services (PSO) for working consultants and firms. Together they form a continuous system, learn the craft, apply it in the field, and keep advancing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services (Academy + Professional Services) */}
  <section id="services-overview" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">Our Services</h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
            <p className="text-blue-200 mt-3 max-w-3xl mx-auto text-base md:text-lg">
              Two complementary tracks. Academy turns students and freshers into job‑ready consultants with guided paths, projects, and interview prep. PSO equips working professionals and firms with AI‑powered operations—so your delivery, marketing, and admin run with enterprise‑grade efficiency.
            </p>
          </div>

        </div>

        {/* Exact two-card flex layout as original top section (full-width like the hero) */}
        <div className="relative z-10 flex-grow flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 pb-16">
            {/* Academy Card */}
            <div 
              className={`gateway-card group ${hoverState === 'academy' ? 'scale-105' : hoverState === 'services' ? 'scale-95 opacity-80' : ''}`}
              onMouseEnter={() => setHoverState('academy')}
              onMouseLeave={() => setHoverState(null)}
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0F1E2E] p-0.5">
                {/* Solid brand background replacing previous blue gradient */}
                <div className="absolute inset-0 bg-[#0F1E2E]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC13cGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>

                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-[#112537]/70 backdrop-blur-sm rounded-2xl">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-3xl">🎓</span>
                      </div>
                      <h2 className="ml-4 text-2xl sm:text-2xl font-bold text-white">Ottobon Academy</h2>
                    </div>
                    <p className="text-blue-100 mb-6">Transform students and freshers into independent consultants with job-ready skills in high-demand technologies.</p>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-blue-50">AI-Powered Skill Growth</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-blue-50"> Land Your Dream Job </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-blue-50"> Thrive With Expert Guidance </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (pressing) return;
                        setPressing('academy');
                        setTimeout(() => {
                          navigate('/academy');
                          window.scrollTo(0, 0);
                        }, 160);
                      }}
                      aria-pressed={pressing === 'academy'}
                      className={`bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg w-full relative overflow-hidden cursor-pointer filter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 
                        group-hover:scale-105 group-hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.65)] hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] 
                        ${pressing === 'academy' ? 'scale-110 drop-shadow-[0_12px_28px_rgba(212,175,55,0.75)]' : ''}`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started
                        <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Services Card */}
            <div 
              className={`gateway-card group ${hoverState === 'services' ? 'scale-105' : hoverState === 'academy' ? 'scale-95 opacity-80' : ''}`}
              onMouseEnter={() => setHoverState('services')}
              onMouseLeave={() => setHoverState(null)}
            >
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0F1E2E] p-0.5">
                {/* Solid brand background replacing previous purple/pink gradient */}
                <div className="absolute inset-0 bg-[#0F1E2E]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC13cGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>

                <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-[#112537]/70 backdrop-blur-sm rounded-2xl">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-3xl">🤖</span>
                      </div>
                      <h2 className="ml-4 text-2xl sm:text-2xl font-bold text-white">Ottobon Services</h2>
                    </div>
                    <p className="text-purple-100 mb-6">Empowering working professionals to transition into consultant providers with advanced tech learning and professional services.</p>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-pink-300 mr-2">⚡</span>
                        <span className="text-purple-50">Independent Consultants</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-pink-300 mr-2">⚡</span>
                        <span className="text-purple-50">Small Consulting Firms</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-pink-300 mr-2">⚡</span>
                        <span className="text-purple-50">Mid-Size Practices</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        if (pressing) return;
                        setPressing('services');
                        setTimeout(() => {
                          navigate('/services');
                          window.scrollTo(0, 0);
                        }, 160);
                      }}
                      aria-pressed={pressing === 'services'}
                      className={`bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg w-full relative overflow-hidden cursor-pointer filter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 
                        group-hover:scale-105 group-hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.65)] hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] 
                        ${pressing === 'services' ? 'scale-110 drop-shadow-[0_12px_28px_rgba(212,175,55,0.75)]' : ''}`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started
                        <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      {/* Why Choose Us / Differentiators */}
  <section id="why" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">Why Choose Ottobon</h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto place-items-center">
            {[
              {
                icon: '🤝',
                title: 'Human + AI',
                subtitle:
                  'Mentors calibrate judgment and standards. AI accelerates research, drafting, and structure—so quality rises as speed increases.',
                bullets: [
                  'AI‑assisted analysis, docs, and proposals using our templates',
                  'Mentor reviews with rework loops until client‑ready quality',
                  'Standards repository and checklists for consistent delivery',
                ],
              },
              {
                icon: '🧭',
                title: 'Guided Paths',
                subtitle:
                  'Talent Compass maps you into the right stream—Upskilling, Job Assistance, or Career Assistance—with clear milestones and weekly cadence.',
                bullets: [
                  'Upskilling: hands‑on AI tracks across design, marketing, automation agents, and data operations.',
                  'Job Assistance: resume polish, tailored role matching, and interview practice tuned to real hiring loops.',
                  'Career Assistance: expert mentorship to shape your path and deepen skills within your chosen domain.',
                ],
              },
              {
                icon: '🚀',
                title: 'Job Outcomes',
                subtitle:
                  'Everything points to real hiring funnels—evidence of skill, confidence in interviews, and a clean story on paper.',
                bullets: [
                  '2–3 story‑driven portfolio projects with demos and trade‑offs',
                  'ATS‑optimized resume, role targeting, and mock interviews',
                  'Alumni/community guidance and practical referrals when relevant',
                ],
              },
              {
                icon: '🔁',
                title: 'Flexible Model',
                subtitle:
                  'Automate with AI where possible. Augment with experts when needed. Scale up or down with project demand.',
                bullets: [
                  'PSO pre‑sales automation and proposal library',
                  'Delivery templates, QA gates, and client comms cadence',
                  'Admin/billing workflows and engagement analytics',
                ],
              },
            ].map((f, idx) => (
              <div key={idx} className="w-full max-w-xl bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-6 transition transform hover:-translate-y-1 hover:bg-[#112537]/80 sm:h-[340px] md:h-[360px] lg:h-[380px]">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-3">{f.subtitle}</p>
                <ul className="text-blue-100/90 text-sm space-y-1 list-disc pl-5">
                  {f.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Leadership */}
  <section id="team" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">Our Team</h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { initials: 'OF', role: 'Founder', blurb: 'Defines mission, quality bar, and product strategy. Champions Human + AI collaboration across all offerings.' },
              { initials: 'HA', role: 'Head of Academy', blurb: 'Owns curriculum, mentor framework, and outcomes—projects, assessments, and job preparation.' },
              { initials: 'PS', role: 'Head of Services', blurb: 'Leads PSO delivery. Designs AI‑assisted operations for pre‑sales, marketing, delivery, and billing.' },
            ].map((m, idx) => (
              <div key={idx} className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-6 transition transform hover:-translate-y-1 hover:bg-[#112537]/80">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-white text-xl font-semibold mb-4">
                  {m.initials}
                </div>
                <div className="text-white font-medium">{m.role}</div>
                <p className="text-blue-100 text-sm mt-2">{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
  <section id="faq" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">FAQ</h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              { q: 'What does Ottobon Academy include?', a: 'Guided learning paths, mentor sessions, portfolio projects, assessments, resume craft, role matching, and interview prep—optimized with AI to cut learning time.' },
              { q: 'Who is the Professional Services Organization (PSO) for?', a: 'Independent consultants, small firms, and mid-size practices that want AI-powered pre‑sales, marketing, delivery support, and admin/billing automation.' },
              { q: 'Do you help with job placement?', a: 'We support your full job journey: ATS-ready resume, role targeting, mock interviews with feedback, and post-placement check-ins.' },
              { q: 'How much time should I budget for Academy?', a: 'Expect structured weekly cadence with project work. Many learners complete core paths in 12–16 weeks, depending on prior experience.' },
              { q: 'Can I join while working full-time?', a: 'Yes. We design schedules for working professionals with asynchronous modules plus mentor checkpoints.' },
              { q: 'How does Human + AI collaboration work?', a: 'AI handles speed, drafting, and analysis; mentors calibrate judgment, standards, and nuance. You learn the professional way to combine both.' },
              { q: 'How do I get started?', a: 'Pick Academy to launch/accelerate your career, or PSO to streamline your consulting operations. We’ll guide you from there.' },
            ].map((item, idx) => (
              <details key={idx} className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-5 mb-3">
                <summary className="cursor-pointer text-white font-medium select-none text-base md:text-lg">{item.q}</summary>
                <p className="text-blue-100 mt-2 text-sm md:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Get in Touch */}
  <section id="contact" className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28">
        <div className="container mx-auto px-4">
          <div className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-8 sm:p-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">Get in Touch</h2>
              <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
              <p className="text-blue-200 mt-3 text-base md:text-lg">Tell us about your goals—learning or services—and we’ll point you in the right direction. Prefer email? <a className="underline hover:no-underline" href="mailto:hello@ottobon.com">hello@ottobon.com</a></p>
            </div>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => { navigate('/academy'); window.scrollTo(0, 0); }}
                className="bg-white/10 text-white font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:bg-[#FFC107] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 w-full"
              >
                Explore Academy
              </button>
              <a
                href="/services"
                className="bg-white/10 text-white font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:bg-[#FFC107] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 w-full text-center"
              >
                View Services
              </a>
              <a
                href="#contact"
                className="bg-white/10 text-white font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:bg-[#FFC107] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 w-full text-center"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-2">
          {/* First row: links */}
          <div className="flex space-x-6 order-1">
            <a href="#" className="text-white/60 hover:text-white transition">Privacy</a>
            <a href="#" className="text-white/60 hover:text-white transition">Terms</a>
            <a href="#" className="text-white/60 hover:text-white transition">Contact</a>
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