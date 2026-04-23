import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

export function ServicesHeaderLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <img src="/assets/logo.png" alt="Ottobon" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <span className="text-white text-xl font-extrabold tracking-tight">OTTOBON SERVICES</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-we-work" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">How We Work</a>
          <a href="#detailed-services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#audience" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Who We Serve</a>
          <a href="#about-us" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About Us</a>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-blue-500/20">
            Talk to Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          <a href="#how-we-work" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white p-2">How We Work</a>
          <a href="#detailed-services" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white p-2">Services</a>
          <a href="#audience" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white p-2">Who We Serve</a>
          <a href="#about-us" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-white p-2">About Us</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white text-center p-3 rounded-full font-bold mt-2">Talk to Us</a>
        </div>
      )}
    </header>
  );
}
