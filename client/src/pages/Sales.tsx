import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  ChevronRight, 
  Plus, 
  Minus, 
  X, 
  Check
} from 'lucide-react';

/**
 * 1. CONTENT DATA (Internalized from content.json)
 */
const content = {
  "branding": {
    "name": "ottobon",
    "logoSymbol": "o"
  },
  "navigation": {
    "links": [
      {"label": "Services", "href": "#services"},
      {"label": "Workflow", "href": "#workflow"},
      {"label": "Results", "href": "#results"},
      {"label": "FAQ", "href": "#faq"}
    ],
    "cta": "Schedule Strategy Call"
  },
  "hero": {
    "badge": "Q2 Optimization: 200 Slots Open",
    "titlePrefix": "Scale up Your ",
    "titleGradient": "Pipeline",
    "subtitle": "The complete engine for Marketing and Growth. We find your customers and help you build a predictable flow of new business.",
    "cta": "Get Pre Sales Support"
  },
  "services": {
    "title": "Our Services",
    "items": [
      {
        "icon": "Activity",
        "title": "Lead Qualification",
        "description": "Deep research and vetting to ensure your account executives only talk to high-intent buyers."
      },
      {
        "icon": "Zap",
        "title": "CRM Optimization",
        "description": "Automated workflows that keep your pipeline moving and your data clean for better forecasting."
      },
      {
        "icon": "ShieldCheck",
        "title": "Deal Support",
        "description": "Technical documentation and collateral generation to help close complex B2B deals faster."
      }
    ]
  },
  "workflow": {
    "title": "Simple Success Process",
    "subtitle": "A streamlined onboarding designed for speed and results.",
    "steps": [
      {
        "id": 1,
        "icon": "Search",
        "title": "Growth Review",
        "description": "We identify gaps in your current marketing and finding customers."
      },
      {
        "id": 2,
        "icon": "Settings",
        "title": "Custom Roadmap",
        "description": "Strategy tailored to your specific market and audience."
      },
      {
        "id": 3,
        "icon": "Rocket",
        "title": "Engine Launch",
        "description": "Deployment of your chosen Marketing Team or AI Engine."
      },
      {
        "id": 4,
        "icon": "UserPlus",
        "title": "Weekly Results",
        "description": "Direct reports and introduction to new interested customers."
      }
    ]
  },
  "results": {
    "stats": [
      {"value": "40%", "label": "Avg Lead Velocity Increase"},
      {"value": "500+", "label": "Qualified Leads Monthly"},
      {"value": "12h", "label": "Avg Response Time"}
    ]
  },
  "faq": {
    "title": "FAQ",
    "subtitle": "Brief answers to common questions.",
    "items": [
      {
        "question": "Team or AI: Which is better?",
        "answer": "It depends on your brand. The Team approach offers high-touch human expertise, while AI offers maximum scale and efficiency."
      },
      {
        "question": "How fast do we see results?",
        "answer": "Typically within the first 14 days of the Engine Launch phase. We focus on early wins while building long-term momentum."
      },
      {
        "question": "Is this suitable for B2C?",
        "answer": "Yes, our engine is optimized for both B2B and high-ticket B2C models where lead qualification is critical."
      },
      {
        "question": "Can I switch between options?",
        "answer": "Absolutely. You can start with AI and scale to a hybrid model or full human team as your requirements evolve."
      }
    ]
  },
  "booking": {
    "title": "Stop Leaving Revenue Behind",
    "description": "Book Your Free 30-Min Growth Review. No sales pitch, just a review of your current opportunities.",
    "checkpoints": [
      "Immediate Review Start",
      "No Commitment Required",
      "Direct Strategy Access"
    ],
    "form": {
      "nameLabel": "Full Name",
      "namePlaceholder": "John Doe",
      "companyLabel": "Company",
      "companyPlaceholder": "Your Firm",
      "emailLabel": "Email",
      "emailPlaceholder": "name@email.com",
      "challengeLabel": "Biggest BD Challenge Right Now?",
      "challengePlaceholder": "Tell us about your current pipeline...",
      "submitButton": "Book Free Audit Now"
    }
  },
  "footer": {
    "copyright": "© 2026 ottobon. All rights reserved.",
    "links": [
      {"label": "Privacy Policy", "href": "#"},
      {"label": "Terms of Service", "href": "#"}
    ]
  }
};

