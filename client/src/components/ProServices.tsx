
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

type ServiceCategory = 'Health Care' | 'Technology Consulting' | 'Legal and Finance';

interface CategoryInfo {
  id: ServiceCategory;
  title: string;
  description: string;
  icon: string;
  isComingSoon?: boolean;
}

const categories: CategoryInfo[] = [
  {
    id: 'Health Care',
    title: 'Health Care',
    description: 'Medical practice management and patient care optimization',
    icon: '🏥'
  },
  {
    id: 'Technology Consulting',
    title: 'Technology Consulting',
    description: 'IT consulting and digital transformation services',
    icon: '💻'
  },
  {
    id: 'Legal and Finance',
    title: 'Legal and Finance',
    description: 'Legal services and financial consulting solutions',
    icon: '⚖️',
    isComingSoon: true
  }
];

export default function ProServices() {
  const [, navigate] = useLocation();
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalService, setModalService] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ServiceCategory>('Health Care');

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

  // Service offerings data
  const services = [
    {
      id: 'presales',
      title: 'Pre-Sales Support',
      icon: '📝',
      iconBg: 'bg-blue-500',
      color: 'from-blue-600 to-indigo-600',
      description: 'Generate compelling proposals in minutes, not days',
      details: "Our AI-powered proposal engine analyzes your prospect's requirements and creates tailored, professional proposals with customized solution designs.",
      features: [
        'AI-powered proposal builder that learns your style',
        'Solution architecture sketches and diagrams',
        'Automated pricing recommendations based on market data'
      ],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'marketing',
      title: 'Marketing & Visibility',
      icon: '📣',
      iconBg: 'bg-purple-500',
      color: 'from-purple-600 to-pink-600',
      description: 'Maintain a professional presence with minimal effort',
      details: "Automated content creation that maintains your professional voice while requiring minimal time investment from busy consultants.",
      features: [
        'AI-generated social media content customized to your brand',
        'Thought leadership articles on trending industry topics',
        'Email newsletter campaigns with performance analytics'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'talent',
      title: 'Talent Acquisition',
      icon: '🔍',
      iconBg: 'bg-emerald-500',
      color: 'from-emerald-600 to-cyan-600',
      description: 'Find the perfect experts for your client projects',
      details: "Our AI matching system connects you with pre-vetted talent for your specific project needs, whether for staff augmentation or specialized expertise.",
      features: [
        'AI-Powered Skill Matching for precise matching',
        'Background Verification and quality assurance',
        'Streamlined Interviewing and onboarding process'
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'delivery',
      title: 'Project Delivery Support',
      icon: '✅',
      iconBg: 'bg-orange-500',
      color: 'from-amber-600 to-orange-600',
      description: 'Streamline project management with AI assistance',
      details: "Let AI handle routine tasks and documentation while you focus on high-value client strategy and relationship management.",
      features: [
        'AI-powered task management integrated with popular tools',
        'Automated status reports and client updates',
        'Risk identification and mitigation suggestions'
      ],
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'admin',
      title: 'Admin & Billing',
      icon: '📊',
      iconBg: 'bg-red-500',
      color: 'from-rose-600 to-red-600',
      description: 'Automated back-office operations for consultants',
      details: "Streamline administrative tasks with automated invoicing, contract management, and expense tracking that integrates with popular accounting systems.",
      features: [
        'Automated invoice generation based on time tracking',
        'Contract management with renewal reminders',
        'Expense tracking with receipt scanning'
      ],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'payroll',
      title: 'Payroll Management',
      icon: '💰',
      iconBg: 'bg-cyan-500',
      color: 'from-blue-600 to-cyan-600',
      description: 'Automated payroll processing for your consultants',
      details: "Simplify complex payroll requirements for consultants with varying contracts, payment schedules, and international tax regulations.",
      features: [
        'Multi-currency payment processing with optimal rates',
        'Tax compliance across multiple jurisdictions',
        'Consultant self-service portal for payment tracking'
      ],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80',
      category: 'Technology Consulting' as ServiceCategory
    },
    {
      id: 'fertility-care',
      title: 'Personal Fertility Care Companion',
      icon: '🌸',
      iconBg: 'bg-pink-500',
      color: 'from-pink-600 to-rose-600',
      description: 'AI-powered personalized fertility tracking and guidance',
      details: "Comprehensive fertility support combining AI-driven cycle tracking, personalized insights, and expert guidance to optimize your reproductive health journey.",
      features: [
        'Intelligent cycle prediction and ovulation tracking',
        'Personalized nutrition and lifestyle recommendations',
        'Real-time symptom analysis and health insights',
        'Secure data management with privacy-first approach'
      ],
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80',
      category: 'Health Care' as ServiceCategory
    },
    {
      id: 'parenthood-journey',
      title: 'Journey to Parenthood',
      icon: '👶',
      iconBg: 'bg-teal-500',
      color: 'from-teal-600 to-emerald-600',
      description: 'Comprehensive support for your path to becoming parents',
      details: "End-to-end guidance and support throughout your parenthood journey, from conception planning to early pregnancy care, powered by AI insights and expert medical advice.",
      features: [
        'Preconception health optimization and planning',
        'Early pregnancy monitoring and milestone tracking',
        'Personalized care plans based on medical history',
        'Integration with healthcare providers and specialists'
      ],
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      category: 'Health Care' as ServiceCategory
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

  // Filter services based on selected category
  const filteredServices = services.filter(service => service.category === activeFilter);

  // For carousel navigation
  const carouselRef = useRef<HTMLDivElement>(null);

  // Toggle card expansion
  const toggleCard = (id: string) => {
    // Check if we're on desktop (md breakpoint and above)
    const isDesktop = window.innerWidth >= 768;
    
    if (isDesktop) {
      // On desktop, use modal
      setModalService(modalService === id ? null : id);
    } else {
      // On mobile, use inline expansion
      setExpandedCards(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  // Close modal
  const closeModal = () => {
    setModalService(null);
  };

  // Get modal service data
  const getModalService = () => {
    return services.find(s => s.id === modalService);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Create a looping carousel effect
  const scrollCards = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = 450; // approx width of each card including gap

      if (direction === 'right') {
        // If we're near the end, loop back to the beginning
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - cardWidth) {
          // Smooth scroll to the beginning
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Normal scroll right
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      } else {
        // If we're near the beginning, loop to the end
        if (container.scrollLeft <= cardWidth) {
          // Smooth scroll to the end
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          // Normal scroll left
          container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-10 sm:h-14 md:h-20 w-auto" />
            <h1 className="text-lg sm:text-xl font-bold ml-0">OTTOBON</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-white hover:text-indigo-300 transition-colors">Overview</a>
            <a href="#services" className="text-white hover:text-indigo-300 transition-colors">Services</a>
            <a href="#audience" className="text-white hover:text-indigo-300 transition-colors">Who We Serve</a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      <style jsx>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }
        .coming-soon-button {
          position: relative;
          overflow: hidden;
        }
      `}</style>
      
      <main className="pt-16 pb-16">
        {/* Container for all sections */}
        <div className="container mx-auto px-4">
          {/* Hero Banner with Icon + Text + Image */}
          <section className="mb-6 mt-4 bg-gray-900 rounded-xl overflow-hidden">
            <div className="h-[450px] relative">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* Subtle gradient overlay to ensure text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent z-5`}></div>

                  {/* The layout: Icon + Text + Image */}
                  <div className="relative h-full flex flex-col md:flex-row items-center">
                    {/* Left side: Icon and Text */}
                    <div className="md:w-[45%] z-10 flex flex-col md:flex-row items-center p-6 md:p-10 mb-0">
                      {/* Icon */}
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <div 
                          className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                          style={{ animation: 'icon-float 3s ease-in-out infinite' }}
                        >
                          <span className="text-4xl md:text-5xl">{slide.icon}</span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                          {slide.title}
                        </h2>
                        <p className="text-lg text-white/90 mb-4">
                          {slide.subtitle}
                        </p>
                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* Right side: Full-sized Image */}
                    <div className="md:w-[55%] h-full">
                      <div className="w-full h-full overflow-hidden">
                        <img 
                          src={slide.imagePath} 
                          alt={slide.title} 
                          className="w-full h-full object-cover md:object-contain lg:object-cover" 
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
          <section id="overview" className="bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/30 mb-6">
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p className="text-gray-300 mb-4">
              The Ottobon Professional Services Organization (PSO) provides consultants with comprehensive operational and administrative support powered by advanced AI and expert human assistance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors h-[220px] flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-indigo-600/30 p-3 mr-4">
                    <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Operational Excellence</h3>
                </div>
                <p className="text-gray-300 flex-grow">
                  Our AI agents handle administrative tasks with greater speed and consistency than human staff, allowing you to focus on high-value client work instead of routine operations.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors h-[220px] flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-purple-600/30 p-3 mr-4">
                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Human-AI Collaboration</h3>
                </div>
                <p className="text-gray-300 flex-grow">
                  For complex tasks requiring judgment or personalization, our expert human team works seamlessly with AI systems to provide the perfect balance of efficiency and expertise.
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors h-[220px] flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-cyan-600/30 p-3 mr-4">
                    <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Flexible Service Model</h3>
                </div>
                <p className="text-gray-300 flex-grow">
                  Choose AI-only automation for cost efficiency, or add human expertise for specialized tasks. Scale services up or down based on your current project needs with no long-term commitments.
                </p>
              </div>
            </div>
          </section>

          {/* Service Offerings Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Our Service Offerings</h2>
            <p className="text-gray-300 text-lg">Each service combines AI automation with optional human support</p>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              {categories.map(category => (
                <div key={category.id} className="text-center">
                  <button 
                    className={`font-medium py-3 px-6 rounded-full transition flex items-center relative ${
                      activeFilter === category.id
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : category.isComingSoon 
                          ? 'coming-soon-button text-indigo-300 border border-indigo-500/50'
                          : 'bg-white/10 hover:bg-white/20 text-white shadow-sm border border-white/20'
                    }`}
                    onClick={() => {
                      if (!category.isComingSoon) {
                        setActiveFilter(category.id);
                      }
                    }}
                    disabled={category.isComingSoon}
                  >
                    <span className="mr-2 text-lg">{category.icon}</span>
                    {category.title}
                    {category.isComingSoon && (
                      <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold animate-pulse">
                        Soon
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Description for selected category */}
            <div className="text-center animate-fade-in">
              {categories.map(category => (
                activeFilter === category.id && (
                  <p key={category.id} className="text-sm text-gray-300 mt-2">
                    {category.description}
                  </p>
                )
              ))}
            </div>
          </div>

          {/* Services Section - Clean Grid Layout */}
          <section id="services" className="bg-purple-900/20 rounded-xl p-6 border border-purple-800/30 mb-6">

            {/* Service Cards - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="group"
                >
                  {/* Simple card with clean design */}
                  <div 
                    className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer transform hover:scale-105 active:scale-95"
                    onClick={() => toggleCard(service.id)}
                  >
                    {/* Header with image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                      {/* Expand button - only show on mobile */}
                      <div className="absolute bottom-4 right-4 md:hidden">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCard(service.id);
                          }}
                          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 p-2 rounded-full transition-colors"
                        >
                          <svg 
                            className={`w-5 h-5 text-white transition-transform duration-300 ${
                              expandedCards[service.id] ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>
                      </div>

                      {/* Desktop click indicator */}
                      <div className="hidden md:block absolute bottom-4 right-4">
                        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-300 mb-4">{service.description}</p>

                      {/* Desktop hover indicator */}
                      <div className="hidden md:block text-center text-sm text-gray-400 mt-4">
                        Click to view details
                      </div>

                      {/* Expanded details - only on mobile */}
                      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
                        expandedCards[service.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pt-4 border-t border-gray-700/50">
                          <p className="text-gray-400 text-sm mb-4">{service.details}</p>
                          
                          <h4 className="text-sm font-semibold text-white mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <svg className="w-4 h-4 text-indigo-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Audience Section */}
          <section id="audience" className="bg-emerald-900/20 rounded-xl p-6 border border-emerald-800/30 mb-6">
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

      {/* Modal Overlay for Desktop */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-gray-800 rounded-2xl border border-gray-600 shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {(() => {
              const service = getModalService();
              if (!service) return null;
              
              return (
                <>
                  {/* Modal Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                    {/* Service icon and title overlay */}
                    <div className="absolute bottom-4 left-6">
                      <div className="flex items-center">
                        <div className={`w-16 h-16 ${service.iconBg} rounded-lg flex items-center justify-center shadow-lg mr-4`}>
                          <span className="text-3xl">{service.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                          <p className="text-white/80">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">About This Service</h4>
                      <p className="text-gray-300">{service.details}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start bg-gray-700/50 rounded-lg p-4">
                            <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
