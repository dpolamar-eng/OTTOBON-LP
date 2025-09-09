import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation } from '@/hooks/use-animation';

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  background: string;
  image: string;
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
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Animation hook
  const { sectionRef, isVisible } = useAnimation();

  // Hero slides data
  const heroSlides: HeroSlide[] = [
    {
      title: "Up-Skill for",
      subtitle: "Career Growth",
      description: "Master AI-driven technologies with placement guaranteed programs. From AI for UI/UX Design to Agent Development, gain cutting-edge skills that employers demand with expert mentorship and hands-on projects.",
      cta: "Start Your Journey",
      background: "bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    },
    {
      title: "Transform Your",
      subtitle: "Tech Career",
      description: "Join our comprehensive learning programs designed to take you from beginner to industry-ready professional. Experience personalized learning paths with real-world projects and expert guidance.",
      cta: "Explore Programs",
      background: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
    },
    {
      title: "Build Tomorrow's",
      subtitle: "Digital Solutions",
      description: "Learn cutting-edge technologies including AI, machine learning, and modern web development. Our industry-aligned curriculum ensures you're ready for the jobs of tomorrow.",
      cta: "Get Started",
      background: "bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1526&q=80"
    }
  ];

  // Auto-scroll functionality
  const startAutoplay = useCallback(() => {
    if (!heroEmbla || !isAutoplay) return;

    autoplayTimeoutRef.current = setTimeout(() => {
      heroEmbla.scrollNext();
    }, autoplayInterval);
  }, [heroEmbla, isAutoplay, autoplayInterval]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  // Hero carousel effects
  useEffect(() => {
    if (!heroEmbla) return;

    const onSelect = () => {
      setHeroActiveIndex(heroEmbla.selectedScrollSnap());
    };

    heroEmbla.on('select', onSelect);
    onSelect();

    return () => {
      heroEmbla.off('select', onSelect);
    };
  }, [heroEmbla]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  // Navigation functions
  const scrollPrev = useCallback(() => {
    if (heroEmbla) {
      stopAutoplay();
      heroEmbla.scrollPrev();
      setIsAutoplay(false);
      setTimeout(() => setIsAutoplay(true), 3000);
    }
  }, [heroEmbla, stopAutoplay]);

  const scrollNext = useCallback(() => {
    if (heroEmbla) {
      stopAutoplay();
      heroEmbla.scrollNext();
      setIsAutoplay(false);
      setTimeout(() => setIsAutoplay(true), 3000);
    }
  }, [heroEmbla, stopAutoplay]);

  const scrollTo = useCallback((index: number) => {
    if (heroEmbla) {
      stopAutoplay();
      heroEmbla.scrollTo(index);
      setIsAutoplay(false);
      setTimeout(() => setIsAutoplay(true), 3000);
    }
  }, [heroEmbla, stopAutoplay]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ marginTop: '80px' }}
    >
      {/* Hero Carousel */}
      <div className="embla w-full h-[calc(100vh-80px)] relative" ref={heroViewportRef}>
        <div className="embla__container flex h-full">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`embla__slide flex-shrink-0 w-full h-full relative ${slide.background}`}>
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-8 w-full">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-white space-y-6">
                      <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                          {slide.title}
                        </h1>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                          {slide.subtitle}
                        </h2>
                      </div>

                      <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="bg-[#FFC107] hover:bg-[#FFD54F] text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          {slide.cta}
                        </button>
                        <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-full transition-all duration-300">
                          Learn More
                        </button>
                      </div>

                      {/* Trust Indicators */}
                      <div className="flex items-center space-x-6 pt-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">Qualify for up to 90% tuition discount through our Talent Compass</span>
                        </div>
                      </div>
                    </div>

                    {/* Image Content */}
                    <div className="hidden lg:block">
                      <div className="relative">
                        <img
                          src={slide.image}
                          alt="Technology professional in modern workspace"
                          className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                          <span className="text-sm">Technology professional in modern workspace</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Separated from content */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-8 lg:left-16 z-20 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 lg:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-8 lg:right-16 z-20 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 lg:p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === heroActiveIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce hidden lg:block">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}