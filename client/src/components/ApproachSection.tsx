export default function ApproachSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute w-3/4 h-64 bottom-0 left-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-tr-[100%] transform -skew-y-3"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Unique Approach</h2>
        
        <div className="flex flex-col space-y-16">
          {/* Approach 1: Interpersonal Skills */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                Interpersonal Skills
              </h3>
              <p className="text-gray-700 mb-4">
                Technical excellence means little without the ability to communicate effectively and work collaboratively. We develop consultants who are:
              </p>
              <ul className="space-y-2">
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
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaborating on a project" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
          
          {/* Approach 2: Industry Knowledge */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                Industry Knowledge
              </h3>
              <p className="text-gray-700 mb-4">
                Technology never exists in a vacuum. Our curriculum emphasizes business context and industry-specific challenges:
              </p>
              <ul className="space-y-2">
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
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Business process analysis" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
          
          {/* Approach 3: Technical Expertise */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                Technical Expertise
              </h3>
              <p className="text-gray-700 mb-4">
                Build robust technical foundations across high-demand domains with hands-on experience and certification pathways:
              </p>
              <ul className="space-y-2">
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
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Technical development work" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
