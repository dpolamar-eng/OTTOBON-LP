import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAnimation, useStaggeredAnimation } from "@/hooks/use-animation";

type CourseCategory = "all" | "Career Launch" | "Tech Edge" | "Career Assist";

interface CategoryInfo {
  id: CourseCategory;
  title: string;
  description: string;
}

const categories: CategoryInfo[] = [
  {
    id: "Career Launch",
    title: "Up-Skill",
    description: "Placement Guaranteed path",
  },
  {
    id: "Tech Edge",
    title: "Job Assist",
    description: "High demand skills in Market",
  },
  {
    id: "Career Assist",
    title: "Career Support",
    description: "Expert guidance for your career journey",
  },
];

interface Course {
  id: string;
  title: string;
  category: "Career Launch" | "Tech Edge" | "Career Assist";
  categoryLabel: string;
  color: string;
  bgColor: string;
  description: string;
  outcomes: string[];
  logoUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function CoursesSection() {
  const [activeFilter, setActiveFilter] =
    useState<CourseCategory>("Career Launch");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Courses data
  const courses: Course[] = [
    {
      id: "ai-agent-development",
      title: "AI Agent Development",
      category: "Career Launch",
      categoryLabel: "Agent Engineering",
      color: "emerald-800",
      bgColor: "emerald-100",
      description:
        "Build intelligent AI agents and autonomous systems using cutting-edge frameworks and NLP.",
      outcomes: [
        "Design conversational AI agents and chatbots",
        "Build multi-agent systems and autonomous workflows",
        "Implement advanced NLP and reasoning capabilities",
        "Create scalable agent architectures for enterprises",
      ],
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-700",
    },
    {
      id: "ai-marketing",
      title: "AI in Marketing",
      category: "Career Launch",
      categoryLabel: "Marketing Intelligence",
      color: "amber-800",
      bgColor: "amber-100",
      description:
        "Master AI-driven marketing strategies and automation tools to transform customer engagement.",
      outcomes: [
        "Build AI-powered marketing automation systems",
        "Master predictive analytics and behavior modeling",
        "Create AI-driven content and campaign optimization",
        "Implement advanced attribution and ROI measurement",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-700",
    },
    {
      id: "ai-uiux",
      title: "AI for Web-developer",
      category: "Career Launch",
      categoryLabel: "Design Intelligence",
      color: "indigo-800",
      bgColor: "indigo-100",
      description:
        "Integrate AI into UI/UX workflows for smarter, data-driven design and personalized user experiences.",
      outcomes: [
        "Master AI-driven design principles and tools",
        "Build generative UI/UX prototyping systems",
        "Apply AI to user research and testing workflows",
        "Design adaptive, personalized interfaces",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-indigo-700",
    },
    {
      id: "ai-data-labeling",
      title: "AI Data Labeling",
      category: "Career Launch",
      categoryLabel: "Data Intelligence",
      color: "pink-800",
      bgColor: "pink-100",
      description:
        "Specialize in high-quality data annotation and labeling workflows for training robust AI models.",
      outcomes: [
        "Master advanced data annotation and quality control",
        "Design efficient labeling workflows and guidelines",
        "Build automated labeling and human-in-the-loop systems",
        "Apply domain-specific labeling for various AI applications",
      ],
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/512px-Jupyter_logo.svg.png",
      gradientFrom: "from-pink-500",
      gradientTo: "to-pink-700",
    },
    {
      id: "resume-builder",
      title: "Resume Building",
      category: "Tech Edge",
      categoryLabel: "Career Tools",
      color: "blue-800",
      bgColor: "blue-100",
      description:
        "Create professional, ATS-friendly resumes tailored to your career goals and industry standards.",
      outcomes: [
        "Design tailored resumes for different job roles",
        "Leverage templates optimized for applicant tracking systems",
        "Highlight key skills and achievements effectively",
        "Export resumes in multiple professional formats",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-700",
    },
    {
      id: "job-matching",
      title: "Find a Job",
      category: "Tech Edge",
      categoryLabel: "Career Opportunities",
      color: "green-800",
      bgColor: "green-100",
      description:
        "Discover personalized job opportunities using AI-powered job matching systems.",
      outcomes: [
        "Match skills with the most relevant job postings",
        "Access hidden opportunities through smart recommendations",
        "Save time by filtering jobs automatically",
        "Receive tailored career growth suggestions",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-700",
    },
    {
      id: "mock-interviews",
      title: "Mock Interviews",
      category: "Tech Edge",
      categoryLabel: "Interview Preparation",
      color: "purple-800",
      bgColor: "purple-100",
      description:
        "Prepare for interviews with realistic practice sessions and AI-driven feedback.",
      outcomes: [
        "Practice technical and behavioral interviews",
        "Receive real-time performance analysis and feedback",
        "Build confidence with simulated interview environments",
        "Identify areas for improvement before real interviews",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-700",
    },
    {
      id: "expert-app",
      title: "Guidance Hub",
      category: "Career Assist",
      categoryLabel: "Guidance from Experts",
      color: "teal-800",
      bgColor: "teal-100",
      description:
        "Helps you to solve everyday technical challenges, grow within your organization, and map a clear path to success.",
      outcomes: [
        "Access expert knowledge in Python programming",
        "Learn eCommerce best practices and strategies",
        "Get personalized career advice from domain experts",
        "Receive real-time answers to technical questions",
        "Build skills through interactive expert sessions",
      ],
      logoUrl: "https://cdn-icons-png.flaticon.com/512/4712/4712038.png",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-700",
    },
  ];

  // Filter courses based on selected category
  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

  // Toggle flip card state
  const toggleFlipCard = (courseId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  // Responsive slide count function
  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  // State for responsive slides
  const [slidesPerView, setSlidesPerView] = useState(getVisibleSlides());

  // Embla carousel setup
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: "keepSnaps",
    direction: "ltr",
    startIndex: 0,
  });
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayInterval = 3000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we need to show navigation at all
  const [canScroll, setCanScroll] = useState(true);

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [embla, slidesPerView]);

  const onSelect = useCallback(() => {
    if (!embla) return;
  }, [embla]);

  const autoplayCallback = useCallback(() => {
    if (!embla || !autoplay || isHovering) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

    autoplayTimeoutRef.current = setTimeout(() => {
      if (!embla || isHovering) return;
      embla.scrollNext();
      autoplayCallback();
    }, autoplayInterval);
  }, [autoplay, embla, autoplayInterval, isHovering]);

  useEffect(() => {
    if (!embla) return;

    // Set initial scroll state
    const updateCanScroll = () => {
      const totalSlides = filteredCourses.length;
      const visibleSlides = getVisibleSlides();
      setCanScroll(totalSlides > visibleSlides);
    };

    updateCanScroll();
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", updateCanScroll);

    if (autoplay && canScroll) {
      autoplayCallback();
    }

    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", updateCanScroll);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [
    autoplay,
    autoplayCallback,
    embla,
    onSelect,
    isHovering,
    filteredCourses,
    canScroll,
  ]);

  // Effect to restart autoplay when hovering stops
  useEffect(() => {
    if (!isHovering && autoplay) {
      autoplayCallback();
    }
  }, [isHovering, autoplay, autoplayCallback]);

  // Animation refs
  const sectionRef = useAnimation("animate-fade-in");
  const headingRef = useAnimation("animate-slide-up");
  const descriptionRef = useAnimation("animate-slide-up delay-100");
  const filtersRef = useAnimation("animate-slide-up delay-200");
  const carouselRef = useAnimation("animate-scale-in delay-300");

  return (
    <section
      id="courses"
      className="py-16 overflow-hidden bg-black relative"
      ref={sectionRef}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4 bg-blue-500/20 px-4 py-2 rounded-full">
            <span className="text-blue-400 mr-2 text-xl">🔥</span>
            <span className="text-blue-300 font-medium text-sm uppercase tracking-wider">
              In-Demand Skills
            </span>
          </div>
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
          >
            Advance Your Professional Skills
          </h2>
          
          <div className="bg-blue-900/40 border border-blue-500/50 rounded-lg p-4 max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-semibold text-blue-300">Course Availability</h3>
            </div>
            <p className="text-blue-100 text-center text-sm">
              <span className="font-semibold text-green-400">AI for Web-developer</span> is now accepting applications. 
              All other courses are <span className="font-semibold text-orange-400">coming soon</span> - join our waitlist to be notified when enrollment opens.
            </p>
          </div>
          <div className="fancy-divider"></div>
        </div>

        {/* Course Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {categories.map((category) => (
              <div key={category.id} className="text-center">
                <button
                  className={`font-medium py-2 px-8 rounded-full transition flex items-center ${
                    activeFilter === category.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white hover:bg-gray-100 text-gray-700 shadow-sm"
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <span className="mr-2 text-lg">
                    {category.id === "Career Launch"
                      ? "🚀"
                      : category.id === "Tech Edge"
                        ? "⚙️"
                        : "🎯"}
                  </span>
                  {category.title}
                </button>
              </div>
            ))}
          </div>

          {/* Description for selected category only */}
          <div className="text-center animate-fade-in">
            {categories.map(
              (category) =>
                activeFilter === category.id && (
                  <p key={category.id} className="text-sm text-gray-600 mt-2">
                    {category.description}
                  </p>
                ),
            )}
          </div>
        </div>

        {/* Course Carousel */}
        <div ref={carouselRef} className="relative">
          <div
            className="overflow-hidden"
            ref={viewportRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={`flex ${filteredCourses.length === 1 ? "justify-center" : ""}`}
            >
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`${filteredCourses.length === 1 ? "w-full max-w-sm mx-auto" : "min-w-[100%] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)]"} px-2 sm:px-4 flex-shrink-0`}
                >
                  <div
                    className={`flip-card ${flippedCards[course.id] ? "flipped" : ""} group relative h-[450px] sm:h-[500px]`}
                    onClick={() => toggleFlipCard(course.id)}
                    onTouchStart={() => setIsHovering(true)}
                    onTouchEnd={() => setIsHovering(false)}
                    onMouseDown={() => setIsHovering(true)}
                    onMouseUp={() => setIsHovering(false)}
                  >
                    <div
                      className={`flip-card-inner ${flippedCards[course.id] ? "flipped" : ""}`}
                    >
                      {/* Card Front */}
                      <div className="flip-card-front">
                        <div
                          className={`h-3/5 bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} flex items-center justify-center p-3 sm:p-6 relative overflow-hidden`}
                        >
                          {/* Decorative elements - responsive sizes */}
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-8 sm:w-16 h-8 sm:h-16 bg-white/10 rounded-full"></div>
                            <div className="absolute bottom-6 sm:bottom-12 right-4 sm:right-8 w-10 sm:w-20 h-10 sm:h-20 bg-white/10 rounded-full"></div>
                            <div className="absolute top-1/3 right-1/4 w-6 sm:w-12 h-6 sm:h-12 bg-white/10 rounded-full"></div>
                            <div className="bg-grid-pattern opacity-20 absolute inset-0"></div>
                          </div>

                          {course.logoUrl ? (
                            <img
                              src={course.logoUrl}
                              alt={course.title}
                              className="h-16 sm:h-20 md:h-24 max-w-full object-contain relative z-10"
                            />
                          ) : (
                            <div className="relative z-10 text-white text-4xl sm:text-5xl md:text-7xl">
                              {course.id === "genai"
                                ? "🤖"
                                : course.id === "cloud"
                                  ? "☁️"
                                  : course.id === "data"
                                    ? "📊"
                                    : course.id === "ai-uiux"
                                      ? "🎨"
                                      : course.id === "ai-marketing"
                                        ? "📈"
                                        : course.id === "ai-agent-development"
                                          ? "🤖"
                                          : course.id === "ai-data-labeling"
                                            ? "🏷️"
                                            : course.id === "expert-app"
                                              ? "🧠"
                                              : "💻"}
                            </div>
                          )}
                        </div>
                        <div className="p-3 sm:p-4 md:p-6 flex flex-col h-2/5 bg-gray-800">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 gap-2">
                            <div className="flex flex-col min-w-0 flex-1">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight text-white truncate">
                                {course.title}
                              </h3>
                              <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                                {course.id !== "ai-uiux" && (
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30">
                                    Coming Soon
                                  </span>
                                )}
                                {course.id === "ai-uiux" && (
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-400/30">
                                    Enroll Now
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-700 text-gray-200 flex items-center flex-shrink-0 self-start sm:self-auto">
                              <span className="mr-1">
                                {course.id === "genai" && "🤖"}
                                {course.id === "cloud" && "☁️"}
                                {course.id === "data" && "📊"}
                                {course.id === "blockchain" && "🔗"}
                                {course.id === "ai-uiux" && "🎨"}
                                {course.id === "ai-marketing" && "📈"}
                                {course.id === "ai-agent-development" && "🤖"}
                                {course.id === "ai-data-labeling" && "🏷️"}
                                {course.id === "expert-app" && "🧠"}
                              </span>
                              <span className="hidden sm:inline">{course.categoryLabel}</span>
                              <span className="sm:hidden">{course.categoryLabel.split(' ')[0]}</span>
                            </span>
                          </div>
                          <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed flex-1 line-clamp-3 sm:line-clamp-4">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div className="flip-card-back">
                        <div className="p-3 sm:p-4 md:p-6 h-full flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
                          <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold flex items-center text-white flex-1 min-w-0">
                              <span className="text-lg sm:text-xl md:text-2xl mr-2 flex-shrink-0">
                                {course.id === "genai"
                                  ? "🤖"
                                  : course.id === "cloud"
                                    ? "☁️"
                                    : course.id === "data"
                                      ? "📊"
                                      : course.id === "ai-uiux"
                                        ? "🎨"
                                        : course.id === "ai-marketing"
                                          ? "📈"
                                          : course.id === "ai-agent-development"
                                            ? "🤖"
                                            : course.id === "ai-data-labeling"
                                              ? "🏷️"
                                              : course.id === "expert-app"
                                                ? "🧠"
                                                : "💻"}
                              </span>
                              <span className="truncate">{course.title}</span>
                            </h3>
                            <button
                              className="text-gray-400 hover:text-gray-200 bg-gray-700 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-sm hover:shadow transition flex-shrink-0 ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlipCard(course.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="sm:w-4 sm:h-4"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>

                          <div className="overflow-y-auto flex-1 scrollbar-hide">
                            <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                              <h4 className="font-semibold mb-2 text-blue-300 flex items-center text-sm sm:text-base">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="mr-2 flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                Key Outcomes
                              </h4>
                              <ul className="mb-1 space-y-1 sm:space-y-2">
                                {course.outcomes.map((outcome, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start text-xs sm:text-sm"
                                  >
                                    <span className="text-green-400 mr-2 mt-1 flex-shrink-0">
                                      ✓
                                    </span>
                                    <span className="text-gray-200 leading-tight">
                                      {outcome}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Conditional content based on course category */}
                            {course.category === "Career Launch" ? (
                              <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-purple-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <rect
                                          x="3"
                                          y="4"
                                          width="18"
                                          height="18"
                                          rx="2"
                                          ry="2"
                                        ></rect>
                                        <line
                                          x1="16"
                                          y1="2"
                                          x2="16"
                                          y2="6"
                                        ></line>
                                        <line
                                          x1="8"
                                          y1="2"
                                          x2="8"
                                          y2="6"
                                        ></line>
                                        <line
                                          x1="3"
                                          y1="10"
                                          x2="21"
                                          y2="10"
                                        ></line>
                                      </svg>
                                      Duration
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      12-week immersive program
                                    </p>
                                  </div>

                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-green-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <path d="M12 3v19M5 8h14M5 18h14"></path>
                                      </svg>
                                      Format
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      Hands-on projects with expert mentors
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg mb-3 sm:mb-4">
                                  <h4 className="font-semibold mb-1 sm:mb-2 text-blue-300 flex items-center text-xs sm:text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                    >
                                      <path d="M20 7h-9"></path>
                                      <path d="M14 17H5"></path>
                                      <circle cx="17" cy="17" r="3"></circle>
                                      <circle cx="7" cy="7" r="3"></circle>
                                    </svg>
                                    Career Opportunities
                                  </h4>
                                  <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                    Graduates work as specialized consultants in
                                    top firms with excellent career advancement
                                    opportunities and competitive compensation
                                    packages.
                                  </p>
                                </div>
                              </>
                            ) : course.category === "Tech Edge" ? (
                              <>
                                <div className="grid grid-cols-1 gap-2 sm:gap-4 mb-3 sm:mb-4">
                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-blue-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                                      </svg>
                                      Instant Access
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      Available 24/7 with real-time processing
                                    </p>
                                  </div>

                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-green-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <path d="M9 12l2 2 4-4"></path>
                                        <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                                        <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                                      </svg>
                                      AI-Powered
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      Smart algorithms for best matches
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg mb-3 sm:mb-4">
                                  <h4 className="font-semibold mb-1 sm:mb-2 text-purple-300 flex items-center text-xs sm:text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                    >
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="8.5" cy="7" r="4"></circle>
                                      <polyline points="17 11 19 13 23 9"></polyline>
                                    </svg>
                                    Success Rate
                                  </h4>
                                  <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                    93% of users find relevant opportunities
                                    within the first month of using our
                                    platform.
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="grid grid-cols-1 gap-2 sm:gap-4 mb-3 sm:mb-4">
                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-teal-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="8.5" cy="7" r="4"></circle>
                                        <path d="m21 2-1 1"></path>
                                        <path d="m22 5-1-1"></path>
                                        <path d="m21 6-1-1"></path>
                                      </svg>
                                      Expert Mentors
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      Industry professionals with 10+ years
                                      experience
                                    </p>
                                  </div>

                                  <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg">
                                    <h4 className="font-semibold mb-1 sm:mb-2 text-orange-300 flex items-center text-xs sm:text-sm">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                      >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                      </svg>
                                      Personalized
                                    </h4>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                      Tailored guidance based on your goals
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-gray-600 p-2 sm:p-3 md:p-4 rounded-lg mb-3 sm:mb-4">
                                  <h4 className="font-semibold mb-1 sm:mb-2 text-indigo-300 flex items-center text-xs sm:text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-1 sm:mr-2 flex-shrink-0 sm:w-[16px] sm:h-[16px]"
                                    >
                                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    Investment
                                  </h4>
                                  <p className="text-gray-200 text-xs sm:text-sm leading-tight">
                                    Affordable monthly subscription with
                                    unlimited access to expert guidance and
                                    resources.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="mt-3 sm:mt-4 text-center">
                            {course.id === "ai-uiux" ? (
                              <a
                                href="#talent-compass"
                                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-full transition shadow-md hover:shadow-lg relative overflow-hidden group inline-flex text-xs sm:text-sm"
                              >
                                <span className="relative z-10 flex items-center justify-center">
                                  Apply Now
                                  <svg
                                    className="ml-1 w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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
                            ) : (
                              <button
                                disabled
                                className="bg-gray-600 text-gray-400 font-semibold py-2 px-4 sm:px-6 rounded-full cursor-not-allowed opacity-60 inline-flex items-center text-xs sm:text-sm"
                              >
                                <span className="flex items-center justify-center">
                                  Coming Soon
                                  <svg
                                    className="ml-1 w-3 h-3 sm:w-4 sm:h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                  </svg>
                                </span>
                              </button>
                            )}
                          </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-2 md:right-2 bg-white/90 backdrop-blur-sm shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-105 border border-blue-100"
                onClick={() => embla?.scrollNext()}
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Pause/Play Button */}
              <button
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm shadow-md rounded-full w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition border border-blue-100"
                onClick={() => setAutoplay(!autoplay)}
                aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
              >
                {autoplay ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}