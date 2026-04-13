import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Megaphone, 
  Wrench, 
  CheckCircle2, 
  ChevronRight, 
  TrendingDown, 
  UserX, 
  MonitorOff, 
  Clock, 
  AlertCircle,
  FileSearch,
  Settings,
  Rocket,
  UserPlus,
  TrendingUp,
  Building2,
  Building,
  Lock,
  Cloud,
  GraduationCap,
  Monitor,
  Laptop,
  Star,
  MessageSquareQuote,
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
  Briefcase,
  Mail,
  User,
  MessageCircle,
  X,
  Send
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** 
 * UTILS 
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * CONTENT DATA (TIER 3)
 */
const content = {
  "navbar": {
    "logo": "ottobon",
    "links": [
      { "label": "Services", "href": "#services" },
      { "label": "Workflow", "href": "#workflow" },
      { "label": "Results", "href": "#results" },
      { "label": "FAQ", "href": "#faq" }
    ],
    "cta": "Book Your Call"
  },
  "hero": {
    "badge": "Q2 Optimization: 200 Slots Open",
    "headlineStart": "Scale up Your ",
    "headlineAccent": "Pipeline",
    "subHeadline": "The complete engine for Marketing and Growth. We find your customers and help you build a predictable flow of new business.",
    "ctas": [
      { "label": "Get Marketing", "variant": "blue", "href": "#contact" }
    ],
    "secondaryCtaText": "Ready to expand your reach?",
    "secondaryCta": { "label": "Book Free Review", "href": "#contact" },
    "trustedBy": "Trusted by 40+ brands • Average 3.2× customer growth",
    "logos": ["FORGE", "NEXUS", "STRATOS", "QUANTUM", "ASCENT"]
  },
  "twoServices": {
    "title": "Marketing Excellence.",
    "titleAccent": "Team or AI.",
    "description": "Choose the marketing approach that fits your growth stage.",
    "services": [
      {
        "id": "team",
        "title": "Marketing Team",
        "description": "A dedicated team of growth experts managing your outreach, content, and brand strategy from end to end.",
        "weProvide": ["Growth Leads", "Content Experts", "Strategy Leads"],
        "includes": ["Human Outreach", "Thought Leadership", "Brand Management"],
        "benefitTitle": "Best For",
        "benefit": "High-Touch Brands",
        "variant": "blue"
      },
      {
        "id": "ai",
        "title": "AI Marketing",
        "description": "Scale your lead generation with our proprietary AI engine for automated outreach and data-driven optimization.",
        "weProvide": ["AI Models", "Automation Flow", "Data Analysis"],
        "includes": ["AI Outreach", "Predictive Analysis", "Automated Lead Gen"],
        "benefitTitle": "Best For",
        "benefit": "Maximum Efficiency",
        "variant": "primary"
      }
    ],
    "footerNote": "100% flexible to your current stage."
  },
  "problem": {
    "title": "Solving Growth Blockers",
    "description": "We eliminate the hurdles keeping you from reaching your full potential.",
    "items": [
      { "title": "Growth Rollercoaster", "description": "Stop worrying about where the next customer is coming from. We maintain a predictable flow of opportunities." },
      { "title": "Time Burnout", "description": "Free up your team from searching for leads so they can focus on delivering great products and services." },
      { "title": "Low Visibility", "description": "Not reaching enough people? Our marketing options put your brand in front of the right audience." }
    ]
  },
  "workflow": {
    "title": "Simple Success Process",
    "description": "A streamlined onboarding designed for speed and results.",
    "steps": [
      { "title": "Growth Review", "description": "We identify gaps in your current marketing and finding customers." },
      { "title": "Custom Roadmap", "description": "Strategy tailored to your specific market and audience." },
      { "title": "Engine Launch", "description": "Deployment of your chosen Marketing Team or AI Engine." },
      { "title": "Weekly Results", "description": "Direct reports and introduction to new interested customers." }
    ]
  },
  "results": {
    "title": "Proven Impact",
    "description": "Results from firms that automated their growth.",
    "caseStudies": [
      {
        "company": "TechForge",
        "niche": "Marketing Team",
        "before": "2 deals / mo",
        "after": "14 deals / mo",
        "growth": "7x Growth",
        "description": "Implemented expert LinkedIn strategy and content flow for consistent customer acquisition."
      },
      {
        "company": "AutoLeads",
        "niche": "AI Marketing",
        "before": "5 leads / mo",
        "after": "28 leads / mo",
        "growth": "5.6x Leads",
        "description": "Used AI-driven outreach to scale pipeline without increasing headcount."
      },
      {
        "company": "Nexus Solutions",
        "niche": "Hybrid",
        "before": "$45k revenue",
        "after": "$125k revenue",
        "growth": "2.8x Value",
        "description": "Combined demand generation with brand authority to scale rapidly."
      }
    ]
  },
  "targetAudience": {
    "title": "Who We Serve",
    "description": "Specialized for growing firms and modern businesses.",
    "items": [
      { "name": "Services" },
      { "name": "E-commerce" },
      { "name": "Consulting" },
      { "name": "Software" },
      { "name": "Agencies" }
    ]
  },
  "testimonials": {
    "title": "Partner Feedback",
    "description": "What business owners say about working with ottobon.",
    "items": [
      {
        "quote": "Transformed our approach to finding customers. We're reaching a much larger audience with less effort.",
        "author": "Sarah Jenkins",
        "role": "Founder",
        "company": "GrowthVantage"
      },
      {
        "quote": "The quality of interested customers is unlike any other agency. They actually understand our market.",
        "author": "David Miller",
        "role": "Director",
        "company": "SecureOps"
      },
      {
        "quote": "The AI marketing engine is a game changer. Our pipeline quadrupled in just two months.",
        "author": "Michael Chen",
        "role": "VP Marketing",
        "company": "Stratosphere"
      }
    ]
  },
  "faq": {
    "title": "FAQ",
    "description": "Brief answers to common questions.",
    "items": [
      { "question": "Team or AI: Which is better?", "answer": "It depends on your brand. The Team approach offers high-touch human expertise, while AI offers maximum scale and efficiency." },
      { "question": "How fast do we see results?", "answer": "Most clients see interested customers within the first 14-21 days of campaign launch." },
      { "question": "Is this suitable for B2C?", "answer": "Yes. Our marketing engine is designed to find customers whether you sell to businesses or direct to consumers." },
      { "question": "Can I switch between options?", "answer": "Yes. You can start with AI and move to a dedicated Team as you grow, or combine both for maximum impact." }
    ]
  },
  "contact": {
    "title": "Stop Leaving Revenue Behind",
    "description": "Book Your Free 30-Min Growth Review. No sales pitch, just a review of your current opportunities.",
    "benefits": [
      "Immediate Review Start",
      "No Commitment Required",
      "Direct Strategy Access"
    ],
    "success": {
      "title": "Request Received",
      "message": "Thank you! A growth expert will get back to you within 24 hours to schedule the review."
    }
  },
  "footer": {
    "description": "Flexible Marketing and Growth services for modern firms.",
    "linksHead": "Explore",
    "contactHead": "Contact",
    "email": "hello@ottobon.com",
    "location": "New York, NY"
  }
};

