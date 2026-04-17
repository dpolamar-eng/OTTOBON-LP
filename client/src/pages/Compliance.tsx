import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';

// ==========================================
// 1. DATA / CONTENT (Tier 3)
// ==========================================
const content = {
  "brand": { "name": "Otto", "suffix": "Compliance", "badge": "PRO" },
  "nav": {
    "links": [
      { "label": "Services", "id": "services" },
      { "label": "Why Us", "id": "why-us" },
      { "label": "Process", "id": "process" },
      { "label": "FAQ", "id": "faq" }
    ],
    "cta": "Get Started"
  },
  "hero": {
    "pill": "Expert Statutory Partner",
    "title": "Statutory Compliance,",
    "subtitle": "Made",
    "highlight": "Calm & Simple.",
    "description": "Stay fully compliant without the stress or last-minute panic. We handle all filings, deadlines, and regulatory requirements so you can focus on growing your business — with zero penalties guaranteed.",
    "ctaPrimary": "Get Compliance Support",
    "ctaSecondary": "View Process",
    "trustBar": [
      { "icon": "Shield", "label": "100% Compliant" },
      { "icon": "Clock", "label": "On-Time Tracking" },
      { "icon": "Users", "label": "5000+ Clients" },
      { "icon": "Lock", "label": "Bank-Grade Privacy" }
    ]
  },
  "statsBand": [
    { "prefix": "", "value": "5000", "suffix": "+", "label": "Satisfied Clients" },
    { "prefix": "", "value": "10", "suffix": "", "label": "Countries Served" },
    { "prefix": "", "value": "100", "suffix": "%", "label": "On-Time Filings" },
    { "prefix": "₹", "value": "0", "suffix": "", "label": "Penalties Levied" }
  ],
  "services": {
    "label": "What We Do",
    "title": "Services we",
    "titleGradient": "Provide",
    "description": "Choose who you are. We'll keep you compliant and stress-free.",
    "groups": [
      { "title": "Individuals", "audience": "Salaried | Freelancers | Consultants", "items": ["Income Tax Compliance", "TDS Deduction", "Professional Tax Registration"] },
      { "title": "Businesses & Organisations", "audience": "Startups, companies, firms, HUFs", "items": ["GST Compliance & Returns", "TDS / TCS Compliance", "Labour Law Compliance", "ROC Filings"] },
      { "title": "NRIs & International", "audience": "Non-Resident Indians and cross-border", "items": ["FEMA Compliance", "Foreign Remittance", "Cross-border Reporting"] }
    ]
  },
  "whyUs": {
    "label": "Why Otto Compliance",
    "title": "Compliance Should Feel",
    "titleAccent": "Calm",
    "subtitle": ", Not Overwhelming.",
    "description": "Compliance isn't just about avoiding fines; it's about peace of mind. Our approach focuses on clarity and care.",
    "benefits": [
      { "icon": "Clock", "title": "Consistency", "desc": "Steady filings with no last-minute scrambling." },
      { "icon": "Search", "title": "Clarity", "desc": "Updates and guidance in plain language." },
      { "icon": "Heart", "title": "Care", "desc": "Attention to details across your scope." },
      { "icon": "Zap", "title": "Support", "desc": "Help when questions come up." }
    ]
  },
  "process": {
    "label": "How It Works",
    "title": "Stress-Free Compliance",
    "titleGradient": "in 4 Simple Steps",
    "description": "A clear, predictable approach to your statutory filings.",
    "steps": [
      { "n": "01", "title": "We Understand Your Requirements", "desc": "We review your current requirements and documents.", "icon": "FileText" },
      { "n": "02", "title": "We Build a Clear, Realistic Plan", "desc": "We map scope, deadlines, and the right workflow.", "icon": "Search" },
      { "n": "03", "title": "Timely & Accurate Submissions", "desc": "Timely submissions with careful checks.", "icon": "CheckCircle" },
      { "n": "04", "title": "Ongoing Guidance & Peace of Mind", "desc": "Ongoing guidance when changes happen.", "icon": "BarChart3" }
    ]
  },
  "faq": {
    "label": "Common Questions",
    "title": "Everything You Need",
    "titleAccent": "to Know",
    "items": [
      { "q": "How do we get started?", "a": "You share your current compliance requirements and documents. We then review gaps and outline a clear, calm plan for ongoing filings." },
      { "q": "Do you help with deadlines and tracking?", "a": "Yes. We track key dates and keep your filing cadence steady, so you are not managing compliance at the last minute." },
      { "q": "What documents are typically needed?", "a": "Most engagements start with basic registration details and relevant filings. We'll guide you on what's required for your specific scope." },
      { "q": "Is there ongoing support?", "a": "Ongoing support is part of the engagement. You can ask questions when something changes, and we help keep your compliance aligned." }
    ]
  },
  "contact": {
    "label": "Reach Out",
    "title": "Let's Make Your Compliance",
    "titleGradient": "Simple",
    "titleSuffix": "",
    "description": "Get Expert Compliance Support tailored to your needs.",
    "items": [
      { "icon": "Phone", "label": "Call / WhatsApp", "value": "+91 98765 43210" },
      { "icon": "Mail", "label": "Email", "value": "compliance@ottocompliance.in" },
      { "icon": "MapPin", "label": "Office", "value": "Level 4, Chancery Chambers, New Delhi" }
    ],
    "form": {
      "title": "Get in Touch",
      "placeholders": { "name": "Full Name", "phone": "Phone Number", "email": "Email Address" },
      "cta": "Send Message",
      "successTitle": "Request Received!",
      "successMsg": "Our team will contact you shortly."
    }
  },
  "footer": {
    "description": "Expert Statutory Partner providing comprehensive compliance and regulatory services.",
    "disclaimer": "Information on this website is for general awareness only and does not constitute personalized advisory.",
    "links": { "services": ["Income Tax", "GST Compliance", "Labour Laws", "Secretarial & ROC"] }
  }
};

