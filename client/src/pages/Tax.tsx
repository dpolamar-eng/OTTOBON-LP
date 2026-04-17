import { useState, useEffect, useCallback } from 'react'
import {
  FileText, Calculator, ClipboardList, Receipt, Search,
  TrendingUp, Shield, Globe, Award, ChevronDown, ArrowRight,
  CheckCircle, Star, Phone, Mail, MapPin, Lock, Zap,
  Users, Clock, BadgeCheck, X, Menu,
  BarChart3, Percent, AlertCircle, DollarSign, Building2
} from 'lucide-react'

const content = {
  brand: { name: 'Otto', suffix: 'Tax', badge: 'CA' },
  nav: {
    links: [
      { label: 'Services', id: 'services' },
      { label: 'Why Us', id: 'why-us' },
      { label: 'Process', id: 'process' },
      { label: 'Estimator', id: 'estimator' },
      { label: 'FAQ', id: 'faq' }
    ],
    cta: 'Get Started'
  },
  hero: {
    pill: 'Qualified Chartered Accountants · 25+ Years Experience',
    title: 'Expert Tax Guidance',
    subtitle: 'Only by',
    highlight: 'Qualified CAs.',
    description: 'ITR, GST, TDS and Tax Audit services by senior Chartered Accountants. Expert advice, legal savings, and complete peace of mind.',
    ctaPrimary: 'Request a Service',
    ctaSecondary: 'Talk to a CA',
    trustBar: [
      { icon: 'Shield', label: 'ICAI Member' },
      { icon: 'Clock', label: '25+ Years Practice' },
      { icon: 'Users', label: '5k+ Client Base' },
      { icon: 'Lock', label: 'SSL Secure' },
      { icon: 'Zap', label: 'Fast Response' }
    ]
  },
  statsBand: [
    { prefix: '₹', value: '12', suffix: ' Cr+', label: 'Refunds Processed' },
    { prefix: '', value: '5000', suffix: '+', label: 'Happy Clients' },
    { prefix: '', value: '98', suffix: '%', label: 'On-Time Filing Rate' },
    { prefix: '', value: '0', suffix: ' Penalties', label: 'Due to CA Errors' }
  ],
  services: {
    label: 'What We Do',
    title: 'Services we',
    titleGradient: 'Provide',
    description: 'Choose the group that fits you. We will guide you through documentation and filing end-to-end.',
    groups: [
      { title: 'For Professionals', audience: 'Salaried employees, freelancers, consultants, investors', items: ['ITR Filing', 'Tax Planning', 'Capital Gains Tax', 'Advance Tax'] },
      { title: 'For Businesses & Organisations', audience: 'Startups, companies, firms, HUFs', items: ['GST Compliance', 'TDS / TCS Returns', 'Tax Audit (44AB)', 'Corporate Tax Filing'] },
      { title: 'For NRIs & International Clients', audience: 'Non-Resident Indians and cross-border matters', items: ['NRI Tax Filing', 'Form 15CA / 15CB', 'Capital Gains for NRIs', 'CA Certifications'] }
    ],
    note: 'Each service includes expert support, documentation, and filing assistance.'
  },
  whyUs: {
    label: 'Why VistaTax CA',
    title: 'Not just filing.',
    titleAccent: 'Expert guidance',
    subtitle: 'by qualified CAs.',
    description: "With 25+ years of practice, we've helped 5,000+ individuals, freelancers, and businesses navigate India's dynamic tax landscape — from ITR & GST to complex NRI taxation and appeals.",
    pills: [{ icon: 'BadgeCheck', label: 'ICAI Member' }, { icon: 'Award', label: 'Certificate of Practice' }],
    stats: [{ value: '5000', suffix: '+', label: 'Clients Served' }, { value: '25', suffix: '+', label: 'Years Practice' }, { value: '98', suffix: '%', label: 'On-Time Filing' }],
    benefits: [
      { icon: 'BadgeCheck', title: 'ICAI Certified Only', desc: 'Every interaction handled by a qualified CA with COP. No assistants, no compromise on data integrity.' },
      { icon: 'Lock', title: 'Bank-Grade Privacy', desc: 'Your documents are encrypted and stored on compliant infrastructure. We share nothing without consent.' },
      { icon: 'Zap', title: '24-Hour Turnaround', desc: 'Most services acknowledged within 24 hours. ITR filed within 48–72 hours of document submission.' },
      { icon: 'TrendingUp', title: 'Maximum Legal Savings', desc: 'We proactively identify every deduction, exemption, and treaty benefit applicable to your situation.' },
      { icon: 'Phone', title: 'Direct CA Access', desc: 'WhatsApp + email + video calls with your assigned CA. No call centres. No chatbots.' },
      { icon: 'Shield', title: 'Penalty-Free Guarantee', desc: 'We take responsibility for timely, accurate filing. Zero penalties due to CA errors — or we cover it.' }
    ]
  },
  process: {
    label: 'How It Works',
    title: 'From Documents to Done,',
    titleGradient: 'in 4 Simple Steps',
    description: 'A clear, transparent process — no surprises, no jargon, no waiting.',
    steps: [
      { n: '01', title: 'Share Your Documents', desc: 'Upload your Form 16, bank statements, GST credentials, or any relevant documents through our secure encrypted portal. WhatsApp also works.', icon: 'FileText' },
      { n: '02', title: 'CA Reviews & Advises', desc: 'Your assigned CA personally reviews every document, identifies maximum eligible deductions, and clarifies any queries within 24 hours.', icon: 'Search' },
      { n: '03', title: 'We File & Verify', desc: 'Your CA prepares, reviews, and e-files your return or GST filing with digital signature. You receive a copy of everything filed.', icon: 'CheckCircle' },
      { n: '04', title: 'Track & Stay Updated', desc: "Receive real-time status updates, acknowledgement copies, and annual reminders so you're never late for a compliance deadline.", icon: 'BarChart3' }
    ]
  },
  testimonials: {
    label: 'Client Stories',
    title: 'Trusted by 5,000+ Taxpayers',
    titleGradient: 'Across India',
    items: [
      { name: 'Rohan Mehta', role: 'Software Engineer, Pune', rating: 5, quote: "Filed my ITR with ESOPs and RSUs for the first time — it felt complicated but VistaTax CA handled every detail. Got a ₹42,000 refund I didn't know I was owed." },
      { name: 'Priya Iyer', role: 'Freelance Designer, Bangalore', rating: 5, quote: 'GST compliance was a nightmare until I found them. Monthly GSTR-3B filed on time, ITC reconciled perfectly. I can focus on my work now.' },
      { name: 'Arun Sharma', role: 'Business Owner, Delhi', rating: 5, quote: 'Received a scrutiny notice and was panicking. The CA responded within hours, drafted a full reply, and the matter was dropped in 3 weeks. Incredible service.' }
    ]
  },
  estimator: {
    label: 'Instant Estimate',
    title: 'How Much Could You',
    titleGradient: 'Save This Year?',
    description: 'Get a quick estimate of your potential tax savings with proper CA-guided planning. Free, instant, no sign-up needed.',
    labels: { income: 'Annual Income / Turnover', gstSwitch: 'I have GST-registered business', cta: 'Calculate My Savings', disclaimer: '*Indicative estimate. Actual savings depend on your specific situation and documentation.', resultCta: 'Claim These Savings' }
  },
  faq: {
    label: 'Common Questions',
    title: 'Everything You Need',
    titleAccent: 'to Know',
    items: [
      { q: 'How long does it take to file my ITR?', a: 'For standard salaried returns (ITR-1/ITR-2), filing typically takes 48–72 hours from the time we receive your documents.' },
      { q: 'Is my financial data safe with you?', a: 'Absolutely. All document transfers are encrypted end-to-end and handled by qualified CAs.' }
    ]
  },
  contact: {
    label: 'Get In Touch',
    title: 'Start Your',
    titleGradient: 'Tax Journey',
    titleSuffix: 'Today.',
    description: 'Request any service and a qualified CA will reach out within 24 hours. First consultation is completely free.',
    items: [
      { icon: 'Phone', label: 'Phone / WhatsApp', value: '+91 98765 43210' },
      { icon: 'Mail', label: 'Email', value: 'hello@vistataxca.in' },
      { icon: 'MapPin', label: 'Office', value: 'Mumbai, Maharashtra (Pan-India services)' }
    ],
    form: {
      title: 'Request a Free Consultation',
      placeholders: { name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@email.com' },
      cta: 'Request Free Consultation',
      successTitle: 'Request Received!',
      successMsg: 'A qualified CA from our team will contact you within 24 hours.'
    }
  },
  footer: {
    description: 'Qualified Chartered Accountants providing expert tax compliance and advisory services across India since 2000.',
    disclaimer: 'Information on this website is for general awareness only and does not constitute personalized tax advice.',
    links: { services: ['ITR Filing', 'GST Compliance', 'TDS Returns', 'Tax Audit', 'Tax Planning', 'Notices & Appeals'] }
  },
  ctaBanner: { title: 'File Smarter. Save More. Sleep Better.', description: 'Join 5,000+ clients who trust qualified CAs for their tax compliance. First consultation is free — no obligations.', ctaPrimary: 'Get Started Today' }
}

const Icons: Record<string, any> = {
  FileText, Calculator, ClipboardList, Receipt, Search, TrendingUp, Shield, Globe, Award,
  ChevronDown, ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, Lock, Zap, Users, Clock,
  BadgeCheck, X, Menu, BarChart3, Percent, AlertCircle, DollarSign, Building2
}


const CSS_STYLES = `
/* ==========================================
   VISTATAX CA — COMPLETE DESIGN SYSTEM
   Sophisticated Warm Glow Gradient: Charcoal + Mocha + Gold
   ========================================== */

/* ─── CSS Variables / Design Tokens ─── */
:root {
  /* ── Core backgrounds (Deep Plum & Champagne) ── */
  --navy:        #2C2233;   /* Deep plum charcoal — dark backgrounds */
  --navy-glow:   #3F2F45;   /* Lighter plum — hero depth */
  --navy-light:  #4A3B51;   /* Hover variant */
  --navy-mid:    #F6F2EB;   /* Warm champagne cream for light sections */

  /* ── Primary accent: Vibrant Plum Rose ── */
  --teal:        #B33D6B;   /* More vibrant Plum Rose */
  --teal-dark:   #8E2F54;   /* Deeper Plum */
  --teal-soft:   rgba(179, 61, 107, 0.12);

  /* ── Secondary accent: Champagne Gold ── */
  --gold:        #E8D4B8;   /* Original Champagne Gold */
  --gold-soft:   rgba(232, 212, 184, 0.15);
  --gold-light:  #F6F2EB;   /* Champagne cream section base */
  --rose-gold:   #EAD1C8;   /* Soft rose gold for card backgrounds */

  /* ── Typography ── */
  --text-dark:   #1A141F;   /* Darker plum for better contrast */
  --text-mid:    #2C2233;   /* Deep plum for body text */
  --text-muted:  #4A3B51;   /* Darker muted plum */
  --text-light:  #F6F2EB;   
  --text-white:  #FFFFFF;   /* Pure white for badges and highlights */
  --white:       #FFFFFF;   /* True white for cards and light surfaces */

  /* ── Glass ── */
  --glass-bg:    rgba(246, 242, 235, 0.04);
  --glass-border: rgba(156, 74, 110, 0.15); /* Plum tinted border */
  --glass-hover: rgba(246, 242, 235, 0.08);

  /* ── Shadows (Plum tinted) ── */
  --shadow-sm:   0 2px 8px rgba(44, 34, 51, 0.1);
  --shadow-md:   0 8px 32px rgba(44, 34, 51, 0.15);
  --shadow-lg:   0 24px 64px rgba(44, 34, 51, 0.2);
  --shadow-xl:   0 40px 100px rgba(44, 34, 51, 0.25);
  --shadow-teal: 0 10px 25px rgba(156, 74, 110, 0.25);

  --radius-sm:   12px;
  --radius-md:   24px;
  --radius-lg:   40px;
  --radius-xl:   64px;
  --radius-full: 9999px;

  --font-serif:  'Playfair Display', Georgia, serif;
  --font-sans:   'Inter', -apple-system, sans-serif;

  --transition-fast:   0.15s ease;
  --transition-base:   0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ─── Reset & Base ─── */
.tax-page *, .tax-page *::before, .tax-page *::after { box-sizing: border-box; margin: 0; padding: 0; }

.tax-page {
  font-family: var(--font-sans);
  background: var(--navy);
  color: var(--white);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.tax-page ::selection { background: var(--gold); color: var(--navy); }

/* ─── Typography ─── */
.tax-page h1, .tax-page h2, .tax-page h3, .tax-page h4 {
  font-family: var(--font-serif);
  line-height: 1.1;
  color: var(--text-dark);
}

.tax-page .hero h1, .tax-page .cta-banner h2 {
  color: var(--text-light) !important;
}

.tax-page section:not(.hero):not(.stats-band):not(.cta-banner):not(footer) h2 {
  color: var(--text-dark);
}

.tax-page h1 { font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 800; letter-spacing: -0.02em; }
.tax-page h2 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; letter-spacing: -0.02em; }
.tax-page h3 { font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 700; }

.tax-page p { line-height: 1.7; color: var(--text-muted); }

.tax-page .gradient-text {
  background: linear-gradient(135deg, #8E2F54 0%, #B33D6B 50%, #D4A017 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200%;
  animation: shimmer 4s linear infinite;
  display: inline-block;
}

.tax-page a { text-decoration: none; color: inherit; }

/* ─── Layout Utilities ─── */
.tax-page .container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.tax-page .section { padding: clamp(4rem, 8vw, 6.5rem) 0; }

.tax-page .grid-2  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
.tax-page .grid-3  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.tax-page .grid-4  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.tax-page .flex    { display: flex; }
.tax-page .flex-c  { display: flex; align-items: center; }
.tax-page .flex-cc { display: flex; align-items: center; justify-content: center; }
.tax-page .flex-b  { display: flex; align-items: center; justify-content: space-between; }

/* ─── Pill / Badge ─── */
.tax-page .pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tax-page .pill--teal {
  background: var(--teal-soft);
  color: var(--teal);
  border: 1px solid var(--glass-border);
}

.tax-page .pill--gold {
  background: var(--gold-soft);
  color: var(--gold);
  border: 1px solid var(--glass-border);
}

.tax-page .pill--navy {
  background: rgba(31, 28, 34, 0.05);
  color: var(--text-dark);
  border: 1px solid var(--glass-border);
}

.tax-page .service-tag {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--teal);
  background: var(--teal-soft);
  border: 1px solid rgba(179, 61, 107, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: inline-flex;
  align-items: center;
  box-shadow: none;
}

/* ─── Paper Texture Overlay ─── */
.tax-page .paper-texture {
  position: relative;
}

.tax-page .paper-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 1;
}

/* ─── Organic Wave Divider ─── */
.tax-page .wave-divider {
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;
}

.tax-page .wave-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 60px;
}

.tax-page .wave-divider--top { top: -1px; transform: rotate(180deg); }
.tax-page .wave-divider--bottom { bottom: -1px; }

/* ─── Buttons ─── */
.tax-page .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  border-radius: var(--radius-full);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: none;
}

.tax-page .btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background var(--transition-fast);
}

.tax-page .btn:hover::before { background: rgba(255,255,255,0.08); }
.tax-page .btn:active { transform: scale(0.97); }

.tax-page .btn--primary {
  background: linear-gradient(90deg, var(--teal), var(--gold));
  color: var(--white);
  box-shadow: 0 4px 20px rgba(156, 74, 110, 0.25);
  border: none;
  font-weight: 700;
  position: relative;
  overflow: hidden;
}

.tax-page .btn--primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -100%;
  width: 50%; height: 200%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transform: rotate(25deg);
  transition: none;
}

.tax-page .btn--primary:hover::after {
  left: 150%;
  transition: left 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

.tax-page .btn--primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(74, 107, 122, 0.35), 0 0 20px rgba(232, 201, 111, 0.2);
}

.tax-page .btn--ghost {
  background: transparent;
  color: var(--teal);
  border: 1.5px solid var(--teal);
  backdrop-filter: blur(12px);
}

.tax-page .btn--ghost:hover {
  background: var(--teal-soft);
  border-color: var(--teal-dark);
  color: var(--teal-dark);
  transform: translateY(-2px);
}

.tax-page .btn--navy {
  background: var(--navy);
  color: var(--white);
  border: 2px solid var(--navy-light);
}

.tax-page .btn--navy:hover {
  background: var(--navy-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tax-page .btn--lg { padding: 1.1rem 2.5rem; font-size: 1rem; }
.tax-page .btn--sm { padding: 0.65rem 1.5rem; font-size: 0.85rem; }

/* ─── Card ─── */
.tax-page .card {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(246, 242, 235, 0.92) 100%);
  border: 1px solid rgba(156, 74, 110, 0.18);
  border-radius: var(--radius-lg);
  padding: clamp(1.4rem, 2.8vw, 2.5rem);
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-base);
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(44, 34, 51, 0.10), 0 2px 10px rgba(44, 34, 51, 0.06);
  isolation: isolate;
}

.tax-page .card:hover {
  border-color: rgba(179, 61, 107, 0.45);
  transform: translateY(-10px);
  box-shadow: 0 26px 56px rgba(44, 34, 51, 0.18), 0 0 0 1px rgba(232, 212, 184, 0.3);
}

.tax-page .card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 120% at 100% 0%, rgba(232, 212, 184, 0.18) 0%, transparent 45%);
  pointer-events: none;
  z-index: 0;
}

.tax-page .card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--teal), var(--gold));
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 0;
}

.tax-page .card:hover::after { opacity: 1; }

.tax-page .card > * {
  position: relative;
  z-index: 1;
}

.tax-page .card--light {
  background: var(--white);
  border-color: rgba(74, 107, 122, 0.08);
  color: var(--text-dark);
}

.tax-page .card--light:hover {
  border-color: var(--gold);
  box-shadow: 0 20px 60px rgba(74, 107, 122, 0.1);
}

/* ─── Divider / Gradient line ─── */
.tax-page .divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0.3;
  margin: 0;
}

/* ─── Section Labels ─── */
.tax-page .section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.tax-page .section-label::before,
.tax-page .section-label::after {
  content: '';
  flex: 1;
  max-width: 3rem;
  height: 1px;
  background: var(--gold);
}

.tax-page .label-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

/* ─── Scroll Reveal ─── */
.tax-page .reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.tax-page .reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.tax-page .reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.tax-page .reveal-left.visible { opacity: 1; transform: translateX(0); }

.tax-page .reveal-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.tax-page .reveal-right.visible { opacity: 1; transform: translateX(0); }

.tax-page .delay-1 { transition-delay: 0.1s; }
.tax-page .delay-2 { transition-delay: 0.2s; }
.tax-page .delay-3 { transition-delay: 0.3s; }
.tax-page .delay-4 { transition-delay: 0.4s; }
.tax-page .delay-5 { transition-delay: 0.5s; }
.tax-page .delay-6 { transition-delay: 0.6s; }

/* ─── Custom Card Effects ─── */
.tax-page .card-luxe {
  background: var(--white);
  border: 1px solid var(--gold-soft);
  box-shadow: 0 4px 15px rgba(31, 28, 34, 0.04);
}

/* ─── Floating Orb Animation ─── */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-18px) rotate(3deg); }
  66%       { transform: translateY(-8px) rotate(-2deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-12px) rotate(5deg); }
}

@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

@keyframes drift {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(20px, -30px) scale(1.05); }
  66%  { transform: translate(-15px, -15px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

@keyframes count-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes draw-line {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}

/* ─── Gradient Text ─── */
.tax-page .gradient-text--burgundy {
  background: linear-gradient(135deg, var(--teal-dark), var(--teal), var(--teal-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200%;
  animation: shimmer 4s linear infinite;
}

/* ─── Glow utilities ─── */
.tax-page .glow-teal { box-shadow: 0 0 30px rgba(92,43,62,0.45); }
.tax-page .glow-gold { box-shadow: 0 0 30px rgba(212,160,23,0.45); }

/* ─── Number / Stat ─── */
.tax-page .stat-number {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--text-dark);
  line-height: 1;
  margin-bottom: 0.2rem;
}

.tax-page .stats-band .stat-number {
  color: var(--text-light);
}

/* ─── Icon Box ─── */
.tax-page .icon-box {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(74, 107, 122, 0.08);
  border: 1px solid rgba(74, 107, 122, 0.2);
  color: var(--teal);
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.tax-page .card-luxe:hover .icon-box,
.tax-page .card:hover .icon-box {
  background: var(--gold-soft);
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 0 20px rgba(232, 212, 184, 0.15);
  border-color: var(--gold);
  color: var(--navy);
}

/* ─── Accordion ─── */
.tax-page .accordion-item {
  border: 1px solid rgba(156, 74, 110, 0.20);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-base);
  margin-bottom: 0.75rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,242,235,0.94) 100%);
  box-shadow: 0 8px 22px rgba(44, 34, 51, 0.07);
}

.tax-page .accordion-item.open {
  border-color: var(--gold);
  box-shadow: 0 14px 30px rgba(44, 34, 51, 0.12);
  transform: translateY(-2px);
}

.tax-page .accordion-header {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-dark);
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-base);
}

.tax-page .accordion-header:hover { background: var(--teal-soft); }

.tax-page .accordion-chevron {
  transition: transform var(--transition-base);
  flex-shrink: 0;
  color: var(--gold);
}

.tax-page .accordion-item.open .accordion-chevron { transform: rotate(180deg); }

.tax-page .accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              padding 0.3s ease;
  background: rgba(156, 74, 110, 0.04);
}

.tax-page .accordion-item.open .accordion-body {
  max-height: 400px;
}

.tax-page .accordion-content {
  padding: 1rem 1.5rem 1.5rem;
  color: var(--text-mid);
  line-height: 1.8;
}

/* ─── Form Inputs ─── */
.tax-page .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tax-page .form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tax-page .form-input,
.tax-page .form-select {
  background: rgba(0,0,0,0.3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--white);
  font-family: var(--font-sans);
  font-size: 1rem;
  padding: 0.9rem 1.1rem;
  transition: all var(--transition-base);
  width: 100%;
  outline: none;
}

.tax-page .form-input::placeholder { color: var(--text-muted); }

.tax-page .form-select option {
  background: #ffffff;
  color: var(--text-dark);
}

.tax-page .form-input:focus,
.tax-page .form-select:focus {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px var(--teal-soft);
  background: var(--white);
  color: var(--text-dark);
}

/* ─── Range Slider ─── */
.tax-page input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--glass-border);
  outline: none;
}

.tax-page input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--teal);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(74, 107, 122, 0.3);
  border: 2px solid var(--white);
  transition: box-shadow var(--transition-base);
}

.tax-page input[type="range"]::-webkit-slider-thumb:hover {
  box-shadow: 0 0 22px rgba(74, 107, 122, 0.5);
}

/* ─── Hero Glow ─── */
.tax-page .hero {
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 8rem 0;
}

.tax-page .hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 30%, rgba(232, 212, 184, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.tax-page .hero > * { position: relative; z-index: 2; }

/* Subtle amber secondary glow */
.tax-page .hero::after {
  content: '';
  position: absolute;
  width: 40%;
  height: 60%;
  top: 10%;
  right: 5%;
  background: radial-gradient(circle, rgba(201, 184, 158, 0.08) 0%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
  z-index: 1;
  animation: aura-pulse 10s ease-in-out infinite;
}

@keyframes aura-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}

/* ─── Anti-Gravity Base ─── */
.tax-page .anti-gravity {
  animation: antiGravity 6s ease-in-out infinite;
}

@keyframes antiGravity {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%      { transform: translateY(-18px) rotate(3deg); }
}

/* ─── Nav ─── */
.tax-page .nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1.25rem 0;
  transition: all var(--transition-base);
}

.tax-page .nav.scrolled {
  background: rgba(44, 34, 51, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.tax-page .nav-logo {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tax-page .nav-logo span { color: var(--gold); }

.tax-page .nav-links { display: flex; gap: 2rem; align-items: center; list-style: none; }

.tax-page .nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(246, 242, 235, 0.92);
  transition: color var(--transition-fast);
  cursor: pointer;
}

.tax-page .nav-link:hover { color: var(--text-white); }

/* ─── Sticky CTA ─── */
.tax-page .sticky-cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 900;
  transform: translateY(100px);
  opacity: 0;
  transition: all var(--transition-spring);
}

.tax-page .sticky-cta.visible {
  transform: translateY(0);
  opacity: 1;
}

/* ─── WhatsApp float ─── */
.tax-page .whatsapp-float {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 900;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,0.5);
  cursor: pointer;
  animation: float-slow 4s ease-in-out infinite;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.tax-page .whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 30px rgba(37,211,102,0.7);
}

/* ─── Testimonial ─── */
.tax-page .testimonial-card {
  background: linear-gradient(145deg, rgba(44, 34, 51, 0.98) 0%, rgba(63, 47, 69, 0.98) 100%);
  border: 1px solid rgba(232, 212, 184, 0.16);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  position: relative;
  transition: transform var(--transition-smooth), box-shadow var(--transition-smooth), border-color var(--transition-base);
  box-shadow: 0 16px 36px rgba(18, 12, 22, 0.32);
}

.tax-page .testimonial-card::before {
  content: '"';
  font-family: var(--font-serif);
  font-size: 6rem;
  color: var(--gold);
  opacity: 0.18;
  position: absolute;
  top: -1rem;
  left: 1.5rem;
  line-height: 1;
  pointer-events: none;
}

.tax-page .testimonial-card:hover {
  border-color: rgba(232, 212, 184, 0.32);
  transform: translateY(-7px);
  box-shadow: 0 24px 48px rgba(18, 12, 22, 0.4), 0 0 0 1px rgba(179, 61, 107, 0.2);
}

/* ─── Star rating ─── */
.tax-page .stars { color: var(--gold); font-size: 0.9rem; letter-spacing: 2px; }

/* ─── Trust Bar ─── */
.tax-page .trust-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.tax-page .trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-light);
  letter-spacing: 0.04em;
}

.tax-page .trust-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--text-muted);
}

/* ─── Timeline ─── */
.tax-page .timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.tax-page .timeline::before {
  content: '';
  position: absolute;
  left: 2.25rem;
  top: 3.5rem;
  bottom: 3.5rem;
  width: 2px;
  background: linear-gradient(to bottom, var(--gold), var(--navy-light));
}

.tax-page .timeline-item {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 0;
  position: relative;
}

.tax-page .timeline-number {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--teal-dark), var(--teal));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  flex-shrink: 0;
  box-shadow: var(--shadow-teal);
  position: relative;
  z-index: 1;
}

.tax-page .timeline-content {
  padding-top: 0.75rem;
}

/* ─── Estimator Result ─── */
.tax-page .estimator-result {
  background: linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%);
  border: 1px solid rgba(232, 212, 184, 0.2);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
  box-shadow: 0 18px 38px rgba(26, 18, 32, 0.28);
  position: relative;
  overflow: hidden;
}

.tax-page .estimator-result p {
  color: rgba(246, 242, 235, 0.85);
}

.tax-page .estimator-result::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 120% at 0% 0%, rgba(232, 212, 184, 0.12) 0%, transparent 45%);
  pointer-events: none;
}

/* ─── Hero specific ─── */
.tax-page .hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 0 5rem;
}

.tax-page .hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.tax-page .orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.tax-page .orb-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(74, 107, 122, 0.08) 0%, transparent 70%);
  top: -100px; right: -100px;
  animation: drift 18s ease-in-out infinite;
}

.tax-page .orb-2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(201, 184, 158, 0.06) 0%, transparent 70%);
  bottom: -150px; left: -100px;
  animation: drift 22s ease-in-out infinite reverse;
}

.tax-page .orb-3 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, rgba(74, 107, 122, 0.05) 0%, transparent 70%);
  top: 40%; left: 40%;
  animation: drift 15s ease-in-out infinite;
}

.tax-page .hero-content { position: relative; z-index: 1; }
.tax-page .hero-content > .hero-main { width: min(100%, 900px); }

/* ─── Background Grain/Noise ─── */
.tax-page .noise-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.035;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* ─── Background Grid ─── */
.tax-page .bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* ─── Progress bar for estimator ─── */
.tax-page .progress-bar {
  width: 100%;
  height: 8px;
  background: var(--glass-border);
  border-radius: 4px;
  overflow: hidden;
}

.tax-page .progress-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--teal), var(--teal-dark));
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(74, 107, 122, 0.30);
}

.tax-page .estimator-range {
  background: rgba(232, 212, 184, 0.35) !important;
}

.tax-page .estimator-range::-webkit-slider-thumb {
  background: var(--gold);
  border: 2px solid rgba(179, 61, 107, 0.75);
  box-shadow: 0 0 14px rgba(232, 212, 184, 0.45);
}

.tax-page .estimator-range::-webkit-slider-thumb:hover {
  box-shadow: 0 0 20px rgba(232, 212, 184, 0.65);
}

.tax-page .estimator-range::-moz-range-thumb {
  background: var(--gold);
  border: 2px solid rgba(179, 61, 107, 0.75);
  box-shadow: 0 0 14px rgba(232, 212, 184, 0.45);
}

.tax-page .estimator-range::-moz-range-track {
  background: rgba(232, 212, 184, 0.35);
}

/* ─── Text alignment ─── */
.tax-page .text-center { text-align: center; }
.tax-page .text-right  { text-align: right; }

/* ─── Gap utilities ─── */
.tax-page .gap-sm  { gap: 0.75rem; }
.tax-page .gap-md  { gap: 1.5rem; }
.tax-page .gap-lg  { gap: 2.5rem; }

/* ─── Margin ─── */
.tax-page .mb-xs  { margin-bottom: 0.5rem; }
.tax-page .mb-sm  { margin-bottom: 1rem; }
.tax-page .mb-md  { margin-bottom: 1.5rem; }
.tax-page .mb-lg  { margin-bottom: clamp(1.5rem, 3vw, 2.5rem); }
.tax-page .mb-xl  { margin-bottom: clamp(2.25rem, 4.5vw, 4rem); }
.tax-page .mt-md  { margin-top: clamp(1rem, 2.2vw, 1.5rem); }
.tax-page .mt-lg  { margin-top: clamp(1.5rem, 3vw, 2.5rem); }

/* ─── Light section skin ─── */
.tax-page .section--light {
  background: var(--rose-gold);
  color: var(--text-dark);
}

/* ─── Wave Divider ─── */
.tax-page .wave-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 10;
}

.tax-page .wave-divider svg {
  position: relative;
  display: block;
  width: calc(100% + 1.2px);
  height: 60px;
}

.tax-page .wave-divider path {
  fill: var(--navy-mid);
}

.tax-page .wave-divider--top {
  top: 0;
  bottom: auto;
  transform: rotate(180deg);
}

.tax-page .wave-divider--bottom {
  bottom: 0;
}

/* Specific overrides for section logic */
.tax-page .hero .wave-divider--bottom path { fill: var(--navy-mid); }
.tax-page .section:nth-of-type(even) .wave-divider path { fill: var(--navy); }
.tax-page .section:nth-of-type(odd) .wave-divider path { fill: var(--navy-mid); }

.tax-page .section--light p { color: var(--text-mid); }
.tax-page .section--light .label-text { color: var(--teal); }
.tax-page .section--light .section-label::before,
.tax-page .section--light .section-label::after { background: var(--gold); }
.tax-page .section--light h2 { color: var(--text-dark); }
.tax-page .section--light h3 { color: var(--text-dark); }

/* ─── Highlight ─── */
.tax-page .highlight {
  position: relative;
  display: inline-block;
}

.tax-page .highlight::after {
  content: '';
  position: absolute;
  left: -4px; right: -4px;
  bottom: 2px;
  height: 40%;
  background: rgba(232, 201, 111, 0.15);
  border-radius: 2px;
  z-index: -1;
}

/* ─── Mobile ─── */
.tax-page .hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
}

.tax-page .hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--white);
  border-radius: 1px;
  transition: all var(--transition-base);
}

.tax-page .mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(31, 28, 34, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.tax-page .mobile-menu.open { display: flex; }

.tax-page .mobile-link {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.tax-page .mobile-link:hover { color: var(--gold); }

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .tax-page .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .tax-page .grid-2, .tax-page .grid-3, .tax-page .grid-4 { grid-template-columns: 1fr; }
  .tax-page .nav-links { display: none; }
  .tax-page .hamburger { display: flex; }
  .tax-page h1 { font-size: 2.4rem; }
  .tax-page h2 { font-size: 1.9rem; }
  .tax-page .section { padding: 4rem 0; }
  .tax-page .trust-bar { gap: 1rem; }
  .tax-page .hero { padding-top: 5rem; }
  .tax-page .timeline::before { display: none; }
  .tax-page .btn--lg { padding: 1rem 1.8rem; font-size: 0.95rem; }
}

@media (max-width: 480px) {
  .tax-page h1 { font-size: 2rem; }
  .tax-page .trust-bar { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
}

/* ─── Layout hardening for responsive stability ─── */
.tax-page .hero-main {
  width: 100%;
}

.tax-page .process-grid {
  width: 100%;
}

.tax-page .process-card {
  min-height: 240px;
}

@media (max-width: 1024px) {
  .tax-page .hero-cta-row {
    flex-wrap: wrap !important;
  }

  .tax-page .process-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.5rem !important;
  }
}

@media (max-width: 900px) {
  .tax-page .process-grid {
    grid-template-columns: 1fr !important;
  }

  .tax-page .process-card {
    gap: 0.9rem !important;
    padding: 1.25rem !important;
  }

  .tax-page .process-step-dot {
    width: 2.2rem !important;
    height: 2.2rem !important;
    font-size: 0.7rem !important;
  }
}

@media (max-width: 768px) {
  .tax-page .container {
    padding: 0 1rem;
  }

  .tax-page .nav-logo {
    font-size: 1.25rem;
  }

  .tax-page .hero {
    min-height: auto;
    padding-top: 5.5rem;
    padding-bottom: 4rem;
  }

  .tax-page .hero-main h1 {
    font-size: clamp(1.45rem, 7.2vw, 2.4rem) !important;
    line-height: 1.2 !important;
  }

  .tax-page .hero-main p {
    max-width: 100% !important;
  }

  .tax-page .hero-cta-row .btn {
    width: 100%;
    min-width: 0 !important;
  }

  .tax-page .trust-bar {
    gap: 0.85rem !important;
  }

  .tax-page .sticky-cta {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }

  .tax-page .process-card {
    padding: 1.1rem !important;
  }

  .tax-page .process-step-content h3 {
    font-size: 1rem !important;
  }

  .tax-page .process-step-content p {
    font-size: 0.92rem !important;
    line-height: 1.6 !important;
  }

  .tax-page .stats-band {
    padding: 3.25rem 0 !important;
  }
}

@media (max-width: 480px) {
  .tax-page .container {
    padding: 0 0.85rem;
  }

  .tax-page .section {
    padding: 3.25rem 0;
  }

  .tax-page .card {
    border-radius: 20px;
  }

  .tax-page .hero-main h1 {
    font-size: clamp(1.3rem, 7vw, 2rem) !important;
  }

  .tax-page .hero-main p {
    font-size: 0.95rem !important;
    line-height: 1.55 !important;
  }
}

`;

function useInjectStyles() {
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = CSS_STYLES;
    document.head.appendChild(styleTag);

    // Load Playfair Display font if not already loaded
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(fontLink);
    }

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.tax-page .reveal, .tax-page .reveal-left, .tax-page .reveal-right')
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function StatCard({ label, value, suffix = '', prefix = '', delay = 0 }: any) {
  return (
    <div className="text-center reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-number">{prefix}{value}{suffix}</div>
      <p style={{ fontSize: '0.88rem', color: 'inherit', opacity: 0.8, marginTop: '0.4rem', fontWeight: 500 }}>{label}</p>
    </div>
  )
}

function WaveDivider({ className = '', fill = 'var(--navy-mid)' }: any) {
  return (
    <div className={`wave-divider ${className}`}>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{ fill }} />
      </svg>
    </div>
  )
}