/**
 * 2. TIER 1 - UI COMPONENTS
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  color?: string;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = (LucideIcons as unknown as Record<string, React.ElementType>)[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
};

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  gradient?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Heading = ({ children, level = 1, gradient = false, className = "", style = {} }: HeadingProps) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return (
    <Tag className={`${gradient ? 'gradient-text' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'large' | '';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  iconRight?: React.FC<{ size?: number | string }>;
  style?: React.CSSProperties;
}

const Button = ({ children, variant = 'primary', size = '', onClick, type = 'button', iconRight: IconRight, style = {} }: ButtonProps) => {
  const baseClass = `btn btn-${variant} ${size === 'large' ? 'btn-large' : ''}`;
  return (
    <button type={type} className={baseClass} onClick={onClick} style={style}>
      {children}
      {IconRight && <IconRight size={20} />}
    </button>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  dotColor?: string;
}

const Badge = ({ children, dotColor = '#10B981' }: BadgeProps) => (
  <div className="badge animate-fade-in" style={{ backgroundColor: '#E2F7F0', color: '#10B981', borderColor: 'transparent' }}>
    <span className="badge-dot" style={{ backgroundColor: dotColor }}></span>
    {children}
  </div>
);

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="service-card">
    <Icon name={icon} color="var(--primary)" size={32} style={{ marginBottom: '1.5rem' }} />
    <Heading level={3} style={{ marginBottom: '1rem' }}>{title}</Heading>
    <p style={{ color: 'var(--text-muted)' }}>{description}</p>
  </div>
);

interface StepCardProps {
  number: number;
  icon: string;
  title: string;
  description: string;
}

const StepCard = ({ number, icon, title, description }: StepCardProps) => (
  <div className="step-card">
    <div className="step-number">{number}</div>
    <div className="step-icon-box">
      <Icon name={icon} size={24} />
    </div>
    <Heading level={4}>{title}</Heading>
    <p>{description}</p>
  </div>
);

interface InputFieldProps {
  label: string;
  icon?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
}

const InputField = ({ label, icon, type = "text", placeholder, required = false, isTextArea = false }: InputFieldProps) => (
  <div className="form-group">
    <label>{label}</label>
    <div className="input-wrapper">
      {icon && <Icon name={icon} className="input-icon" size={18} />}
      {isTextArea ? (
        <textarea className="form-textarea" placeholder={placeholder} required={required}></textarea>
      ) : (
        <input type={type} className="form-input" style={{ paddingLeft: icon ? '2.75rem' : '1rem' }} placeholder={placeholder} required={required} />
      )}
    </div>
  </div>
);

/**
 * 3. TIER 2 - LAYOUT COMPONENTS
 */
interface HeaderProps {
  branding: typeof content.branding;
  nav: typeof content.navigation;
  onStartCall: () => void;
}

