
export default function ServicesFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Ottobon Logo"
                  className="h-10 w-auto object-contain mr-4 filter drop-shadow-lg"
                />
              </div>
              <div className="text-2xl font-bold text-white tracking-wide">
                OTTOBON
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              Empowering the future of AI-driven consulting. Learn from AI to become faster, smarter, and more effective.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/ottobon-prof-svc-ltd/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <i className="fab fa-linkedin text-gray-300 group-hover:text-white"></i>
                </div>
              </a>
              <div className="group cursor-not-allowed opacity-50">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter text-gray-300"></i>
                </div>
              </div>
              <div className="group cursor-not-allowed opacity-50">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook text-gray-300"></i>
                </div>
              </div>
              <a href="https://www.instagram.com/ottobon.verse/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <i className="fab fa-instagram text-gray-300 group-hover:text-white"></i>
                </div>
              </a>
            </div>
          </div>

          {/* Health Care Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative">
              Health Care 🏥
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-pink-500"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Health Companion
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Health Tech Solutions
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AI-powered Fertility Tracking
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Digital Health Innovations
                </a>
              </li>
            </ul>
          </div>

          {/* Enterprise Enablement Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative">
              Enterprise Enablement 🤖
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-500"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Talent Acquisition
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Project Delivery Support
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Admin & Billing
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Payroll Management
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AI-powered Automation
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Operational Excellence
                </a>
              </li>
            </ul>
          </div>

          {/* Business Development Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative">
              Business Development 📈
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-green-500"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pre-Sales Support
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Marketing & Visibility
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Strategic Growth Solutions
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Market Expansion Services
                </a>
              </li>
              <li>
                <a href="/services#services" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm flex items-center group">
                  <span className="w-1 h-1 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Proposal Generation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white relative">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-purple-600 transition-colors">
                  <i className="fas fa-envelope text-purple-400 text-sm group-hover:text-white"></i>
                </div>
                <a href="mailto:hr.services@ottobon.in" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm">
                  hr.services@ottobon.in
                </a>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-purple-600 transition-colors">
                  <i className="fas fa-phone text-purple-400 text-sm group-hover:text-white"></i>
                </div>
                <a href="tel:+919281011683" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm">
                  +91 9281011683
                </a>
              </li>
              <li className="flex items-start group">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-purple-600 transition-colors">
                  <i className="fas fa-map-marker-alt text-purple-400 text-sm group-hover:text-white"></i>
                </div>
                <span className="text-gray-300 text-sm leading-relaxed">
                  D No 10-28-2/1/3, 1st Floor 102, A Square Business Centre, Waltair Uplands, Waltair Main Road, Chinawaltair, Visakhapatnam, Andhra Pradesh, India, 530003
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} OttoBon Enterprise Support Services Academy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
