import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import useEmblaCarousel from 'embla-carousel-react';
import HomeHeader from "./HomeHeader";

export default function GatewayPortal() {
  const [, navigate] = useLocation();
  const [hoverState, setHoverState] = useState<"academy" | "services" | null>(
    null,
  );
  const [pressing, setPressing] = useState<"academy" | "services" | null>(null);

  // Memoize bubble positions/sizes so background doesn't change on hover-induced re-renders
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        left: Math.random() * 100,
        bottomVh: Math.random() * 80, // 0–80vh from bottom
      })),
    [],
  );

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <HomeHeader />

      {/* Hero Video Section - Responsive Height */}
      <section className="relative h-auto md:h-screen w-full overflow-hidden pt-20 sm:pt-24 md:pt-0">
        <div className="relative md:absolute md:inset-0">
          <video
            className="w-full h-auto md:h-full object-contain md:object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/Video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Scroll indicator - Desktop only */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
          <div className="animate-bounce">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Hero Content Section - Below Video */}
      <section className="relative z-10 py-8 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
              <img
                src="/assets/logo.png"
                alt="Ottobon Logo"
                className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain"
              />
              <div className="font-extrabold text-white tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                OTTOBON
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl text-blue-100 font-light mb-4">
              Empowering the Future of AI-Driven Consulting
            </h1>
            <p className="text-lg text-blue-200 mb-6 max-w-3xl mx-auto">
              Learn from AI to become faster, smarter, and more effective.
              Transform into an independent consultant or enhance your
              professional services with cutting-edge skills.
            </p>
            <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Background effects for sections below */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Static particles (no animation) */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className="gateway-bubble"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                left: `${b.left}%`,
                bottom: `${b.bottomVh}vh`,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))",
              }}
            />
          ))}
        </div>
      </div>

      {/* About / Our Vision */}
      <section
        id="about"
        className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4">
          {/* Heading outside the content container for parity with Services */}
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
               Our Vision
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
          </div>

          <div className="max-w-4xl mx-auto text-blue-100 space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              Ottobon exists to help people and teams perform like top-tier
              technology consultants. We combine human mentorship with AI
              acceleration so you learn faster, practice on real scenarios, and
              make better decisions from day one.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Our work spans two pillars: Ottobon Academy (career launch and
              upskilling) and Ottobon Professional Services (PSO) for working
              consultants and firms. Together they form a continuous system,
              learn the craft, apply it in the field, and keep advancing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services (Academy + Professional Services) */}
      <section
        id="services-overview"
        className="relative z-10 py-8 sm:py-10 scroll-mt-24 md:scroll-mt-28"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Our Services
            </h2>
            <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
            <p className="text-blue-200 mt-3 max-w-3xl mx-auto text-base md:text-lg">
              Two complementary tracks. Academy turns students and freshers into
              job‑ready consultants with guided paths, projects, and interview
              prep. PSO equips working professionals and firms with AI‑powered
              operations—so your delivery, marketing, and admin run with
              enterprise‑grade efficiency.
            </p>
          </div>
        </div>

        {/* Services Carousel */}
        <div className="relative z-10 flex-grow px-4 pb-16">
          <ServicesCarousel 
            navigate={navigate}
            pressing={pressing}
            setPressing={setPressing}
            hoverState={hoverState}
            setHoverState={setHoverState}
          />
        </div>
      </section>



      

      {/* Footer */}
      <div className="relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-2">
          {/* First row: links */}
          <div className="flex space-x-6 order-1">
            <a href="#" className="text-white/60 hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Contact
            </a>
          </div>
          {/* Second row: copyright */}
          <div className="text-white/60 text-sm order-2">
            © {new Date().getFullYear()} Ottobon. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

