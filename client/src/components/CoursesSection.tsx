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
    id: 'Tech Edge',
    title: 'Tech Edge',
    description: 'High demand skills in Market'
  },
  {
    id: 'Career Launch',
    title: 'Career Launch',
    description: 'Placement Guaranteed path'
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
  const [activeFilter, setActiveFilter] = useState<CourseCategory>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  
  // Embla carousel setup
  const [viewportRef, embla] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    skipSnaps: false
  });
  const [autoplay, setAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayInterval = 3000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const onSelect = useCallback(() => {
    if (!embla) return;
  }, [embla]);
  
  const autoplayCallback = useCallback(() => {
    if (!embla || !autoplay || isHovering) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    
    autoplayTimeoutRef.current = setTimeout(() => {
      if (!embla) return;
      embla.scrollNext();
      autoplayCallback();
    }, autoplayInterval);
  }, [autoplay, embla, autoplayInterval, isHovering]);
  
  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    autoplayCallback();
    
    return () => {
      embla.off('select', onSelect);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, autoplayCallback, embla, onSelect, isHovering]);
  
  // Effect to restart autoplay when hovering stops
  useEffect(() => {
    if (!isHovering && autoplay) {
      autoplayCallback();
    }
  }, [isHovering, autoplay, autoplayCallback]);
  
  // Responsive slide count
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const courses: Course[] = [
    {
      id: 'salesforce',
      title: 'Salesforce CX Consultant',
      category: 'Tech Edge',
      categoryLabel: 'Business Apps',
      color: 'blue-800',
      bgColor: 'blue-100',
      description: 'Become a certified Salesforce consultant specializing in customer experience solutions.',
      outcomes: [
        'Salesforce Administrator & Consultant certifications',
        'End-to-end implementation expertise',
        'Industry-specific CRM solutions'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700'
    },
    {
      id: 'oracle',
      title: 'Oracle ERP Consultant',
      category: 'Tech Edge',
      categoryLabel: 'Business Apps',
      color: 'red-800',
      bgColor: 'red-100',
      description: 'Master Oracle ERP Cloud implementation, configuration and integration.',
      outcomes: [
        'Oracle Cloud ERP certification',
        'Financial and operational module expertise',
        'Business process optimization'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-red-700'
    },
    {
      id: 'microsoft',
      title: 'Microsoft Dynamics SCM',
      category: 'Tech Edge',
      categoryLabel: 'Business Apps',
      color: 'green-800',
      bgColor: 'green-100',
      description: 'Specialize in Microsoft Dynamics 365 Supply Chain Management solutions.',
      outcomes: [
        'Microsoft Dynamics 365 SCM certification',
        'End-to-end supply chain optimization',
        'Power Platform integration expertise'
      ],
      logoUrl: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700'
    },
   
    {
      id: 'genai',
      title: 'Generative AI Solutions Architect',
      category: 'Career Launch',
      categoryLabel: 'AI',
      color: 'indigo-800',
      bgColor: 'indigo-100',
      description: 'Design and implement generative AI solutions for enterprise applications.',
      outcomes: [
        'Large language model implementation',
        'Responsible AI deployment frameworks',
        'Enterprise-ready AI architectures'
      ],
      logoUrl: '',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-700'
    },
    {
      id: 'aws',
      title: 'AWS Solutions Architect',
      category: 'Career Launch',
      categoryLabel: 'Cloud',
      color: 'yellow-800',
      bgColor: 'yellow-100',
      description: 'Design and implement scalable, high-availability systems on AWS.',
      outcomes: [
        'AWS Solutions Architect certification',
        'Multi-tier cloud architecture design',
        'Security and cost optimization expertise'
      ],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-orange-500'
    }
  ];

  const toggleFlipCard = (courseId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const headingRef = useAnimation('animate-slide-up');
  const descriptionRef = useAnimation('animate-slide-up delay-100');
  const filtersRef = useAnimation('animate-slide-up delay-200');
  const carouselRef = useAnimation('animate-scale-in delay-300');
  
  return (
    <section id="courses" className="py-16 bg-gray-100" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">Advance</span> Your Professional Skills
        </h2>
        <p ref={descriptionRef} className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Gain certification, industry recognition, and career advancement opportunities through our hands-on training programs focused on in-demand technical skills sought by leading employers.
        </p>
        
        {/* Course Filters */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            className={`font-medium py-2 px-6 rounded-full transition ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white shadow-sm'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Programs
          </button>
          {categories.map(category => (
            <div key={category.id} className="text-center">
              <button 
                className={`font-medium py-2 px-6 rounded-full transition ${
                  activeFilter === category.id
                    ? 'bg-primary text-white' 
                    : 'bg-white hover:bg-primary hover:text-white shadow-sm'
                }`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.title}
              </button>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </div>
          ))}
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
                    className={`flip-card ${flippedCards[course.id] ? 'flipped' : ''}`}
                    onClick={() => toggleFlipCard(course.id)}
                  >
                    <div className="flip-card-inner shadow-lg">
                      {/* Card Front */}
                      <div className="flip-card-front">
                        <div className={`h-3/5 bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} flex items-center justify-center p-6`}>
                          {course.logoUrl ? (
                            <img src={course.logoUrl} alt={course.title} className="h-24 max-w-full object-contain" />
                          ) : (
                            course.id === 'nlp' ? (
                              <i className="fas fa-comments text-white text-6xl"></i>
                            ) : (
                              <i className="fas fa-robot text-white text-6xl"></i>
                            )
                          )}
                        </div>
                        <div className="p-6 flex flex-col justify-between h-2/5">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-xl font-bold">{course.title}</h3>
                              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                {course.categoryLabel}
                              </span>
                            </div>
                            <p className="text-gray-700">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Card Back */}
                      <div className="flip-card-back">
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{course.title}</h3>
                            <button 
                              className="text-gray-500 hover:text-gray-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFlipCard(course.id);
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto flex-1">
                            <h4 className="font-semibold mb-2 text-primary">Key Outcomes:</h4>
                            <ul className="mb-4 space-y-1">
                              {course.outcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="text-primary mr-2"><i className="fas fa-check"></i></span>
                                  <span className="text-gray-700">{outcome}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <h4 className="font-semibold mb-2 text-primary">Course Structure:</h4>
                            <p className="text-gray-700 mb-3 text-sm">
                              12-week immersive program with hands-on projects and mentorship from industry experts.
                            </p>
                            
                            <h4 className="font-semibold mb-2 text-primary">Career Opportunities:</h4>
                            <p className="text-gray-700 text-sm">
                              Graduates work as specialized consultants in top firms with average starting salaries of $85,000-$115,000.
                            </p>
                          </div>
                          
                          <div className="mt-4 text-center">
                            <button className="bg-primary text-white font-medium py-2 px-6 rounded-full hover:bg-primary/90 transition-colors duration-300">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-10 text-primary hover:bg-primary hover:text-white transition"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-0 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-10 text-primary hover:bg-primary hover:text-white transition"
            onClick={() => embla?.scrollNext()}
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Pause/Play Button */}
          <button 
            className="absolute bottom-4 right-4 bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
            onClick={() => setAutoplay(!autoplay)}
            aria-label={autoplay ? "Pause autoplay" : "Start autoplay"}
          >
            {autoplay ? (
              <i className="fas fa-pause text-xs"></i>
            ) : (
              <i className="fas fa-play text-xs"></i>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
