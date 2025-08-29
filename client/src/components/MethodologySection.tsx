import React from 'react';
import { useAnimation, useStaggeredAnimation } from '@/hooks/use-animation';

export default function MethodologySection() {
  // Animation refs
  const sectionRef = useAnimation('animate-fade-in');
  const headerRef = useAnimation('animate-slide-up');
  const cardsRef = useStaggeredAnimation('animate-scale-in');
  return (
  <section id="methodology" className="pt-8 pb-20 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12" ref={headerRef}>
          <div className="inline-flex items-center mb-4 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-600 mr-2 text-xl">⚡</span>
            <span className="text-blue-800 font-medium text-sm uppercase tracking-wider">Learning Accelerator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
            Our Game-Changing Methodology
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Ottobon's unique approach transforms promising talent into elite technology consultants through these core pillars.
          </p>
          <div className="fancy-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto" ref={cardsRef}>
          {/* Pillar 1: Human-Centered */}
          <div 
            className="flip-card group hover:scale-105 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-blue-500/25" 
            style={{height: "450px", transformOrigin: "center"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner) {
                if (inner.classList.contains('flipped')) {
                  inner.classList.remove('flipped');
                } else {
                  inner.classList.add('flipped');
                }
              }
            }}
          >
            <div className="flip-card-inner" style={{boxShadow: 'none'}}>
              <div className="flip-card-front glass-effect">
                <div className="h-2/5 bg-gradient-primary relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 h-3/5 flex flex-col justify-between">
                  <div>
                    <div className="text-primary text-3xl mb-4 flex justify-center">
                      <i className="fas fa-users"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center">Human-Centered Excellence</h3>
                    <p className="text-gray-700 text-center">
                      Technical expertise must be paired with exceptional communication, adaptability, and emotional intelligence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flip-card-back">
                <div className="h-full p-8 flex flex-col bg-white">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Team collaboration" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-primary"
                      />
                      Human-Centered Excellence
                    </h3>
                  </div>

                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technical excellence alone isn't enough. The most brilliant solutions fail without stakeholder buy-in. Our human-centered approach develops consultants who are:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Accountable</strong> - Taking ownership of outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Adaptable</strong> - Continuously learning and adjusting to challenges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Empathetic</strong> - Understanding client needs and perspectives</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-primary">How We Develop It:</h4>
                    <p className="text-gray-700 mb-2">
                      Our human-centered curriculum includes:
                    </p>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Weekly communication workshops</li>
                      <li>• Simulated client interactions</li>
                      <li>• Emotional intelligence training</li>
                      <li>• Team-based project challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Industry Knowledge */}
          <div 
            className="flip-card group hover:scale-105 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-blue-500/25"
            style={{height: "450px", transformOrigin: "center"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner) {
                if (inner.classList.contains('flipped')) {
                  inner.classList.remove('flipped');
                } else {
                  inner.classList.add('flipped');
                }
              }
            }}
          >
            <div className="flip-card-inner" style={{boxShadow: 'none'}}>
              <div className="flip-card-front rounded-lg overflow-hidden">
                <div className="h-2/5 bg-gradient-to-r from-blue-500 to-blue-700 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=80" 
                    alt="Industry analysis" 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="bg-white p-6 h-3/5 flex flex-col">
                  <div className="text-blue-600 text-3xl mb-4 flex justify-center">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">Business & Industry Mastery</h3>
                  <p className="text-gray-700 text-center">
                    Technology solutions exist to solve business problems. Our curriculum emphasizes context and industry-specific challenges.
                  </p>
                </div>
              </div>

              <div className="flip-card-back bg-white rounded-lg">
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Industry analysis" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-blue-600"
                      />
                      Business & Industry Mastery
                    </h3>
                  </div>

                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Technology never exists in a vacuum. Our curriculum focuses on the business context of technical solutions:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Business Processes</strong> - Understanding operations and value chains</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Industry Verticals</strong> - Specializing in healthcare, finance, retail, etc.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Change Management</strong> - Facilitating organizational transformation</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-blue-600">Our Methodology:</h4>
                    <p className="text-gray-700">
                      Students work on real case studies from industry partners, gaining practical exposure to different business domains. Guest lectures from executives provide context on how technology addresses specific market challenges. Traditional learning is accelerated through our immersive, hands-on approach to industry knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 3: Technical Expertise */}
          <div 
            className="flip-card group hover:scale-105 transition-all duration-300 ease-out hover:shadow-2xl hover:shadow-purple-500/25"
            style={{height: "450px", transformOrigin: "center"}}
            onClick={(e) => {
              const inner = e.currentTarget.querySelector('.flip-card-inner');
              if (inner) {
                if (inner.classList.contains('flipped')) {
                  inner.classList.remove('flipped');
                } else {
                  inner.classList.add('flipped');
                }
              }
            }}
          >
            <div className="flip-card-inner" style={{boxShadow: 'none'}}>
              <div className="flip-card-front rounded-lg overflow-hidden">
                <div className="h-2/5 bg-gradient-to-r from-purple-500 to-purple-700 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80" 
                    alt="Technical development" 
                    className="w-full h-full object-cover opacity-75 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="bg-white p-6 h-3/5 flex flex-col">
                  <div className="text-purple-600 text-3xl mb-4 flex justify-center">
                    <i className="fas fa-code"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">Technical Acceleration</h3>
                  <p className="text-gray-700 text-center">
                    Build robust technical foundations across high-demand domains through our accelerated, hands-on approach.
                  </p>
                </div>
              </div>

              <div className="flip-card-back bg-white rounded-lg">
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold flex items-center">
                      <img 
                        src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=80&h=80&q=80" 
                        alt="Technical development" 
                        className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-purple-600"
                      />
                      Technical Acceleration
                    </h3>
                  </div>

                  <div className="overflow-y-auto flex-1">
                    <p className="text-gray-700 mb-4">
                      Our speedway approach accelerates learning through immersive, hands-on experiences with real-world scenarios and industry tools:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Technology Stacks</strong> - From front-end to back-end solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Industry Tools</strong> - Working with professional-grade technologies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2"><i className="fas fa-check-circle"></i></span>
                        <span className="text-gray-700"><strong>Implementation Methods</strong> - Structured project approaches</span>
                      </li>
                    </ul>
                    <h4 className="font-semibold mb-2 text-purple-600">Our Acceleration Approach:</h4>
                    <p className="text-gray-700">
                      Traditional learning is too slow for today's tech evolution. We compress years of experiential learning into months through deliberate practice and expert coaching. Our lab environments provide hands-on practice with the tools used by leading consulting firms. Students graduate with both theoretical knowledge and practical implementation experience.
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