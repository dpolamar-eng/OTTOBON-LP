import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-white/30 to-purple-50/30 z-[-1]"></div>
      
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="text-3xl font-extrabold relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-700 transition">OTTO</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-500 hover:to-blue-500 transition">BON</span>
            <div className="absolute -top-4 -right-6 transform rotate-12 transition-transform group-hover:rotate-6">
              <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 rounded-full shadow-md">ACADEMY</span>
            </div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {[
            { label: "Our Philosophy", href: "#philosophy" },
            { label: "Our Programs", href: "#courses" },
            { label: "Career Fit Assessment", href: "#assessment" }
          ].map((item, index) => (
            <a 
              key={index}
              href={item.href} 
              className="text-gray-700 hover:text-primary font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all relative overflow-hidden group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        {/* CTA Button */}
        <div className="hidden md:flex space-x-2">
          <a 
            href="#assessment" 
            className="bg-white border border-blue-400 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition shadow-sm hover:shadow-md relative overflow-hidden"
          >
            Career Fit Assessment
          </a>
          <a 
            href="#enroll" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition shadow-md hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Join Fast Lane
              <svg className="ml-1 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden bg-white/70 backdrop-blur-sm rounded-full p-2 text-gray-900 focus:outline-none hover:bg-blue-50 transition shadow-sm"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100/50 shadow-lg overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a 
            href="#philosophy" 
            className="text-gray-700 hover:text-primary font-medium transition py-3 px-4 rounded-lg hover:bg-blue-50/50 flex items-center"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-lightbulb mr-3 text-blue-500"></i>
            Our Philosophy
          </a>
          <a 
            href="#courses" 
            className="text-gray-700 hover:text-primary font-medium transition py-3 px-4 rounded-lg hover:bg-blue-50/50 flex items-center"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-graduation-cap mr-3 text-blue-500"></i>
            Our Programs
          </a>
          <a 
            href="#assessment" 
            className="text-gray-700 hover:text-primary font-medium transition py-3 px-4 rounded-lg hover:bg-blue-50/50 flex items-center"
            onClick={closeMobileMenu}
          >
            <i className="fas fa-clipboard-check mr-3 text-blue-500"></i>
            Career Fit Assessment
          </a>

          <div className="pt-2 pb-1">
            <a 
              href="#enroll" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow-md hover:shadow-lg text-center block flex items-center justify-center"
              onClick={closeMobileMenu}
            >
              <span>Join Fast Lane</span>
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
