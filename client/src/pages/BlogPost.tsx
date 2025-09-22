
import React from 'react';
import { useParams, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  author: string;
  readTime: string;
}

const blogPosts: { [key: string]: BlogPost } = {
  'ai-web-development-future-freshers': {
    id: '1',
    title: 'Why AI in Web Development is the Future for Freshers',
    excerpt: 'Discover how AI is revolutionizing web development and why freshers should embrace this technology to accelerate their careers in the modern tech landscape.',
    category: 'Career Tips',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'ai-web-development-future-freshers',
    author: 'Ottobon Team',
    readTime: '8 min read',
    content: `
      <h2>Introduction</h2>
      <p>AI is revolutionizing web development, making it essential for freshers to embrace these technologies for career success.</p>
      
      <h2>Key AI Tools for Web Development</h2>
      <ul>
        <li><strong>GitHub Copilot:</strong> AI pair programmer for real-time code suggestions</li>
        <li><strong>ChatGPT:</strong> Debugging and problem-solving assistant</li>
        <li><strong>Figma AI:</strong> Automated design suggestions</li>
        <li><strong>Testim:</strong> AI-powered automated testing</li>
      </ul>
      
      <h2>Career Benefits</h2>
      <p>AI tools boost productivity by 30-50%, improve code quality, and give you a competitive edge in the job market.</p>
      
      <h2>Getting Started</h2>
      <p>Master web development fundamentals first, then integrate AI coding assistants like GitHub Copilot into your workflow. Build AI-enhanced portfolio projects to showcase your skills.</p>
      
      <h2>Conclusion</h2>
      <p>AI enhances developer capabilities rather than replacing them. Start integrating AI tools today to position yourself as a future leader in web development.</p>
      
      <div class="cta-section">
        <h3>Ready to Start Your AI Web Development Journey?</h3>
        <p>Join Ottobon's comprehensive AI Web Development course and learn from industry experts.</p>
      </div>
    `
  },
  'getting-started-ai-agent-development': {
    id: '2',
    title: 'Getting Started with AI Agent Development: What to Expect',
    excerpt: 'A comprehensive guide to understanding AI agent development, from basic concepts to advanced implementations that will shape the future of automation.',
    category: 'Course Updates',
    date: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'getting-started-ai-agent-development',
    author: 'Ottobon Team',
    readTime: '10 min read',
    content: `
      <h2>🤖 What are AI Agents?</h2>
      <p>AI agents are <strong>autonomous software entities</strong> that perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional software with predetermined instructions, these intelligent systems can <em>adapt</em> and <em>learn</em> from their interactions.</p>
      
      <div class="info-box">
        <p><strong>Key Characteristics:</strong> Autonomy, Reactivity, Pro-activeness, and Social Ability</p>
      </div>
      
      <h2>⚙️ Development Process</h2>
      <p>Creating effective AI agents involves a systematic approach that combines theoretical understanding with practical implementation:</p>
      
      <h3>Phase 1: Problem Definition & Analysis</h3>
      <p>Before diving into development, we must clearly define the problem space and analyze the environment where our agent will operate.</p>
      
      <h3>Phase 2: Architecture Design</h3>
      <p>Design the agent's cognitive architecture, including perception modules, decision-making algorithms, and action execution systems.</p>
      
      <h2>🛠️ Key Technologies & Frameworks</h2>
      <ul>
        <li><strong>Python:</strong> The most popular language with rich AI libraries and extensive community support</li>
        <li><strong>LangChain:</strong> Powerful framework specifically designed for building LLM-powered applications</li>
        <li><strong>TensorFlow/PyTorch:</strong> Industry-standard deep learning frameworks for neural network implementation</li>
        <li><strong>OpenAI Gym:</strong> Standardized testing environment for reinforcement learning agents</li>
        <li><strong>Hugging Face Transformers:</strong> State-of-the-art pre-trained models for NLP tasks</li>
      </ul>
      
      <div class="highlight-section">
        <h3>🎯 Popular Agent Types</h3>
        <p><strong>Reactive Agents:</strong> Respond directly to environmental stimuli<br>
        <strong>Deliberative Agents:</strong> Plan actions based on internal models<br>
        <strong>Hybrid Agents:</strong> Combine reactive and deliberative approaches</p>
      </div>
      
      <h2>🎓 Ottobon's AI Agent Development Program</h2>
      <p>Our comprehensive curriculum is designed to take you from beginner to expert level, covering:</p>
      
      <h3>Foundation Module</h3>
      <p>Understanding AI agent theory, types, and real-world applications across industries.</p>
      
      <h3>Practical Development</h3>
      <p>Hands-on coding experience with popular frameworks and libraries.</p>
      
      <h3>Advanced Techniques</h3>
      <p>Multi-agent systems, reinforcement learning, and neural-symbolic integration.</p>
      
      <h2>🚀 Getting Started on Your Journey</h2>
      <p>Ready to begin? Here's your roadmap:</p>
      <ul>
        <li><strong>Master the Fundamentals:</strong> Start with basic AI and machine learning concepts</li>
        <li><strong>Learn Python Programming:</strong> Focus on libraries like NumPy, Pandas, and Scikit-learn</li>
        <li><strong>Build Simple Projects:</strong> Create chatbots, game AI, and automation scripts</li>
        <li><strong>Explore Advanced Topics:</strong> Dive into reinforcement learning and multi-agent systems</li>
      </ul>
      
      <h2>💡 Conclusion</h2>
      <p>AI agent development represents one of the most <strong>exciting and rapidly growing</strong> fields in technology today. With abundant career opportunities and the potential to create meaningful impact across industries, there has never been a better time to start your journey.</p>
      
      <div class="cta-section">
        <h3>🎯 Ready to Master AI Agent Development?</h3>
        <p>Join the waitlist for Ottobon's upcoming AI Agent Development course and secure your spot with exclusive early-bird pricing!</p>
      </div>
    `
  },
  'essential-skills-ai-professional-2025': {
    id: '3',
    title: '5 Essential Skills Every AI Professional Needs in 2025',
    excerpt: 'Stay ahead in the AI industry by mastering these crucial skills that top employers are looking for in 2025 and beyond.',
    category: 'Career Tips',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'essential-skills-ai-professional-2025',
    author: 'Ottobon Team',
    readTime: '12 min read',
    content: `
      <h2>Introduction</h2>
      <p>The AI industry evolves rapidly. Success in 2025 requires a blend of technical expertise, soft skills, and business acumen.</p>
      
      <h2>1. Advanced Machine Learning and Deep Learning</h2>
      <p>Master transformer architectures, multimodal AI, few-shot learning, reinforcement learning, and federated learning. Focus on PyTorch, TensorFlow, and contributing to open-source projects.</p>
      
      <h2>2. Programming Languages and Frameworks</h2>
      <ul>
        <li><strong>Essential Languages:</strong> Python, JavaScript/TypeScript, Julia, Rust, SQL</li>
        <li><strong>Key Frameworks:</strong> Hugging Face, LangChain, Ray, MLflow, FastAPI</li>
        <li><strong>Cloud Platforms:</strong> AWS SageMaker, Google AI Platform, Azure ML</li>
      </ul>
      
      <h2>3. Communication and Leadership</h2>
      <p>Develop critical thinking, technical writing, data storytelling, and presentation skills. Lead cross-functional teams and mentor junior developers.</p>
      
      <h2>4. AI Ethics and Responsibility</h2>
      <p>Understand bias mitigation, transparency, privacy protection, and regulatory compliance. Implement ethical AI practices and governance frameworks.</p>
      
      <h2>5. Business Acumen</h2>
      <p>Learn ROI analysis, strategic thinking, and domain expertise in healthcare, finance, retail, or manufacturing. Bridge technical and business teams effectively.</p>
      
      <h2>Learning Path</h2>
      <p>Build foundations first (months 1-3), expand skills (months 4-6), then apply advanced techniques while leading projects (months 7-12).</p>
      
      <h2>Conclusion</h2>
      <p>Success in AI combines technical depth with communication, ethics, and business understanding. Focus on creating meaningful solutions that improve lives.</p>
      
      <div class="cta-section">
        <h3>Accelerate Your AI Career Journey</h3>
        <p>Join Ottobon's comprehensive AI professional development programs with hands-on projects and expert mentorship.</p>
      </div>
    `
  }
};