function Nav({ content: navContent, brand }: any) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container flex-b">
          <div className="nav-logo">{brand.name}<span>{brand.suffix}</span><span style={{ fontSize: '0.6rem', background: 'var(--gold-soft)', color: 'var(--gold)', border: '1px solid var(--gold-soft)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-sans)', fontWeight: 700, letterSpacing: '0.04em' }}>{brand.badge}</span></div>
          <ul className="nav-links">{navContent.links.map((l: any) => <li key={l.id}><span className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</span></li>)}</ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn btn--primary btn--sm" style={{ display: 'flex' }} onClick={() => scrollTo('contact')}>{navContent.cta}</button>
            <div className="hamburger" onClick={() => setMenuOpen(true)}><span /><span /><span /></div>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={28} /></button>
        {navContent.links.map((l: any) => <span key={l.id} className="mobile-link" onClick={() => scrollTo(l.id)}>{l.label}</span>)}
        <button className="btn btn--primary btn--lg" onClick={() => scrollTo('contact')}>{navContent.cta} <ArrowRight size={18} /></button>
      </div>
    </>
  )
}

function Hero({ content: heroContent }: any) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const subtitleParts = heroContent.subtitle.split(' ')
  const subtitleFirstWord = subtitleParts[0] || ''
  const subtitleRest = subtitleParts.slice(1).join(' ')
  return (
    <section className="hero" id="home">
      <div className="hero-bg"><div className="noise-overlay" /><div className="bg-grid" /><div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /></div>
      <div className="container hero-content" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="hero-main" style={{ maxWidth: '840px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="reveal mb-lg"><div className="pill pill--gold" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}><BadgeCheck size={14} />{heroContent.pill}</div></div>
          <h1 className="reveal delay-1 mb-md" style={{ fontSize: 'clamp(1.75rem, 4.8vw, 3.8rem)', lineHeight: 1.12, letterSpacing: '-0.025em', fontWeight: 800 }}>{heroContent.title} {subtitleFirstWord}<br />{subtitleRest}{' '}<span style={{ color: 'var(--gold)', position: 'relative' }}>{heroContent.highlight}<svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M0,10 Q50,0 100,10" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.3" /></svg></span></h1>
          <p className="reveal delay-2 mb-xl" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--text-white)', opacity: 0.9, maxWidth: '680px', lineHeight: 1.7, marginBottom: '2.5rem' }}>{heroContent.description}</p>
          <div className="reveal delay-3 flex gap-md hero-cta-row" style={{ flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center' }}>
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('contact')} style={{ minWidth: '220px', fontSize: '1.1rem' }}>{heroContent.ctaPrimary} <ArrowRight size={20} /></button>
            <button className="btn btn--ghost btn--lg" onClick={() => scrollTo('services')} style={{ fontSize: '1.1rem' }}><Phone size={18} /> {heroContent.ctaSecondary}</button>
          </div>
          <div className="reveal delay-5 mt-lg" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
            <div className="trust-bar" style={{ gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {heroContent.trustBar.map((item: any, i: number) => {
                const Icon = Icons[item.icon]
                return <span key={i} className="flex" style={{ alignItems: 'center', gap: 10, opacity: 0.8 }}><span style={{ color: 'var(--gold)' }}><Icon size={16} /></span><span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.02em' }}>{item.label}</span>{i < heroContent.trustBar.length - 1 && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.3, marginLeft: '1rem' }} />}</span>
              })}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', opacity: 0.5, animation: 'float-slow 2.5s ease-in-out infinite' }}><ChevronDown size={20} color="var(--teal)" /></div>
      <WaveDivider fill="var(--navy-mid)" className="wave-divider--bottom" />
    </section>
  )
}

function StatsBand({ content: stats }: any) {
  return <section className="stats-band" style={{ background: 'var(--navy)', padding: '5rem 0', position: 'relative', borderTop: '1px solid var(--glass-border)' }}><div className="container"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>{stats.map((s: any, i: number) => <div key={i} style={{ color: 'var(--text-light)' }}><StatCard prefix={s.prefix} value={s.value} suffix={s.suffix} label={s.label} delay={i * 150} /></div>)}</div></div></section>
}

function Services({ content: services }: any) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return <section className="section section--light" id="services" style={{ position: 'relative' }}><div className="container"><div className="text-center mb-xl reveal"><div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{services.label}</span></div><h2>{services.title} <span className="gradient-text">{services.titleGradient}</span></h2><p style={{ marginTop: '1rem', maxWidth: '540px', margin: '1rem auto 0' }}>{services.description}</p></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>{services.groups.map((group: any, i: number) => <div key={group.title} className={`card reveal delay-${(i % 6) + 1}`}><h3 style={{ marginBottom: '0.45rem', fontSize: '1.1rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.55rem' }}><span>{group.title}</span></h3><p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{group.audience}</p><ul style={{ listStyle: 'disc', paddingLeft: '1.1rem', color: 'var(--text-dark)', display: 'grid', gap: '0.5rem' }}>{group.items.map((item: string) => <li key={item} style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{item}</li>)}</ul><div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}><button className="btn btn--ghost btn--sm" style={{ width: '100%', justifyContent: 'space-between' }} onClick={() => scrollTo('contact')}>Request This Service <ArrowRight size={14} /></button></div></div>)}</div><p style={{ marginTop: '1.25rem', textAlign: 'center', color: 'var(--text-mid)', fontSize: '0.9rem' }}>{services.note}</p></div><WaveDivider fill="var(--navy-mid)" className="wave-divider--bottom" /></section>
}

function WhyUs({ content: whyUs }: any) {
  return <section className="section section--light paper-texture" id="why-us" style={{ background: 'var(--navy-mid)', color: 'var(--text-dark)', position: 'relative' }}><div className="container"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}><div className="reveal-left" style={{ position: 'relative', zIndex: 2 }}><div className="section-label"><span className="label-text">{whyUs.label}</span></div><h2 style={{ marginBottom: '1.25rem' }}>{whyUs.title}<br /><span style={{ color: 'var(--teal-dark)' }}>{whyUs.titleAccent}</span><br />{whyUs.subtitle}</h2><p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>{whyUs.description}</p><div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>{whyUs.pills.map((p: any, i: number) => { const Icon = Icons[p.icon]; return <div key={i} className="pill" style={{ color: 'var(--teal)', border: '1px solid var(--teal)', background: 'rgba(156, 74, 110, 0.05)', fontSize: '0.7rem' }}><Icon size={12} style={{ color: 'var(--teal)' }} /> {p.label}</div> })}</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', padding: '2rem', background: 'linear-gradient(135deg, rgba(179, 61, 107, 0.14) 0%, rgba(232, 212, 184, 0.28) 100%)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid rgba(179, 61, 107, 0.26)', color: 'var(--text-dark)' }}>{whyUs.stats.map((s: any, i: number) => <StatCard key={i} value={s.value} suffix={s.suffix} label={s.label} delay={i * 200} />)}</div></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>{whyUs.benefits.map((b: any, i: number) => { const Icon = Icons[b.icon]; return <div key={i} className={`reveal delay-${i + 1}`} style={{ background: 'linear-gradient(135deg, rgba(179, 61, 107, 0.14) 0%, rgba(232, 212, 184, 0.28) 100%)', border: '1px solid rgba(179, 61, 107, 0.26)', borderRadius: 'var(--radius-md)', padding: '1.5rem', transition: 'all 0.3s ease', cursor: 'default' }}><div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: 'rgba(179, 61, 107, 0.16)', border: '1px solid rgba(179, 61, 107, 0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--teal-dark)', marginBottom: '0.875rem' }}><Icon size={20} /></div><h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>{b.title}</h3><p style={{ fontSize: '0.83rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>{b.desc}</p></div> })}</div></div></div></section>
}

