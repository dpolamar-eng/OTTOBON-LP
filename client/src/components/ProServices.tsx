import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export default function ProServices() {
  const [, navigate] = useLocation();
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero banner slides
  const heroSlides = [
    {
      title: "Professional Services Org",
      subtitle: "Empowering experts with AI-powered operational support",
      icon: "💼",
      imagePath: "/images/consulting-team.jpg",
      gradient: "from-indigo-900/80 to-purple-900/80"
    },
    {
      title: "End-to-End Business Support",
      subtitle: "From pre-sales to invoicing, we've got your back office covered",
      icon: "🔄",
      imagePath: "/images/business-meeting.jpg",
      gradient: "from-blue-900/80 to-purple-900/80"
    },
    {
      title: "Focus On Your Expertise",
      subtitle: "Let our AI handle the routine tasks while you deliver client value",
      icon: "🚀",
      imagePath: "/images/ai-automation.jpg",
      gradient: "from-emerald-900/80 to-blue-900/80"
    }
  ];
  
  // Service offerings data (4 services to demonstrate carousel)
  const services = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      details: "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs.",
      features: [
        'AI-powered proposal builder that learns your style',
        'Solution architecture sketches and diagrams',
        'Automated pricing recommendations based on market data'
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
        'AI-generated social media content customized to your brand',
        'Thought leadership articles on trending industry topics',
        'Email newsletter campaigns with performance analytics'
      ]
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      details: "Let AI handle routine tasks and documentation while you focus on high-value client strategy and relationship management.",
      features: [
        'AI-powered task management integrated with popular tools',
        'Automated status reports and client updates',
        'Risk identification and mitigation suggestions'
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
        'Automated invoice generation based on time tracking',
        'Contract management with renewal reminders',
        'Expense tracking with receipt scanning'
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
  
  // For carousel navigation
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Toggle card expansion
  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Calculate visible cards based on screen size
  const scrollCards = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const cardWidth = 320; // approx width of each card including gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🤖</span>
            <h1 className="text-xl font-bold">OTTOBON</h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Portal
          </button>
        </div>
      </header>

      <main className="pt-16 pb-16">
        {/* Container for all sections */}
        <div className="container mx-auto px-4">
          {/* Hero Banner with Icon + Text + Image */}
          <section className="mb-6 mt-4 bg-gray-900 rounded-xl overflow-hidden">
            <div className="h-[400px] relative">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>

                  {/* The three column layout: Icon + Text + Image */}
                  <div className="relative h-full flex flex-col md:flex-row items-center justify-between px-6 py-10">
                    {/* Left column: Icon */}
                    <div className="w-full md:w-1/4 flex justify-center md:justify-end mb-4 md:mb-0">
                      <div 
                        className="w-28 h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                        style={{ animation: 'icon-float 3s ease-in-out infinite' }}
                      >
                        <span className="text-6xl">{slide.icon}</span>
                      </div>
                    </div>
                    
                    {/* Middle column: Text */}
                    <div className="w-full md:w-2/5 text-center md:text-left md:px-6 mb-4 md:mb-0">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-white/90 mb-6">
                        {slide.subtitle}
                      </p>
                      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                        Learn More
                      </button>
                    </div>
                    
                    {/* Right column: Image */}
                    <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                      <div className="relative w-56 h-56 rounded-xl overflow-hidden shadow-xl border-2 border-white/20 transform rotate-3 transition-transform hover:rotate-0">
                        <img 
                          src={slide.imagePath} 
                          alt={slide.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Slide navigation */}
              <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentSlide 
                        ? 'bg-white w-10' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>
          
          {/* Overview Section */}
          <section className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-300 mb-4">
              The Ottobon Professional Services Organization (PSO) provides consultants with comprehensive operational and administrative support powered by advanced AI and expert human assistance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-indigo-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Operational Excellence</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Our AI agents handle administrative tasks with greater speed and consistency than human staff.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-purple-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Human-AI Collaboration</h3>
                </div>
                <p className="text-sm text-gray-400">
                  For complex tasks, our expert human team works seamlessly with AI systems.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-cyan-600/30 p-2 mr-3">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold">Flexible Service Model</h3>
                </div>
                <p className="text-sm text-gray-400">
                  Choose AI-only automation or add human expertise based on your needs.
                </p>
              </div>
            </div>
          </section>
          
          {/* Services Section - Carousel with 3 visible cards */}
          <section className="bg-purple-900/20 rounded-xl p-6 border border-purple-800/30 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">Our Service Offerings</h2>
                <p className="text-sm text-gray-300">Each service combines AI automation with optional human support</p>
              </div>
              
              {/* Carousel Navigation */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => scrollCards('left')}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Previous services"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => scrollCards('right')}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                  aria-label="Next services"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Service Cards Carousel */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto pb-6 scrollbar-hide gap-4 snap-x"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none' 
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start"
                >
                  <div className={`h-[380px] perspective-1000 ${expandedCards[service.id] ? 'flipped' : ''}`}>
                    {/* Front of card - uses opacity instead of transform for better mobile support */}
                    <div 
                      className={`absolute inset-0 rounded-xl bg-white/5 border border-white/20 transition-all duration-300 ${
                        expandedCards[service.id] ? 'opacity-0 pointer-events-none' : 'opacity-100'
                      }`}
                      onClick={() => toggleCard(service.id)}
                      style={{ animation: 'soft-glow 3s infinite ease-in-out' }}
                    >
                      {/* Card header */}
                      <div 
                        className={`bg-gradient-to-r ${service.color} p-5 rounded-t-xl flex items-center`}
                        style={{ 
                          backgroundSize: '200% 200%',
                          animation: 'gradient-shift 3s ease infinite'
                        }}
                      >
                        <div 
                          className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4"
                          style={{ animation: 'icon-float 3s ease-in-out infinite' }}
                        >
                          <span className="text-3xl">{service.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      </div>
                      
                      {/* Card content */}
                      <div className="p-5 flex flex-col h-[calc(100%-88px)]">
                        <p className="text-gray-200 mb-6">{service.description}</p>
                        
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-indigo-400 text-sm font-medium">View Details</span>
                          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div 
                      className={`absolute inset-0 rounded-xl bg-gray-800 border border-white/10 p-6 transition-all duration-300 ${
                        expandedCards[service.id] ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                      }`}
                      onClick={() => toggleCard(service.id)}
                      style={{ animation: expandedCards[service.id] ? 'card-pulse 2s ease-in-out infinite' : 'none' }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <button className="bg-white/10 hover:bg-white/20 p-1 rounded-full">
                          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-300 mb-5 text-sm">{service.details}</p>
                      
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-indigo-400 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-4 h-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Audience Section */}
          <section className="bg-emerald-900/20 rounded-xl p-6 border border-emerald-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Who We Serve</h2>
            <p className="text-gray-300 mb-4">
              Our flexible service model adapts to different consulting business models and scales.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {audiences.map((audience, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className={`w-16 h-16 rounded-full mb-4 bg-gradient-to-br ${audience.color} flex items-center justify-center mx-auto`}>
                    <span className="text-3xl">{audience.icon}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-center">{audience.title}</h3>
                  <p className="text-gray-400 mb-4 text-center text-sm">{audience.description}</p>
                  
                  <div className="space-y-2">
                    {audience.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-indigo-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <p className="text-sm text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-4 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center text-white">
                <span className="text-xl mr-2">🤖</span>
                <span className="font-bold text-lg">OTTOBON</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Professional Services Organization</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} Ottobon Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}