// ==========================================
// 2. CSS STYLES
// ==========================================
const CSS_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

.compliance-portable-root {
  --navy:        #1F1F24;
  --navy-glow:   #2F2F38;
  --navy-light:  #3A3A45;
  --navy-mid:    #F8F6F2;
  --teal:        #6B5F4A; 
  --teal-dark:   #544A3A;
  --teal-soft:   rgba(107, 95, 74, 0.12);
  --gold:        #D4C7A8; 
  --gold-soft:   rgba(212, 199, 168, 0.15);
  --gold-light:  #F8F6F2;
  --rose-gold:   #EAD1C8;
  
  --text-dark:   #1F1F24;
  --text-mid:    #2F2F38;
  --text-muted:  #6b6b78; 
  --text-light:  #F8F6F2;
  --text-white:  #FFFFFF;
  --white:       #F7F3F1; 
  
  --glass-bg:    rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  --shadow-sm:   0 2px 8px rgba(31, 31, 36, 0.1);
  --shadow-md:   0 8px 32px rgba(31, 31, 36, 0.15);
  --shadow-lg:   0 24px 64px rgba(31, 31, 36, 0.2);
  --shadow-xl:   0 40px 100px rgba(31, 31, 36, 0.25);
  
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
  
  font-family: var(--font-sans); 
  background: var(--navy); 
  color: var(--text-light); 
  overflow-x: hidden; 
  -webkit-font-smoothing: antialiased;
}