// Related articles for each post
const relatedArticles: { [key: string]: string[] } = {
  'ai-web-development-future-freshers': ['getting-started-ai-agent-development', 'essential-skills-ai-professional-2025'],
  'getting-started-ai-agent-development': ['ai-web-development-future-freshers', 'essential-skills-ai-professional-2025'],
  'essential-skills-ai-professional-2025': ['ai-web-development-future-freshers', 'getting-started-ai-agent-development']
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="font-sans text-white bg-black min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-md rounded-3xl p-12 border border-gray-800">
              <div className="text-6xl mb-8 opacity-60">🔍</div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Article Not Found
              </h1>
              <p className="text-gray-400 mb-8 text-lg">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <Link 
                to="/#blog" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Knowledge Hub
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = relatedArticles[slug!]?.map(relatedSlug => blogPosts[relatedSlug]).filter(Boolean) || [];

  return (
    <div className="font-sans text-white bg-black min-h-screen">
      <Header />
      
      {/* Immersive Hero Section */}
      <section className="pt-24 md:pt-28 lg:pt-32 xl:pt-40 relative min-h-screen flex items-center overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
          
          {/* Animated Particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating Category Badge */}
            <div className="inline-flex items-center mb-8 bg-gradient-to-r from-indigo-600/80 to-purple-600/80 backdrop-blur-xl px-8 py-3 rounded-full shadow-2xl border border-white/20">
              <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse"></div>
              <span className="text-white font-bold text-sm uppercase tracking-widest">{post.category}</span>
            </div>
            
            {/* Dynamic Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-12 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                {post.title}
              </span>
            </h1>
            
            {/* Sophisticated Meta Bar */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                  <span className="text-white font-black text-xl">O</span>
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{post.author}</div>
                  <div className="text-gray-300 text-xs">Author</div>
                </div>
              </div>
              
              <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                <svg className="w-6 h-6 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-gray-300 text-xs">Published</div>
                </div>
              </div>
              
              <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                <svg className="w-6 h-6 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <div className="text-white font-bold text-sm">{post.readTime}</div>
                  <div className="text-gray-300 text-xs">Read Time</div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center text-white/60">
                <span className="text-sm font-medium mb-2">Scroll to Read</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section with Luxury Design */}
      <main className="relative">
        {/* Content Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Elegant Content Card */}
            <article className="relative">
              {/* Floating Content Container */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Content Header */}
                <div className="px-8 md:px-12 pt-12 pb-8 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">📚</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Article Content</h2>
                        <p className="text-gray-400 text-sm">Deep dive into the topic</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-400">{post.readTime.split(' ')[0]}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Minutes</div>
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div className="px-8 md:px-12 py-12">
                  <div 
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="blog-content-luxury prose prose-xl prose-invert max-w-none"
                  />
                </div>
              </div>
            </article>

            {/* Navigation Section */}
            <div className="flex justify-center mt-16 mb-16">
              <Link 
                to="/#blog" 
                className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-indigo-600/80 hover:to-purple-600/80 backdrop-blur-xl text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-white/10"
              >
                <svg className="w-6 h-6 mr-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-lg">Back to Knowledge Hub</span>
                <div className="ml-4 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              </Link>
            </div>

            {/* Related Articles with Premium Design */}
            {related.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-16">
                  <div className="inline-flex items-center mb-6">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500"></div>
                    <div className="mx-6 w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-indigo-500"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6">
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Continue Your Journey
                    </span>
                  </h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Explore more insights and expand your knowledge with these carefully curated articles
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  {related.map((relatedPost, index) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2"
                    >
                      {/* Background Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        
                        {/* Floating Category */}
                        <div className="absolute top-6 left-6">
                          <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/30">
                            {relatedPost.category}
                          </span>
                        </div>

                        {/* Read Time Badge */}
                        <div className="absolute top-6 right-6">
                          <div className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-2 rounded-full border border-white/20">
                            {relatedPost.readTime}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500 leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        
                        {/* Enhanced CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-indigo-400 group-hover:text-indigo-300 font-bold transition-colors">
                            <span className="mr-3">Read Article</span>
                            <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                          <div className="text-gray-500 text-sm">
                            {new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-700 rounded-3xl"></div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Premium CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Animated Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-16 border border-white/10 shadow-2xl">
              {/* Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <span className="text-4xl">🚀</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-4xl md:text-6xl font-black mb-8">
                <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  Transform Your Future
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of learners who have revolutionized their careers with Ottobon's cutting-edge AI programs, expert mentorship, and industry connections.
              </p>
              
              {/* CTA Button */}
              <Link 
                to="/#courses" 
                className="group inline-flex items-center px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl text-xl border-2 border-white/20 hover:border-white/40"
              >
                <span className="mr-4">Start Your Journey Today</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