function Process({ content: process }: any) {
  return <section className="section" id="process" style={{ position: 'relative' }}><WaveDivider fill="var(--navy-mid)" className="wave-divider--top" /><div className="container"><div className="text-center mb-xl reveal"><div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{process.label}</span></div><h2 style={{ color: 'var(--text-light)' }}>{process.title}<br /><span className="gradient-text">{process.titleGradient}</span></h2><p style={{ marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', color: 'var(--gold)' }}>{process.description}</p></div><div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '2rem', maxWidth: '1080px', margin: '0 auto' }}>{process.steps.map((step: any, i: number) => { const Icon = Icons[step.icon]; return <div key={i} className={`card reveal delay-${i + 1} process-card`} style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}><div className="process-step-rail" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}><div className="process-step-dot" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--white)', flexShrink: 0, boxShadow: 'var(--shadow-teal)', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.75rem' }}>{step.n}</div>{i < 3 && <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, var(--gold), transparent)', minHeight: '30px' }} />}</div><div className="process-step-content" style={{ paddingTop: '0.2rem' }}><div className="icon-box" style={{ width: '2.5rem', height: '2.5rem', borderRadius: 8, marginBottom: '0.75rem' }}><Icon size={22} /></div><h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{step.title}</h3><p style={{ fontSize: '0.88rem' }}>{step.desc}</p></div></div> })}</div></div><WaveDivider fill="var(--navy-mid)" className="wave-divider--bottom" /></section>
}

