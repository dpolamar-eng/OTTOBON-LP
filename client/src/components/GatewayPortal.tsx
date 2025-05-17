import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function GatewayPortal() {
  const [, navigate] = useLocation();
  const [hoverState, setHoverState] = useState<'academy' | 'services' | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
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
          <div className="flex items-center">
            <img src="/assets/logo.png" alt="Ottobon Logo" className="h-36" />
            <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white -ml-2 tracking-tight">
              OTTOBON
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-xl sm:text-2xl text-blue-100 font-light mb-8">
            Transforming talent into technology leaders through specialized learning and consulting
          </h1>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        </div>
      </div>

      {/* Gateway Options */}
      <div className="relative z-10 flex-grow flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 pb-16">
        {/* Academy Card */}
        <div 
          className={`gateway-card group ${hoverState === 'academy' ? 'scale-105' : hoverState === 'services' ? 'scale-95 opacity-80' : ''}`}
          onMouseEnter={() => setHoverState('academy')}
          onMouseLeave={() => setHoverState(null)}
          onClick={() => navigate('/academy')}
        >
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-80"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>
            
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm rounded-2xl">
              <div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <span className="text-3xl">🎓</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Technology Academy</h2>
                <p className="text-blue-100 mb-6">Accelerated learning programs for emerging tech professionals with AI-personalized training paths.</p>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">AI-personalized curriculum</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">Industry-recognized certifications</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-blue-50">Expert mentorship & coaching</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full transition shadow-md hover:shadow-lg w-full group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center">
                    Enter Academy
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
          onClick={() => navigate('/services')}
        >
          <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 p-0.5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-80"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgyLTJoLTJ6TTM0IDMwaDJoMnpNNDAgMjhWLTJWMjh6TTQyIDMyVjJWMzJ6TTQwIDM2djIyVjM2ek00MiA0MHYxOFY0MHpNNDAgMjhoMnYyaC0yek00MiAzMmgydjJoLTJ6TTQwIDM2aDJ2MmgtMnpNNDIgNDBoMnYyaC0yek0zMiAzNGgyek0zNCAzMGgyek0yOCAzNGgyek0zMCAzMGgyek0yOCAyOHYzMFYyOHpNMzAgMzJ2MjJWMzJ6TTI4IDI4aDJ2MmgtMnpNMzAgMzJoMnYyaC0yek0yOCAzNGgyek0zMCAzOGgydjJoLTJ6Ik0yNCAzNGgyek0yNiAzMGgyek0yMCAzNGgyek0yMiAzMGgyek0yMCAzMnYyMlYzMnpNMjIgMzZ2MTRWMzZ6TTIwIDMyaDJ2MmgtMnpNMjIgMzZoMnYyaC0yek0yMCAzOGgydjJoLTJ6TTIyIDQyaDJ2MmgtMnpNMTYgMzRoek0xOCAzMGgyek0xMiAzNGgyek0xNCAzMGgyek0xMiAyOHYzMFYyOHpNMTQgMzJ2MjJWMzJ6TTEyIDI4aDJ2MmgtMnpNMTQgMzJoMnYyaC0yek0xMiAzNGgyek0xNCAzOGgydjJoLTJ6TTggMzRoek0xMCAzMGgyek00IDM0aHpNNiAzMGgyek00IDMydjIyVjMyek02IDM2djE0VjM2ek00IDMyaDJ2MmgtMnpNNiAzNmgydjJoLTJ6TTQgMzhoMnYyaC0yek02IDQyaDJ2MmgtMnpNNTYgMzRoek01OCAzMGgyek01MiAzNGgyek01NCAzMGgyek01MiAyOHYzMFYyOHpNNTQgMzJ2MjJWMzJ6TTUyIDI4aDJ2MmgtMnpNNTQgMzJoMnYyaC0yek01MiAzNGgyek01NCAzOGgydjJoLTJ6TTQ4IDM0aHpNNTAgMzBoek00NCAzNGh6TTQ2IDMwaHpNNDQgMzJ2MjJWMzJ6TTQ2IDM2djE0VjM2ek00NCAzMmgydjJoLTJ6TTQ2IDM2aDJ2MmgtMnpNNDQgMzhoMnYyaC0yek00NiA0MmgydjJoLTJ6TTYwIDI4djMwVjI4ek0wIDI4djMwVjI4ek0wIDI4aDJ2MmgtMnpNNjAgMjhoLTJ2MmgyeiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')]"></div>
            
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl">
              <div>
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <span className="text-3xl">🤖</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Professional Services Org</h2>
                <p className="text-purple-100 mb-6">Empowering experts and consulting businesses with comprehensive operational and strategic support.</p>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">AI-powered business functions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">Executive & operational support</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-pink-300 mr-2">⚡</span>
                    <span className="text-purple-50">Flexible service for all expert levels</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute -top-16 right-0 bg-gradient-to-r from-yellow-400 to-pink-500 text-xs font-bold px-3 py-1 rounded-full transform rotate-12 shadow-lg">
                    Coming Soon
                  </div>
                  <button className="bg-white/20 text-white hover:bg-white/30 font-semibold py-3 px-6 rounded-full transition shadow-md hover:shadow-lg w-full backdrop-blur-sm border border-white/20 group relative overflow-hidden">
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
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 sm:mb-0">
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