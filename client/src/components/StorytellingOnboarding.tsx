import { useState, useEffect, useRef } from 'react';
import { useAnimation } from '@/hooks/use-animation';

// Define character types for the storytelling experience
interface Character {
  name: string;
  role: string;
  background: string;
  avatar: string;
  story: StorySegment[];
}

// Define story segment structure
interface StorySegment {
  id: number;
  text: string;
  choices?: Choice[];
  image?: string;
  animation?: string;
}

// Define choice options that progress the story
interface Choice {
  id: number;
  text: string;
  nextSegmentId: number;
  impact?: string; // How this choice impacts the story/character's path
}

export default function StorytellingOnboarding() {
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const titleRef = useAnimation('animate-slide-up');
  const storyContainerRef = useAnimation('animate-scale-in delay-100');

  // State for tracking current character and story progress
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentSegmentId, setCurrentSegmentId] = useState(1);
  const [storyHistory, setStoryHistory] = useState<number[]>([]);
  const [pathOutcome, setPathOutcome] = useState<string | null>(null);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);

  // Characters with their own unique stories and backgrounds
  const characters: Character[] = [
    {
      name: "Arjun Sharma",
      role: "Career Switcher",
      background: "Former CA working in audit, seeking a career transition to tech consulting",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After seven years as a Chartered Accountant in Mumbai's corporate audit sector, I felt trapped in spreadsheets and compliance reports. The work had become mechanical, and I yearned for something that would challenge me intellectually. That's when I discovered how technology consultants were revolutionizing businesses across India...",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "Why did you choose tech consulting over other fields?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Weren't you concerned about leaving a stable CA career?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "My analytical background from CA work was actually a perfect foundation! Tech consulting allowed me to use my business understanding while working with innovative digital solutions. I could see how Indian companies were transforming - from traditional businesses to digital-first enterprises. The variety of projects and constant learning appealed to my curious nature.",
          choices: [
            {
              id: 3,
              text: "What was your first step in this transition?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "Absolutely, leaving a prestigious CA position was terrifying. My family had expectations, and I had EMIs to pay for our flat in Thane. But staying in a field that no longer excited me felt like a bigger risk. I needed a program that would allow me to transition gradually without compromising my current responsibilities.",
          choices: [
            {
              id: 4,
              text: "How did you start your transition journey?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "I took Ottobon's Career Aptitude Assessment, which revealed my natural strengths in process optimization and system integration. The personalized learning path they created helped me leverage my audit experience while building technical expertise in cloud solutions and business automation.",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "What was the learning experience like?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "Did you face any major challenges during the transition?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "The program was intensive yet incredibly practical. Every module connected to real-world business scenarios I could relate to from my CA background. What made it exceptional was the mentorship from industry veterans who understood the Indian business landscape and guided me through sector-specific challenges.",
          choices: [
            {
              id: 7,
              text: "What happened after completing the program?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "The technical learning curve was steep initially. Balancing weekend classes with my CA practice was exhausting. There were moments I doubted my decision, especially when colleagues questioned my choice. The breakthrough came during a project on GST automation when everything clicked together - my domain knowledge with new technical skills.",
          choices: [
            {
              id: 8,
              text: "How did your career progress after that?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "Within two months of completing the program, I received three job offers from leading consulting firms. I'm now a Senior Business Technology Consultant at a Big 4 firm, earning 60% more than my CA salary. More importantly, I wake up excited about work - helping Indian businesses digitally transform. The professional network I built through Ottobon continues to create opportunities.",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to someone considering a similar transition?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Start with the assessment - it revealed strengths I never fully appreciated. Trust the process and engage deeply with mentors; their guidance was invaluable in navigating the Indian corporate landscape. Remember, your previous experience is an asset, not a limitation. The transition requires courage but is absolutely worth it for the right mindset.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Arjun, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's growing tech consulting sector.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "Priya Patel",
      role: "Recent Graduate",
      background: "B.Tech Computer Science graduate from Gujarat seeking specialized expertise",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "I completed my B.Tech in Computer Science from NIT Surat feeling both excited and overwhelmed. While I had strong fundamentals and decent grades, I lacked the specialized knowledge that top IT companies were seeking. The campus placement offers I received were generic developer roles that didn't utilize my full potential...",
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What specific challenges did you face as a fresh engineering graduate?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why didn't you accept the placement offers you received?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "The competition was intense! Companies wanted 2+ years of experience even for 'entry-level' positions. During interviews, they focused on specialized skills like cloud architecture or AI implementation that weren't covered in depth during our B.Tech curriculum. I was competing with thousands of other engineering graduates with similar profiles.",
          choices: [
            {
              id: 3,
              text: "How did you discover Ottobon?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "The offers were for typical software developer roles with average packages. I saw seniors from my college in similar positions, and after 2-3 years, they were still doing routine coding work. I wanted to be a technology leader, not just another developer. I realized I needed specialized skills to stand out.",
          choices: [
            {
              id: 4,
              text: "What led you to choose Ottobon specifically?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "My college senior, who was working at Infosys, recommended Ottobon's program. What impressed me was their personalized approach. The Career Aptitude Assessment identified my strengths in systems design and machine learning implementation - areas I was passionate about but hadn't considered as specializations.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "How was your learning experience different from college?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "How did your family react to this decision?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "Unlike college theoretical approaches, every concept was tied directly to industry applications. We worked on real client projects with actual business impact. The curriculum evolved based on current market demands - focusing on AI solutions that Indian companies desperately needed. Most importantly, industry mentors provided insights you can't get from college professors.",
          choices: [
            {
              id: 7,
              text: "How did this impact your job prospects?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "Initially, my parents were worried about me not taking the campus placement offer. 'Beta, secure job lelo pehle,' they said. But when I explained the potential and showed them success stories of other Ottobon graduates, they supported my decision. My confidence in the program helped convince them.",
          choices: [
            {
              id: 8,
              text: "What opportunities opened up for you?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "The transformation was remarkable! Before Ottobon, I was applying to generic developer roles with limited responses. After completing the program, recruiters from top consulting firms were reaching out directly. I accepted a position as AI Solutions Specialist at TCS Digital, with a package 70% higher than typical campus placements for my batch.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to recent engineering graduates?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Don't settle for generic developer positions just because of family pressure or immediate security. The assessment helped me identify where my talents could truly shine. Specialized training made me valuable immediately rather than spending years developing expertise on the job. Invest in yourself early - it pays off exponentially.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Priya, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's booming tech sector.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "Rajesh Kumar",
      role: "Experienced Professional",
      background: "Senior software developer from Bangalore seeking to update skills for leadership roles",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After 12 years as a senior software developer in Bangalore's IT ecosystem, I found myself at a crossroads. The industry was rapidly evolving with AI, cloud-native technologies, and digital transformation initiatives. Despite my experience, I was watching younger colleagues with specialized skills get promoted to architect and leadership positions while I remained stuck...",
          image: "https://images.unsplash.com/photo-1629904841431-b8c2418d7c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What specific challenges were you facing in your career progression?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why not learn these new technologies through online courses?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "I was hitting a ceiling despite my experience. New solution architect positions required expertise in technologies that didn't exist when I started my career - DevOps, containerization, AI/ML integration. Despite my strong foundation in Java and databases, I was being passed over for roles because I lacked hands-on experience with modern cloud-native architectures.",
          choices: [
            {
              id: 3,
              text: "How did you discover Ottobon?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "I tried multiple online platforms - Coursera, Udemy, YouTube tutorials. But it was fragmented learning without proper guidance. I needed structured mentorship that acknowledged my existing experience while filling specific gaps. The pace of technological change in the Indian IT industry meant I couldn't afford years of trial and error.",
          choices: [
            {
              id: 4,
              text: "What made you choose Ottobon over other options?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "Ottobon's approach for experienced professionals was unique. Their assessment didn't just identify knowledge gaps but recognized my extensive development experience. They created an accelerated program focusing precisely on what I needed - modern cloud architectures, AI integration, and leadership skills for the Indian IT context.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "How did they accommodate your experience level and work schedule?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "Were you able to continue working during the program?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "They paired me with senior architects who understood the Indian IT landscape. The curriculum built upon my existing Java and database knowledge rather than starting from basics. They focused on translating my deep technical experience into modern architectural patterns and leadership competencies relevant to India's digital transformation initiatives.",
          choices: [
            {
              id: 7,
              text: "How did this impact your career trajectory?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "Absolutely essential! The program was designed for working professionals. I attended evening sessions twice a week and dedicated weekends to project work. My current company actually supported my participation since they could immediately apply what I was learning to our modernization projects.",
          choices: [
            {
              id: 8,
              text: "What changes did you see in your career afterward?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "Within three months of completing the program, I was leading our company's cloud migration initiative. Six months later, I was promoted to Principal Architect with a 45% salary increase. A year later, I joined a fintech startup as their CTO. The transformation wasn't just in salary - I gained confidence to lead technical strategy for digital-first Indian companies.",
          image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to experienced professionals facing similar challenges?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Don't let your years of experience become a limitation. The assessment will precisely show what you need to focus on without wasting time on concepts you already understand. Your experience is valuable - you just need to connect it strategically to modern technologies. The Indian IT industry rewards specialists, not generalists.",
          choices: [
            {
              id: 10,
              text: "Take the Career Aptitude Assessment yourself",
              nextSegmentId: 9,
              impact: "assessment"
            }
          ]
        },
        {
          id: 9,
          text: "You're about to begin your own journey. Like Rajesh, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive in India's rapidly evolving technology landscape.",
          animation: "fade-transition"
        }
      ]
    }
  ];

  // Handle character selection
  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentSegmentId(1);
    setStoryHistory([]);
    setPathOutcome(null);
    setTypingText("");
    typeText(character.story[0].text);
  };

  // Go back to character selection
  const resetStory = () => {
    setSelectedCharacter(null);
    setCurrentSegmentId(1);
    setStoryHistory([]);
    setPathOutcome(null);
    setTypingText("");
  };

  // Handle choice selection
  const makeChoice = (choice: Choice) => {
    if (!selectedCharacter) return;

    // Check if this choice leads to an outcome
    if (choice.impact) {
      setPathOutcome(choice.impact);
    }

    // Add current segment to history before moving to next
    setStoryHistory(prev => [...prev, currentSegmentId]);

    // Find the next segment
    const nextSegment = selectedCharacter.story.find(s => s.id === choice.nextSegmentId);
    if (nextSegment) {
      setCurrentSegmentId(choice.nextSegmentId);
      setTypingText("");
      typeText(nextSegment.text);

      // Scroll to the new content
      setTimeout(() => {
        storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  };

  // Go back to the previous story segment
  const goBack = () => {
    if (storyHistory.length > 0) {
      const prevSegmentId = storyHistory[storyHistory.length - 1];
      setCurrentSegmentId(prevSegmentId);
      setStoryHistory(prev => prev.slice(0, -1));
      setPathOutcome(null);

      // Update typing text for previous segment
      if (selectedCharacter) {
        const prevSegment = selectedCharacter.story.find(s => s.id === prevSegmentId);
        if (prevSegment) {
          setTypingText("");
          typeText(prevSegment.text);
        }
      }
    }
  };

  // Typewriter effect for story text
  const typeText = (text: string) => {
    setIsTyping(true);
    setTypingText("");
    let i = 0;

    const typing = setInterval(() => {
      if (i <= text.length) {
        setTypingText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 15); // Speed of typing

    return () => clearInterval(typing);
  };

  // Get current story segment
  const getCurrentSegment = () => {
    if (!selectedCharacter) return null;
    return selectedCharacter.story.find(s => s.id === currentSegmentId);
  };

  // Current segment
  const currentSegment = getCurrentSegment();

  return (
    <section id="stories" className="py-20 relative overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Tinted fades to avoid white band between sections */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#CDFFD8]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#94B9FF]/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-3">
          Real <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Success</span> Stories
        </h2>

        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Explore the journeys of Indian professionals who've transformed their careers through our program. 
          Choose a story that resonates with your situation to see how your own path might unfold.
        </p>

        <div ref={storyContainerRef} className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          {!selectedCharacter ? (
            // Character selection screen
            <div className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Choose a Journey to Explore</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {characters.map((character, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-6 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-gray-200"
                    onClick={() => selectCharacter(character)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img 
                          src={character.avatar} 
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xl font-bold mb-1">{character.name}</h4>
                      <p className="text-blue-600 font-medium mb-3">{character.role}</p>
                      <p className="text-gray-600 text-sm">{character.background}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Story progression screen
            <div className="flex flex-col md:flex-row">
              {/* Character info sidebar */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
                <div className="sticky top-6">
                  <button 
                    onClick={resetStory}
                    className="mb-6 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Choose Another Story
                  </button>

                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/50 mr-4">
                      <img 
                        src={selectedCharacter.avatar} 
                        alt={selectedCharacter.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{selectedCharacter.name}</h3>
                      <p className="text-white/80">{selectedCharacter.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white/70 text-sm uppercase font-medium mb-1">Background</h4>
                      <p className="text-sm">{selectedCharacter.background}</p>
                    </div>

                    <div>
                      <h4 className="text-white/70 text-sm uppercase font-medium mb-1">Story Progress</h4>
                      <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
                        <div 
                          className="h-1.5 rounded-full bg-white"
                          style={{ width: `${(currentSegmentId / selectedCharacter.story.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs">
                        {pathOutcome ? 'Conclusion' : `Part ${currentSegmentId} of ${selectedCharacter.story.length - 1}`}
                      </p>
                    </div>

                    {pathOutcome === 'assessment' && (
                      <div className="mt-6 bg-white/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Ready for Your Journey?</h4>
                        <p className="text-sm mb-4">Take the assessment to discover your ideal path in technology consulting.</p>
                        <a 
                          href="#assessment"
                          className="block w-full bg-white text-blue-700 text-center font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition"
                        >
                          Take Assessment Now
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Story content */}
              <div className="md:w-2/3 p-6 md:p-8" ref={storyRef}>
                {currentSegment && (
                  <div className={`story-segment ${currentSegment.animation ? currentSegment.animation : ''}`}>
                    {currentSegment.image && (
                      <div className="mb-6 overflow-hidden rounded-lg">
                        <img 
                          src={currentSegment.image} 
                          alt="Story moment"
                          className="w-full h-64 object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    )}

                    <div className="mb-8">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {typingText}
                        {isTyping && <span className="typing-cursor">|</span>}
                      </p>
                    </div>

                    {/* Choice options */}
                    {currentSegment.choices && currentSegment.choices.length > 0 && !isTyping && (
                      <div className="space-y-3 mt-6">
                        <h4 className="text-sm font-medium text-gray-500">Choose your response:</h4>
                        {currentSegment.choices.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => makeChoice(choice)}
                            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition flex items-center"
                          >
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                              </svg>
                            </span>
                            <span>{choice.text}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Navigation controls */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
                      {storyHistory.length > 0 && !pathOutcome ? (
                        <button 
                          onClick={goBack}
                          className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                          </svg>
                          Previous
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {pathOutcome === 'assessment' && (
                        <a 
                          href="#assessment"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg flex items-center"
                        >
                          Begin Assessment
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}