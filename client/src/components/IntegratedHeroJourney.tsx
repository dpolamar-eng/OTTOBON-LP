import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAnimation, useStaggeredAnimation } from "@/hooks/use-animation";

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
    containScroll: "trimSnaps",
  });

  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Onboarding journey states
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showJourney, setShowJourney] = useState(false);

  // Animation refs
  const headingRef = useAnimation("animate-slide-up");
  const descriptionRef = useAnimation("animate-slide-up delay-100");
  const ctaRef = useAnimation("animate-slide-up delay-200");
  const imageRef = useAnimation("animate-slide-right delay-300");
  const indicatorsRef = useAnimation("animate-fade-in delay-400");
  const journeyRef = useAnimation("animate-slide-up");

  const heroSlides = [
    {
      title:
        "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Up-Skill</span> for Career <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Growth</span>",
      description:
        "Master AI-driven technologies with placement guaranteed programs. From AI for UI/UX Design to Agent Development, gain cutting-edge skills that employers demand with expert mentorship and hands-on projects.",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Technology professional in modern workspace",
    },
    {
      title:
        "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Job Assistance</span> for <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Success</span>",
      description:
        "Access comprehensive job search tools including ATS-friendly resume builders, AI-powered job matching, and realistic mock interview preparation to accelerate your career transition and land your dream role.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Collaborative learning environment",
    },
    {
      title:
        "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Career Assist</span> with Expert <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Guidance</span>",
      description:
        "Get personalized mentorship from AI-powered experts in Python, eCommerce, and emerging technologies. Receive real-time guidance, technical answers, and career advice tailored to your professional journey.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Professional working on advanced technology",
    },
  ];

  // Define the onboarding journey steps
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
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
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
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
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
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
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
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      },
    },
  ];

  // Auto scroll for the hero carousel
  const [isHovered, setIsHovered] = useState(false);

  const autoplayCallback = useCallback(() => {
    if (!heroEmbla || isHovered) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

    autoplayTimeoutRef.current = setTimeout(() => {
      if (!heroEmbla || isHovered) return;
      heroEmbla.scrollNext();
    }, autoplayInterval);
  }, [heroEmbla, autoplayInterval, isHovered]);

  // When the carousel scrolls, update the active index
  const onHeroSelect = useCallback(() => {
    if (!heroEmbla) return;
    setHeroActiveIndex(heroEmbla.selectedScrollSnap());
    autoplayCallback();
  }, [heroEmbla, autoplayCallback]);

  // Add scroll to specific slide functionality
  const scrollTo = useCallback(
    (index: number) => {
      if (!heroEmbla) return;
      heroEmbla.scrollTo(index);
    },
    [heroEmbla],
  );

  // Navigation functions
  const goToNextSlide = useCallback(() => {
    if (!heroEmbla) return;
    heroEmbla.scrollNext();
  }, [heroEmbla]);

  const goToPrevSlide = useCallback(() => {
    if (!heroEmbla) return;
    heroEmbla.scrollPrev();
  }, [heroEmbla]);

  useEffect(() => {
    if (!heroEmbla) return;

    onHeroSelect();
    heroEmbla.on("select", onHeroSelect);
    autoplayCallback();

    return () => {
      heroEmbla.off("select", onHeroSelect);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [heroEmbla, onHeroSelect, autoplayCallback]);

  // Restart autoplay when hover state changes
  useEffect(() => {
    if (!isHovered) {
      autoplayCallback();
    } else {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    }
  }, [isHovered, autoplayCallback]);

  // Handle journey navigation
  const toggleJourney = () => {
    setShowJourney(!showJourney);

    // Scroll to methodology section
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
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-8 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]">
      <div className="container mx-auto px-1 sm:px-3 md:px-4 relative z-10 overflow-hidden">
        {/* Hero Content */}
        <div className="mb-12 md:mb-16">
          <div className="relative">
            <div
              className="overflow-hidden"
              ref={heroViewportRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex">
                {heroSlides.map((slide, index) => (
                  <div
                    key={index}
                    className="min-w-full flex-shrink-0 w-screen max-w-full"
                  >
                    <div className="max-w-7xl mx-auto">
                      <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-6 md:py-6 relative px-2 sm:px-4 md:px-6">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0 relative z-1 px-0 pt-1 sm:pt-2 md:pt-0">
                          <div className="w-full max-w-full overflow-hidden mb-3 md:mb-4">
                            <h1
                              ref={headingRef}
                              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-black"
                              style={{
                                maxWidth: "100%",
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                whiteSpace: "normal",
                                hyphens: "auto",
                              }}
                              dangerouslySetInnerHTML={{ __html: slide.title }}
                            ></h1>
                          </div>
                          <p
                            ref={descriptionRef}
                            className="text-sm sm:text-base md:text-lg lg:text-xl text-black/80 mb-4 md:mb-6 max-w-lg leading-relaxed"
                          >
                            {slide.description}
                          </p>
                          <div
                            ref={ctaRef}
                            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4"
                          >
                            <a
                              href="#talent-compass"
                              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 md:px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-center relative overflow-hidden group text-sm sm:text-base w-fit mx-auto sm:mx-0 sm:w-auto"
                            >
                              <span className="relative z-10 flex items-center justify-center transition-all duration-300">
                                <span className="truncate whitespace-nowrap">
                                  Start Your Journey
                                </span>
                                <svg
                                  className="w-5 h-4 sm:w-5 sm:h-5 opacity-0 scale-0 -ml-1 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 transition-all duration-300 flex-shrink-0"
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
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-shine"></span>
                            </a>
                          </div>
                          <div className="mt-4 text-xs sm:text-sm">
                            <p className="flex flex-wrap items-center font-medium text-emerald-600">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <span className="break-words">
                                Qualify for up to 90% tuition discount through
                                our Talent Compass
                              </span>
                            </p>
                          </div>
                        </div>
                        <div
                          ref={imageRef}
                          className="w-full md:w-1/2 relative z-1"
                        >
                          <div className="max-w-sm mx-auto md:max-w-none relative overflow-hidden rounded-lg hover:-translate-y-1 hover:scale-[1.01] transition duration-300 shadow-xl bg-gradient-to-r p-[3px] from-blue-500 to-purple-600">
                            <img
                              src={slide.image}
                              alt={slide.alt}
                              className="rounded-lg w-full object-cover h-64 sm:h-80 md:h-96 transition duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/20 opacity-70 mix-blend-overlay"></div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-4">
                              <p className="text-black font-medium text-sm">
                                {slide.alt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Positioned relative to slider container */}
            <button
              onClick={goToPrevSlide}
              className="absolute z-10 bg-gray-600/80 hover:bg-gray-700/90 text-white hover:text-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-500 hover:border-gray-400 backdrop-blur-sm
                left-2 sm:left-4 top-1/2 -translate-y-1/2"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute z-10 bg-gray-600/80 hover:bg-gray-700/90 text-white hover:text-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-500 hover:border-gray-400 backdrop-blur-sm
                right-2 sm:right-4 top-1/2 -translate-y-1/2"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center mt-8">
            <div
              ref={indicatorsRef}
              className="flex justify-center space-x-2 bg-transparent py-2 px-4"
            >
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === heroActiveIndex
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
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
            <h3 className="text-2xl font-bold text-center mb-6 text-white">
              Your Complete{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Learning Journey
              </span>
            </h3>

            {/* Progress steps with arrows */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                {onboardingSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 relative ${index > 0 ? "" : ""}`}
                  >
                    <div className="flex items-center">
                      {/* Step Connector Line */}
                      {index > 0 && (
                        <div
                          className={`flex-grow h-[2px] ${
                            index <= currentStep ? "bg-blue-600" : "bg-gray-300"
                          } transition-colors duration-300`}
                        ></div>
                      )}

                      {/* Step Button */}
                      <button
                        onClick={() => goToStep(index)}
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all 
                          ${
                            currentStep === index
                              ? "bg-blue-600 text-white ring-4 ring-blue-100"
                              : index < currentStep
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                          }`}
                      >
                        {index < currentStep ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ) : currentStep === index ? (
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                          </div>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        )}
                      </button>

                      {/* Step Connector Line */}
                      {index < onboardingSteps.length - 1 && (
                        <div
                          className={`flex-grow h-[2px] ${
                            index < currentStep ? "bg-blue-600" : "bg-gray-300"
                          } transition-colors duration-300`}
                        ></div>
                      )}
                    </div>

                    {/* Step Label */}
                    <div
                      className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium
                      ${
                        currentStep === index
                          ? "text-blue-300"
                          : "text-white/70"
                      }`}
                    >
                      {step.title.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-8">
                <div
                  className="h-1.5 rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${((currentStep + 1) / onboardingSteps.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Main content card */}
            <div
              className={`bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Step content */}
                <div
                  className={`md:w-1/2 p-8 md:p-10 ${onboardingSteps[currentStep].background} text-white`}
                >
                  <div className="text-4xl mb-4">
                    {onboardingSteps[currentStep].icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {onboardingSteps[currentStep].title}
                  </h2>
                  <p className="mb-6 text-white/90">
                    {onboardingSteps[currentStep].description}
                  </p>

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
                        className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center transition-all duration-300">
                          <span className="whitespace-nowrap">Continue</span>
                          <svg
                            className="w-4 h-4 opacity-0 scale-0 -ml-1 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 transition-all duration-300"
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
                    ) : (
                      <a
                        href="#talent-compass"
                        className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center transition-all duration-300">
                          <span className="whitespace-nowrap">Start Your Journey</span>
                          <svg
                            className="w-4.5 h-4.5 opacity-0 scale-0 -ml-1 group-hover:opacity-100 group-hover:scale-100 group-hover:ml-1 transition-all duration-300"
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
                          <h3 className="font-bold text-white">
                            {onboardingSteps[currentStep].character.name}
                          </h3>
                          <p className="text-sm text-white/70">
                            {onboardingSteps[currentStep].character.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-inner border border-white/20 relative">
                          <div className="absolute -top-3 -left-2 text-4xl text-white/20">
                            "
                          </div>
                          <div className="absolute -bottom-3 -right-2 text-4xl text-white/20">
                            "
                          </div>
                          <p className="text-white font-medium italic relative z-10">
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
                            ? "bg-blue-500 w-6"
                            : "bg-white/30 hover:bg-white/50"
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
                className="inline-flex items-center text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-4 transition"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
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