.compliance-portable-root *, .compliance-portable-root *::before, .compliance-portable-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.compliance-portable-root h1, .compliance-portable-root h2, .compliance-portable-root h3, .compliance-portable-root h4 { font-family: var(--font-serif); line-height: 1.1; color: var(--text-dark); }
.compliance-portable-root .hero h1, .compliance-portable-root .cta-banner h2 { color: var(--text-light) !important; }
.compliance-portable-root section:not(.hero):not(.stats-band):not(.cta-banner):not(footer) h2 { color: var(--text-dark); }
.compliance-portable-root h1 { font-size: clamp(2.8rem, 5vw, 5rem); font-weight: 800; letter-spacing: -0.02em; }
.compliance-portable-root h2 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 800; letter-spacing: -0.02em; }
.compliance-portable-root p { line-height: 1.7; color: var(--text-muted); }

.compliance-portable-root .gradient-text { background: linear-gradient(135deg, var(--teal) 0%, var(--gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; }

.compliance-portable-root .container { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1.5rem, 5vw, 4rem); }
.compliance-portable-root .section { padding: clamp(4rem, 8vw, 6.5rem) 0; }
.compliance-portable-root .section--light { background: var(--white); }
.compliance-portable-root .flex { display: flex; }
.compliance-portable-root .flex-b { display: flex; align-items: center; justify-content: space-between; }

.compliance-portable-root .pill { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 1.1rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
.compliance-portable-root .pill--gold { background: var(--gold-soft); color: var(--gold); border: 1px solid var(--glass-border); }

.compliance-portable-root .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.9rem 2rem; border-radius: var(--radius-full); font-family: var(--font-sans); font-size: 0.95rem; font-weight: 600; cursor: pointer; border: none; transition: all var(--transition-base); position: relative; overflow: hidden; white-space: nowrap; text-decoration: none; }
.compliance-portable-root .btn--primary { background: linear-gradient(90deg, var(--teal), var(--gold)); color: var(--text-dark); box-shadow: var(--shadow-sm); font-weight: 800; }
.compliance-portable-root .btn--primary:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.compliance-portable-root .btn--ghost { background: transparent; color: var(--gold); border: 1.5px solid var(--gold); backdrop-filter: blur(12px); }
.compliance-portable-root .btn--ghost:hover { background: var(--gold-soft); transform: translateY(-2px); }
.compliance-portable-root .btn--lg { padding: 1.1rem 2.5rem; font-size: 1rem; }
.compliance-portable-root .btn--sm { padding: 0.65rem 1.5rem; font-size: 0.85rem; }

.compliance-portable-root .card { background: #2D2D35; border: 1px solid rgba(255, 255, 255, 0.05); border-radius: var(--radius-lg); padding: clamp(1.4rem, 2.8vw, 2.5rem); transition: all var(--transition-smooth); position: relative; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); color: var(--text-light); }
.compliance-portable-root .card:hover { border-color: var(--gold); transform: translateY(-8px); box-shadow: 0 20px 60px rgba(31, 31, 36, 0.12); }

.compliance-portable-root .section-label { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
.compliance-portable-root .label-text { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dark); }

.compliance-portable-root .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
.compliance-portable-root .reveal.visible { opacity: 1; transform: translateY(0); }

.compliance-portable-root .stat-number { font-family: var(--font-serif); font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; color: var(--text-dark); line-height: 1; }
.compliance-portable-root .stats-band .stat-number { color: var(--text-light); }
.compliance-portable-root .icon-box { width: 3.5rem; height: 3.5rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; background: rgba(107, 95, 74, 0.08); border: 1px solid rgba(107, 95, 74, 0.2); color: var(--teal); }

.compliance-portable-root .accordion-item { border: 1px solid rgba(107, 95, 74, 0.20); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 0.75rem; background: #fff; }
.compliance-portable-root .accordion-header { width: 100%; background: transparent; border: none; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: var(--text-dark); font-weight: 700; font-size: 1.1rem; }
.compliance-portable-root .form-input { width: 100%; padding: 0.9rem 1.1rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border); background: rgba(0,0,0,0.05); }

.compliance-portable-root .hero { min-height: 100vh; position: relative; overflow: hidden; display: flex; align-items: center; padding: 6rem 0; background: linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%); }
.compliance-portable-root .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.25rem 0; transition: all 0.3s ease; }
.compliance-portable-root .nav.scrolled { background: rgba(31, 31, 36, 0.96); backdrop-filter: blur(20px); padding: 0.85rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.compliance-portable-root .nav-logo { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 700; color: var(--text-light); }
.compliance-portable-root .nav-links { display: flex; gap: 2rem; list-style: none; }
.compliance-portable-root .nav-link { font-size: 0.9rem; color: var(--text-light); cursor: pointer; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }

.compliance-portable-root .mobile-menu { display: none; position: fixed; inset: 0; background: var(--navy); z-index: 999; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; }
.compliance-portable-root .mobile-menu.open { display: flex; }

.compliance-portable-root .sticky-cta { position: fixed; bottom: 2rem; right: 2rem; z-index: 900; opacity: 0; transform: translateY(50px); transition: all 0.4s ease; }
.compliance-portable-root .sticky-cta.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) { .compliance-portable-root h1 { font-size: 2.4rem; } .compliance-portable-root .nav-links { display: none; } }

