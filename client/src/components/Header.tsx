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
    <header className={`fixed w-full bg-white z-50 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-3xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">OTTO</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">BON</span>
            <sup className="ml-1 text-xs font-bold bg-primary text-white px-1 py-0.5 rounded">FAST</sup>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#philosophy" className="text-gray-700 hover:text-primary font-medium transition">Our Philosophy</a>
          <a href="#courses" className="text-gray-700 hover:text-primary font-medium transition">Our Programs</a>
          <a href="#assessment" className="text-gray-700 hover:text-primary font-medium transition">Skills Assessment</a>
          <a href="#success-stories" className="text-gray-700 hover:text-primary font-medium transition">Success Stories</a>
        </nav>
        
        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href="#enroll" 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Apply Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-gray-900 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white border-t border-gray-100 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a 
            href="#philosophy" 
            className="text-gray-700 hover:text-primary font-medium transition py-2"
            onClick={closeMobileMenu}
          >
            Our Philosophy
          </a>
          <a 
            href="#courses" 
            className="text-gray-700 hover:text-primary font-medium transition py-2"
            onClick={closeMobileMenu}
          >
            Our Programs
          </a>
          <a 
            href="#assessment" 
            className="text-gray-700 hover:text-primary font-medium transition py-2"
            onClick={closeMobileMenu}
          >
            Skills Assessment
          </a>
          <a 
            href="#success-stories" 
            className="text-gray-700 hover:text-primary font-medium transition py-2"
            onClick={closeMobileMenu}
          >
            Success Stories
          </a>
          <a 
            href="#enroll" 
            className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:shadow-lg text-center relative overflow-hidden group"
            onClick={closeMobileMenu}
          >
            <span className="relative z-10">Apply Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </header>
  );
}