const Header = ({ branding, nav, onStartCall }: HeaderProps) => (
  <header>
    <div className="container">
      <nav className="nav-bar">
        <div className="logo-container">
          <div className="logo-box">{branding.logoSymbol}</div>
          <div className="logo-text">{branding.name}</div>
        </div>
        <div className="nav-links">
          {nav.links.map((link, i) => (
            <a key={i} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <Button variant="secondary" onClick={onStartCall} style={{ marginLeft: '1rem' }}>
            {nav.cta}
          </Button>
        </div>
      </nav>
    </div>
  </header>
);

interface HeroProps {
  data: typeof content.hero;
  onStartCall: () => void;
}

const Hero = ({ data, onStartCall }: HeroProps) => (
  <section className="hero">
    <div className="container">
      <Badge>{data.badge}</Badge>
      <Heading level={1} className="animate-fade-in delay-1">
        {data.titlePrefix}
        <span className="gradient-text">{data.titleGradient}</span>
      </Heading>
      <p className="subheadline animate-fade-in delay-2">{data.subtitle}</p>
      <div className="animate-fade-in delay-3">
        <Button variant="primary" size="large" iconRight={ChevronRight} onClick={onStartCall}>
          {data.cta}
        </Button>
      </div>
    </div>
  </section>
);

interface ServicesLayoutProps {
  data: typeof content.services;
}

const ServicesLayout = ({ data }: ServicesLayoutProps) => (
  <section id="services" style={{ padding: '100px 0', background: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
    <div className="container">
      <Heading level={2} style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>
        {data.title}
      </Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {data.items.map((item, i) => (
          <ServiceCard key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);

interface WorkflowLayoutProps {
  data: typeof content.workflow;
}

const WorkflowLayout = ({ data }: WorkflowLayoutProps) => (
  <section id="workflow" className="workflow-section">
    <div className="container">
      <div className="section-header">
        <Heading level={2}>{data.title}</Heading>
        <p>{data.subtitle}</p>
      </div>
      <div className="workflow-steps">
        <div className="workflow-line"></div>
        {data.steps.map((step) => (
          <StepCard key={step.id} number={step.id} {...step} />
        ))}
      </div>
    </div>
  </section>
);

interface ResultsLayoutProps {
  data: typeof content.results;
}

const ResultsLayout = ({ data }: ResultsLayoutProps) => (
  <section id="results" className="results-section">
    <div className="container">
      <div className="results-grid">
        {data.stats.map((stat, i) => (
          <div key={i} className="result-stat">
            <Heading level={3} style={{ color: 'white' }}>{stat.value}</Heading>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

interface FAQLayoutProps {
  data: typeof content.faq;
}

const FAQLayout = ({ data }: FAQLayoutProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <Heading level={2}>{data.title}</Heading>
          <p>{data.subtitle}</p>
        </div>
        <div className="faq-container">
          {data.items.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className="faq-question" 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {item.question}
                <div className={`faq-toggle ${activeIndex === index ? 'active' : ''}`}>
                  {activeIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface BookingModalLayoutProps {
  data: typeof content.booking;
  onClose: () => void;
}

const BookingModalLayout = ({ data, onClose }: BookingModalLayoutProps) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button 
        style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', color: 'white', zIndex: 2100 }}
        onClick={onClose}
      >
        <X size={24} />
      </button>
      
      <div className="modal-left">
        <Heading level={2} style={{ color: 'white' }}>{data.title}</Heading>
        <p>{data.description}</p>
        <div className="checkpoint-list">
          {data.checkpoints.map((text, i) => (
            <div key={i} className="checkpoint">
              <div className="check-icon"><Check size={16} /></div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="modal-right">
        <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); onClose(); }}>
          <InputField label={data.form.nameLabel} placeholder={data.form.namePlaceholder} icon="User" required />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1rem' }}>
            <InputField label={data.form.companyLabel} placeholder={data.form.companyPlaceholder} icon="Building2" required />
            <InputField label={data.form.emailLabel} placeholder={data.form.emailPlaceholder} icon="Mail" type="email" required />
          </div>
          <InputField label={data.form.challengeLabel} placeholder={data.form.challengePlaceholder} isTextArea required />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem' }} iconRight={ChevronRight}>
            {data.form.submitButton}
          </Button>
        </form>
      </div>
    </div>
  </div>
);

interface FooterProps {
  data: typeof content.footer;
}

const Footer = ({ data }: FooterProps) => (
  <footer style={{ padding: '40px 0', borderTop: '1px solid var(--gray-200)', marginTop: '60px' }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
      <div>{data.copyright}</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {data.links.map((link, i) => (
          <a key={i} href={link.href}>{link.label}</a>
        ))}
      </div>
    </div>
  </footer>
);

/**
 * 4. CSS STYLES (Internalized from index.css)
 */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #2D68FF;
  --primary-hover: #1e50d6;
  --secondary: #10B981;
  --secondary-hover: #059669;
  --background: #FFFFFF;
  --text-main: #111827;
  --text-muted: #4B5563;
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  --transition: all 0.3s ease;
}

.full-landing-page {
  font-family: 'Outfit', sans-serif;
  background-color: var(--background);
  color: var(--text-main);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.full-landing-page * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.full-landing-page .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.full-landing-page a {
  text-decoration: none;
  color: inherit;
  transition: var(--transition);
}

.full-landing-page button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: var(--transition);
}

/* Typography */
.full-landing-page h1 {
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.full-landing-page .gradient-text {
  background: linear-gradient(90deg, #2D68FF 0%, #10B981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Components */
.full-landing-page .btn {
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.full-landing-page .btn-primary {
  background-color: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 14px 0 rgba(45, 104, 255, 0.39);
}

.full-landing-page .btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}

.full-landing-page .btn-secondary {
  background-color: var(--secondary);
  color: var(--white);
}

.full-landing-page .btn-secondary:hover {
  background-color: var(--secondary-hover);
  transform: translateY(-1px);
}

.full-landing-page .btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
}

/* Layout */
.full-landing-page header {
  height: 80px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  z-index: 1000;
  border-bottom: 1px solid var(--gray-100);
}

.full-landing-page .nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.full-landing-page .nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.full-landing-page .nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
}

.full-landing-page .nav-link:hover {
  color: var(--primary);
}

.full-landing-page .logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.full-landing-page .logo-box {
  width: 32px;
  height: 32px;
  background-color: #111827;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
}

.full-landing-page .logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
}

/* Modal Styles */
.full-landing-page .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1.5rem;
  backdrop-filter: blur(4px);
}

.full-landing-page .modal-content {
  background: #0F172A;
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: modalScale 0.3s ease-out;
  position: relative;
}

@keyframes modalScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.full-landing-page .modal-left {
  flex: 1;
  padding: 3.5rem;
  color: white;
}

.full-landing-page .modal-left h2 {
  font-size: 2.75rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  font-weight: 800;
}

.full-landing-page .modal-left p {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.full-landing-page .checkpoint-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.full-landing-page .checkpoint {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  font-style: italic;
}

.full-landing-page .check-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
}

.full-landing-page .modal-right {
  width: 420px;
  background: white;
  margin: 1.5rem;
  border-radius: 16px;
  padding: 2.5rem;
}

.full-landing-page .form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.full-landing-page .form-group label {
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #64748B;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.full-landing-page .input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.full-landing-page .input-icon {
  position: absolute;
  left: 1rem;
  color: #94A3B8;
}

.full-landing-page .form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #F8FAFC;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.full-landing-page .form-input:focus {
  border-color: var(--secondary);
}

.full-landing-page .form-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #F8FAFC;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  resize: none;
  height: 100px;
}

@media (max-width: 900px) {
  .full-landing-page .modal-content { flex-direction: column; max-height: 90vh; overflow-y: auto; }
  .full-landing-page .modal-right { width: auto; margin: 1rem; }
  .full-landing-page .modal-left { padding: 2rem; }
}

.full-landing-page .hero {
  padding-top: 160px;
  padding-bottom: 80px;
  text-align: center;
}

.full-landing-page .badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.full-landing-page .badge-dot {
  width: 8px;
  height: 8px;
  background-color: var(--secondary);
  border-radius: 50%;
  margin-right: 0.5rem;
  display: inline-block;
}

.full-landing-page .subheadline {
  font-size: 1.25rem;
  color: var(--text-muted);
  max-width: 700px;
  margin: 1.5rem auto 2.5rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.full-landing-page .animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.full-landing-page .delay-1 { animation-delay: 0.2s; }
.full-landing-page .delay-2 { animation-delay: 0.4s; }
.full-landing-page .delay-3 { animation-delay: 0.6s; }

/* Service Cards */
.full-landing-page .service-card {
  padding: 2.5rem;
  background: var(--white);
  border-radius: 16px;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow);
  transition: var(--transition);
  text-align: left;
}

.full-landing-page .service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

/* Workflow Section */
.full-landing-page .workflow-section {
  padding: 100px 0;
  background-color: var(--gray-50);
}

.full-landing-page .section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.full-landing-page .section-header h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.full-landing-page .section-header p {
  color: var(--text-muted);
  font-size: 1.25rem;
}

.full-landing-page .workflow-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
}

.full-landing-page .workflow-line {
  position: absolute;
  top: 40px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: var(--gray-200);
  z-index: 0;
}

.full-landing-page .step-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.full-landing-page .step-number {
  width: 80px;
  height: 80px;
  background: var(--white);
  border: 2px solid var(--secondary);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 2rem;
  box-shadow: 0 4px 0 var(--secondary);
}

.full-landing-page .step-icon-box {
  width: 56px;
  height: 56px;
  background: var(--gray-50);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--secondary);
}

.full-landing-page .step-card h4 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.full-landing-page .step-card p {
  color: var(--text-muted);
  font-size: 0.95rem;
  padding: 0 1rem;
}

/* FAQ Section */
.full-landing-page .faq-section {
  padding: 100px 0;
  background: var(--white);
}

.full-landing-page .faq-container {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid var(--gray-100);
  border-radius: 24px;
  background: var(--gray-50);
  padding: 2.5rem;
  box-shadow: var(--shadow-sm);
}

.full-landing-page .faq-item {
  border-bottom: 1px solid var(--gray-200);
}

.full-landing-page .faq-item:last-child {
  border-bottom: none;
}

.full-landing-page .faq-question {
  width: 100%;
  background: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.full-landing-page .faq-toggle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
}

.full-landing-page .faq-toggle.active {
  background: var(--secondary);
  color: var(--white);
  border-color: var(--secondary);
}

.full-landing-page .faq-answer {
  padding-bottom: 1.5rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Results Section */
.full-landing-page .results-section {
  padding: 100px 0;
  background: var(--primary);
  color: var(--white);
}

.full-landing-page .results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  text-align: center;
}

.full-landing-page .result-stat h3 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.full-landing-page .result-stat p {
  font-size: 1.25rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .full-landing-page h1 { font-size: 2.5rem; }
  .full-landing-page .workflow-steps { grid-template-columns: 1fr; }
  .full-landing-page .workflow-line { display: none; }
  .full-landing-page .results-grid { grid-template-columns: 1fr; }
}
`;

/**
 * 5. MAIN COMPONENT (Unified Entry Point)
 */
export default function Sales() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Inject styles into document head
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="full-landing-page">
      <Header
        branding={content.branding}
        nav={content.navigation}
        onStartCall={toggleModal}
      />

      <main>
        <Hero
          data={content.hero}
          onStartCall={toggleModal}
        />

        {/* Trust Section */}
        <section className="trust-section" style={{ padding: '60px 0', textAlign: 'center' }}>
          <div className="container">
            <hr className="divider" style={{ border: 0, height: '1px', backgroundColor: 'var(--gray-200)', marginBottom: '40px' }} />
            <div className="trust-label" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', opacity: 0.7 }}>
              Empowering 40+ Brands • Average 3.2x Customer Growth
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem', opacity: 0.4 }}>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>COMPASS</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>VELLIA</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>STRIDE</div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>EQUITY</div>
            </div>
          </div>
        </section>

        <ServicesLayout data={content.services} />
        <WorkflowLayout data={content.workflow} />
        <ResultsLayout data={content.results} />
        <FAQLayout data={content.faq} />
      </main>

      <Footer data={content.footer} />

      {isModalOpen && (
        <BookingModalLayout
          data={content.booking}
          onClose={toggleModal}
        />
      )}
    </div>
  );
}
