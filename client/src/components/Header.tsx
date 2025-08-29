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
    <header className={`fixed w-full z-50 transition-all duration-500 bg-[#0F1E2E] shadow-xl`}>

      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-8 sm:h-12 lg:h-16 xl:h-20 w-auto" />
            <div className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-extrabold ml-2">
              <span className="text-white">OTTOBON</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <nav className="hidden lg:flex space-x-3 xl:space-x-6 flex-shrink-0">
            {[
              { label: "Our Approach", href: "#methodology", icon: "" },
              { label: "Programs", href: "#courses", icon: "" },
              { label: "Talent Compass", href: "#talent-compass", icon: "" },
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="text-white/90 hover:text-white font-medium py-2 px-3 xl:px-4 rounded-lg bg-white/10 hover:bg-white/15 transition-all relative overflow-hidden group text-sm xl:text-base whitespace-nowrap"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-white/80 group-hover:text-white/100 transition-all">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:left-0 group-hover:right-0"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button - Responsive sizing */}
          <div className="hidden lg:flex space-x-3 flex-shrink-0">
            <a 
              href="#talent-compass" 
              className="bg-[#FFC107] text-black font-semibold py-2 xl:py-3 px-4 xl:px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 relative overflow-hidden group text-sm xl:text-base whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center">
                Start Your Journey
                <svg className="ml-1 w-[16px] h-[16px] xl:w-[20px] xl:h-[20px] translate-y-[1px] xl:translate-y-[2px] transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"></span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden bg-white/10 backdrop-blur-sm rounded-full p-2 text-white focus:outline-none hover:bg-indigo-500/30 transition shadow-sm flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
  <div className={`md:hidden bg-[#0F1E2E] border-t border-indigo-800/50 shadow-lg overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
          <a 
            href="#methodology" 
            className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/10 flex items-center"
            onClick={closeMobileMenu}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-blue-600/20 rounded-full mr-3 text-lg">⚡</span>
            <span>Our Approach</span>
          </a>
          <a 
            href="#courses" 
            className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/10 flex items-center"
            onClick={closeMobileMenu}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-blue-600/20 rounded-full mr-3 text-lg">🚀</span>
            <span>Programs</span>
          </a>
          <a 
            href="#talent-compass" 
            className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/10 flex items-center"
            onClick={closeMobileMenu}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-blue-600/20 rounded-full mr-3 text-lg">🧭</span>
            <span>Talent Compass</span>
          </a>

          <div className="pt-3 pb-2 flex flex-col space-y-3">
            <a 
              href="#talent-compass" 
              className="bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 text-center flex items-center justify-center relative overflow-hidden group"
              onClick={closeMobileMenu}
            >
              <span className="relative z-10">Start Your Journey</span>
              <svg className="ml-2 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] translate-y-[1.5px] transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              {/* Button shine effect (brighter + faster) */}
              <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