.compliance-portable-root .delay-10 { transition-delay: 1000ms; }

.compliance-portable-root .wave-divider { position: absolute; left: 0; width: 100%; overflow: hidden; line-height: 0; z-index: 5; }
.compliance-portable-root .wave-divider svg { position: relative; display: block; width: calc(100% + 1.3px); height: 60px; }
.compliance-portable-root .wave-divider--top { top: -1px; transform: rotate(180deg); }
.compliance-portable-root .wave-divider--bottom { bottom: -1px; }

.compliance-portable-root section { position: relative; }

.compliance-portable-root .beams-container { width: 100% !important; height: 100% !important; position: absolute !important; top: 0; left: 0; z-index: 0; pointer-events: none; }
`;

// ==========================================
// 3. ICONS
// ==========================================
const Icon = ({ name, size = 24, className = '', style = {} }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) => {
  const icons: Record<string, React.ReactNode> = {
    FileText: <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></g>,
    Calculator: <g><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /><line x1="8" y1="6" x2="16" y2="6" /></g>,
    Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    Zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    Clock: <g><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></g>,
    Users: <g><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></g>,
    Lock: <g><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></g>,
    Phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
    ArrowRight: <g><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></g>,
    Search: <g><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></g>,
    CheckCircle: <g><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></g>,
    Heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    BarChart3: <g><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></g>,
    ChevronDown: <polyline points="6 9 12 15 18 9" />,
    MapPin: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></g>,
    Mail: <g><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></g>,
    X: <g><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></g>
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {icons[name] || null}
    </svg>
  );
};

// ==========================================
// 4. 3D BEAMS COMPONENT
// ==========================================
function extendMaterial(BaseMaterial: any, cfg: any) {
  const physical = THREE.ShaderLib.physical;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = (physical as any).defines ?? {};
  const uniforms = THREE.UniformsUtils.clone(baseUniforms);
  const defaults: any = new BaseMaterial(cfg.material || {});

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]: [string, any]) => { uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u }; });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ''}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ''}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {}) as [string, string][]) vert = vert.replace(inc, `${inc}\n${code}`);
  for (const [inc, code] of Object.entries(cfg.fragment ?? {}) as [string, string][]) frag = frag.replace(inc, `${inc}\n${code}`);

  return new THREE.ShaderMaterial({ defines: { ...baseDefines }, uniforms, vertexShader: vert, fragmentShader: frag, lights: true, fog: !!cfg.material?.fog });
}

const noise = `
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123); }
float noise (in vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st); float a = random(i); float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0)); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0); Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0); vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy); vec4 iz0 = Pi0.zzzz; vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy); vec4 ixy0 = permute(ixy + iz0); vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0; vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0; vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x); vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z); vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x); vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z); vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z)); float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz)); float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);
  vec2 n_yz = mix(n_z.xy,n_z.zw,fade_xyz.y); float n_xyz = mix(n_yz.x,n_yz.y,fade_xyz.x); return 2.2 * n_xyz;
}`;

function createStackedPlanesBufferGeometry(n: number, width: number, height: number, spacing: number, heightSegments: number) {
  const geometry = new THREE.BufferGeometry();
  const numVertices = n * (heightSegments + 1) * 2;
  const numFaces = n * heightSegments * 2;
  const positions = new Float32Array(numVertices * 3);
  const indices = new Uint32Array(numFaces * 3);
  const uvs = new Float32Array(numVertices * 2);
  let vertexOffset = 0; let indexOffset = 0; let uvOffset = 0;
  const totalWidth = n * width + (n - 1) * spacing;
  const xOffsetBase = -totalWidth / 2;

  for (let i = 0; i < n; i++) {
    const xOffset = xOffsetBase + i * (width + spacing);
    const uvXOffset = Math.random() * 300; const uvYOffset = Math.random() * 300;
    for (let j = 0; j <= heightSegments; j++) {
      const y = height * (j / heightSegments - 0.5);
      positions.set([xOffset, y, 0, xOffset + width, y, 0], vertexOffset * 3);
      const uvY = j / heightSegments;
      uvs.set([uvXOffset, uvY + uvYOffset, uvXOffset + 1, uvY + uvYOffset], uvOffset);
      if (j < heightSegments) {
        const a = vertexOffset, b = vertexOffset + 1, c = vertexOffset + 2, d = vertexOffset + 3;
        indices.set([a, b, c, c, b, d], indexOffset); indexOffset += 6;
      }
      vertexOffset += 2; uvOffset += 4;
    }
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}

const MergedPlanes = forwardRef(({ material, width, count, height }: any, ref: any) => {
  const mesh = useRef<any>(null);
  useImperativeHandle(ref, () => mesh.current);
  const geometry = useMemo(() => createStackedPlanesBufferGeometry(count, width, height, 0, 100), [count, width, height]);
  useFrame((_, delta) => mesh.current && (mesh.current.material.uniforms.time.value += 0.1 * delta));
  return <mesh ref={mesh} geometry={geometry} material={material} />;
});
MergedPlanes.displayName = 'MergedPlanes';

const PlaneNoise = forwardRef((props: any, ref: any) => <MergedPlanes ref={ref} {...props} />);
PlaneNoise.displayName = 'PlaneNoise';

const Beams = ({ beamWidth = 2, beamHeight = 15, beamNumber = 12, lightColor = '#ffffff', speed = 2, noiseIntensity = 1.75, scale = 0.2, rotation = 0 }: any) => {
  const meshRef = useRef(null);
  const beamMaterial = useMemo(() => extendMaterial(THREE.MeshStandardMaterial, {
    header: `varying vec3 vEye; varying float vNoise; varying vec2 vUv; varying vec3 vPosition; uniform float time; uniform float uSpeed; uniform float uNoiseIntensity; uniform float uScale; ${noise}`,
    vertexHeader: `
      float getPos(vec3 pos) { vec3 noisePos = vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale; return cnoise(noisePos); }
      vec3 getCurrentPos(vec3 pos) { vec3 newpos = pos; newpos.z += getPos(pos); return newpos; }
      vec3 getNormal(vec3 pos) {
        vec3 curpos = getCurrentPos(pos); vec3 nextposX = getCurrentPos(pos + vec3(0.01, 0.0, 0.0)); vec3 nextposZ = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
        return normalize(cross(normalize(nextposZ - curpos), normalize(nextposX - curpos)));
      }`,
    vertex: { '#include <begin_vertex>': `transformed.z += getPos(transformed.xyz);`, '#include <beginnormal_vertex>': `objectNormal = getNormal(position.xyz);` },
    fragment: { '#include <dithering_fragment>': `float randomNoise = noise(gl_FragCoord.xy); gl_FragColor.rgb -= randomNoise / 15. * uNoiseIntensity;` },
    material: { fog: true },
    uniforms: {
      diffuse: new THREE.Color(0,0,0), time: { shared: true, mixed: true, linked: true, value: 0 },
      roughness: 0.3, metalness: 0.3, uSpeed: { shared: true, mixed: true, linked: true, value: speed },
      envMapIntensity: 10, uNoiseIntensity: noiseIntensity, uScale: scale
    }
  }), [speed, noiseIntensity, scale]);

  return (
    <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">
      <group rotation={[0, 0, degToRad(rotation)]}>
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <directionalLight color={lightColor} intensity={1} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={['#000000']} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </Canvas>
  );
};

// ==========================================
// 5. UI UTILITIES
// ==========================================
function WaveDivider({ className = '', fill = 'var(--navy-mid)' }: { className?: string; fill?: string }) {
  return (
    <div className={`wave-divider ${className}`}>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative' }}>
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" style={{ fill, opacity: 0.1 }} />
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" style={{ fill }} />
      </svg>
    </div>
  );
}

function StatCard({ label, value, suffix = '', prefix = '', delay = 0 }: any) {
  return (
    <div className="text-center reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-number">{prefix}{value}{suffix}</div>
      <p style={{ fontSize: '0.88rem', color: 'inherit', opacity: 0.8, marginTop: '0.4rem', fontWeight: 500 }}>{label}</p>
    </div>
  );
}

// ==========================================
// 6. MAIN COMPONENT EXPORT
// ==========================================
export default function ComplianceSite() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.compliance-portable-root .reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setStickyVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => { 
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); 
    setMenuOpen(false); 
  };

  const navContent = content.nav;
  const brand = content.brand;

  return (
    <div className="compliance-portable-root">
      <style>{CSS_STYLES}</style>
      
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container flex-b">
          <div className="nav-logo">{brand.name}<span>{brand.suffix}</span><span style={{ fontSize: '0.6rem', background: 'var(--gold)', color: '#1F1F24', borderRadius: 4, padding: '1px 5px', marginLeft: 8, fontWeight: 800 }}>{brand.badge}</span></div>
          <ul className="nav-links">{navContent.links.map(l => <li key={l.id}><span className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</span></li>)}</ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn btn--primary btn--sm" onClick={() => scrollTo('contact')}>{navContent.cta}</button>
            <div className="hamburger" onClick={() => setMenuOpen(true)} style={{ display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}>
              <span style={{ width: 20, height: 2, background: '#fff', display: 'block' }} /><span style={{ width: 20, height: 2, background: '#fff', display: 'block' }} /><span style={{ width: 20, height: 2, background: '#fff', display: 'block' }} />
            </div>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><Icon name="X" size={28} /></button>
        {navContent.links.map(l => <span key={l.id} className="nav-link" style={{ fontSize: '1.5rem' }} onClick={() => scrollTo(l.id)}>{l.label}</span>)}
        <button className="btn btn--primary btn--lg" onClick={() => scrollTo('contact')}>{navContent.cta}</button>
      </div>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Beams beamWidth={3} beamHeight={30} beamNumber={20} lightColor="#ffffff" speed={2} noiseIntensity={1.75} scale={0.2} rotation={30} />
          </div>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="hero-main" style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="reveal mb-lg" style={{ marginBottom: '2rem' }}><div className="pill pill--gold"><Icon name="CheckCircle" size={14} /> {content.hero.pill}</div></div>
              <h1 className="reveal delay-1 mb-md" style={{ fontSize: 'clamp(1.75rem, 4.8vw, 3.8rem)', textAlign: 'center', color: '#F5F0E8' }}>
                {content.hero.title} {content.hero.subtitle.split(' ')[0]}<br/>{content.hero.subtitle.split(' ').slice(1).join(' ')} <span style={{ color: 'var(--gold)', position: 'relative' }}>{content.hero.highlight}</span>
              </h1>
              <p className="reveal delay-2 mb-xl" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'var(--text-light)', opacity: 0.9, maxWidth: '680px', marginBottom: '2.5rem', marginTop: '1rem' }}>{content.hero.description}</p>
              <div className="reveal delay-3 flex gap-md" style={{ justifyContent: 'center', gap: '1rem' }}>
                <button className="btn btn--primary btn--lg" onClick={() => scrollTo('contact')}>{content.hero.ctaPrimary} <Icon name="ArrowRight" size={20} /></button>
                <button className="btn btn--ghost btn--lg" onClick={() => scrollTo('process')}><Icon name="Search" size={18} /> {content.hero.ctaSecondary}</button>
              </div>
              <div className="reveal delay-5 mt-lg" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {content.hero.trustBar.map((item, i) => <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.8, fontSize: '0.9rem', color: 'var(--text-light)' }}><Icon name={item.icon} size={16} style={{ color: 'var(--gold)' }} /> {item.label}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>
        <WaveDivider className="wave-divider--bottom" fill="var(--navy-mid)" />

        {/* STATS */}
        <section className="stats-band" style={{ background: 'var(--navy)', padding: '5rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
              {content.statsBand.map((s, i) => <StatCard key={i} {...s} delay={i * 100} />)}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section section--light" id="services" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="text-center mb-xl reveal" style={{ marginBottom: '4rem' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{content.services.label}</span></div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>{content.services.title} <span className="gradient-text">{content.services.titleGradient}</span></h2>
              <p style={{ maxWidth: 540, margin: '1rem auto' }}>{content.services.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {content.services.groups.map((group, i) => (
                <div key={i} className="card reveal">
                  <h3 style={{ marginBottom: '.5rem', color: 'var(--white)' }}>{group.title}</h3>
                  <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>{group.audience}</p>
                  <ul style={{ paddingLeft: '1.2rem', marginBottom: '2rem', color: 'var(--text-light)', opacity: 0.9 }}>
                    {group.items.map((item, j) => <li key={j} style={{ marginBottom: 8 }}>{item}</li>)}
                  </ul>
                  <button className="btn btn--ghost btn--sm" style={{ width: 'calc(100% - 3rem)', position: 'absolute', bottom: '1.5rem', left: '1.5rem' }} onClick={() => scrollTo('contact')}>Request Service</button>
                  <div style={{ height: '3rem' }}></div>
                </div>
              ))}
            </div>
          </div>
          <WaveDivider className="wave-divider--bottom" fill="var(--navy)" />
        </section>

        {/* WHY US */}
        <section className="section" id="why-us" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-glow) 100%)', color: 'var(--text-light)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div className="reveal">
                <h2 style={{ color: 'var(--text-light)' }}>{content.whyUs.title} <span className="gradient-text">{content.whyUs.titleAccent}</span><br />{content.whyUs.subtitle}</h2>
                <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', color: 'var(--text-light)', opacity: 0.9 }}>{content.whyUs.description}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {content.whyUs.benefits.map((benefit, i) => (
                  <div key={i} className="card reveal" style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-light)' }}>
                    <div className="icon-box" style={{ marginBottom: '1rem', background: 'rgba(212, 199, 168, 0.1)', borderColor: 'var(--gold-soft)', color: 'var(--gold)' }}><Icon name={benefit.icon} size={24} /></div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '.5rem', color: 'var(--white)' }}>{benefit.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', opacity: 0.8 }}>{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <WaveDivider className="wave-divider--bottom" fill="var(--white)" />
        </section>

        {/* PROCESS */}
        <section className="section" id="process" style={{ background: 'var(--white)' }}>
          <div className="container">
            <div className="text-center mb-xl reveal" style={{ marginBottom: '4rem' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{content.process.label}</span></div>
              <h2 style={{ color: 'var(--text-dark)' }}>{content.process.title} <span className="gradient-text">{content.process.titleGradient}</span></h2>
              <p style={{ margin: '1rem auto' }}>{content.process.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {content.process.steps.map((step, i) => (
                <div key={i} className="card reveal">
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--gold))', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0, fontSize: '1.25rem', boxShadow: '0 4px 12px rgba(212, 199, 168, 0.3)' }}>{step.n}</div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--white)' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', opacity: 0.8 }}>{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <WaveDivider className="wave-divider--bottom" fill="var(--white)" />
        </section>

        {/* FAQ */}
        <section className="section" id="faq" style={{ background: 'var(--white)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="text-center mb-xl reveal" style={{ marginBottom: '3rem' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}><span className="label-text">{content.faq.label}</span></div>
              <h2>{content.faq.title} <span className="gradient-text">{content.faq.titleAccent}</span></h2>
            </div>
            <div className="reveal">
              {content.faq.items.map((item, i) => (
                <div key={i} className="accordion-item" style={{ background: '#2D2D35', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                  <button className="accordion-header" onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ color: 'var(--text-light)', padding: '1.5rem 2rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.q}</span>
                    <div style={{ transform: activeFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.3s ease', color: 'var(--gold)' }}><Icon name="ChevronDown" size={20} /></div>
                  </button>
                  {activeFaq === i && <div className="accordion-content" style={{ padding: '0 2rem 1.5rem 2rem', color: 'rgba(248, 246, 242, 0.7)', lineHeight: '1.7', borderTop: 'none' }}>{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
          <WaveDivider className="wave-divider--bottom" fill="var(--navy)" />
        </section>

        {/* CONTACT */}
        <section className="section" id="contact" style={{ background: 'var(--navy)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
              <div className="reveal">
                <div className="section-label"><span className="label-text">{content.contact.label}</span></div>
                <h2 style={{ color: '#fff' }}>{content.contact.title} <span className="gradient-text">{content.contact.titleGradient}</span>{content.contact.titleSuffix}</h2>
                <p style={{ margin: '1rem 0 2rem', color: 'var(--text-light)' }}>{content.contact.description}</p>
                {content.contact.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    <div className="icon-box" style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--gold)' }}><Icon name={item.icon} size={20} /></div>
                    <div style={{ color: '#fff' }}>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.label}</div>
                      <div style={{ fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card reveal" style={{ background: 'var(--navy-glow)', color: '#fff', borderColor: 'transparent', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <h3 style={{ color: '#fff', marginBottom: 20 }}>{content.contact.form.title}</h3>
                <form onSubmit={e => { e.preventDefault(); alert(content.contact.form.successMsg); }}>
                  <input className="form-input" placeholder={content.contact.form.placeholders.name} style={{ marginBottom: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <input className="form-input" placeholder={content.contact.form.placeholders.phone} style={{ marginBottom: 12, background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <input className="form-input" placeholder={content.contact.form.placeholders.email} style={{ marginBottom: 20, background: 'rgba(255,255,255,0.05)', color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }} />
                  <button className="btn btn--primary" style={{ width: '100%' }} type="submit">{content.contact.form.cta}</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ background: '#111', color: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              <div className="nav-logo" style={{ marginBottom: 16 }}>{brand.name}<span>{brand.suffix}</span></div>
              <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{content.footer.description}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--gold)', marginBottom: 16, fontSize: '0.9rem' }}>Services</h4>
              {content.footer.links.services.map((s, i) => <div key={i} style={{ fontSize: '0.85rem', marginBottom: 8, opacity: 0.7 }}>{s}</div>)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '3rem', paddingTop: '1.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
            {content.footer.disclaimer}
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <div className={`sticky-cta ${stickyVisible ? 'visible' : ''}`}>
        <button className="btn btn--primary" onClick={() => scrollTo('contact')}>{navContent.cta}</button>
      </div>
    </div>
  );
}