// Services Carousel Component
function ServicesCarousel({ 
  navigate, 
  pressing, 
  setPressing, 
  hoverState, 
  setHoverState 
}: {
  navigate: (path: string) => void;
  pressing: "academy" | "services" | null;
  setPressing: (value: "academy" | "services" | null) => void;
  hoverState: "academy" | "services" | null;
  setHoverState: (value: "academy" | "services" | null) => void;
}) {
  // Services data
  const services = [
    {
      id: 'academy',
      title: 'Ottobon Academy',
      icon: '🎓',
      description: 'Transform students and freshers into independent consultants with job-ready skills in high-demand technologies.',
      features: [
        'AI-Powered Skill Growth',
        'Land Your Dream Job',
        'Thrive With Expert Guidance'
      ],
      textColor: 'text-blue-100',
      featureColor: 'text-green-400',
      featureTextColor: 'text-blue-50',
      route: '/academy'
    },
    {
      id: 'services',
      title: 'Ottobon Services',
      icon: '🤖',
      description: 'Empowering working professionals to transition into consultant providers with advanced tech learning and professional services.',
      features: [
        'Transforming Health with Innovation',
        'Driving Innovation with Expertise',
        'Legal & Finance'
      ],
      textColor: 'text-purple-100',
      featureColor: 'text-pink-300',
      featureTextColor: 'text-purple-50',
      route: '/services'
    }
  ];

  // Responsive slide count function
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 2; // Always show 2 for larger screens since we only have 2 services
    }
    return 2;
  };

  // State for responsive slides
  const [slidesPerView, setSlidesPerView] = useState(getVisibleSlides());
  const [isHovering, setIsHovering] = useState(false);

  // Embla carousel setup
  const [viewportRef, embla] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
    direction: 'ltr',
    startIndex: 0
  });

  // Check if we need to show navigation at all
  const [canScroll, setCanScroll] = useState(false);

  // Handle resize effect
  useEffect(() => {
    const handleResize = () => {
      const newSlidesPerView = getVisibleSlides();
      if (newSlidesPerView !== slidesPerView) {
        setSlidesPerView(newSlidesPerView);

        // Reset and rebuild carousel when window size changes
        if (embla) {
          embla.reInit();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [embla, slidesPerView]);

  const onSelect = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    // Set initial scroll state
    const updateCanScroll = () => {
      const totalSlides = services.length;
      const visibleSlides = getVisibleSlides();
      setCanScroll(totalSlides > visibleSlides);
    };

    updateCanScroll();
    onSelect();
    embla.on('select', onSelect);
    embla.on('reInit', updateCanScroll);

    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', updateCanScroll);
    };
  }, [embla, onSelect, services]);

  return (
    <div className="relative">
      <div 
        className="overflow-hidden" 
        ref={viewportRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`flex ${services.length === 1 ? 'justify-center' : ''}`}>
          {services.map(service => (
            <div 
              key={service.id}
              className={`${services.length === 1 ? 'w-full max-w-md' : 'min-w-[100%] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/2)]'} px-4 flex-shrink-0 flex justify-center`}
            >
              <div
                className={`gateway-card group ${hoverState === service.id ? "scale-105" : hoverState && hoverState !== service.id ? "scale-95 opacity-80" : ""} w-full max-w-md`}
                onMouseEnter={() => setHoverState(service.id as "academy" | "services")}
                onMouseLeave={() => setHoverState(null)}
              >
                <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-[#0F1E2E] p-0.5">
                  {/* Solid brand background */}
                  <div className="absolute inset-0 bg-[#0F1E2E]"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC13b3BhY2l0eT0iLjA1Ii8+PC9zdmc+')]"></div>

                  <div className="relative h-full flex flex-col p-6 bg-[#112537]/70 backdrop-blur-sm rounded-2xl">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-2xl">{service.icon}</span>
                        </div>
                        <h2 className="ml-3 text-xl font-bold text-white">
                          {service.title}
                        </h2>
                      </div>
                      <p className={`${service.textColor} text-sm mb-4`}>
                        {service.description}
                      </p>

                      <div className="space-y-1">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <span className={`${service.featureColor} mr-2 text-sm`}>
                              {service.id === 'academy' ? '✓' : '⚡'}
                            </span>
                            <span className={`${service.featureTextColor} text-sm`}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          if (pressing) return;
                          setPressing(service.id as "academy" | "services");
                          setTimeout(() => {
                            navigate(service.route);
                            window.scrollTo(0, 0);
                          }, 160);
                        }}
                        aria-pressed={pressing === service.id}
                        className={`bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg w-full relative overflow-hidden cursor-pointer filter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 
                            group-hover:scale-105 group-hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.65)] hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] 
                            ${pressing === service.id ? "scale-110 drop-shadow-[0_12px_28px_rgba(212,175,55,0.75)]" : ""}`}
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Get Started
                          <svg
                            className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Only show if we can scroll */}
      {canScroll && (
        <>
          <button 
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-105 border border-blue-100"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:right-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-105 border border-blue-100"
            onClick={() => embla?.scrollNext()}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}