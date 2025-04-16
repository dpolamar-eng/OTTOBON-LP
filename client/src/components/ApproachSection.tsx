import { useState } from 'react';

type ApproachFlipState = {
  interpersonal: boolean;
  industry: boolean;
  technical: boolean;
  [key: string]: boolean;
};

export default function ApproachSection() {
  const [flippedCards, setFlippedCards] = useState<ApproachFlipState>({
    interpersonal: false,
    industry: false,
    technical: false
  });

  const toggleFlipCard = (id: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute w-3/4 h-64 bottom-0 left-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-tr-[100%] transform -skew-y-3"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Unique Approach</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Approach 1: Interpersonal Skills */}
          <div 
            className="flip-card h-[450px]"
            onClick={() => toggleFlipCard('interpersonal')}
          >
            <div className={`flip-card-inner ${flippedCards.interpersonal ? 'flipped' : ''}`}>
              <div className="flip-card-front rounded-lg overflow-hidden">
                <div className="h-1/3 bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-primary text-xl font-bold">01</span>
                  </div>
                </div>
                <div className="bg-white p-6 h-2/3 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">Interpersonal Skills</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1">
                    Technical excellence means little without the ability to communicate effectively and work collaboratively.
                  </p>
                  <button className="text-primary font-medium py-2 px-4 rounded-full border border-primary hover:bg-primary hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                      Interpersonal Skills
                    </h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('interpersonal');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technical excellence means little without the ability to communicate effectively and work collaboratively. We develop consultants who are:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Accountable</strong> - Taking ownership of outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Learnable</strong> - Continuously adapting to new challenges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Resilient</strong> - Thriving under pressure and overcoming obstacles</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 text-sm">
                      Our interpersonal skills curriculum includes weekly workshops, regular presentation practice, and team-based projects that mirror real consulting environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Approach 2: Industry Knowledge */}
          <div 
            className="flip-card h-[450px]"
            onClick={() => toggleFlipCard('industry')}
          >
            <div className={`flip-card-inner ${flippedCards.industry ? 'flipped' : ''}`}>
              <div className="flip-card-front rounded-lg overflow-hidden">
                <div className="h-1/3 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-blue-600 text-xl font-bold">02</span>
                  </div>
                </div>
                <div className="bg-white p-6 h-2/3 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">Industry Knowledge</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1">
                    Technology never exists in a vacuum. Our curriculum emphasizes business context and industry-specific challenges.
                  </p>
                  <button className="text-blue-600 font-medium py-2 px-4 rounded-full border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                      Industry Knowledge
                    </h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('industry');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technology never exists in a vacuum. Our curriculum emphasizes business context and industry-specific challenges:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Business Processes</strong> - Understanding how technology supports operations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Industry Verticals</strong> - Specializing in healthcare, finance, retail or manufacturing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Change Management</strong> - Facilitating organizational transformation</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 text-sm">
                      Students work on real case studies from our industry partners, gaining practical exposure to different business domains and their unique technology requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Approach 3: Technical Expertise */}
          <div 
            className="flip-card h-[450px]"
            onClick={() => toggleFlipCard('technical')}
          >
            <div className={`flip-card-inner ${flippedCards.technical ? 'flipped' : ''}`}>
              <div className="flip-card-front rounded-lg overflow-hidden">
                <div className="h-1/3 bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                  <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-purple-600 text-xl font-bold">03</span>
                  </div>
                </div>
                <div className="bg-white p-6 h-2/3 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">Technical Expertise</h3>
                  <p className="text-gray-700 mb-4 text-sm flex-1">
                    Build robust technical foundations across high-demand domains with hands-on experience and certification pathways.
                  </p>
                  <button className="text-purple-600 font-medium py-2 px-4 rounded-full border border-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-300 flex items-center justify-center mx-auto mt-4">
                    Learn More <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
              
              <div className="flip-card-back bg-white rounded-lg shadow-md">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                      Technical Expertise
                    </h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlipCard('technical');
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Build robust technical foundations across high-demand domains with hands-on experience and certification pathways:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Technology Stacks</strong> - From front-end to back-end solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Certifications</strong> - Industry-recognized credentials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Implementation Methodology</strong> - Structured project approaches</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 text-sm">
                      Our lab environments provide hands-on practice with the same tools and technologies used by leading consulting firms. Students graduate with both theoretical knowledge and practical implementation experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
