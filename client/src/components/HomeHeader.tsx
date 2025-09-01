import React, { useState, useEffect } from "react";
import { Link } from "wouter";

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#0F1E2E]/95 shadow-xl" : "bg-[#0F1E2E] shadow-xl"}`}
    >
      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

  <div className="w-full pl-[20px] pr-[20px] py-6 flex justify-between items-center">
        {/* Brand */}
  <Link href="/" className="flex items-center group">
          <img src="/assets/logo.png" alt="Ottobon Logo" className="h-9 sm:h-14 md:h-16 w-auto" />
          <div className="text-lg sm:text-2xl md:text-3xl font-extrabold ml-2 sm:ml-3">
            <span className="text-white">OTTOBON</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {[
            { label: "About", href: "#about" },
            { label: "Our Services", href: "#services-overview" },
            { label: "Why Us?", href: "#why" },
            { label: "Team", href: "#team" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/90 hover:text-white font-medium py-2 px-2 xl:px-4 rounded-lg hover:bg-white/10 transition-all relative overflow-hidden group text-sm xl:text-base"
            >
              <div className="flex items-center space-x-1">
                <span>{item.label}</span>
              </div>
              <span className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-[#FFC107] transition-all duration-300 group-hover:left-0 group-hover:right-0"></span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex">
          <a
            href="#services-overview"
            className="bg-[#FFC107] text-black font-semibold py-2 xl:py-3 px-4 xl:px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 relative overflow-hidden group text-sm xl:text-base"
          >
            <span className="relative z-10 flex items-center">
              Begin Your Journey
              <svg className="ml-1 w-[16px] h-[16px] xl:w-[20px] xl:h-[20px] translate-y-[1px] xl:translate-y-[2px] transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"></span>
          </a>
        </div>

        {/* Mobile CTA Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <a
            href="#services-overview"
            className="bg-[#FFC107] text-black font-semibold py-2 px-3 sm:px-4 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 relative overflow-hidden group text-xs sm:text-sm"
          >
            <span className="relative z-10 flex items-center">
              Begin Your Journey
              <svg className="ml-1 w-3 h-3 sm:w-4 sm:h-4 translate-y-[1px] transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"></span>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={toggleMobileMenu}
            className="bg-white/10 backdrop-blur-sm rounded-full p-2 text-white focus:outline-none hover:bg-indigo-500/30 transition shadow-sm"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className={`lg:hidden bg-[#0F1E2E] border-t border-indigo-800/50 shadow-lg overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
          {[
            { label: "About", href: "#about", icon: "📜" },
            { label: "Our Services", href: "#services-overview", icon: "🧩" },
            { label: "Why Us", href: "#why", icon: "⭐" },
            { label: "Team", href: "#team", icon: "👥" },
            { label: "FAQ", href: "#faq", icon: "❓" },
            { label: "Contact", href: "#contact", icon: "✉️" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/90 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/10 flex items-center"
              onClick={closeMobileMenu}
            >
              <span className="w-8 h-8 flex items-center justify-center bg-blue-600/20 rounded-full mr-3 text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}

          <div className="pt-3 pb-2 flex flex-col space-y-3">
            <a
              href="#services-overview"
              className="bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 text-center flex items-center justify-center relative overflow-hidden group"
              onClick={closeMobileMenu}
            >
              <span className="relative z-10">Start Your Journey</span>
              <svg className="ml-2 w-[18px] h-[18px] translate-y-[1.5px] transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span aria-hidden="true" className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/50 to-white/0 -translate-x-full animate-shine-fast"></span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
