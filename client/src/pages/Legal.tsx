import React, { useState, useEffect, useRef } from 'react';

/**
 * ─── ICONS (Custom SVG Components replacing lucide-react) ───
 */
const Icons = {
  FileText: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Shield: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Globe: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Award: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  ChevronDown: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"/></svg>,
  ArrowRight: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  CheckCircle: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Phone: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  MapPin: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Lock: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Zap: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Users: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Clock: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  BadgeCheck: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/><polyline points="9 12 11 14 15 10"/></svg>,
  MessageCircle: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  Building2: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>,
  Search: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  TrendingUp: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
};

/**
 * ─── DATA (Fully Inlined from tier-3.json) ───
 */
const data = {
  brand: {
    name: "Legal",
    suffix: "Direct",
    badge: "PROFESSIONAL",
  },
  nav: {
    links: [
      { id: "services", label: "Services" },
      { id: "why-us", label: "Why Us" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" }
    ],
    cta: "Start a Consultation"
  },
  hero: {
    pill: "Professional Legal Guidance",
    title: "Legal Services",
    subtitle: "Made",
    highlight: "Simple",
    description: "Professional documentation, compliance, and guidance for every need. No jargon, no heavy claims—just clear paths forward.",
    ctaPrimary: "Get Started",
    ctaSecondary: "View Services",
    trustBar: [
      { icon: "Shield", label: "100% Confidential" },
      { icon: "Clock", label: "Efficient Turnaround" },
      { icon: "CheckCircle", label: "Expert Drafting" }
    ]
  },
  services: {
    label: "Our Expertise",
    title: "Choose who you are.",
    titleGradient: "We'll guide you through the rest.",
    description: "Select the category that best describes your needs to see how we can assist you.",
    groups: [
      {
        icon: "Users",
        title: "For Individuals",
        audience: "Salaried | Families | Property Owners | Seniors",
        problems: [
          "I need to make a Will but don't know how.",
          "Family property dispute / partition issues.",
          "Property registration or name transfer."
        ],
        items: [
          "Will Drafting & Estate Planning",
          "Family & Matrimonial Matters",
          "Property Documentation & Registration",
          "Civil & Consumer Disputes",
          "Power of Attorney & Legal Notices"
        ]
      },
      {
        icon: "Building2",
        title: "For Businesses & Organisations",
        audience: "Startups | Companies | Firms | NGOs",
        problems: [
          "How do I register and stay compliant?",
          "Contract drafting and vendor agreements.",
          "Trademark and brand protection."
        ],
        items: [
          "Company / LLP Registration & Compliance",
          "Contract Drafting & Review",
          "Intellectual Property (Trademark/Copyright)",
          "Labour & Employment Law",
          "Commercial Disputes & Recovery"
        ]
      },
      {
        icon: "Globe",
        title: "For NRIs & International Clients",
        audience: "Non-Resident Indians | Cross-border Matters",
        problems: [
          "I can't travel—how do I handle property?",
          "Inheritance and succession back home.",
          "Legal representation without travelling."
        ],
        items: [
          "NRI Property Management & Disputes",
          "Inheritance, Succession & Will Execution",
          "Power of Attorney & Representation",
          "Family Law for NRIs",
          "Documentation & Compliance"
        ]
      }
    ],
    note: "Clear guidance • Proper documentation • End-to-end support"
  },
  whyUs: {
    label: "Why Choose Us",
    title: "Calm, simple, and",
    titleAccent: "human-focused",
    subtitle: "legal support.",
    description: "We believe legal services should be accessible and understandable. We remove the cognitive overload and focus on what you actually worry about.",
    pills: [
      { icon: "Shield", label: "Privacy Focused" },
      { icon: "MessageCircle", label: "Simple Language" },
      { icon: "BadgeCheck", label: "Proper Ethics" }
    ],
    benefits: [
      { icon: "Search", title: "Transparency", desc: "No hidden fees or complex legal terms. We explain every step clearly." },
      { icon: "Zap", title: "Speed", desc: "Digitized processes for faster documentation and filings." },
      { icon: "Lock", title: "Security", desc: "Your documents and data are stored with bank-grade encryption." },
      { icon: "TrendingUp", title: "Growth", desc: "We handle the legalities so your business or personal assets can grow safely." }
    ]
  },
  faq: {
    label: "Common Questions",
    title: "Everything you",
    titleAccent: "need to know.",
    items: [
      { q: "Do I need to visit your office in person?", a: "For most documentation and advisory services, everything can be handled remotely via secure video calls and digital document sharing. We only require physical presence when legally mandated for registrations." },
      { q: "How do you handle NRI matters remotely?", a: "We specialse in NRI services, using Power of Attorney and digital compliance to represent you in India without you having to travel." },
      { q: "Are your documents legally binding?", a: "Yes, all our drafts are prepared by qualified legal professionals and comply with relevant Indian or International laws." }
    ]
  },
  contact: {
    label: "Get in Touch",
    title: "Ready to",
    titleGradient: "start?",
    titleSuffix: "Talk to us today.",
    description: "We are here to help you navigate your legal journey with clarity and trust.",
    items: [
      { icon: "Mail", label: "Email us", value: "contact@legaldirect.com" },
      { icon: "Phone", label: "Call us", value: "+91 98765 43210" },
      { icon: "MapPin", label: "Office", value: "Chancery Chambers, Level 4, New Delhi" }
    ],
    form: {
      title: "Send a Message",
      placeholders: {
        name: "Full Name",
        phone: "Phone Number",
        email: "Email Address"
      },
      cta: "Submit Request"
    }
  },
  footer: {
    description: "Professional documentation and guidance for individuals, businesses, and NRIs. Building trust through clarity.",
    links: {
      services: [
        "Estate Planning",
        "Company Compliance",
        "NRI Property",
        "Contract Drafting"
      ]
    },
    disclaimer: "© 2026 Legal Direct. Disclaimer: We are a legal service provider, not a law firm. This website is for informational purposes only."
  }
};

/**
 * ─── STYLES (Scoped deeply to prevent cross-contamination) ───
 */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

.legal-site-wrapper {
  --navy:        #0F172A;
  --navy-glow:   #1E293B;
  --navy-light:  #334155;
  --navy-mid:    #F8F5F2;
  --teal:        #2A5A7A;
  --teal-dark:   #1E3A5F;
  --teal-soft:   rgba(42, 90, 122, 0.12);
  --gold:        #B89B5E;
  --gold-soft:   rgba(184, 155, 94, 0.15);
  --gold-light:  #F8F5F2;
  --text-dark:   #1E293B;
  --text-mid:    #334155;
  --text-muted:  #64748B;
  --text-light:  #F8F5F2;
  --text-white:  #FFFFFF;
  --white:       #FFFFFF;
  --cream:       #F6F1E8;
  --cream-deep:  #EFE6D8;
  --glass-bg:    rgba(248, 245, 242, 0.04);
  --glass-border: rgba(42, 90, 122, 0.15);
  --shadow-sm:   0 2px 8px rgba(15, 23, 42, 0.08);
  --shadow-md:   0 8px 32px rgba(15, 23, 42, 0.12);
  --shadow-xl:   0 40px 100px rgba(15, 23, 42, 0.2);
  --radius-md:   16px;
  --radius-lg:   32px;
  --radius-full: 9999px;
  --font-serif:  'Playfair Display', Georgia, serif;
  --font-sans:   'Inter', -apple-system, sans-serif;
  --transition-base:   0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  font-family: var(--font-sans);
  background: var(--navy);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
}

.legal-site-wrapper *, .legal-site-wrapper *::before, .legal-site-wrapper *::after { box-sizing: border-box; margin: 0; padding: 0; }
.legal-site-wrapper h1, .legal-site-wrapper h2, .legal-site-wrapper h3, .legal-site-wrapper h4 { font-family: var(--font-serif); line-height: 1.1; color: var(--text-dark); }
.legal-site-wrapper h1 { font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 800; letter-spacing: -0.02em; }
.legal-site-wrapper h2 { font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1rem; }
.legal-site-wrapper p { line-height: 1.8; color: var(--text-muted); }
.legal-site-wrapper .section p { color: var(--text-mid); }
.legal-site-wrapper .hero h1 { color: var(--text-light) !important; }
.legal-site-wrapper section:not(.hero):not(.faq-section):not(footer) h2 { color: var(--text-dark); }

.legal-site-wrapper .container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 4rem); }
.legal-site-wrapper .section { padding: clamp(6rem, 12vw, 10rem) 0; }