function Testimonials({ content: testimonials }: any) {
  return <section className="section section--light" id="testimonials" style={{ background: '#ffffff' }}><div className="container"><div className="text-center mb-xl reveal"><div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{testimonials.label}</span></div><h2>{testimonials.title}<br /><span className="gradient-text">{testimonials.titleGradient}</span></h2></div><div className="paper-texture" style={{ position: 'relative' }}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', margin: '0 auto 3rem' }}>{testimonials.items.map((t: any, i: number) => <div key={i} className="testimonial-card"><div className="stars mb-sm">{'★'.repeat(t.rating)}</div><p style={{ fontSize: '1.05rem', color: 'var(--text-light)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>"{t.quote}"</p><div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--white)', fontSize: '1rem' }}>{t.name[0]}</div><div><div style={{ fontWeight: 600, color: 'var(--text-light)', fontSize: '0.95rem' }}>{t.name}</div><div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>{t.role}</div></div></div></div>)}</div></div></div></section>
}

function Estimator({ content: estimator }: any) {
  const [income, setIncome] = useState(1000000)
  const [category, setCategory] = useState('salaried')
  const [hasGst, setHasGst] = useState(false)
  const [result, setResult] = useState<any>(null)
  const calculate = useCallback(() => {
    const inc = income
    let taxBefore = inc <= 250000 ? 0 : inc <= 500000 ? (inc - 250000) * 0.05 : inc <= 1000000 ? 12500 + (inc - 500000) * 0.2 : 112500 + (inc - 1000000) * 0.3
    taxBefore += taxBefore * 0.04
    const deductions = Math.min(150000, inc * 0.15) + (category === 'salaried' ? 50000 : 0) + 15000
    const taxableTotal = Math.max(0, inc - deductions)
    let taxAfter = taxableTotal <= 250000 ? 0 : taxableTotal <= 500000 ? (taxableTotal - 250000) * 0.05 : taxableTotal <= 1000000 ? 12500 + (taxableTotal - 500000) * 0.2 : 112500 + (taxableTotal - 1000000) * 0.3
    taxAfter += taxAfter * 0.04
    const savings = Math.round(taxBefore - taxAfter)
    const gstSavings = hasGst ? Math.round(inc * 0.02) : 0
    setResult({ savings: savings + gstSavings })
  }, [income, category, hasGst])
  const fmt = (n: number) => '₹' + Number(n).toLocaleString('en-IN')
  return <section className="section section--light paper-texture" id="estimator"><div className="container"><div className="text-center mb-xl reveal"><div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{estimator.label}</span></div><h2>{estimator.title}<br /><span className="gradient-text">{estimator.titleGradient}</span></h2><p style={{ marginTop: '1rem', maxWidth: '480px', margin: '0.5rem auto' }}>{estimator.description}</p></div><div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}><div className="card" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%)', border: '1px solid rgba(232, 212, 184, 0.2)', color: 'var(--text-light)' }}><h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-light)' }}><Percent size={18} style={{ marginRight: 8, color: 'var(--gold)' }} />{estimator.labels.income}</h3><div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-serif)' }}>{fmt(income)}</div><input className="estimator-range" type="range" min={200000} max={10000000} step={50000} value={income} onChange={(e) => setIncome(Number(e.target.value))} style={{ width: '100%' }} /><select className="form-select mt-md" value={category} onChange={(e) => setCategory(e.target.value)}><option value="salaried">Salaried Employee</option><option value="freelancer">Freelancer / Consultant</option><option value="business">Business Owner</option></select><div className="flex gap-sm mt-md" style={{ alignItems: 'center' }}><input type="checkbox" checked={hasGst} onChange={(e) => setHasGst(e.target.checked)} /><span style={{ fontSize: '0.9rem' }}>{estimator.labels.gstSwitch}</span></div><button className="btn btn--primary mt-lg" style={{ width: '100%' }} onClick={calculate}>{estimator.labels.cta}</button></div><div className="reveal-right">{result && <div className="estimator-result"><div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>SAVINGS</div><div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--gold)' }}>{fmt(result.savings)}</div><p style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-light)' }}>{estimator.labels.disclaimer}</p><button className="btn btn--primary btn--lg mt-md" onClick={() => document.getElementById('contact')?.scrollIntoView()}>{estimator.labels.resultCta}</button></div>}</div></div></div></section>
}

