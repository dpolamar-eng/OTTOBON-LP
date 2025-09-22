
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
      <h2>What are AI Agents?</h2>
      <p>AI agents are autonomous software entities that perceive their environment, make decisions, and take actions to achieve goals. They can adapt and learn, unlike traditional software with predetermined instructions.</p>
      
      <h2>Development Process</h2>
      <p>Creating AI agents involves: defining the problem, analyzing the environment, designing architecture, and implementing with testing.</p>
      
      <h2>Key Technologies</h2>
      <ul>
        <li><strong>Python:</strong> Most popular with rich AI libraries</li>
        <li><strong>LangChain:</strong> Framework for LLM-powered applications</li>
        <li><strong>TensorFlow/PyTorch:</strong> Deep learning frameworks</li>
        <li><strong>OpenAI Gym:</strong> Testing environment for agents</li>
      </ul>
      
      <h2>Ottobon's AI Agent Course</h2>
      <p>Our upcoming program covers foundations, practical development, advanced techniques, real-world applications, and deployment strategies.</p>
      
      <h2>Getting Started</h2>
      <p>Learn AI fundamentals, practice Python programming, and build simple projects like chatbots and game AI.</p>
      
      <h2>Conclusion</h2>
      <p>AI agent development is an exciting and growing field with abundant career opportunities for those willing to learn and innovate.</p>
      
      <div class="cta-section">
        <h3>Ready to Master AI Agent Development?</h3>
        <p>Stay tuned for Ottobon's upcoming AI Agent Development course with exclusive early-bird access!</p>
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
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📝</div>
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
              <Link 
                to="/#blog" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
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
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/#blog" className="hover:text-white transition-colors">Knowledge Hub</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{post.title}</span>
            </div>
          </nav>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center mb-4 bg-indigo-500/20 px-4 py-2 rounded-full">
              <span className="text-indigo-300 font-medium text-sm uppercase tracking-wider">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-gray-300 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">O</span>
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg prose-invert max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content"
              />
            </article>

            

            {/* Back to Blog */}
            <div className="text-center mb-12">
              <Link 
                to="/#blog" 
                className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Knowledge Hub
              </Link>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <section className="border-t border-gray-800 pt-12">
                <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {related.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      to={`/blog/${relatedPost.slug}`}
                      className="group block bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300"
                    >
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-6">
                        <div className="text-indigo-400 text-sm mb-2">{relatedPost.category}</div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Ottobon's comprehensive AI programs.
          </p>
          <Link 
            to="/#courses" 
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-lg"
          >
            Explore Our Courses
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