.legal-site-wrapper .card {
  background: linear-gradient(145deg, rgba(42, 90, 122, 0.14) 0%, rgba(184, 155, 94, 0.24) 100%), var(--cream);
  border: 1px solid rgba(42, 90, 122, 0.18);
  border-radius: var(--radius-lg);
  padding: 3rem;
  transition: all var(--transition-smooth);
  box-shadow: var(--shadow-md);
}
.legal-site-wrapper .card:hover { transform: translateY(-10px); box-shadow: var(--shadow-xl); border-color: var(--gold); }
.legal-site-wrapper .benefit-card {
  background: linear-gradient(145deg, rgba(42, 90, 122, 0.16) 0%, rgba(184, 155, 94, 0.26) 100%), var(--white);
  padding: 2rem; border-radius: 24px; border: 1px solid rgba(42, 90, 122, 0.18); box-shadow: var(--shadow-sm);
}

.legal-site-wrapper .faq-list-wrap { background: linear-gradient(145deg, rgba(42, 90, 122, 0.14) 0%, rgba(184, 155, 94, 0.24) 100%), var(--white); border: 1px solid rgba(42, 90, 122, 0.16); border-radius: var(--radius-lg); padding: 1rem; }
.legal-site-wrapper .faq-item-card { background: linear-gradient(145deg, rgba(42, 90, 122, 0.2) 0%, rgba(184, 155, 94, 0.28) 100%), #eef2f6; border-radius: 16px; border: 1px solid rgba(184, 155, 94, 0.35); overflow: hidden; margin-bottom: 1rem; }
.legal-site-wrapper .faq-item-card:last-child { margin-bottom: 0; }
.legal-site-wrapper .faq-item-btn { width: 100%; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border: none; background: transparent; cursor: pointer; text-align: left; }
.legal-site-wrapper .faq-item-btn:hover { background: rgba(42, 90, 122, 0.06); }
.legal-site-wrapper .faq-item-question { color: var(--text-dark); }
.legal-site-wrapper .faq-item-answer { color: var(--text-mid); }

.legal-site-wrapper .contact-info-card { background: linear-gradient(145deg, rgba(42, 90, 122, 0.12) 0%, rgba(184, 155, 94, 0.2) 100%), var(--white); border: 1px solid rgba(42, 90, 122, 0.14); border-radius: var(--radius-md); padding: 1rem 1.1rem; }
.legal-site-wrapper .services-section { background: linear-gradient(180deg, var(--cream) 0%, var(--cream-deep) 100%); }
.legal-site-wrapper .services-title-accent { color: #8a6a2e; }
.legal-site-wrapper .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 1rem 2.2rem; border-radius: var(--radius-full); font-weight: 700; cursor: pointer; transition: all var(--transition-base); border: none; outline: none; }
.legal-site-wrapper .btn--primary { background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%); color: white; }
.legal-site-wrapper .btn--primary:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(42, 90, 122, 0.3); }
.legal-site-wrapper .pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.2rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; background: var(--gold-soft); color: var(--gold); border: 1px solid var(--gold); }
.legal-site-wrapper .btn--ghost-light { background: transparent; color: var(--gold); border: 1px solid var(--gold); }
.legal-site-wrapper .btn--ghost-light:hover { background: var(--gold-soft); border-color: var(--gold); }

