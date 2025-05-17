import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import CareerPathVisualizer from './CareerPathVisualizer';

export default function ProfessionalServicesPage() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
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
  
  // Hero banner slides
  const heroSlides = [
    {
      title: "Professional Services Org",
      subtitle: "Empowering experts with AI-powered operational support",
      image: "💼",
      color: "from-indigo-800 to-purple-700",
      bgClass: "bg-gradient-to-br from-indigo-800 to-purple-700"
    },
    {
      title: "End-to-End Business Support",
      subtitle: "From pre-sales to invoicing, we've got your back office covered",
      image: "🔄",
      color: "from-blue-800 to-cyan-700",
      bgClass: "bg-gradient-to-br from-blue-800 to-cyan-700"
    },
    {
      title: "Focus On Your Expertise",
      subtitle: "Let our AI handle the routine tasks while you deliver client value",
      image: "🚀",
      color: "from-emerald-800 to-teal-700",
      bgClass: "bg-gradient-to-br from-emerald-800 to-teal-700"
    }
  ];
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);
  
  // Service offerings data
  const offerings = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      details: "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs.",
      features: [
        'Proposal Builder AI Agent',
        'Solution Architecture Sketches',
        'Pricing Strategy Recommendations'
      ],
      benefits: [
        'Reduce proposal creation time by 80%',
        'Increase win rates with tailored solutions',
        'Maintain consistent quality and messaging'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing & Visibility',
      icon: '📣',
      color: 'from-purple-600 to-pink-600',
      description: 'Maintain a professional presence with minimal effort',
      details: "Automated content creation that maintains your professional voice while requiring minimal time investment from busy consultants.",
      features: [
        'Social Media Content Generation',
        'Thought Leadership Articles',
        'Email Newsletter Campaigns'
      ],
      benefits: [
        'Consistent brand presence',
        'Thought leadership positioning',
        'Lead generation through content'
      ]
    },
    {
      id: 'talent',
      title: 'Talent Acquisition',
      icon: '🔍',
      color: 'from-emerald-600 to-cyan-600',
      description: 'Find the perfect experts for your client projects',
      details: "Our AI matching system connects you with pre-vetted talent for your specific project needs, whether for staff augmentation or specialized expertise.",
      features: [
        'AI-Powered Skill Matching',
        'Background Verification',
        'Automated Interviewing'
      ],
      benefits: [
        'Access pre-vetted talent pool',
        'Rapidly scale teams for projects',
        'Reduce hiring risks and costs'
      ]
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      details: "Let AI handle routine project management tasks while you focus on strategic decisions and client relationships.",
      features: [
        'Task AI Agent for Jira/Asana',
        'Automated Status Updates',
        'Risk Identification'
      ],
      benefits: [
        'Reduce administrative overhead',
        'Improve project predictability',
        'Maintain client communication'
      ]
    },
    {
      id: 'admin',
      title: 'Admin & Billing',
      icon: '📊',
      color: 'from-rose-600 to-red-600',
      description: 'Automated back-office operations for consultants',
      details: "Streamline administrative tasks with automated invoicing, contract management, and expense tracking that integrates with popular accounting systems.",
      features: [
        'Automated Invoice Generation',
        'Contract Management',
        'Expense Tracking'
      ],
      benefits: [
        'Reduce billing cycles',
        'Improve cash flow management',
        'Minimize administrative overhead'
      ]
    }
  ];
  
  // Audience segments
  const audiences = [
    {
      title: 'Independent Consultants',
      icon: '👤',
      color: 'from-blue-600 to-indigo-600',
      description: 'Operate like a larger firm without the overhead',
      benefits: [
        'Professional back-office support without hiring staff',
        'Focus on your expertise while AI handles operations',
        'Present a polished, professional image to clients'
      ]
    },
    {
      title: 'Small Consulting Firms',
      icon: '👥',
      color: 'from-purple-600 to-pink-600',
      description: 'Scale operations without proportional headcount',
      benefits: [
        'Accelerate growth with operational efficiency',
        'Maintain consistent quality across all functions',
        'Focus your team on billable client work'
      ]
    },
    {
      title: 'Mid-Size Practices',
      icon: '🏢',
      color: 'from-emerald-600 to-cyan-600',
      description: 'Selective function augmentation for optimal efficiency',
      benefits: [
        'Augment specific departments during peak demand',
        'Modular services that integrate with existing systems',
        'Reduce operational costs while improving service'
      ]
    }
  ];
  
  // State for expanded service cards
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  
  // Toggle card expansion
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-blue-950"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🤖</span>
            <h1 className="text-2xl font-bold tracking-tighter">OTTOBON</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                setActiveTab('overview');
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
                activeTab === 'overview' ? 'text-white border-indigo-500' : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => {
                setActiveTab('services');
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
                activeTab === 'services' ? 'text-white border-indigo-500' : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => {
                setActiveTab('audience');
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-medium px-1 py-1 border-b-2 transition-colors ${
                activeTab === 'audience' ? 'text-white border-indigo-500' : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Who It's For
            </button>
            <a 
              href="#career-path"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Career Path Explorer
            </a>
            <a 
              href="#notify"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Get Notified
            </a>
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Portal
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/80 bg-white/10 hover:bg-white/20 p-2 rounded-md mr-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md bg-white/10 hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                  mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-60' : 'max-h-0'
        }`}>
          <div className="bg-gray-900 border-t border-white/10 px-4 py-3 space-y-2">
            <button 
              onClick={() => {
                setActiveTab('overview');
                setMobileMenuOpen(false);
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === 'overview' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => {
                setActiveTab('services');
                setMobileMenuOpen(false);
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === 'services' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => {
                setActiveTab('audience');
                setMobileMenuOpen(false);
                document.getElementById('content-tabs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                activeTab === 'audience' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              Who It's For
            </button>
            <a 
              href="#notify"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800"
            >
              Get Notified
            </a>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 pt-20">
        {/* Hero section */}
        <section className="relative h-[600px] sm:h-[650px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.bgClass}`}
            >
              {/* Decorative elements */}
              <div className="absolute right-0 top-1/4 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute left-0 bottom-1/4 w-1/4 h-1/4 bg-white/10 rounded-full blur-3xl"></div>
              
              {/* Content grid */}
              <div className="container relative z-10 mx-auto h-full px-4 py-12 flex flex-col md:flex-row items-center">
                {/* Left text content */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
                  <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/10 text-white/90 text-sm backdrop-blur-sm">
                    <span className="mr-2">⚡</span>
                    <span>Coming Soon</span>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  
                  <p className="text-xl text-white/90 mb-8 max-w-lg mx-auto md:mx-0">
                    {slide.subtitle}
                  </p>
                </div>
                
                {/* Right image/icon */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                  <div className="relative">
                    {/* Main icon container */}
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-white/5 to-white/10 blur-xl"></div>
                      <div className="text-8xl sm:text-9xl" style={{animation: 'float 6s ease-in-out infinite'}}>{slide.image}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={() => setCurrentSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button 
            onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </section>
        
        {/* Content tabs section */}
        <section id="content-tabs" className="py-12 bg-gray-900">
          <div className="container mx-auto px-4">
            {/* Tab navigation */}
            <div className="flex overflow-x-auto pb-2 mb-8 justify-center">
              <div className="inline-flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'services' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setActiveTab('audience')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'audience' 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Who It's For
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
              {/* Overview tab */}
              {activeTab === 'overview' && (
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6 text-center">Modern Consulting Support</h3>
                  <p className="text-gray-300 mb-6">
                    The Ottobon Professional Services Organization (PSO) provides consultants with a comprehensive suite of operational and administrative support services powered by advanced AI and human expertise.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Operational Excellence
                      </h4>
                      <p className="text-gray-400">
                        Our AI agents handle administrative tasks, document creation, scheduling, follow-ups, and other routine operations with greater speed and consistency than human staff.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Human-AI Collaboration
                      </h4>
                      <p className="text-gray-400">
                        For complex tasks requiring judgment or personalization, our expert human team works seamlessly with AI systems to provide the best of both worlds.
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Flexible Service Model
                      </h4>
                      <p className="text-gray-400">
                        Choose AI-only automation for cost efficiency, or add human expertise for specialized tasks. Scale services up or down based on your current project needs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Services tab */}
              {activeTab === 'services' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center">Our Service Offerings</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto text-center mb-8">
                    Each service combines AI automation with optional human support, allowing you to choose the right balance for your needs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offerings.map((service) => (
                      <div
                        key={service.id}
                        className={`rounded-xl overflow-hidden transition-all duration-300 ${
                          expandedCards[service.id] 
                            ? 'bg-gray-800 transform scale-[1.02] shadow-lg z-10' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div 
                          className={`h-full flex flex-col border border-white/10 rounded-xl overflow-hidden cursor-pointer`}
                          onClick={() => toggleCard(service.id)}
                        >
                          {/* Card header */}
                          <div className={`bg-gradient-to-r ${service.color} p-4 flex items-center`}>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                              <span className="text-xl">{service.icon}</span>
                            </div>
                            <h4 className="font-bold text-white flex-1">{service.title}</h4>
                            <button className="text-white/80 hover:text-white">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth="2" 
                                  d={expandedCards[service.id] ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                                ></path>
                              </svg>
                            </button>
                          </div>
                          
                          {/* Card content */}
                          <div className="p-4 flex-1 flex flex-col">
                            <p className="text-gray-300 mb-4">{service.description}</p>
                            
                            {/* Expanded content */}
                            <div className={`overflow-hidden transition-all duration-300 ${
                              expandedCards[service.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                              <div className="pt-2 space-y-4">
                                <p className="text-gray-400 text-sm">{service.details}</p>
                                
                                <div className="bg-white/5 rounded-lg p-3">
                                  <h5 className="text-sm font-medium text-white/90 mb-2">Key Features</h5>
                                  <ul className="space-y-1">
                                    {service.features.map((feature, i) => (
                                      <li key={i} className="flex items-start text-xs">
                                        <svg className="w-3.5 h-3.5 text-indigo-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="text-gray-300">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="bg-white/5 rounded-lg p-3">
                                  <h5 className="text-sm font-medium text-white/90 mb-2">Benefits</h5>
                                  <ul className="space-y-1">
                                    {service.benefits.map((benefit, i) => (
                                      <li key={i} className="flex items-start text-xs">
                                        <svg className="w-3.5 h-3.5 text-green-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span className="text-gray-300">{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                            
                            {/* Card footer - only visible when not expanded */}
                            <div className={`mt-auto pt-2 text-xs font-medium text-center text-indigo-400 ${
                              expandedCards[service.id] ? 'hidden' : 'block'
                            }`}>
                              Click for details
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Audience tab */}
              {activeTab === 'audience' && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center">Who We Serve</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto text-center mb-8">
                    Our flexible service model adapts to different consulting business models and scales.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {audiences.map((audience, index) => (
                      <div 
                        key={index}
                        className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${audience.color} flex items-center justify-center`}>
                          <span className="text-3xl">{audience.icon}</span>
                        </div>
                        
                        <h4 className="text-xl font-bold mb-2">{audience.title}</h4>
                        <p className="text-gray-400 mb-4">{audience.description}</p>
                        
                        <div className="space-y-2">
                          {audience.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start">
                              <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <p className="text-sm text-gray-300">{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Career Path Visualizer Section */}
        <section id="career-path" className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Interactive Career Path Explorer</h2>
              <p className="text-gray-300">
                Visualize potential career paths in consulting and professional services. Explore role progression, 
                required skills, and expected compensation at each stage of your journey.
              </p>
            </div>
            
            <CareerPathVisualizer initialPath="technical" showSalary={true} />
            
            <div className="mt-8 max-w-xl mx-auto bg-indigo-900/20 rounded-xl p-6 border border-indigo-900/30">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Personalized Career Guidance
              </h3>
              <p className="text-gray-300 mb-4">
                Ottobon PSO offers customized career development support that complements our operational services. 
                Get personalized advice on your career trajectory, skill development priorities, and advancement strategies.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">AI-powered skills assessment and personalized development plans</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Expert coaching from senior consultants in your specialty area</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">Market-based compensation insights and negotiation support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Notification form section */}
        <section id="notify" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-2 text-center">Get Notified at Launch</h2>
              <p className="text-gray-400 mb-6 text-center">
                Be the first to know when Ottobon Professional Services Organization launches.
              </p>
              
              {submitted ? (
                <div className="bg-indigo-900/50 rounded-lg p-4 text-center">
                  <svg className="w-12 h-12 text-indigo-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-lg font-medium mb-1">Thank You!</h3>
                  <p className="text-gray-300">You've been added to our notification list.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Notify Me
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-950 py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center text-white">
                <span className="text-xl mr-2">🤖</span>
                <span className="font-bold text-xl">OTTOBON</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Professional Services Organization</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Terms of Service"
              >
                Terms
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Privacy Policy"
              >
                Privacy
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Contact Us"
              >
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ottobon Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* No custom CSS here - using stylesheet instead */}
    </div>
  );
}