function FAQ({ content: faq }: any) {
  const [open, setOpen] = useState<number | null>(null)
  return <section className="section paper-texture" id="faq" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%)' }}><div className="container"><div className="text-center mb-xl reveal"><div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{faq.label}</span></div><h2 style={{ color: 'var(--text-light)' }}>{faq.title}<br /><span style={{ color: 'var(--gold)' }}>{faq.titleAccent}</span></h2></div><div style={{ maxWidth: '780px', margin: '0 auto' }}>{faq.items.map((f: any, i: number) => <div key={i} className={`accordion-item ${open === i ? 'open' : ''}`} style={{ background: 'var(--white)', marginBottom: 8 }}><button className="accordion-header" onClick={() => setOpen(open === i ? null : i)}><span>{f.q}</span><ChevronDown size={18} className="accordion-chevron" /></button>{open === i && <div className="accordion-body" style={{ padding: '1rem' }}><p>{f.a}</p></div>}</div>)}</div></div></section>
}

function Contact({ content: contact }: any) {
  const [sent, setSent] = useState(false)
  return <section className="section section--light" id="contact"><div className="container"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}><div className="reveal-left"><div className="section-label"><span className="label-text">{contact.label}</span></div><h2>{contact.title}<br /><span className="gradient-text">{contact.titleGradient}</span><br />{contact.titleSuffix}</h2><p style={{ color: 'var(--text-mid)', marginTop: '1rem' }}>{contact.description}</p><div className="mt-lg">{contact.items.map((c: any, i: number) => { const Icon = Icons[c.icon]; return <div key={i} className="flex gap-md mb-md"><div className="icon-box"><Icon size={18} /></div><div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.label}</div><div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.value}</div></div></div> })}</div></div><div className="card reveal-right">{sent ? <div className="text-center"><h3>{contact.form.successTitle}</h3><p>{contact.form.successMsg}</p></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}><h3>{contact.form.title}</h3><input className="form-input mt-md" placeholder={contact.form.placeholders.name} required /><input className="form-input mt-md" placeholder={contact.form.placeholders.phone} required /><input className="form-input mt-md" placeholder={contact.form.placeholders.email} type="email" required /><button className="btn btn--primary mt-lg" style={{ width: '100%' }}>{contact.form.cta}</button></form>}</div></div></div></section>
}

