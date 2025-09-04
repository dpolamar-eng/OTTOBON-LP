export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-4">
              OTTOBON
            </div>
            <p className="text-gray-400 mb-4">
              Empowering the future of AI-driven consulting. Learn from AI to become faster, smarter, and more effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Up-Skill</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">AI for UI/UX Designer</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">AI in Marketing</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">AI Agent Development</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">AI Data Labeling</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Job Assist & Career Support</h3>
            <ul className="space-y-2">
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">Resume Builder</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">Job Matching</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">Mock Interviews</a></li>
              <li><a href="#courses" className="text-gray-400 hover:text-white transition">Guidance Hub</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mr-2 mt-1"></i>
                <a href="mailto:hr@ottobon.in" className="text-gray-400 hover:text-white transition">hr@ottobon.in</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-primary mr-2 mt-1"></i>
                <a href="tel:+919281011683" className="text-gray-400 hover:text-white transition">+91 9281011683</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mr-2 mt-1"></i>
                <span className="text-gray-400">D No 10-28-2/1/3, 1st Floor 102, A Square Business Centre, Waltair Uplands, Waltair Main Road, Chinawaltair, Visakhapatnam, Andhra Pradesh, India, 530003</span>
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
