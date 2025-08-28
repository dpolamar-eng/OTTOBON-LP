import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation, useStaggeredAnimation } from '@/hooks/use-animation';

type CourseCategory = 'all' | 'Career Launch' | 'Tech Edge';

interface CategoryInfo {
  id: CourseCategory;
  title: string;
  description: string;
}

const categories: CategoryInfo[] = [
  {
    id: 'Career Launch',
    title: 'Up-Skill',
    description: 'Placement Guaranteed path'
  },
  {
    id: 'Tech Edge',
    title: 'Job Assist',
    description: 'High demand skills in Market'
  }
];

interface Course {
  id: string;
  title: string;
  category: 'Career Launch' | 'Tech Edge';
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
  const [activeFilter, setActiveFilter] = useState<CourseCategory>('Career Launch');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Courses data
  const courses: Course[] = [
    {
      id: 'ai-uiux',
      title: 'AI for UI/UX Designer',
      category: 'Career Launch',
      categoryLabel: 'Design Intelligence',
      color: 'indigo-800',
      bgColor: 'indigo-100',
      description: 'Integrate AI into UI/UX workflows for smarter, data-driven design and personalized user experiences.',
      outcomes: [
        'Master AI-driven design principles and tools',
        'Build generative UI/UX prototyping systems',
        'Apply AI to user research and testing workflows',
        'Design adaptive, personalized interfaces'
      ],
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-700'
    },
    {
      id: 'ai-marketing',
      title: 'AI in Marketing',
      category: 'Career Launch',
      categoryLabel: 'Marketing Intelligence',
      color: 'amber-800',
      bgColor: 'amber-100',
      description: 'Master AI-driven marketing strategies and automation tools to transform customer engagement.',
      outcomes: [
        'Build AI-powered marketing automation systems',
        'Master predictive analytics and behavior modeling',
        'Create AI-driven content and campaign optimization',
        'Implement advanced attribution and ROI measurement'
      ],
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-amber-700'
    },
    {
      id: 'ai-agent-development',
      title: 'AI Agent Development',
      category: 'Career Launch',
      categoryLabel: 'Agent Engineering',
      color: 'emerald-800',
      bgColor: 'emerald-100',
      description: 'Build intelligent AI agents and autonomous systems using cutting-edge frameworks and NLP.',
      outcomes: [
        'Design conversational AI agents and chatbots',
        'Build multi-agent systems and autonomous workflows',
        'Implement advanced NLP and reasoning capabilities',
        'Create scalable agent architectures for enterprises'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-emerald-700'
    },
    {
      id: 'ai-data-labeling',
      title: 'AI Data Labeling',
      category: 'Career Launch',
      categoryLabel: 'Data Intelligence',
      color: 'pink-800',
      bgColor: 'pink-100',
      description: 'Specialize in high-quality data annotation and labeling workflows for training robust AI models.',
      outcomes: [
        'Master advanced data annotation and quality control',
        'Design efficient labeling workflows and guidelines',
        'Build automated labeling and human-in-the-loop systems',
        'Apply domain-specific labeling for various AI applications'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/512px-Jupyter_logo.svg.png',
      gradientFrom: 'from-pink-500',
      gradientTo: 'to-pink-700'
    },
    {
      id: 'resume-builder',
      title: 'Resume Builder',
      category: 'Tech Edge',
      categoryLabel: 'Career Tools',
      color: 'blue-800',
      bgColor: 'blue-100',
      description: 'Create professional, ATS-friendly resumes tailored to your career goals and industry standards.',
      outcomes: [
        'Design tailored resumes for different job roles',
        'Leverage templates optimized for applicant tracking systems',
        'Highlight key skills and achievements effectively',
        'Export resumes in multiple professional formats'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Microsoft_Office_Word_%282019%E2%80%93present%29.svg',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700'
    },
    {
      id: 'job-matching',
      title: 'Find a Job / Job Matching',
      category: 'Tech Edge',
      categoryLabel: 'Career Opportunities',
      color: 'green-800',
      bgColor: 'green-100',
      description: 'Discover personalized job opportunities using AI-powered job matching systems.',
      outcomes: [
        'Match skills with the most relevant job postings',
        'Access hidden opportunities through smart recommendations',
        'Save time by filtering jobs automatically',
        'Receive tailored career growth suggestions'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/LinkedIn_logo_initials.png',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700'
    },
    {
      id: 'mock-interviews',
      title: 'Mock Interviews',
      category: 'Tech Edge',
      categoryLabel: 'Interview Preparation',
      color: 'purple-800',
      bgColor: 'purple-100',
      description: 'Prepare for interviews with realistic practice sessions and AI-driven feedback.',
      outcomes: [
        'Practice technical and behavioral interviews',
        'Receive real-time performance analysis and feedback',
        'Build confidence with simulated interview environments',
        'Identify areas for improvement before real interviews'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Google_Forms_2020_Logo.svg',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700'
    }
  ];

  // Filter courses based on selected category
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  // Toggle flip card state
  const toggleFlipCard = (courseId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Responsive slide count function
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
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
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
    containScroll: 'keepSnaps',
    direction: 'ltr',
    startIndex: 0
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    embla.on('select', onSelect);
    embla.on('reInit', updateCanScroll);

    if (autoplay && canScroll) {
      autoplayCallback();
    }

    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', updateCanScroll);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, autoplayCallback, embla, onSelect, isHovering, filteredCourses, canScroll]);

  // Effect to restart autoplay when hovering stops
  useEffect(() => {
    if (!isHovering && autoplay) {
      autoplayCallback();
    }
  }, [isHovering, autoplay, autoplayCallback]);

  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const headingRef = useAnimation('animate-slide-up');
  const descriptionRef = useAnimation('animate-slide-up delay-100');
  const filtersRef = useAnimation('animate-slide-up delay-200');
  const carouselRef = useAnimation('animate-scale-in delay-300');

  return (
    <section id="courses" className="py-16 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center mb-4 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-600 mr-2 text-xl">🔥</span>
            <span className="text-blue-800 font-medium text-sm uppercase tracking-wider">In-Demand Skills</span>
          </div>
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">Advance</span> Your Professional Skills
          </h2>
          <p ref={descriptionRef} className="text-center text-gray-700 max-w-2xl mx-auto mb-8 text-lg">
            Gain certification, industry recognition, and career advancement opportunities through our hands-on training programs focused on in-demand technical skills sought by leading employers.
          </p>
          <div className="fancy-divider"></div>
        </div>

        {/* Course Filters */}
        <div ref={filtersRef} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            {categories.map(category => (
              <div key={category.id} className="text-center">
                <button 
                  className={`font-medium py-2 px-8 rounded-full transition flex items-center ${
                    activeFilter === category.id
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
                  }`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <span className="mr-2 text-lg">
                    {category.id === 'Career Launch' ? '🚀' : '⚙️'}
                  </span>
                  {category.title}
                </button>
              </div>
            ))}
            <div className="text-center">
              <button 
                className="font-medium py-2 px-8 rounded-full transition flex items-center bg-white hover:bg-gray-100 text-gray-700 shadow-sm"
              >
                <span className="mr-2 text-lg">
                  🎯
                </span>
                Career Assist
              </button>
            </div>
          </div>

          {/* Description for selected category only */}
          <div className="text-center animate-fade-in">
            {categories.map(category => (
              activeFilter === category.id && (
                <p key={category.id} className="text-sm text-gray-600 mt-2">
                  {category.description}
                </p>
              )
            ))}
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
            <div className="flex">
              {filteredCourses.map(course => (
                <div 
                  key={course.id}
                  className="min-w-[100%] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] px-4 flex-shrink-0"
                >
                  <div 
                    className={`flip-card ${flippedCards[course.id] ? 'flipped' : ''} group relative`}
                    onClick={() => toggleFlipCard(course.id)}
                    onTouchStart={() => setIsHovering(true)}
                    onTouchEnd={() => setIsHovering(false)}
                    onMouseDown={() => setIsHovering(true)}
                    onMouseUp={() => setIsHovering(false)}
                  >
                    {/* No hover tooltip anymore */}
                    <div className={`flip-card-inner shadow-lg ${flippedCards[course.id] ? 'flipped' : ''}`}>
                      {/* Card Front */}
                      <div className="flip-card-front">
                        <div className={`h-3/5 bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} flex items-center justify-center p-6 relative overflow-hidden`}>
                          {/* Decorative elements */}
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full"></div>
                            <div className="absolute bottom-12 right-8 w-20 h-20 bg-white/10 rounded-full"></div>
                            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full"></div>
                            <div className="bg-grid-pattern opacity-20 absolute inset-0"></div>
                          </div>

                          {course.logoUrl ? (
                            <img src={course.logoUrl} alt={course.title} className="h-24 max-w-full object-contain relative z-10" />
                          ) : (
                            <div className="relative z-10 text-white text-7xl">
                              {course.id === 'genai' ? '🤖' : course.id === 'cloud' ? '☁️' : course.id === 'data' ? '📊' : course.id === 'ai-uiux' ? '🎨' : course.id === 'ai-marketing' ? '📈' : course.id === 'ai-agent-development' ? '🤖' : course.id === 'ai-data-labeling' ? '🏷️' : '💻'}
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col h-2/5">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold pr-2 leading-tight">{course.title}</h3>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800 flex items-center flex-shrink-0">
                              {course.id === 'genai' && '🤖 '}
                              {course.id === 'cloud' && '☁️ '}
                              {course.id === 'data' && '📊 '}
                              {course.id === 'blockchain' && '🔗 '}
                              {course.id === 'ai-uiux' && '🎨 '}
                              {course.id === 'ai-marketing' && '📈 '}
                              {course.id === 'ai-agent-development' && '🤖 '}
                              {course.id === 'ai-data-labeling' && '🏷️ '}
                              {course.categoryLabel}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm font-medium leading-relaxed flex-1">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div className="flip-card-back">
                        <div className="p-6 h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold flex items-center">
                              <span className="text-2xl mr-2">
                                {course.id === 'genai' ? '🤖' : course.id === 'cloud' ? '☁️' : course.id === 'data' ? '📊' : course.id === 'ai-uiux' ? '🎨' : course.id === 'ai-marketing' ? '📈' : course.id === 'ai-agent-development' ? '🤖' : course.id === 'ai-data-labeling' ? '🏷️' : '💻'}
                              </span>
                              {course.title}
                            </h3>
                            <button 
                              className="text-gray-500 hover:text-gray-700 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:shadow transition"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlipCard(course.id);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>

                          <div className="overflow-y-auto flex-1">
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                              <h4 className="font-semibold mb-2 text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                Key Outcomes
                              </h4>
                              <ul className="mb-1 space-y-2">
                                {course.outcomes.map((outcome, index) => (
                                  <li key={index} className="flex items-start text-sm">
                                    <span className="text-green-500 mr-2 mt-1">✓</span>
                                    <span className="text-gray-700">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-purple-800 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                  </svg>
                                  Duration
                                </h4>
                                <p className="text-gray-700 text-sm">
                                  12-week immersive program
                                </p>
                              </div>

                              <div className="bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2 text-green-800 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                    <path d="M12 3v19M5 8h14M5 18h14"></path>
                                  </svg>
                                  Format
                                </h4>
                                <p className="text-gray-700 text-sm">
                                  Hands-on projects with expert mentors
                                </p>
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                              <h4 className="font-semibold mb-2 text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                  <path d="M20 7h-9"></path>
                                  <path d="M14 17H5"></path>
                                  <circle cx="17" cy="17" r="3"></circle>
                                  <circle cx="7" cy="7" r="3"></circle>
                                </svg>
                                Career Opportunities
                              </h4>
                              <p className="text-gray-700 text-sm">
                                Graduates work as specialized consultants in top firms with average starting salaries of $85,000-$115,000.
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <a 
                              href="#talent-compass" 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg relative overflow-hidden group inline-flex"
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                Apply Now
                                <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                              </span>
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-shine"></span>
                            </a>
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

              {/* Pause/Play Button */}
              <button 
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm shadow-md rounded-full w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition border border-blue-100"
                onClick={() => setAutoplay(!autoplay)}
                aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
              >
                {autoplay ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
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