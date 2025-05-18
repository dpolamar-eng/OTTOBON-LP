import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation, useStaggeredAnimation } from '@/hooks/use-animation';

export default function HeroSection() {
  // State for controlling autoplay
  const [isPaused, setIsPaused] = useState(false);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Carousel for hero content
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps" 
  });
  
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  
  const heroSlides = [
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700'>Transform</span> Your Career <span class='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600'>Potential</span>",
      description: "Ottobon Academy equips you with in-demand technology consulting skills through personalized mentorship and industry-aligned curriculum that accelerates your career path.",
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
      title: "Discover Your <span class='bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500'>Perfect</span> Learning Path",
      description: "Take our Career Fit Assessment to unlock personalized program recommendations and qualify for up to 90% tuition reduction based on your unique skills and background.",
      image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Professional analyzing data on screen"
    }
  ];
  
  const onHeroSelect = useCallback(() => {
    if (!heroEmbla) return;
    setHeroActiveIndex(heroEmbla.selectedScrollSnap());
  }, [heroEmbla]);
  
  const scrollTo = useCallback((index: number) => {
    if (heroEmbla) heroEmbla.scrollTo(index);
  }, [heroEmbla]);
  
  // Using a simpler approach for autoplay
  
  // Effect to handle autoplay start/stop
  useEffect(() => {
    // Start autoplay when component mounts and isPaused is false
    if (heroEmbla && !isPaused) {
      const autoplayFunc = () => {
        autoplayTimeoutRef.current = setTimeout(() => {
          heroEmbla.scrollNext();
          autoplayFunc(); // Set up the next one
        }, autoplayInterval);
      };
      
      // Start the first timeout
      autoplayFunc();
    }
    
    // Cleanup function that runs when either isPaused changes or component unmounts
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
        autoplayTimeoutRef.current = null;
      }
    };
  }, [heroEmbla, isPaused, autoplayInterval]);
  
  // Effect to handle embla event listeners
  useEffect(() => {
    if (!heroEmbla) return;
    onHeroSelect();
    heroEmbla.on('select', onHeroSelect);
    
    return () => {
      heroEmbla.off('select', onHeroSelect);
    };
  }, [heroEmbla, onHeroSelect]);
  
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const headingRef = useAnimation('animate-slide-up delay-100');
  const descriptionRef = useAnimation('animate-slide-up delay-200');
  const ctaRef = useAnimation('animate-slide-up delay-300');
  const imageRef = useAnimation('animate-slide-right delay-200');
  const indicatorsRef = useAnimation('animate-fade-in delay-400');
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden bg-[#f8faff]" ref={sectionRef}>
      {/* Premium background elements */}
      <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-blue-50 via-white to-blue-50/40"></div>
      <div className="absolute inset-0 z-[-1] opacity-10" style={{ 
        backgroundImage: "radial-gradient(circle at 25px 25px, rgba(0, 0, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(128, 0, 255, 0.05) 2%, transparent 0%)",
        backgroundSize: "100px 100px" 
      }}></div>
      <div className="absolute w-full h-96 top-0 right-0 z-[-1] bg-gradient-to-r from-indigo-500/5 via-blue-500/10 to-purple-500/5 rounded-bl-[30%] transform -skew-y-3"></div>
      <div className="absolute w-24 h-24 top-20 left-10 z-[-1] bg-gradient-to-tr from-blue-200 to-blue-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute w-32 h-32 bottom-20 right-10 z-[-1] bg-gradient-to-tr from-purple-200 to-purple-100 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute w-64 h-64 top-40 right-1/4 z-[-1] bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full opacity-30 animate-float"></div>
      <div className="absolute top-0 left-0 z-[-1] h-full w-20 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 right-0 z-[-1] h-full w-20 bg-gradient-to-b from-purple-500/5 via-transparent to-purple-500/5"></div>
      
      {/* Floating bubbles */}
      <div className="absolute inset-0 overflow-hidden z-[-1]">
        <div className="bubble" style={{animationDelay: '0s'}}></div>
        <div className="bubble" style={{animationDelay: '2s'}}></div>
        <div className="bubble" style={{animationDelay: '6s'}}></div>
        <div className="bubble" style={{animationDelay: '4s'}}></div>
        <div className="bubble" style={{animationDelay: '1s'}}></div>
        <div className="bubble" style={{animationDelay: '5s'}}></div>
        <div className="bubble" style={{animationDelay: '3s'}}></div>
        
        {/* Add colorful opportunity bubbles */}
        <div className="bubble" style={{left: '15%', width: '60px', height: '60px', animationDelay: '2.5s', background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.1))'}}></div>
        <div className="bubble" style={{left: '75%', width: '70px', height: '70px', animationDelay: '4.5s', background: 'radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.4), rgba(124, 58, 237, 0.1))'}}></div>
        <div className="bubble" style={{left: '45%', width: '65px', height: '65px', animationDelay: '7s', background: 'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.4), rgba(16, 185, 129, 0.1))'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[-1]"></div>
        
        <div 
          className="embla overflow-hidden rounded-2xl shadow-2xl" 
          ref={heroViewportRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="embla__container flex">
            {heroSlides.map((slide, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                <div className="flex flex-col md:flex-row items-center bg-white/90 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-gray-100/50 shadow-[0_10px_50px_-12px_rgba(59,130,246,0.15)]">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100 to-transparent rounded-tr-2xl rounded-bl-[50%] z-[-1] opacity-70"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-transparent rounded-bl-2xl rounded-tr-[50%] z-[-1] opacity-70"></div>
                  <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20"></div>
                  <div className="absolute bottom-10 right-10 w-4 h-4 bg-purple-400 rounded-full opacity-20"></div>
                  
                  <div className="md:w-1/2 mb-10 md:mb-0 relative">
                    
                    <h1 
                      ref={headingRef}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    ></h1>
                    <p ref={descriptionRef} className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg leading-relaxed">
                      {slide.description}
                    </p>
                    <div ref={ctaRef} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <a 
                        href="#enroll" 
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
                      <a 
                        href="#assessment" 
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-full transition text-center group"
                      >
                        <span className="group-hover:hidden">Take Assessment</span>
                        <span className="hidden group-hover:inline">Start Assessment</span>
                      </a>
                    </div>
                    <div className="mt-4 text-sm bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100 shadow-inner">
                      <p className="flex items-center font-medium text-green-800">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                      
                      {/* No floating tech icons - removed */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Controls */}
        <div className="flex items-center justify-center mt-8">
          <div ref={indicatorsRef} className="flex justify-center space-x-2 bg-white py-2 px-4 rounded-full shadow-md">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === heroActiveIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
