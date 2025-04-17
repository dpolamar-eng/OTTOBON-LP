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
      name: "Alex Chen",
      role: "Career Switcher",
      background: "Former financial analyst seeking a career in tech consulting",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After five years in financial analysis, I felt stuck. The numbers were becoming predictable, and I craved a new challenge. That's when I saw how technology consultants were transforming businesses...",
          image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "Why did you choose tech consulting specifically?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Were you worried about starting over?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "I realized my analytical skills from finance could transfer well, but I needed technical knowledge. Tech consulting lets me use my business acumen while working with cutting-edge solutions. The variety of projects and constant learning was exactly what I was looking for.",
          choices: [
            {
              id: 3,
              text: "What was your first step?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "Absolutely. Leaving a stable career was terrifying. I had a mortgage and responsibilities. But the bigger risk seemed to be staying in a field that no longer challenged me. I needed to find a program that wouldn't require me to stop working entirely.",
          choices: [
            {
              id: 4,
              text: "How did you start your transition?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "I took Ottobon's Career Aptitude Assessment, which revealed my natural strengths aligned perfectly with cloud solutions architecture. The personalized learning path they created let me build on my existing skills while gradually developing technical expertise.",
          image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "What was the learning experience like?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "Did you face any major challenges?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "The program was intense but incredibly engaging. Each module connected directly to real-world applications. What made it special was the mentorship — my advisor had made the same career switch 5 years earlier and guided me through industry-specific challenges.",
          choices: [
            {
              id: 7,
              text: "What happened after you completed the program?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 6,
          text: "The technical learning curve was steep. There were moments I questioned my decision, especially while juggling part-time work. The breakthrough came during my second project implementation when concepts suddenly clicked. The program's hands-on approach made all the difference.",
          choices: [
            {
              id: 8,
              text: "How did your career progress afterward?",
              nextSegmentId: 7,
            }
          ]
        },
        {
          id: 7,
          text: "Within three months of completing the program, I received two job offers. I'm now a Cloud Solutions Architect at a Fortune 500 consulting firm, earning 35% more than my previous role. More importantly, I wake up excited about work again. The network I built through Ottobon continues to open doors.",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to someone considering a similar path?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Take the assessment first — it revealed strengths I didn't fully appreciate. Trust the process and engage with your mentors; their guidance was invaluable. Remember that your previous experience is an asset, not a limitation. The transition is challenging but absolutely worth it for the right person.",
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
          text: "You're about to begin your own journey. Like Alex, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "Maya Rodriguez",
      role: "Recent Graduate",
      background: "Computer Science graduate seeking specialized expertise",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "I graduated with my Computer Science degree feeling both excited and overwhelmed. While I had strong fundamentals, I lacked the specialized knowledge that employers were seeking for higher-paying roles...",
          image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What specific challenges did you face as a new graduate?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why did you choose to specialize further?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "The job market was tough. Entry-level positions wanted 2+ years of experience, and I was competing against hundreds of other CS graduates. Interviews often focused on specialized skills I hadn't developed yet. I needed something to differentiate myself.",
          choices: [
            {
              id: 3,
              text: "How did you find Ottobon?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 3,
          text: "My degree gave me a solid foundation, but I realized top companies were looking for specialized expertise, not just general knowledge. I saw friends taking entry-level jobs that didn't utilize their full potential, and I wanted a different path.",
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
          text: "A senior developer I admired recommended Ottobon's program. What caught my attention was their personalized approach. The Career Aptitude Assessment identified my strengths in systems architecture and AI implementation – areas I enjoyed but hadn't considered as specializations.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "What was your learning experience like?",
              nextSegmentId: 5,
            },
            {
              id: 6,
              text: "How did it differ from your university education?",
              nextSegmentId: 6,
            }
          ]
        },
        {
          id: 5,
          text: "The program was intensely practical. We worked on real client projects under supervision, which built both my technical skills and consulting abilities. The focus on AI solutions aligned perfectly with market demands, and I was building an impressive portfolio while still learning.",
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
          text: "Unlike university, every concept was tied directly to industry application. The curriculum evolved constantly to match market demands. Most importantly, we were mentored by active professionals who provided insights you can't get from textbooks or professors who've been out of industry for years.",
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
          text: "The difference in my job search was night and day. Before, I was applying to general developer roles with limited response. After Ottobon, I had companies reaching out directly. I accepted a position as an AI Implementation Specialist at a salary 40% higher than the average entry-level role.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 9,
              text: "What advice would you give to recent graduates?",
              nextSegmentId: 8,
            }
          ]
        },
        {
          id: 8,
          text: "Don't settle for generic entry-level positions if you have specific interests. The assessment helped me identify where my talents could really shine. The specialized training made me valuable immediately, rather than waiting years to develop expertise on the job.",
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
          text: "You're about to begin your own journey. Like Maya, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive.",
          animation: "fade-transition"
        }
      ]
    },
    {
      name: "James Park",
      role: "Experienced Professional",
      background: "Tech industry veteran seeking to update skills",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      story: [
        {
          id: 1,
          text: "After 15 years in technology, I found myself at a crossroads. The industry was rapidly evolving with AI and cloud technologies, and despite my experience, I was watching younger colleagues advance while I stagnated...",
          image: "https://images.unsplash.com/photo-1573496773905-f5b9c4864bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 1,
              text: "What challenges were you facing in your career?",
              nextSegmentId: 2,
            },
            {
              id: 2,
              text: "Why not learn these new skills on your own?",
              nextSegmentId: 3,
            }
          ]
        },
        {
          id: 2,
          text: "I was hitting a ceiling. New leadership positions required expertise in technologies that didn't exist when I started my career. Despite my management experience, I was being passed over for roles because I lacked hands-on experience with emerging tech.",
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
          text: "I tried self-learning through online courses, but it was isolating and fragmented. I needed structured guidance that acknowledged my experience while filling specific gaps. The pace of change meant I couldn't afford years of trial and error.",
          choices: [
            {
              id: 4,
              text: "What made you choose Ottobon specifically?",
              nextSegmentId: 4,
            }
          ]
        },
        {
          id: 4,
          text: "Ottobon's approach for experienced professionals stood out. Their assessment didn't just identify gaps but recognized my extensive experience. They created an accelerated program focused precisely on what I needed – emerging AI technologies and modern cloud architectures.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          choices: [
            {
              id: 5,
              text: "How did they accommodate your experience level?",
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
          text: "They paired me with mentors who were senior leaders in cutting-edge fields. The curriculum built upon my existing knowledge rather than teaching basics I already knew. They focused on translating my deep industry experience into the new technological paradigms.",
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
          text: "Absolutely. The program was designed for working professionals. I attended evening sessions twice weekly and dedicated weekends to project work. My company actually supported my participation, seeing the immediate application of what I was learning to our initiatives.",
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
          text: "Within months of completing the program, I was leading our company's AI transformation initiatives. Six months later, I accepted a CTO position at a mid-sized technology firm – a role that would have been out of reach before. My compensation increased by 45%, but the renewed confidence was priceless.",
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
          text: "Don't let your years of experience become a trap. The assessment will show you exactly what you need to focus on without wasting time on what you already know. Your experience is valuable – you just need to connect it to today's technologies strategically.",
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
          text: "You're about to begin your own journey. Like James, your unique background and strengths will shape your path in technology consulting. The Career Aptitude Assessment will help identify where your natural abilities can thrive.",
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
    let i = 0;
    setTypingText("");
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypingText(prev => prev + text.charAt(i));
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
    <section id="stories" className="py-20 relative bg-gray-50" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-3">
          Real <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Transformation</span> Stories
        </h2>
        
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          Explore the journeys of professionals who've transformed their careers through our program. 
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