/**
 * TIER 1 COMPONENTS
 */
const Button = ({ 
  variant = 'primary', 
  fullWidth, 
  className, 
  children, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'outline' | 'blue' | 'ghost'; 
  fullWidth?: boolean 
}) => {
  const baseStyles = "px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg hover:shadow-[#10B981]/20",
    blue: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-600/20",
    outline: "border-2 border-[#0F172A] text-[#0F172A] hover:bg-slate-50",
    ghost: "text-[#0F172A]/80 hover:text-[#0F172A] font-medium"
  };

  return (
    <button className={cn(baseStyles, variants[variant], fullWidth && "w-full", className)} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle, accent, centered = true, className, light = false }: any) => {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      <h2 className={cn("text-4xl md:text-5xl font-bold mb-6 leading-tight", light ? "text-white" : "text-[#0F172A]")}>
        {title} {accent && <span className="text-[#10B981]">{accent}</span>}
      </h2>
      {subtitle && (
        <p className={cn("text-xl max-w-2xl leading-relaxed", centered && "mx-auto", light ? "text-white/80" : "text-[#64748B]")}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * TIER 2 LAYOUTS
 */
const NavbarLayout = ({ data }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3', isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            {data.logo[0].toLowerCase()}
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#0F172A]">{data.logo}</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {data.links.map((link: any, i: number) => (
            <a key={i} href={link.href} className="text-[#0F172A]/80 hover:text-[#0F172A] font-medium transition-colors">{link.label}</a>
          ))}
        </div>
        <a href="#contact"><Button className="py-2.5 px-6">{data.cta}</Button></a>
      </div>
    </nav>
  );
};

