
export default function ServicesFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/assets/logo.png"
                alt="Ottobon Logo"
                className="h-8 w-auto object-contain mr-3"
              />
              <div className="text-2xl font-extrabold text-white">
                OTTOBON
              </div>
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
            <h3 className="text-lg font-semibold mb-4">Health Care 🏥</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Personal Fertility Care Companion</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Journey to Parenthood</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">AI-powered Health Tracking</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Reproductive Health Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enterprise Support Services 💻</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Pre-Sales Support</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Marketing & Visibility</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Talent Acquisition</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Project Delivery Support</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Admin & Billing</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition">Payroll Management</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mr-2 mt-1"></i>
                <a href="mailto:hr.services@ottobon.in" className="text-gray-400 hover:text-white transition">hr.services@ottobon.in</a>
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
          <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} OttoBon Enterprise Support Services Academy. All rights reserved.</p>
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
