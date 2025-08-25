import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function GatewayPortal() {
  const [, navigate] = useLocation();
  const [hoverState, setHoverState] = useState<'academy' | 'services' | null>(null);
  const [pressing, setPressing] = useState<'academy' | 'services' | null>(null);

  return (
  <div className="relative min-h-screen bg-black flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="gateway-bubble"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 20}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Logo and Title */}
      <div className="relative z-10 text-center pt-20 pb-12">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain" />
            <div className="font-extrabold text-white tracking-tight leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              OTTOBON
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-xl sm:text-2xl text-blue-100 font-light mt-3 sm:mt-4 mb-4">
            Empowering the Future of AI-Driven Consulting
          </h1>
          <p className="text-lg text-blue-200 mb-6 max-w-3xl mx-auto">
            Learn from AI to become faster, smarter, and more effective. Transform into an independent consultant or enhance your professional services with cutting-edge skills.
          </p>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-2"></div>
          <p className="text-sm text-blue-300 italic">
            "Learning from AI makes things easier, faster, and smarter"
          </p>
        </div>
      </div>

      {/* Gateway Options */}
      <div className="relative z-10 flex-grow flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 pb-16">
        {/* Academy Card */}
        <div 
          className={`gateway-card group ${hoverState === 'academy' ? 'scale-105' : hoverState === 'services' ? 'scale-95 opacity-80' : ''}`}
          onMouseEnter={() => setHoverState('academy')}
          onMouseLeave={() => setHoverState(null)}
        >
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0F1E2E] p-0.5">
            {/* Solid brand background replacing previous blue gradient */}
            <div className="absolute inset-0 bg-[#0F1E2E]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>

            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-[#112537]/70 backdrop-blur-sm rounded-2xl">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h2 className="ml-4 text-2xl sm:text-2xl font-bold text-white">Ottobon Academy</h2>
                </div>
                <p className="text-blue-100 mb-6">Transform students and freshers into independent consultants with job-ready skills in high-demand technologies.</p>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">Salesforce & Oracle expertise</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">Cloud Computing & Full Stack Development</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">AI-enhanced learning paths</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => {
                    if (pressing) return;
                    setPressing('academy');
                    setTimeout(() => {
                      navigate('/academy');
                      window.scrollTo(0, 0);
                    }, 160);
                  }}
                  aria-pressed={pressing === 'academy'}
                  className={`bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg w-full relative overflow-hidden cursor-pointer filter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 
                    group-hover:scale-105 group-hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.65)] hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] 
                    ${pressing === 'academy' ? 'scale-110 drop-shadow-[0_12px_28px_rgba(212,175,55,0.75)]' : ''}`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Services Card */}
        <div 
          className={`gateway-card group ${hoverState === 'services' ? 'scale-105' : hoverState === 'academy' ? 'scale-95 opacity-80' : ''}`}
          onMouseEnter={() => setHoverState('services')}
          onMouseLeave={() => setHoverState(null)}
        >
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#0F1E2E] p-0.5">
            {/* Solid brand background replacing previous purple/pink gradient */}
            <div className="absolute inset-0 bg-[#0F1E2E]"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>

            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-[#112537]/70 backdrop-blur-sm rounded-2xl">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <h2 className="ml-4 text-2xl sm:text-2xl font-bold text-white">Ottobon Services</h2>
                </div>
                <p className="text-purple-100 mb-6">Empowering working professionals to transition into consultant providers with advanced tech learning and professional services.</p>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">Independent Consultants</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">Small Consulting Firms</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">Mid-Size Practices</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute -top-16 right-0 bg-gradient-to-r from-yellow-400 to-pink-500 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                    Coming Soon
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (pressing) return;
                      setPressing('services');
                      setTimeout(() => {
                        navigate('/services');
                        window.scrollTo(0, 0);
                      }, 160);
                    }}
                    aria-pressed={pressing === 'services'}
                    className={`bg-[#FFC107] text-black font-semibold py-3 px-6 rounded-full transition transform duration-300 ease-out shadow-md hover:shadow-lg w-full backdrop-blur-sm border border-transparent relative overflow-hidden cursor-pointer filter focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60 focus-visible:ring-offset-0 
                      group-hover:scale-105 group-hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.65)] hover:scale-105 hover:drop-shadow-[0_10px_24px_rgba(212,175,55,0.35)] active:scale-110 active:drop-shadow-[0_12px_28px_rgba(212,175,55,0.45)] 
                      ${pressing === 'services' ? 'scale-110 drop-shadow-[0_12px_28px_rgba(212,175,55,0.75)]' : ''}`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Get Notified
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full py-6 border-t border-white/10">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-2">
          <div className="text-white/60 text-sm">
            © 2025 Ottobon. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition">Privacy</a>
            <a href="#" className="text-white/60 hover:text-white transition">Terms</a>
            <a href="#" className="text-white/60 hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}