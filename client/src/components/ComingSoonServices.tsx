import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export default function ComingSoonServices() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Animation states
  const [scrollY, setScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Calculate animation values based on scroll position
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Get hero section height and position
    const heroHeight = heroRef.current.offsetHeight;
    const heroTop = heroRef.current.getBoundingClientRect().top + window.scrollY;
    
    // Determine if hero is still in viewport
    const heroBottom = heroTop + heroHeight;
    const isVisible = scrollY < heroBottom;
    setHeroVisible(isVisible);
    
    // Apply animations to hero content and image based on scroll position
    if (heroContentRef.current && heroImageRef.current) {
      // Calculate progress (0 when at top, 1 when scrolled past hero)
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
      
      // Apply parallax effect
      heroContentRef.current.style.transform = `translateY(${progress * 50}px)`;
      heroContentRef.current.style.opacity = `${1 - progress * 1.5}`;
      
      // Rotate and scale the image
      heroImageRef.current.style.transform = `rotate(${progress * 10}deg) scale(${1 - progress * 0.2})`;
      heroImageRef.current.style.opacity = `${1 - progress * 1.5}`;
    }
  }, [scrollY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend service
    // to store the email for notifications
    setSubmitted(true);
    setEmail('');
  };

  // Define offerings data structure
  const offerings = [
    {
      function: 'Pre-Sales',
      aiTools: '🧠 Proposal Builder Agent (inputs: problem → outputs: proposal, solution sketch)',
      peopleServices: 'Proposal writers, demo engineers'
    },
    {
      function: 'Marketing',
      aiTools: '📢 Marketing Automation (auto-generate social content, blogs, newsletters)',
      peopleServices: 'Brand consultants'
    },
    {
      function: 'Talent Acquisition',
      aiTools: '🔍 Profile search, resume-job match, referral graph, AI interviewer',
      peopleServices: 'Recruiters, candidate screeners'
    },
    {
      function: 'Delivery Ops',
      aiTools: '✅ Task AI Agent: assigns, follows up, and updates tools like Jira automatically',
      peopleServices: 'PMs, delivery coordinators'
    },
    {
      function: 'Billing & Agreements',
      aiTools: '📑 Self-configured invoicing, milestone tracking, contract templates',
      peopleServices: 'Finance/admin staff if needed'
    }
  ];

  // Define audience segments
  const audiences = [
    {
      title: 'Independent Experts',
      description: 'Need help building a consulting practice or handling ops.',
      icon: '👨‍💻',
      benefits: [
        'Complete operational support to focus on client work',
        'Automated proposal generation and contract management',
        'No overhead costs of hiring administrative staff'
      ]
    },
    {
      title: 'Small Staff Aug Firms',
      description: 'Want scalable support for pre-sales, delivery, or admin.',
      icon: '🏢',
      benefits: [
        'Scale operations without proportional headcount increase',
        'Consistent quality across all admin and operational functions',
        'Reduce time spent on non-billable activities'
      ]
    },
    {
      title: 'Mid-size Consulting Cos.',
      description: 'Selective outsourcing of specific functions like proposals or sourcing.',
      icon: '🌐',
      benefits: [
        'Modular services that integrate with existing systems',
        'Enhanced capabilities for peak demand periods',
        'Focus internal resources on strategic growth areas'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className={`absolute w-20 h-20 bg-gradient-to-r opacity-20 rounded-full animate-float-${(index % 5) + 1}`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                background: `linear-gradient(${Math.random() * 360}deg, rgba(236, 72, 153, 0.4), rgba(99, 102, 241, 0.4))`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold text-white flex items-center">
            <span className="mr-2 text-2xl">🤖</span>
            OTTOBON
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`text-white/90 hover:text-white font-medium transition ${activeTab === 'overview' ? 'border-b-2 border-pink-400' : ''}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('audience')}
              className={`text-white/90 hover:text-white font-medium transition ${activeTab === 'audience' ? 'border-b-2 border-pink-400' : ''}`}
            >
              Who It's For
            </button>
            <button 
              onClick={() => setActiveTab('offerings')}
              className={`text-white/90 hover:text-white font-medium transition ${activeTab === 'offerings' ? 'border-b-2 border-pink-400' : ''}`}
            >
              Offerings
            </button>
            <a 
              href="#notify"
              className="text-white/90 hover:text-white font-medium transition"
            >
              Get Notified
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 hover:text-white font-medium transition bg-white/10 px-4 py-2 rounded-full"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Portal
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-r from-purple-800/90 to-indigo-800/90 backdrop-blur-md p-4 space-y-4 border-t border-white/10">
            <button 
              onClick={() => {
                setActiveTab('overview');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'overview' 
                ? 'bg-white/20 text-white' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => {
                setActiveTab('audience');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'audience' 
                ? 'bg-white/20 text-white' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              Who It's For
            </button>
            <button 
              onClick={() => {
                setActiveTab('offerings');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'offerings' 
                ? 'bg-white/20 text-white' 
                : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
            >
              Offerings
            </button>
            <a 
              href="#notify"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 rounded-lg text-white/90 hover:bg-white/10 hover:text-white transition"
            >
              Get Notified
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 flex flex-col items-center">
        {/* Hero Banner */}
        <div 
          ref={heroRef}
          className="w-full relative overflow-hidden rounded-2xl mb-16 bg-gradient-to-r from-purple-800 to-pink-800"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Animated background elements */}
          <div 
            className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl"
            style={{
              transform: `translateY(${-scrollY * 0.08}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          ></div>
          
          {/* Floating particles that move with scroll */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.1)}px)`,
                transition: 'transform 0.1s ease-out'
              }}
            ></div>
          ))}
          
          <div className="relative z-10 flex flex-col md:flex-row items-center py-16 px-8 md:px-12">
            <div 
              ref={heroContentRef}
              className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8 transition-all duration-300"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/30 text-pink-300 font-semibold text-sm mb-6 backdrop-blur-sm">
                <span className="mr-2">⚡</span>
                <span>Coming Soon</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Services Org</span>
              </h1>
              
              <p className="text-xl text-purple-100 mb-8 max-w-3xl">
                Empowering experts and consulting businesses with operational and strategic support
              </p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div 
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                  style={{ 
                    transform: `translateX(${-scrollY * 0.2}px)`,
                    transition: 'transform 0.2s ease-out' 
                  }}
                >
                  <span className="text-lg mr-2">🧠</span>
                  <span>AI-Powered Tools</span>
                </div>
                <div 
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                  style={{ 
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.2s ease-out' 
                  }}
                >
                  <span className="text-lg mr-2">💼</span>
                  <span>Expert Support</span>
                </div>
                <div 
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white"
                  style={{ 
                    transform: `translateX(${scrollY * 0.2}px)`,
                    transition: 'transform 0.2s ease-out' 
                  }}
                >
                  <span className="text-lg mr-2">🚀</span>
                  <span>Scale On Demand</span>
                </div>
              </div>
            </div>
            
            <div 
              ref={heroImageRef}
              className="w-full md:w-1/3 flex justify-center transition-all duration-300"
            >
              <div 
                className="relative w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-lg flex items-center justify-center border border-white/20"
                style={{
                  transition: 'all 0.3s ease-out',
                  boxShadow: `0 0 60px rgba(${(150 - scrollY * 0.5)}, ${(60 - scrollY * 0.2)}, ${(255 - scrollY * 0.5)}, 0.2)`
                }}
              >
                <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"></div>
                <div className="text-8xl z-10 transition-transform duration-300" style={{ transform: `rotate(${scrollY * 0.05}deg)` }}>🤖</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Introduction section */}
        <div className="max-w-4xl mx-auto text-center mb-16 relative">
          {/* Moving gradient background effect */}
          <div 
            className="absolute inset-0 -z-10 rounded-2xl overflow-hidden opacity-60"
            style={{ 
              transform: `translateY(${scrollY * 0.03}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-pink-700/20 blur-xl"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-3xl"
              style={{ 
                transform: `translateX(${scrollY * 0.05}px)`,
                transition: 'transform 0.2s ease-out'
              }}
            ></div>
          </div>
          
          <h2 
            className="text-3xl font-bold text-white mb-6"
            style={{ 
              transform: `translateY(${Math.max(0, scrollY - 200) * 0.08}px)`,
              opacity: 1 - Math.max(0, (scrollY - 300) * 0.002),
              transition: 'all 0.2s ease-out'
            }}
          >
            Execution Engine for Consultants
          </h2>
          
          <p 
            className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto"
            style={{ 
              transform: `translateY(${Math.max(0, scrollY - 220) * 0.1}px)`,
              opacity: 1 - Math.max(0, (scrollY - 320) * 0.002),
              transition: 'all 0.2s ease-out'
            }}
          >
            Our PSO helps experts focus on their core competencies by providing comprehensive operational and strategic support including sales, marketing, talent acquisition, payroll and billing.
          </p>
          
          <div 
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
            style={{ 
              transform: `translateY(${Math.max(0, scrollY - 240) * 0.05}px)`,
              opacity: 1 - Math.max(0, (scrollY - 340) * 0.002),
              transition: 'all 0.2s ease-out'
            }}
          >
            <p className="text-lg text-purple-50">
              <span className="font-bold">Mission:</span> To transform how consulting businesses operate by combining AI-powered automation with human expertise, freeing consultants to focus on delivering exceptional client value.
            </p>
          </div>
          
          {/* Animated side elements */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
            style={{ 
              transform: `translateX(${-50 + scrollY * 0.1}px) scale(${1 + scrollY * 0.001})`,
              opacity: 0.7 - Math.max(0, (scrollY - 400) * 0.002),
              transition: 'all 0.2s ease-out'
            }}
          ></div>
          
          <div 
            className="absolute right-0 top-1/3 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
            style={{ 
              transform: `translateX(${50 - scrollY * 0.08}px) translateY(${scrollY * 0.05}px)`,
              opacity: 0.6 - Math.max(0, (scrollY - 400) * 0.002),
              transition: 'all 0.2s ease-out'
            }}
          ></div>
        </div>

        {/* Tabs Navigation */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'overview' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('audience')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'audience' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Who It's For
            </button>
            <button 
              onClick={() => setActiveTab('offerings')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'offerings' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Offerings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">The Execution Engine for Consultants</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Operational Excellence
                  </h3>
                  <p className="text-purple-100">
                    We handle the administrative burden of running a consulting business, from marketing to billing, allowing you to focus on what you do best.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🤖</span>
                    AI-Powered Tools
                  </h3>
                  <p className="text-purple-100">
                    Our suite of AI tools automates repetitive tasks and generates high-quality deliverables from proposals to marketing content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔄</span>
                    Flexible Support Model
                  </h3>
                  <p className="text-purple-100">
                    Choose between fully-automated solutions or add human expertise where it matters most to your business.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">💼</span>
                    Scale On Demand
                  </h3>
                  <p className="text-purple-100">
                    Grow your consulting practice without the overhead of hiring full-time operational staff or worrying about scaling challenges.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Our Approach</h3>
                <p className="text-purple-100 mb-4">
                  The PSO combines cutting-edge AI technology with human expertise to deliver a comprehensive support system for consultants and consulting firms. Whether you're a solo practitioner or managing a team of experts, our platform adapts to your specific needs.
                </p>
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => setActiveTab('offerings')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Explore Our Offerings
                      <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shine"></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Who Benefits from Our PSO</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {audiences.map((audience, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-4">
                      <span className="text-3xl">{audience.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{audience.title}</h3>
                    <p className="text-purple-100 mb-4">{audience.description}</p>
                    
                    <h4 className="text-sm font-medium text-pink-300 mb-2">KEY BENEFITS</h4>
                    <ul className="space-y-2 mt-auto">
                      {audience.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-pink-400 mr-2 mt-1">✓</span>
                          <span className="text-purple-50 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offerings Tab */}
          {activeTab === 'offerings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">PSO Service Offerings</h2>
              <p className="text-center text-purple-100 mb-8">Our execution engine helps experts and consultants scale by automating or augmenting core business functions</p>
              
              <div className="relative overflow-x-auto rounded-xl border border-white/10 backdrop-blur-sm">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase bg-purple-900/50 text-purple-100">
                    <tr>
                      <th className="px-6 py-4">Business Function</th>
                      <th className="px-6 py-4">AI Tools / Features</th>
                      <th className="px-6 py-4">Optional People Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerings.map((offering, index) => (
                      <tr key={index} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                        <td className="px-6 py-4 text-white font-medium">{offering.function}</td>
                        <td className="px-6 py-4 text-purple-100">{offering.aiTools}</td>
                        <td className="px-6 py-4 text-purple-100">{offering.peopleServices}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Flexible Operating Model</h3>
                <p className="text-purple-100 text-center">
                  Choose your ideal balance between AI automation and human support.
                  Scale up human involvement for complex projects or rely on our AI tools for routine tasks.
                </p>
              </div>
            </div>
          )}
        </div>
          
        {/* Notification Form */}
        <div id="notify" className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-xl mx-auto">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
              <p className="text-purple-100 mb-4">
                You'll be the first to know when our professional services launch.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-purple-300 hover:text-white transition"
              >
                Sign up with another email
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Get Notified at Launch</h3>
              <p className="text-purple-100 mb-6 text-center">
                Be the first to know when we launch our professional services. Early subscribers will receive exclusive benefits.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Notify Me
                    <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shine"></span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 sm:mb-0">
            © 2025 Ottobon. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition">Privacy</a>
            <a href="#" className="text-white/60 hover:text-white transition">Terms</a>
            <a href="#" className="text-white/60 hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}