/* Renamed to .legal-reveal to prevent external conflict */
.legal-site-wrapper .legal-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s var(--transition-smooth); }
.legal-site-wrapper .legal-reveal.visible { opacity: 1; transform: translateY(0); }
.legal-site-wrapper .gradient-text { background: linear-gradient(135deg, var(--gold) 0%, var(--teal) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

@keyframes legalGlow { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } }

/* Sticky nav replaces fixed nav so it works properly within embedded sections */
.legal-site-wrapper .nav { position: sticky; top: 0; z-index: 1000; transition: all 0.3s ease; padding: 1.5rem 0; background: transparent; }
.legal-site-wrapper .nav.scrolled { background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px); padding: 1rem 0; border-bottom: 1px solid var(--glass-border); }
.legal-site-wrapper .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; }
.legal-site-wrapper .nav-link { color: var(--text-light); cursor: pointer; font-weight: 500; white-space: nowrap; }

.legal-site-wrapper .hero { background: var(--navy); min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 6rem 0; }
.legal-site-wrapper .hero-glow { position: absolute; top: 50%; left: 50%; width: 60vw; height: 60vw; background: radial-gradient(circle, var(--navy-glow) 0%, transparent 70%); transform: translate(-50%, -50%); z-index: 1; pointer-events: none; animation: legalGlow 8s infinite ease-in-out; }
.legal-site-wrapper .hero::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(var(--teal-soft) 1px, transparent 1px); background-size: 40px 40px; opacity: 0.1; pointer-events: none; }
.legal-site-wrapper .hero-actions { display: flex; justify-content: center; gap: 1.5rem; margin-top: 3.5rem; flex-wrap: wrap; }
.legal-site-wrapper .hero-trust-wrap { margin-top: 6rem; padding-top: 2.5rem; border-top: 1px solid var(--glass-border); position: relative; }
.legal-site-wrapper .hero-trust-items { display: flex; justify-content: center; gap: clamp(1.5rem, 5vw, 4rem); flex-wrap: wrap; }
.legal-site-wrapper .trust-item { display: flex; align-items: center; gap: 0.75rem; opacity: 0.8; transition: opacity 0.3s ease; }
.legal-site-wrapper .trust-item:hover { opacity: 1; }

