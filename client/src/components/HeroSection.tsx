import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function HeroSection() {
  // Carousel for hero content
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false
  });
  
  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const heroSlides = [
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600'>Level Up</span> Your Tech Game",
      description: "Skill up, stand out, and secure the bag 💰 with cutting-edge skills in Business Apps, AI, and Cloud. No cap - we'll get you industry-ready in weeks, not years.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Technology consultants collaborating"
    },
    {
      title: "Where <span class='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Innovation</span> Meets Career",
      description: "Join a community of tech-obsessed learners building tomorrow's solutions today. Collab with industry pros who've been there, done that, and are ready to spill the tea. 🚀",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Young professionals with digital devices"
    },
    {
      title: "Tech Skills That <span class='bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500'>Actually Pay</span>",
      description: "Not your average bootcamp. Learn what employers actually want, not what textbooks claim. Get hands dirty with real projects and make your portfolio go brrrr! 💯",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Tech consultant presenting to team"
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
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute w-full h-64 top-0 right-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-bl-[100%] transform -skew-y-3"></div>
      <div className="container mx-auto px-4">
        <div className="embla overflow-hidden" ref={heroViewportRef}>
          <div className="embla__container flex">
            {heroSlides.map((slide, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    ></h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <a 
                        href="#enroll" 
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg text-center relative overflow-hidden group"
                      >
                        <span className="relative z-10">Get In The Game</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </a>
                      <a 
                        href="#assessment" 
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-full transition text-center group"
                      >
                        <span className="group-hover:hidden">Check Your Vibe</span>
                        <span className="hidden group-hover:inline">🔥 Let's Go 🔥</span>
                      </a>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={slide.image} 
                        alt={slide.alt} 
                        className="rounded-lg shadow-xl w-full object-cover h-80 md:h-96 transition duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-70 mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
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
    </section>
  );
}
