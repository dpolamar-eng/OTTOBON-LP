export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-4">
              OttoBon
            </div>
            <p className="text-gray-400 mb-4">
              Accelerating careers in technology consulting with specialized training and mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business Applications</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">AI Consulting</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Cloud Computing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Group Enrollment</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Free Skill Assessment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog & Insights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Career Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mr-2 mt-1"></i>
                <a href="mailto:info@ottobon.com" className="text-gray-400 hover:text-white transition">info@ottobon.com</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-primary mr-2 mt-1"></i>
                <a href="tel:+18005551234" className="text-gray-400 hover:text-white transition">+1 (800) 555-1234</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mr-2 mt-1"></i>
                <span className="text-gray-400">123 Tech Lane, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} OttoBon Technology Consulting Academy. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
