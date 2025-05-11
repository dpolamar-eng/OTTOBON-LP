import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function ComingSoonServices() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend service
    // to store the email for notifications
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex flex-col">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index}
              className={`absolute w-20 h-20 bg-gradient-to-r opacity-20 rounded-full animate-float-${(index % 5) + 1}`}
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
                background: `linear-gradient(${Math.random() * 360}deg, rgba(236, 72, 153, 0.4), rgba(99, 102, 241, 0.4))`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center">
        {/* Header/Navigation */}
        <div className="w-full flex justify-between items-center mb-16">
          <div className="text-3xl font-extrabold text-white">
            OTTOBON
          </div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-white/80 hover:text-white font-medium transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Portal
          </button>
        </div>

        {/* Coming Soon Content */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-pink-300 font-semibold text-sm mb-6">
            <span className="mr-2">⚡</span>
            <span>Coming Soon</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Services
          </h1>
          
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            We're building a suite of premium consulting services to help businesses navigate digital transformation with confidence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Strategy Consulting</h3>
              <p className="text-purple-100 text-sm">
                Expert guidance on technology selection, digital roadmaps, and transformation strategy.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Talent Solutions</h3>
              <p className="text-purple-100 text-sm">
                Access to our elite pool of academy graduates to fill specialized technology roles.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Implementation</h3>
              <p className="text-purple-100 text-sm">
                Hands-on technical delivery of projects, custom development, and system integration.
              </p>
            </div>
          </div>
          
          {/* Notification Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-xl mx-auto">
            {submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
                <p className="text-purple-100 mb-4">
                  You'll be the first to know when our professional services launch.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-purple-300 hover:text-white transition"
                >
                  Sign up with another email
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Get Notified at Launch</h3>
                <p className="text-purple-100 mb-6 text-center">
                  Be the first to know when we launch our professional services. Early subscribers will receive exclusive benefits.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Notify Me
                      <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shine"></span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto relative z-10 w-full py-6 border-t border-white/10">
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