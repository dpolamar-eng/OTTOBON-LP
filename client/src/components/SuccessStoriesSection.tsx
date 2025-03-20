export default function SuccessStoriesSection() {
  return (
    <section id="success-stories" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Success Stories</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Our graduates have secured positions at top consulting firms and technology companies across the globe.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Success Story 1 */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah Johnson" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Sarah Johnson</h3>
                  <p className="text-primary">Salesforce Consultant at Accenture</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Before OttoBon, I was a marketing coordinator with basic CRM knowledge. The program transformed my career in just 12 weeks, and I now help Fortune 500 clients implement Salesforce solutions."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Programs: Business Applications</span>
                <span className="text-sm font-medium">85% Salary Increase</span>
              </div>
            </div>
          </div>
          
          {/* Success Story 2 */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="Michael Chen" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Michael Chen</h3>
                  <p className="text-primary">AI Solutions Architect at Deloitte</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "With a computer science degree but no practical experience, I was struggling to break into consulting. OttoBon's AI track gave me the business context and implementation expertise I needed."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Programs: AI Consulting</span>
                <span className="text-sm font-medium">Hired within 2 weeks</span>
              </div>
            </div>
          </div>
          
          {/* Success Story 3 */}
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/29.jpg" alt="Aisha Patel" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Aisha Patel</h3>
                  <p className="text-primary">AWS Solutions Consultant at PWC</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I was a business analyst with limited technical skills. OttoBon's cloud program provided the perfect balance of technical training and business knowledge that consulting firms value."
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Programs: Cloud Computing</span>
                <span className="text-sm font-medium">Career transition in 3 months</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gray-200 p-4 rounded-lg inline-block mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">93%</div>
                <div className="text-sm text-gray-700">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">47%</div>
                <div className="text-sm text-gray-700">Avg. Salary Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8</div>
                <div className="text-sm text-gray-700">Weeks to Employment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">86%</div>
                <div className="text-sm text-gray-700">Retention After 1 Year</div>
              </div>
            </div>
          </div>
          
          <button className="text-primary hover:text-primary/80 font-medium flex items-center justify-center mx-auto">
            View More Success Stories <i className="fas fa-chevron-right ml-1 text-sm"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