@media (max-width: 1024px) {
  .legal-site-wrapper .section { padding: 4.5rem 0; }
  .legal-site-wrapper .nav-links { gap: 1rem !important; font-size: 0.9rem; }
  .legal-site-wrapper .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
  .legal-site-wrapper .whyus-layout { grid-template-columns: 1fr !important; gap: 2.25rem !important; }
}

@media (max-width: 768px) {
  .legal-site-wrapper .nav-links { display: none !important; }
  .legal-site-wrapper h1 { font-size: clamp(2rem, 9vw, 2.7rem); }
  .legal-site-wrapper h2 { font-size: clamp(1.7rem, 7vw, 2.2rem); }
  .legal-site-wrapper .hero-actions { flex-direction: column; align-items: stretch; }
  .legal-site-wrapper .services-grid, .legal-site-wrapper .whyus-benefits-grid, .legal-site-wrapper .contact-layout { grid-template-columns: 1fr !important; }
  .legal-site-wrapper .nav { padding: 1rem 0; }
}
`;

/**
 * ─── HELPER COMPONENTS ───
 */

// Custom hook receives root ref to safely query DOM without leaking into parent page
function useScrollReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;
    const els = containerRef.current.querySelectorAll('.legal-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { 
          if (e.isIntersecting) e.target.classList.add('visible') 
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [containerRef])
}

function WaveDivider({ fill = 'var(--navy-mid)', className = '', style = {} }: { fill?: string, className?: string, style?: any }) {
  return (
    <div className={`wave-divider ${className}`} style={{ width: '100%', overflow: 'hidden', lineHeight: 0, ...style }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '60px' }}>
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{ fill }}></path>
      </svg>
    </div>
  )
}

function Nav({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [scrolled, setScrolled] = useState(false)
  
  const scrollTo = (id: string) => {
    if (!containerRef.current) return
    const el = containerRef.current.querySelector('#legal-' + id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < -50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="nav-logo" style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem' }} onClick={() => scrollTo('home')}>
          {data.brand.name}<span style={{ color: 'var(--gold)' }}>{data.brand.suffix}</span>
          <span className="pill" style={{ fontSize: '0.6rem', padding: '1px 6px', marginLeft: '8px' }}>{data.brand.badge}</span>
        </div>
        <ul className="nav-links">
          {data.nav.links.map(l => (
            <li key={l.id}><span className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</span></li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn--primary" style={{ padding: '0.7rem 1.4rem' }} onClick={() => scrollTo('contact')}>{data.nav.cta}</button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollTo = (id: string) => {
    const el = containerRef.current?.querySelector('#legal-' + id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="hero" id="legal-home" style={{ textAlign: 'center' }}>
      <div className="hero-glow"></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="legal-reveal">
          <div className="pill" style={{ marginBottom: '2rem' }}>
            <Icons.BadgeCheck width={14} style={{ marginRight: '8px' }} /> {data.hero.pill}
          </div>
          <h1>{data.hero.title} {data.hero.subtitle} <span className="gradient-text">{data.hero.highlight}</span></h1>
          <p style={{ maxWidth: '640px', margin: '2rem auto', fontSize: '1.2rem', color: 'var(--text-light)', opacity: 0.9 }}>
            {data.hero.description}
          </p>
          <div className="hero-actions">
            <button className="btn btn--primary" onClick={() => scrollTo('contact')}>
              {data.hero.ctaPrimary} <Icons.ArrowRight width={20} />
            </button>
            <button className="btn btn--ghost-light" onClick={() => scrollTo('services')}>
              {data.hero.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="legal-reveal hero-trust-wrap">
          <div className="hero-trust-items">
            {data.hero.trustBar.map((item, i) => {
              const Icon = Icons[item.icon as keyof typeof Icons]
              return (
                <div key={i} className="trust-item">
                  <Icon width={20} color="var(--gold)" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-light)' }}>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollTo = (id: string) => {
    const el = containerRef.current?.querySelector('#legal-' + id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="section services-section" id="legal-services">
      <div className="container">
        <div className="legal-reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="pill" style={{ marginBottom: '1rem' }}>{data.services.label}</div>
          <h2>{data.services.title}<br /><span className="services-title-accent">{data.services.titleGradient}</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>{data.services.description}</p>
        </div>

        <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {data.services.groups.map((group, i) => {
            return (
              <div key={i} className="card legal-reveal" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem' }}>{group.title}</h3>
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal)' }}>{group.audience}</p>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem', padding: '1.2rem', background: 'rgba(42, 90, 122, 0.04)', borderRadius: '12px', borderLeft: '4px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 600, marginBottom: '0.8rem' }}>Common Concerns:</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
                    {group.problems.map((p, j) => (
                      <li key={j} style={{ fontSize: '0.85rem', color: 'var(--text-mid)', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--gold)' }}>•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 700, marginBottom: '1rem' }}>Key Services:</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
                    {group.items.map((item, j) => (
                      <li key={j} style={{ fontSize: '0.95rem', color: 'var(--text-mid)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Icons.CheckCircle width={16} color="var(--gold)" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="btn btn--primary" style={{ marginTop: '2.5rem', width: '100%', justifyContent: 'space-between' }} onClick={() => scrollTo('contact')}>
                  Request Assistance <Icons.ArrowRight width={18} />
                </button>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.6, fontSize: '0.9rem' }}>
          {data.services.note}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  return (
    <section className="section" id="legal-why-us" style={{ background: 'var(--navy-mid)' }}>
      <div className="container whyus-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div className="legal-reveal">
          <div className="pill" style={{ marginBottom: '1.5rem' }}>{data.whyUs.label}</div>
          <h2>{data.whyUs.title} <span style={{ color: 'var(--teal)' }}>{data.whyUs.titleAccent}</span> {data.whyUs.subtitle}</h2>
          <p style={{ margin: '2rem 0', fontSize: '1.1rem' }}>{data.whyUs.description}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {data.whyUs.pills.map((p, i) => {
              const Icon = Icons[p.icon as keyof typeof Icons]
              return (
                <div key={i} className="pill" style={{ background: 'var(--white)', color: 'var(--text-dark)', borderColor: 'var(--glass-border)' }}>
                  <Icon width={14} style={{ marginRight: '8px' }} /> {p.label}
                </div>
              )
            })}
          </div>
        </div>

        <div className="whyus-benefits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {data.whyUs.benefits.map((b, i) => {
            const Icon = Icons[b.icon as keyof typeof Icons]
            return (
              <div key={i} className="legal-reveal benefit-card">
                <Icon width={24} color="var(--gold)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.85rem' }}>{b.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section faq-section" id="legal-faq" style={{ background: 'var(--navy)' }}>
      <div className="container">
        <div className="legal-reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="pill" style={{ marginBottom: '1rem' }}>{data.faq.label}</div>
          <h2 style={{ color: 'var(--text-light)' }}>{data.faq.title} <span style={{ color: 'var(--gold)' }}>{data.faq.titleAccent}</span></h2>
        </div>
        <div className="faq-list-wrap legal-reveal" style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
          {data.faq.items.map((item, i) => (
            <div key={i} className="faq-item-card">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(open === i ? null : i)
                }} 
                className="faq-item-btn"
              >
                <span className="faq-item-question" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{item.q}</span>
                <Icons.ChevronDown width={20} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
              </button>
              {open === i && (
                <div className="faq-item-answer" style={{ padding: '0 2rem 1.5rem', lineHeight: 1.8 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="legal-contact" style={{ background: 'var(--navy-mid)' }}>
      <div className="container">
        <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem' }}>
          <div className="legal-reveal">
            <div className="pill" style={{ marginBottom: '1.5rem' }}>{data.contact.label}</div>
            <h2>{data.contact.title} <span className="gradient-text">{data.contact.titleGradient}</span> {data.contact.titleSuffix}</h2>
            <p style={{ margin: '2rem 0' }}>{data.contact.description}</p>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {data.contact.items.map((item, i) => {
                const Icon = Icons[item.icon as keyof typeof Icons]
                return (
                  <div key={i} className="contact-info-card" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ background: 'var(--gold-soft)', padding: '0.8rem', borderRadius: '12px' }}>
                      <Icon color="var(--gold)" width={20} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{item.label}</p>
                      <p style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{item.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card legal-reveal" style={{ padding: '3rem' }}>
             <h3>{data.contact.form.title}</h3>
             <form style={{ display: 'grid', gap: '1.2rem', marginTop: '2rem' }} onSubmit={(e) => e.preventDefault()}>
               <input style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--navy-mid)', width: '100%' }} placeholder={data.contact.form.placeholders.name} />
               <input style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--navy-mid)', width: '100%' }} placeholder={data.contact.form.placeholders.phone} />
               <input style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--navy-mid)', width: '100%' }} placeholder={data.contact.form.placeholders.email} />
               <button type="submit" className="btn btn--primary" style={{ marginTop: '1rem', width: '100%' }}>{data.contact.form.cta}</button>
             </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'white', padding: '5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div style={{ gridColumn: '1 / 3' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 700 }}>
              {data.brand.name}<span style={{ color: 'var(--gold)' }}>{data.brand.suffix}</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '300px' }}>{data.footer.description}</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
              {data.footer.links.services.map((s, i) => <li key={i} style={{ opacity: 0.8, fontSize: '0.9rem' }}>{s}</li>)}
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>
          {data.footer.disclaimer}
        </div>
      </div>
    </footer>
  )
}

/**
 * ─── MAIN EXPORT (Fully Scoped for Drop-in Integration) ───
 */
export default function LegalWebsite() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Custom hook manages IntersectionObserver scoped exclusively to this wrapper
  useScrollReveal(containerRef)

  return (
    <div className="legal-site-wrapper" ref={containerRef}>
      <style>{STYLES}</style>
      <Nav containerRef={containerRef} />
      <Hero containerRef={containerRef} />
      <WaveDivider fill="var(--navy-mid)" />
      <Services containerRef={containerRef} />
      <WaveDivider fill="var(--white)" className="wave-divider--top" />
      <WhyUs />
      <WaveDivider fill="var(--navy)" style={{ transform: 'rotate(180deg)' }} className="wave-divider--top" />
      <FAQ />
      <WaveDivider fill="var(--navy-mid)" style={{ transform: 'rotate(180deg)' }} className="wave-divider--top" />
      <Contact />
      <Footer />
    </div>
  )
}
