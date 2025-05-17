import React, { useState } from 'react';
import { useLocation } from 'wouter';

export default function ComingSoonServices() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would connect to a backend service
    // to store the email for notifications
    setSubmitted(true);
    setEmail('');
  };

  // Define offerings data structure
  const offerings = [
    {
      function: 'Pre-Sales',
      aiTools: '🧠 Proposal Builder Agent (inputs: problem → outputs: proposal, solution sketch)',
      peopleServices: 'Proposal writers, demo engineers'
    },
    {
      function: 'Marketing',
      aiTools: '📢 Marketing Automation (auto-generate social content, blogs, newsletters)',
      peopleServices: 'Brand consultants'
    },
    {
      function: 'Talent Acquisition',
      aiTools: '🔍 Profile search, resume-job match, referral graph, AI interviewer',
      peopleServices: 'Recruiters, candidate screeners'
    },
    {
      function: 'Delivery Ops',
      aiTools: '✅ Task AI Agent: assigns, follows up, and updates tools like Jira automatically',
      peopleServices: 'PMs, delivery coordinators'
    },
    {
      function: 'Billing & Agreements',
      aiTools: '📑 Self-configured invoicing, milestone tracking, contract templates',
      peopleServices: 'Finance/admin staff if needed'
    }
  ];

  // Define audience segments
  const audiences = [
    {
      title: 'Independent Experts',
      description: 'Need help building a consulting practice or handling ops.',
      icon: '👨‍💻',
      benefits: [
        'Complete operational support to focus on client work',
        'Automated proposal generation and contract management',
        'No overhead costs of hiring administrative staff'
      ]
    },
    {
      title: 'Small Staff Aug Firms',
      description: 'Want scalable support for pre-sales, delivery, or admin.',
      icon: '🏢',
      benefits: [
        'Scale operations without proportional headcount increase',
        'Consistent quality across all admin and operational functions',
        'Reduce time spent on non-billable activities'
      ]
    },
    {
      title: 'Mid-size Consulting Cos.',
      description: 'Selective outsourcing of specific functions like proposals or sourcing.',
      icon: '🌐',
      benefits: [
        'Modular services that integrate with existing systems',
        'Enhanced capabilities for peak demand periods',
        'Focus internal resources on strategic growth areas'
      ]
    }
  ];

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
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
        {/* Header/Navigation */}
        <div className="w-full flex justify-between items-center mb-8 md:mb-16">
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

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-pink-300 font-semibold text-sm mb-6">
            <span className="mr-2">⚡</span>
            <span>Coming Soon</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Services Org
          </h1>
          
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Empowering experts and consulting businesses with operational and strategic support
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 mb-16">
            <p className="text-lg text-purple-50">
              Our PSO helps experts focus on their core competencies by providing comprehensive operational and strategic support including sales, marketing, talent acquisition, payroll and billing.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'overview' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('audience')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'audience' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Who It's For
            </button>
            <button 
              onClick={() => setActiveTab('offerings')}
              className={`px-4 py-2 rounded-full transition ${activeTab === 'offerings' 
                ? 'bg-white text-purple-900 shadow-lg' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Offerings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">The Execution Engine for Consultants</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🚀</span>
                    Operational Excellence
                  </h3>
                  <p className="text-purple-100">
                    We handle the administrative burden of running a consulting business, from marketing to billing, allowing you to focus on what you do best.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🤖</span>
                    AI-Powered Tools
                  </h3>
                  <p className="text-purple-100">
                    Our suite of AI tools automates repetitive tasks and generates high-quality deliverables from proposals to marketing content.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔄</span>
                    Flexible Support Model
                  </h3>
                  <p className="text-purple-100">
                    Choose between fully-automated solutions or add human expertise where it matters most to your business.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="text-2xl mr-2">💼</span>
                    Scale On Demand
                  </h3>
                  <p className="text-purple-100">
                    Grow your consulting practice without the overhead of hiring full-time operational staff or worrying about scaling challenges.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Our Approach</h3>
                <p className="text-purple-100 mb-4">
                  The PSO combines cutting-edge AI technology with human expertise to deliver a comprehensive support system for consultants and consulting firms. Whether you're a solo practitioner or managing a team of experts, our platform adapts to your specific needs.
                </p>
                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => setActiveTab('offerings')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-full transition shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Explore Our Offerings
                      <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shine"></span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audience Tab */}
          {activeTab === 'audience' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Who Benefits from Our PSO</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {audiences.map((audience, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full flex flex-col">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-4">
                      <span className="text-3xl">{audience.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{audience.title}</h3>
                    <p className="text-purple-100 mb-4">{audience.description}</p>
                    
                    <h4 className="text-sm font-medium text-pink-300 mb-2">KEY BENEFITS</h4>
                    <ul className="space-y-2 mt-auto">
                      {audience.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-pink-400 mr-2 mt-1">✓</span>
                          <span className="text-purple-50 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Offerings Tab */}
          {activeTab === 'offerings' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">PSO Service Offerings</h2>
              <p className="text-center text-purple-100 mb-8">Our execution engine helps experts and consultants scale by automating or augmenting core business functions</p>
              
              <div className="relative overflow-x-auto rounded-xl border border-white/10 backdrop-blur-sm">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase bg-purple-900/50 text-purple-100">
                    <tr>
                      <th className="px-6 py-4">Business Function</th>
                      <th className="px-6 py-4">AI Tools / Features</th>
                      <th className="px-6 py-4">Optional People Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerings.map((offering, index) => (
                      <tr key={index} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'}`}>
                        <td className="px-6 py-4 text-white font-medium">{offering.function}</td>
                        <td className="px-6 py-4 text-purple-100">{offering.aiTools}</td>
                        <td className="px-6 py-4 text-purple-100">{offering.peopleServices}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Flexible Operating Model</h3>
                <p className="text-purple-100 text-center">
                  Choose your ideal balance between AI automation and human support.
                  Scale up human involvement for complex projects or rely on our AI tools for routine tasks.
                </p>
              </div>
            </div>
          )}
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