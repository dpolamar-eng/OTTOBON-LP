import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation, useStaggeredAnimation } from '@/hooks/use-animation';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  background: string;
  character?: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
}

export default function IntegratedHeroJourney() {
  // Hero section states
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps" 
  });
  
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Onboarding journey states
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showJourney, setShowJourney] = useState(false);
  
  // Animation refs
  const headingRef = useAnimation('animate-slide-up');
  const descriptionRef = useAnimation('animate-slide-up delay-100');
  const ctaRef = useAnimation('animate-slide-up delay-200');
  const imageRef = useAnimation('animate-slide-right delay-300');
  const indicatorsRef = useAnimation('animate-fade-in delay-400');
  const journeyRef = useAnimation('animate-slide-up');
  
  const heroSlides = [
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700'>Transform</span> Your Career <span class='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600'>Potential</span>",
      description: "Ottobon equips you with in-demand technology consulting skills through personalized mentorship and industry-aligned curriculum that accelerates your career path.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Technology professional in modern workspace"
    },
    {
      title: "Learn <span class='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Today</span>, Lead <span class='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600'>Tomorrow</span>",
      description: "Our immersive programs focus on practical applications and real-world projects, guided by industry experts who have implemented enterprise technologies at scale.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Collaborative learning environment"
    },
    {
      title: "Build Your <span class='bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600'>Technology</span> Consulting <span class='bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600'>Career</span>",
      description: "Whether you're pivoting careers or enhancing existing skills, our program bridges the gap between traditional education and industry requirements.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Professional working on advanced technology"
    }
  ];
  
  // Define the onboarding journey steps
  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to Your Learning Journey",
      description: "Every great technology career starts with a single step. At Ottobon, we'll guide you through a transformative experience tailored to your unique strengths and aspirations.",
      icon: "🚀",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600",
      character: {
        name: "Alex Chen",
        role: "Program Director",
        quote: "We don't just teach technology – we cultivate tomorrow's tech leaders through immersive, personalized learning.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Discover Your Unique Path",
      description: "Through our proprietary assessment tool, we'll identify your natural strengths and match you with the perfect learning track that aligns with your abilities.",
      icon: "🧭",
      background: "bg-gradient-to-r from-purple-500 to-pink-500",
      character: {
        name: "Dr. Maya Wilson",
        role: "Career Assessment Specialist",
        quote: "Your career journey should leverage your natural talents. Our assessment identifies paths where you'll truly excel.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Build Real-World Skills",
      description: "You'll tackle real industry projects, collaborating with mentors who have implemented enterprise solutions at leading companies.",
      icon: "⚒️",
      background: "bg-gradient-to-r from-green-500 to-emerald-500",
      character: {
        name: "James Rodriguez",
        role: "Industry Mentor",
        quote: "The projects you'll build here are the same challenges we face daily at Fortune 500 companies. You'll be job-ready from day one.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    },
    {
      title: "Join the Elite Network",
      description: "Graduate into our community of tech professionals, gaining access to exclusive job opportunities, continued learning, and career advancement resources.",
      icon: "🌐",
      background: "bg-gradient-to-r from-amber-500 to-orange-500",
      character: {
        name: "Sophia Kim",
        role: "Alumni Relations",
        quote: "Our graduates don't just find jobs – they build meaningful careers with continued support from our ever-growing network.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
      }
    }
  ];
  
  // Auto scroll for the hero carousel
  const autoplayCallback = useCallback(() => {
    if (!heroEmbla) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    
    autoplayTimeoutRef.current = setTimeout(() => {
      if (!heroEmbla) return;
      heroEmbla.scrollNext();
    }, autoplayInterval);
  }, [heroEmbla, autoplayInterval]);
  
  // When the carousel scrolls, update the active index
  const onHeroSelect = useCallback(() => {
    if (!heroEmbla) return;
    setHeroActiveIndex(heroEmbla.selectedScrollSnap());
    autoplayCallback();
  }, [heroEmbla, autoplayCallback]);
  
  // Add scroll to specific slide functionality
  const scrollTo = useCallback((index: number) => {
    if (!heroEmbla) return;
    heroEmbla.scrollTo(index);
  }, [heroEmbla]);
  
  useEffect(() => {
    if (!heroEmbla) return;
    
    onHeroSelect();
    heroEmbla.on('select', onHeroSelect);
    autoplayCallback();
    
    return () => {
      heroEmbla.off('select', onHeroSelect);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [heroEmbla, onHeroSelect, autoplayCallback]);
  
  // Handle journey navigation
  const toggleJourney = () => {
    setShowJourney(!showJourney);
  };
  
  const goToStep = (index: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(index);
      setIsVisible(true);
    }, 300);
  };

  const goToNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      goToStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };
  
  return (
    <section className="relative pt-16 pb-24 bg-gradient-to-b from-blue-700 to-purple-800 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImEiIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIuMDUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')]"></div>
        <div className="animate-float opacity-20 absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"></div>
        <div className="animate-float opacity-20 absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Content */}
        <div className="mb-16">
          <div className="overflow-hidden" ref={heroViewportRef}>
            <div className="flex">
              {heroSlides.map((slide, index) => (
                <div key={index} className="min-w-full flex-shrink-0">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 py-6">
                      <div className="md:w-1/2 mb-10 md:mb-0 relative">
                        <h1 
                          ref={headingRef}
                          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        ></h1>
                        <p ref={descriptionRef} className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                          {slide.description}
                        </p>
                        <div ref={ctaRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                          <a 
                            href="#assessment" 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg text-center relative overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center">
                              Start Your Journey
                              <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                              </svg>
                            </span>
                            {/* Button shine effect */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-shine"></span>
                          </a>
                          <button
                            onClick={toggleJourney}
                            className="border-2 border-blue-400 text-blue-100 hover:bg-blue-400 hover:text-blue-900 font-semibold py-3 px-8 rounded-full transition text-center group"
                          >
                            <span className="group-hover:hidden">Explore Our Program</span>
                            <span className="hidden group-hover:inline">View Learning Journey</span>
                          </button>
                        </div>
                        <div className="mt-4 text-sm bg-gradient-to-r from-green-900/60 to-emerald-900/60 rounded-lg p-3 border border-green-700/40 shadow-inner">
                          <p className="flex items-center font-medium text-green-300">
                            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Qualify for up to 90% tuition discount through our assessment
                          </p>
                        </div>
                      </div>
                      <div ref={imageRef} className="md:w-1/2">
                        <div className="relative overflow-hidden rounded-lg hover:-translate-y-1 hover:scale-[1.01] transition duration-300 shadow-xl bg-gradient-to-r p-[3px] from-blue-500 to-purple-600">
                          <img 
                            src={slide.image} 
                            alt={slide.alt} 
                            className="rounded-lg w-full object-cover h-80 md:h-96 transition duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/20 opacity-70 mix-blend-overlay"></div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white font-medium text-sm">{slide.alt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8">
            <div ref={indicatorsRef} className="flex justify-center space-x-2 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full shadow-md">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === heroActiveIndex 
                      ? 'bg-blue-500 w-6' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Learning Journey */}
        {showJourney && (
          <div ref={journeyRef} className="max-w-5xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-center mb-6">
              Your Complete <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">Learning Journey</span>
            </h3>
            
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {onboardingSteps.map((_, index) => (
                  <div 
                    key={index} 
                    className={`flex-1 ${index > 0 ? 'ml-2' : ''}`}
                  >
                    <button
                      onClick={() => goToStep(index)}
                      className={`w-full text-center text-xs sm:text-sm font-medium py-2 px-1 rounded-lg transition
                        ${currentStep === index 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'}`}
                    >
                      Step {index + 1}
                    </button>
                  </div>
                ))}
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Main content card */}
            <div 
              className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Step content */}
                <div className={`md:w-1/2 p-8 md:p-10 ${onboardingSteps[currentStep].background} text-white`}>
                  <div className="text-4xl mb-4">{onboardingSteps[currentStep].icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{onboardingSteps[currentStep].title}</h2>
                  <p className="mb-6 text-white/90">{onboardingSteps[currentStep].description}</p>
                  
                  <div className="flex space-x-3">
                    {currentStep > 0 && (
                      <button 
                        onClick={goToPrevStep}
                        className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-6 rounded-full transition"
                      >
                        Previous
                      </button>
                    )}
                    
                    {currentStep < onboardingSteps.length - 1 ? (
                      <button 
                        onClick={goToNextStep}
                        className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          Continue
                          <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <a 
                        href="#assessment"
                        className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          Take Assessment
                          <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </span>
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Right side - Character & quote */}
                <div className="md:w-1/2 bg-white/5 backdrop-blur-md p-8 md:p-10 flex flex-col">
                  {onboardingSteps[currentStep].character && (
                    <>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white/30 shadow-lg">
                          <img 
                            src={onboardingSteps[currentStep].character.image} 
                            alt={onboardingSteps[currentStep].character.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{onboardingSteps[currentStep].character.name}</h3>
                          <p className="text-sm text-white/80">{onboardingSteps[currentStep].character.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-inner border border-white/10 relative">
                          <div className="absolute -top-3 -left-2 text-4xl text-white/20">"</div>
                          <div className="absolute -bottom-3 -right-2 text-4xl text-white/20">"</div>
                          <p className="text-white/90 italic relative z-10">
                            {onboardingSteps[currentStep].character.quote}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Navigation dots */}
                  <div className="flex justify-center space-x-2 mt-8">
                    {onboardingSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToStep(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStep 
                            ? 'bg-blue-500 w-6' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <div className="text-center mt-6">
              <button 
                onClick={toggleJourney}
                className="inline-flex items-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full py-2 px-4 transition"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Close Journey View
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}