function CTABanner({ content: cta }: any) {
  return <section style={{ padding: '5rem 0', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%)', textAlign: 'center' }}><div className="container"><h2 style={{ color: 'var(--text-light)' }}>{cta.title}</h2><p style={{ color: 'var(--text-light)', opacity: 0.85, margin: '1rem auto', maxWidth: '560px' }}>{cta.description}</p><button className="btn btn--primary btn--lg mt-lg" onClick={() => document.getElementById('contact')?.scrollIntoView()}>{cta.ctaPrimary}</button></div></section>
}

function Footer({ content: footer, brand }: any) {
  return <footer style={{ background: 'var(--navy)', color: 'var(--text-light)', padding: '4rem 0' }}><div className="container"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}><div><div className="nav-logo">{brand.name}<span>{brand.suffix}</span></div><p style={{ fontSize: '0.85rem', color: 'var(--text-light)', opacity: 0.85, marginTop: '0.75rem' }}>{footer.description}</p></div><div><h3 style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Services</h3>{footer.links.services.map((s: string) => <div key={s} style={{ fontSize: '0.85rem', marginTop: 8, color: 'var(--text-light)', opacity: 0.85 }}>{s}</div>)}</div></div><div style={{ borderTop: '1px solid rgba(246, 242, 235, 0.1)', marginTop: '2rem', paddingTop: '1rem' }}><p style={{ fontSize: '0.75rem', color: 'var(--text-light)', opacity: 0.65 }}>{footer.disclaimer}</p></div></div></footer>
}

function StickyCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className={`sticky-cta ${visible ? 'visible' : ''}`}><button className="btn btn--primary" onClick={() => document.getElementById('contact')?.scrollIntoView()}>Get Started</button></div>
}

export default function TaxServicesSite() {
  useInjectStyles();
  useScrollReveal()
  return (
    <div className="tax-page">
      <Nav content={content.nav} brand={content.brand} />
      <main>
        <Hero content={content.hero} />
        <StatsBand content={content.statsBand} />
        <Services content={content.services} />
        <WhyUs content={content.whyUs} />
        <Process content={content.process} />
        <Testimonials content={content.testimonials} />
        <Estimator content={content.estimator} />
        <FAQ content={content.faq} />
        <Contact content={content.contact} />
        <CTABanner content={content.ctaBanner} />
      </main>
      <Footer content={content.footer} brand={content.brand} />
      <StickyCTA />
    </div>
  )
}