const HeroLayout = ({ data }: any) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-[#10B981]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container-wide relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              {data.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] mb-6 leading-[1.1]">
              {data.headlineStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#10B981]">{data.headlineAccent}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#64748B] mb-10 max-w-3xl mx-auto leading-relaxed">{data.subHeadline}</p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                {data.ctas.map((cta: any, i: number) => (
                  <a key={i} href={cta.href} className="w-full sm:w-auto">
                    <Button variant={cta.variant} fullWidth>{cta.label}</Button>
                  </a>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 text-[#64748B] font-medium">
                <span>{data.secondaryCtaText}</span>
                <span className="hidden sm:block text-slate-300">|</span>
                <a href={data.secondaryCta.href} className="text-[#10B981] hover:underline flex items-center gap-1 group">
                  {data.secondaryCta.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-20 pt-10 border-t border-slate-200">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#64748B] mb-8">{data.trustedBy}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
              {data.logos.map((logo: string, i: number) => (
                <div key={i} className="flex items-center gap-2 font-bold text-xl uppercase tracking-tighter">
                  <div className="w-6 h-6 bg-[#0F172A] rounded-sm" /> {logo}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TwoServicesLayout = ({ data }: any) => {
  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={data.title} accent={data.titleAccent} subtitle={data.description} />
        <div className={`grid grid-cols-1 ${data.services.length === 1 ? 'max-w-3xl' : 'lg:grid-cols-2 max-w-6xl'} gap-8 mx-auto`}>
          {data.services.map((service: any, index: number) => (
            <motion.div key={service.id} initial={{ opacity: 0, x: index === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-[40px] border-2 border-slate-100 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                {index === 0 ? <Megaphone className="w-32 h-32 text-blue-600" /> : <Wrench className="w-32 h-32 text-[#10B981]" />}
              </div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.variant === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-[#10B981]/5 text-[#10B981]'}`}>
                {index === 0 ? <Megaphone className="w-8 h-8" /> : <Wrench className="w-8 h-8" />}
              </div>
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">{service.title}</h3>
              <p className="text-lg text-[#64748B] mb-8">{service.description}</p>
              <div className="space-y-6 mb-10">
                <div className="space-y-4">
                  <div className="font-bold text-[#0F172A] uppercase text-sm tracking-widest">We Provide:</div>
                  <div className="flex flex-wrap gap-2">
                    {service.weProvide.map((item: any, i: number) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-sm font-semibold border ${service.variant === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-[#10B981]/5 text-[#10B981] border-[#10B981]/10'}`}>{item}</span>
                    ))}
                  </div>
                </div>
                <ul className="space-y-3">
                  {service.includes.map((item: any, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[#0F172A] font-medium">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${service.variant === 'blue' ? 'text-blue-600' : 'text-[#10B981]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`p-6 rounded-2xl border flex items-center justify-between ${service.variant === 'blue' ? 'bg-blue-50/50 border-blue-100' : 'bg-[#10B981]/5 border-[#10B981]/10'}`}>
                <div>
                  <div className={`font-bold text-sm uppercase tracking-wider mb-1 ${service.variant === 'blue' ? 'text-blue-600' : 'text-[#10B981]'}`}>{service.benefitTitle}</div>
                  <div className="text-[#0F172A] font-bold text-lg">{service.benefit}</div>
                </div>
                <a href="#contact" className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform ${service.variant === 'blue' ? 'bg-blue-600' : 'bg-[#0F172A]'} text-white`}>
                  <ChevronRight className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-full font-bold">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            {data.footerNote}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemLayout = ({ data }: any) => {
  const ICON_MAP: any = { "Growth Rollercoaster": TrendingDown, "Time Burnout": UserX, "Low Visibility": MonitorOff };
  return (
    <section id="problem" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={data.title} subtitle={data.description} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((problem: any, index: number) => {
            const Icon = ICON_MAP[problem.title] || AlertCircle;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="mb-6 inline-flex p-3 bg-red-50 rounded-xl text-red-500"><Icon className="w-8 h-8" /></div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{problem.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WorkflowLayout = ({ data }: any) => {
  const ICON_MAP: any = { "0": FileSearch, "1": Settings, "2": Rocket, "3": UserPlus };
  return (
    <section id="workflow" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight">{data.title}</h2>
          <p className="text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed">{data.description}</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-[60px] left-8 right-8 h-1 bg-[#10B981]/20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {data.steps.map((step: any, index: number) => {
              const Icon = ICON_MAP[index.toString()] || Rocket;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center lg:text-left flex flex-col items-center lg:items-start group">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#10B981] flex items-center justify-center text-xl font-bold text-[#10B981] mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">{index + 1}</div>
                  <div className="mb-4 inline-flex p-3 bg-[#10B981]/5 rounded-xl text-[#10B981]"><Icon className="w-8 h-8" /></div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const ResultsLayout = ({ data }: any) => {
  return (
    <section id="results" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20"><h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">{data.title}</h2><p className="text-xl text-[#64748B]">{data.description}</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.caseStudies.map((study: any, index: number) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="flex items-center gap-3 mb-6"><div className="p-2 bg-[#0F172A]/5 rounded-lg"><Building2 className="w-6 h-6 text-[#0F172A]" /></div><div><h3 className="font-bold text-[#0F172A]">{study.company}</h3><p className="text-sm text-[#64748B]">{study.niche}</p></div></div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white rounded-2xl border border-slate-100"><div className="text-xs text-[#64748B] font-bold">Before</div><div className="text-lg font-bold text-slate-400 line-through">{study.before}</div></div>
                <div className="p-4 bg-[#10B981]/5 rounded-2xl border border-[#10B981] shadow-sm"><div className="text-xs text-[#10B981] font-bold">After</div><div className="text-lg font-bold text-[#10B981]">{study.after}</div></div>
              </div>
              <div className="mb-6 flex items-center gap-2 text-[#10B981] font-bold"><TrendingUp className="w-5 h-5" />{study.growth}</div>
              <p className="text-[#64748B] italic">"{study.description}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQLayout = ({ data }: any) => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16"><HelpCircle className="w-12 h-12 text-[#10B981] mx-auto mb-6 opacity-20" /><SectionHeader title={data.title} subtitle={data.description} /></div>
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[40px] border border-slate-200 p-2 md:p-4">
          {data.items.map((faq: any, index: number) => {
            const [isOpen, setIsOpen] = React.useState(index === 0);
            return (
              <div key={index} className="border-b border-slate-200 last:border-0">
                <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-6 px-4 md:px-6 hover:bg-slate-100 transition-colors text-left">
                  <span className="text-lg font-bold text-[#0F172A] pr-8">{faq.question}</span>
                  <div className={cn("shrink-0 w-8 h-8 rounded-full border-2 border-[#10B981] flex items-center justify-center text-[#10B981] transition-transform", isOpen ? "bg-[#10B981] text-white rotate-180" : "")}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>{isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-8 px-4 md:px-6 text-[#64748B] text-lg leading-relaxed">{faq.answer}</div></motion.div>}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ContactFormLayout = ({ data }: any) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', challenge: '' });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormState('submitting'); setTimeout(() => setFormState('success'), 1500); };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto rounded-[60px] bg-[#0F172A] text-white p-10 md:p-20 relative z-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">{data.title}</h2>
              <p className="text-xl text-white/70 mb-10">{data.description}</p>
              <div className="space-y-8">
                {data.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-center gap-6"><div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#10B981]"><CheckCircle2 className="w-7 h-7" /></div><span className="text-lg font-semibold">{benefit}</span></div>
                ))}
              </div>
            </div>
            <div className="relative">
              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 text-center text-[#0F172A] h-full flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-[#10B981]/10 text-[#10B981] rounded-full flex items-center justify-center mb-8"><CheckCircle2 className="w-12 h-12" /></div>
                    <h3 className="text-3xl font-bold mb-4">{data.success.title}</h3>
                    <p className="text-[#64748B] text-lg mb-8 italic">{data.success.message}</p>
                    <Button variant="outline" onClick={() => setFormState('idle')}>Send another request</Button>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 text-[#0F172A]">
                    <div className="space-y-6">
                      <div className="space-y-2"><label className="text-sm font-bold uppercase text-slate-400">Full Name</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" /><input required className="w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-sm font-bold uppercase text-slate-400">Company</label><input required className="w-full px-4 py-4 bg-slate-50 border rounded-xl" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} /></div>
                        <div className="space-y-2"><label className="text-sm font-bold uppercase text-slate-400">Email</label><input required type="email" className="w-full px-4 py-4 bg-slate-50 border rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                      </div>
                      <div className="space-y-2"><label className="text-sm font-bold uppercase text-slate-400">BD Challenge?</label><textarea rows={4} className="w-full px-4 py-4 bg-slate-50 border rounded-xl resize-none" value={formData.challenge} onChange={e => setFormData({...formData, challenge: e.target.value})} /></div>
                      <Button type="submit" fullWidth disabled={formState === 'submitting'}>{formState === 'submitting' ? "Processing..." : "Book Free Audit"}</Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FooterLayout = ({ data }: any) => {
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6"><div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white font-bold">{data.logo[0].toLowerCase()}</div><span className="text-xl font-bold">{data.logo}</span></div>
            <p className="text-white/60 max-w-sm">{data.description}</p>
          </div>
          <div><h4 className="font-bold mb-6">{data.linksHead}</h4><ul className="space-y-4 text-white/60">{data.links.map((link: any, i: number) => (<li key={i}><a href={link.href} className="hover:text-[#10B981]">{link.label}</a></li>))}</ul></div>
          <div><h4 className="font-bold mb-6">{data.contactHead}</h4><ul className="space-y-4 text-white/60"><li>{data.email}</li><li>{data.location}</li></ul></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40"><p>&copy; {new Date().getFullYear()} {data.logo}. All rights reserved.</p></div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="mb-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-[#0F172A]">
            <div className="bg-[#0F172A] p-6 text-white text-center"><h4 className="font-bold">Chat with ottobon</h4></div>
            <div className="p-6 h-64 flex flex-col justify-end bg-slate-50"><div className="bg-white p-4 rounded-2xl mb-4 text-sm">Hello! 👋 How can we help?</div></div>
            <div className="p-4 bg-white border-t flex gap-2"><input type="text" placeholder="Type..." className="flex-1 px-4 py-2 bg-slate-50 border rounded-xl" /><button className="w-10 h-10 bg-[#10B981] text-white rounded-xl flex items-center justify-center"><Send className="w-5 h-5" /></button></div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#0F172A] text-white rounded-full flex items-center justify-center shadow-2xl">{isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}</button>
    </div>
  );
};

/**
 * MAIN LANDING PAGE COMPONENT
 */
export default function Marketing() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#10B981]/30">
      <NavbarLayout data={content.navbar} />
      <main>
        <HeroLayout data={content.hero} />
        <TwoServicesLayout data={content.twoServices} />
        <ProblemLayout data={content.problem} />
        <WorkflowLayout data={content.workflow} />
        <ResultsLayout data={content.results} />
        <FAQLayout data={content.faq} />
        <ContactFormLayout data={content.contact} />
      </main>
      <FooterLayout data={{...content.footer, logo: content.navbar.logo, links: content.navbar.links}} />
      <ChatWidget />
    </div>
  );
}
