import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps",
    duration: 30,
  });

  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayInterval = 6000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showJourney, setShowJourney] = useState(false);

  const heroSlides = [
    {
      title: "Master AI-Powered Skills for Career Growth",
      subtitle: "Up-Skill",
      description:
        "Learn cutting-edge AI technologies with hands-on projects. From UI/UX design automation to agent development, gain job-ready skills through expert-led programs with guaranteed placement support.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2070&q=80",
      alt: "AI-powered learning dashboard with analytics and progress tracking",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      title: "Land Your Dream Role with AI Job Tools",
      subtitle: "Job Assistance",
      description:
        "Access ATS-optimized resume builders, AI interview prep, and personalized job matching. Get real-time feedback, salary insights, and direct connections to hiring managers at top companies.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2015&q=80",
      alt: "Career success dashboard showing job matches and interview preparation",
      gradient: "from-indigo-500 to-violet-400",
    },
    {
      title: "Get Expert Mentorship Every Step of the Way",
      subtitle: "Career Assist",
      description:
        "Connect with industry leaders for personalized guidance. Ask technical questions, review code, plan your career path, and get insider advice from professionals at FAANG companies.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2070&q=80",
      alt: "Professional mentor providing career guidance and technical advice",
      gradient: "from-sky-500 to-cyan-400",
    },
  ];

  const onboardingSteps: OnboardingStep[] = [
    {
      title: "Welcome to Your Learning Journey",
      description:
        "Every great technology career starts with a single step. At Ottobon, we'll guide you through a transformative experience tailored to your unique strengths and aspirations.",
      icon: "🚀",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600",
      character: {
        name: "Alex Chen",
        role: "Program Director",
        quote:
          "We don't just teach technology – we cultivate tomorrow's tech leaders through immersive, personalized learning.",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
      },
    },
    {
      title: "Discover Your Unique Path",
      description:
        "Through our proprietary assessment tool, we'll identify your natural strengths and match you with the perfect learning track that aligns with your abilities.",
      icon: "🧭",
      background: "bg-gradient-to-r from-purple-500 to-pink-500",
      character: {
        name: "Dr. Maya Wilson",
        role: "Career Assessment Specialist",
        quote:
          "Your career journey should leverage your natural talents. Our assessment identifies paths where you'll truly excel.",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      },
    },
    {
      title: "Build Real-World Skills",
      description:
        "You'll tackle real industry projects, collaborating with mentors who have implemented enterprise solutions at leading companies.",
      icon: "⚒️",
      background: "bg-gradient-to-r from-green-500 to-emerald-500",
      character: {
        name: "James Rodriguez",
        role: "Industry Mentor",
        quote:
          "The projects you'll build here are the same challenges we face daily at Fortune 500 companies. You'll be job-ready from day one.",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
      },
    },
    {
      title: "Join the Elite Network",
      description:
        "Graduate into our community of tech professionals, gaining access to exclusive job opportunities, continued learning, and career advancement resources.",
      icon: "🌐",
      background: "bg-gradient-to-r from-amber-500 to-orange-500",
      character: {
        name: "Sophia Kim",
        role: "Alumni Relations",
        quote:
          "Our graduates don't just find jobs – they build meaningful careers with continued support from our ever-growing network.",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
      },
    },
  ];

  const autoplayCallback = useCallback(() => {
    if (!heroEmbla || isHovered) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

    autoplayTimeoutRef.current = setTimeout(() => {
      if (!heroEmbla || isHovered) return;
      heroEmbla.scrollNext();
    }, autoplayInterval);
  }, [heroEmbla, autoplayInterval, isHovered]);

  const onHeroSelect = useCallback(() => {
    if (!heroEmbla) return;
    setHeroActiveIndex(heroEmbla.selectedScrollSnap());
    autoplayCallback();
  }, [heroEmbla, autoplayCallback]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!heroEmbla) return;
      heroEmbla.scrollTo(index);
    },
    [heroEmbla]
  );

  const goToNextSlide = useCallback(() => {
    if (!heroEmbla) return;
    heroEmbla.scrollNext();
  }, [heroEmbla]);

  const goToPrevSlide = useCallback(() => {
    if (!heroEmbla) return;
    heroEmbla.scrollPrev();
  }, [heroEmbla]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevSlide, goToNextSlide]);

  useEffect(() => {
    if (!heroEmbla) return;

    onHeroSelect();
    heroEmbla.on("select", onHeroSelect);
    autoplayCallback();

    return () => {
      heroEmbla.off("select", onHeroSelect);
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [heroEmbla, onHeroSelect, autoplayCallback]);

  useEffect(() => {
    if (!isHovered) {
      autoplayCallback();
    } else {
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    }
  }, [isHovered, autoplayCallback]);

  const toggleJourney = () => {
    setShowJourney(!showJourney);
    const methodologySection = document.getElementById("methodology");
    if (methodologySection) {
      methodologySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToStep = (index: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(index);
      setIsVisible(true);
    }, 250);
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
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 overflow-hidden bg-black">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-violet-500/10 blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-3 md:px-6 lg:px-8 relative z-10">
        {/* Hero Carousel */}
        <div className="relative group">
          <div
            ref={heroViewportRef}
            className="overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex">
              {heroSlides.map((slide, index) => (
                <div key={index} className="min-w-full relative">
                  {/* Background image with Ken Burns effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ${
                        index === heroActiveIndex && !isHovered ? 'scale-110' : 'scale-100'
                      }`}
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        filter: 'brightness(0.4)',
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 grid md:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 min-h-[600px] items-center">
                    {/* Left content */}
                    <div className="space-y-6">
                      {/* Subtitle */}
                      <div className={`text-sm font-bold tracking-widest uppercase bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                        {slide.subtitle}
                      </div>

                      {/* Title */}
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight tracking-tight">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-xl">
                        {slide.description}
                      </p>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                          href="#talent-compass"
                          className="group inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 font-bold text-white transition-all hover:scale-105"
                        >
                          <span className="flex items-center gap-2">
                            Start Your Journey
                            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Right side - Featured image card */}
                    <div className="hidden md:block">
                      <div className="group/card relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-4 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={slide.image}
                            alt={slide.alt}
                            className="h-[400px] w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                          <p className="text-white/90 text-sm font-medium">{slide.alt}</p>
                        </div>
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Simple dot indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {heroSlides.map((slide, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className="group relative"
                aria-label={`Go to slide ${i + 1}`}
                title={slide.title}
              >
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    i === heroActiveIndex
                      ? "bg-white scale-125 shadow-lg shadow-white/50"
                      : "bg-white/40 group-hover:bg-white/70 scale-100"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Journey section */}
        {showJourney && (
          <div className="max-w-5xl mx-auto mt-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">
              Your Complete{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                Learning Journey
              </span>
            </h3>

            {/* Step progress */}
            <div className="mb-10">
              <div className="flex items-center mb-2">
                {onboardingSteps.map((step, index) => (
                  <div key={index} className="flex-1 relative">
                    <div className="flex items-center">
                      {index > 0 && (
                        <div
                          className={`flex-grow h-[2px] transition-all duration-500 ${
                            index <= currentStep ? "bg-emerald-500" : "bg-white/20"
                          }`}
                        />
                      )}
                      <button
                        onClick={() => goToStep(index)}
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep === index
                            ? "bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-110"
                            : index < currentStep
                            ? "bg-emerald-400 text-white hover:scale-105"
                            : "bg-white/10 text-white/50 hover:bg-white/20 hover:scale-105"
                        }`}
                      >
                        {index < currentStep ? (
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </button>
                      {index < onboardingSteps.length - 1 && (
                        <div
                          className={`flex-grow h-[2px] transition-all duration-500 ${
                            index < currentStep ? "bg-emerald-500" : "bg-white/20"
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold transition-colors ${
                        currentStep === index ? "text-emerald-400" : "text-white/50"
                      }`}
                    >
                      {step.title.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full bg-white/10 rounded-full h-2 mt-12">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 shadow-lg shadow-emerald-500/50"
                  style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step card */}
            <div
              className={`rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className={`md:w-1/2 p-10 md:p-12 text-white ${onboardingSteps[currentStep].background}`}>
                  <div className="text-5xl mb-6">{onboardingSteps[currentStep].icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{onboardingSteps[currentStep].title}</h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">{onboardingSteps[currentStep].description}</p>
                  <div className="flex gap-4">
                    {currentStep > 0 && (
                      <button
                        onClick={goToPrevStep}
                        className="rounded-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 font-semibold transition-all hover:scale-105"
                      >
                        ← Previous
                      </button>
                    )}
                    {currentStep < onboardingSteps.length - 1 ? (
                      <button
                        onClick={goToNextStep}
                        className="rounded-full bg-white text-gray-900 hover:bg-white/95 px-6 py-3 font-bold transition-all hover:scale-105 shadow-lg"
                      >
                        Continue →
                      </button>
                    ) : (
                      <a
                        href="#talent-compass"
                        className="rounded-full bg-white text-gray-900 hover:bg-white/95 px-6 py-3 font-bold transition-all hover:scale-105 shadow-lg"
                      >
                        Start Your Journey →
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:w-1/2 p-10 md:p-12 bg-gradient-to-br from-white/5 to-white/10">
                  {onboardingSteps[currentStep].character && (
                    <>
                      <div className="flex items-center mb-8">
                        <div className="w-20 h-20 rounded-full overflow-hidden mr-5 border-2 border-white/30 shadow-xl">
                          <img
                            src={onboardingSteps[currentStep].character.image}
                            alt={onboardingSteps[currentStep].character.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-white">{onboardingSteps[currentStep].character.name}</h3>
                          <p className="text-sm text-white/70">{onboardingSteps[currentStep].character.role}</p>
                        </div>
                      </div>
                      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 relative backdrop-blur-sm">
                        <svg className="absolute top-4 left-4 h-8 w-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-white/95 text-lg font-medium italic leading-relaxed relative z-10">
                          {onboardingSteps[currentStep].character.quote}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center gap-3 mt-10">
                    {onboardingSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToStep(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentStep ? "w-10 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={toggleJourney}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full py-3 px-6 border border-white/10 backdrop-blur-sm transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close Journey View
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
