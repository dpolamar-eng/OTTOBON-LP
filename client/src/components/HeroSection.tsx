import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation, useStaggeredAnimation } from '@/hooks/use-animation';

export default function HeroSection() {
  // Carousel for hero content
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps" 
  });
  
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
  
  const autoplayCallback = useCallback(() => {
    if (!heroEmbla) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    
    autoplayTimeoutRef.current = setTimeout(() => {
      if (!heroEmbla) return;
      heroEmbla.scrollNext();
      autoplayCallback();
    }, autoplayInterval);
  }, [heroEmbla, autoplayInterval]);
  
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
  
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const headingRef = useAnimation('animate-slide-up delay-100');
  const descriptionRef = useAnimation('animate-slide-up delay-200');
  const ctaRef = useAnimation('animate-slide-up delay-300');
  const imageRef = useAnimation('animate-slide-right delay-200');
  const indicatorsRef = useAnimation('animate-fade-in delay-400');
  
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white" ref={sectionRef}>
      {/* Background decorative elements */}
      <div className="absolute w-full h-64 top-0 right-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-bl-[100%] transform -skew-y-3"></div>
      <div className="absolute w-24 h-24 top-20 left-10 z-[-1] bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute w-32 h-32 bottom-20 right-10 z-[-1] bg-purple-100 rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute w-64 h-64 top-40 right-1/4 z-[-1] bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full opacity-30 animate-float"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[-1]"></div>
        
        <div className="embla overflow-hidden rounded-2xl shadow-2xl" ref={heroViewportRef}>
          <div className="embla__container flex">
            {heroSlides.map((slide, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                <div className="flex flex-col md:flex-row items-center bg-white p-6 md:p-10 rounded-2xl">
                  <div className="md:w-1/2 mb-10 md:mb-0">
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
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg text-center relative overflow-hidden group"
                      >
                        <span className="relative z-10">Apply Now</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </a>
                      <a 
                        href="#assessment" 
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-full transition text-center group"
                      >
                        <span className="group-hover:hidden">Career Fit Assessment</span>
                        <span className="hidden group-hover:inline">Start Assessment</span>
                      </a>
                    </div>
                    <div className="mt-4 text-sm bg-green-50 rounded-lg p-3 border border-green-100">
                      <p className="flex items-center font-medium text-green-800">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Qualify for up to 90% tuition discount through our assessment
                      </p>
                    </div>
                  </div>
                  <div ref={imageRef} className="md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg transform rotate-1 hover:rotate-0 transition duration-300">
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="rounded-lg shadow-xl w-full object-cover h-80 md:h-96 transition duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/20 opacity-70 mix-blend-overlay"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-medium text-sm">{slide.alt}</p>
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
