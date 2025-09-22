
import React from 'react';
import { useParams, Link } from 'wouter';
import Header from '@/components/Header';

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
  'ai-transforming-marketing-strategies': {
    id: '4',
    title: 'How AI is Transforming Modern Marketing Strategies',
    excerpt: 'Explore the latest AI-driven trends and techniques that are reshaping how businesses connect with their customers in the digital age.',
    category: 'AI Trends',
    date: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'ai-transforming-marketing-strategies',
    author: 'Ottobon Team',
    readTime: '5 min read',
    content: `
      <h2>🚀 The AI Marketing Revolution is Here</h2>
      <p>AI is <strong>transforming marketing forever</strong>. Companies using AI marketing see 200-300% better results and $40 billion in additional revenue by 2025.</p>
      
      <div class="info-box">
        <p><strong>Reality Check:</strong> Businesses without AI marketing will be left behind. The time to act is NOW.</p>
      </div>
      
      <h2>🎯 Top 3 AI Marketing Skills in High Demand</h2>
      
      <h3>1. AI-Powered Personalization</h3>
      <p>Create <em>hyper-personalized customer experiences</em> that boost conversions by 35%:</p>
      <ul>
        <li><strong>Dynamic Content:</strong> Real-time personalization</li>
        <li><strong>Smart Recommendations:</strong> Netflix-style systems</li>
        <li><strong>Predictive Analytics:</strong> Anticipate customer needs</li>
      </ul>
      
      <h3>2. Automated Content Creation</h3>
      <p>Master AI tools that create marketing content at scale:</p>
      <ul>
        <li><strong>AI Writing:</strong> GPT-powered blogs and ads</li>
        <li><strong>Visual AI:</strong> Automated image and video creation</li>
        <li><strong>Voice AI:</strong> Generated podcasts and voice-overs</li>
      </ul>
      
      <h3>3. Smart Campaign Optimization</h3>
      <p>Use AI to automate and optimize marketing campaigns:</p>
      <ul>
        <li><strong>Programmatic Ads:</strong> Real-time bidding optimization</li>
        <li><strong>Email Intelligence:</strong> Perfect timing and content</li>
        <li><strong>Performance Analytics:</strong> AI-driven insights</li>
      </ul>
      
      <div class="highlight-section">
        <h3>⚠️ Don't Get Left Behind</h3>
        <p>Traditional marketers are being replaced by AI-savvy professionals. Companies need experts who can implement these tools TODAY.</p>
      </div>
      
      <div class="cta-section">
        <h3>🚀 Master AI Marketing in 12 Weeks</h3>
        <p>Join Ottobon's AI Marketing Specialist program. Learn the exact tools and strategies top companies use. Limited seats available.</p>
        <p><strong>Next cohort starts soon - Secure your spot now!</strong></p>
      </div>
    `
  },
  'student-success-zero-to-ai-expert': {
    id: '5',
    title: 'Student Success: From Zero to AI Expert in 12 Weeks',
    excerpt: 'Read inspiring stories of our students who transformed their careers through our intensive AI programs and landed fantastic jobs.',
    category: 'Student Success',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'student-success-zero-to-ai-expert',
    author: 'Ottobon Team',
    readTime: '4 min read',
    content: `
      <h2>🌟 Real Students, Real Results</h2>
      <p><strong>94% job placement rate.</strong> Average 65% salary increase. These aren't just statistics—they're real people who transformed their lives in 12 weeks.</p>
      
      <div class="info-box">
        <p><strong>Guarantee:</strong> Our graduates land AI jobs within 6 months or get their money back.</p>
      </div>
      
      <h2>🎯 Sarah Chen: Marketing Manager → AI Product Manager</h2>
      <p><strong>Before:</strong> Traditional marketer feeling left behind<br>
      <strong>After:</strong> AI Product Manager at Fortune 500 company<br>
      <strong>Success:</strong> Landed dream job at Fortune 500 company</p>
      
      <blockquote style="border-left: 4px solid #8B5CF6; padding-left: 1rem; font-style: italic; color: #C4B5FD;">
        "I got my dream job offer 3 weeks after graduation. Ottobon changed my life." - Sarah Chen
      </blockquote>
      
      <h2>🚀 Marcus Rodriguez: Construction Worker → AI Engineer</h2>
      <p><strong>Before:</strong> 8 years in construction, zero tech experience<br>
      <strong>After:</strong> Junior AI Engineer at tech startup<br>
      <strong>Success:</strong> Complete career transformation in 12 weeks</p>
      
      <blockquote style="border-left: 4px solid #8B5CF6; padding-left: 1rem; font-style: italic; color: #C4B5FD;">
        "I thought AI was only for computer science graduates. I was wrong." - Marcus Rodriguez
      </blockquote>
      
      <h2>💡 Priya Patel: Teacher → AI Consultant</h2>
      <p><strong>Before:</strong> High school math teacher for 12 years<br>
      <strong>After:</strong> Runs own AI consulting firm<br>
      <strong>Success:</strong> Built thriving AI consulting practice</p>
      
      <div class="highlight-section">
        <h3>🎯 What Makes Ottobon Different?</h3>
        <p><strong>1:1 Mentorship:</strong> Personal industry expert guidance<br>
        <strong>Real Projects:</strong> 8+ portfolio pieces employers want<br>
        <strong>Job Guarantee:</strong> We don't succeed unless you do</p>
      </div>
      
      <h2>📊 Program Results</h2>
      <ul>
        <li><strong>94% Job Placement Rate</strong> within 6 months</li>
        <li><strong>Career Transformation Guaranteed</strong></li>
        <li><strong>Top Companies:</strong> Google, Microsoft, Amazon, Tesla</li>
        <li><strong>No Degree Required:</strong> High school to PhD welcome</li>
      </ul>
      
      <h2>⏰ Your 12-Week Journey</h2>
      <ul>
        <li><strong>Weeks 1-4:</strong> AI foundations and Python</li>
        <li><strong>Weeks 5-8:</strong> Machine learning and real projects</li>
        <li><strong>Weeks 9-12:</strong> Advanced AI and job preparation</li>
        <li><strong>Week 13+:</strong> Land your AI job with our support</li>
      </ul>
      
      <div class="cta-section">
        <h3>🚀 Your Success Story Starts Now</h3>
        <p><strong>Limited seats available for next cohort starting soon.</strong></p>
        <p>Join Sarah, Marcus, and Priya. Transform your career in 12 weeks with our proven program.</p>
        <p><em>Apply today - spots fill fast!</em></p>
      </div>
    `
  },
  'future-ai-data-labeling': {
    id: '6',
    title: 'The Future of AI Data Labeling: Trends and Opportunities',
    excerpt: 'Understand the growing importance of data labeling in AI development and discover career opportunities in this expanding field.',
    category: 'AI Trends',
    date: '2024-01-03',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'future-ai-data-labeling',
    author: 'Ottobon Team',
    readTime: '5 min read',
    content: `
      <h2>🏷️ The $4.6 Billion Opportunity Behind Every AI System</h2>
      <p>While everyone talks about AI, <strong>data labeling professionals</strong> are quietly building the foundation that makes AI possible—and securing high-demand careers doing it.</p>
      
      <div class="info-box">
        <p><strong>Hidden Gold Mine:</strong> Data labeling market growing at 26.6% annually. High demand, low competition.</p>
      </div>
      
      <h2>🤖 What is AI Data Labeling?</h2>
      <p>Data labeling is <em>teaching AI systems what to see</em>. Every Tesla, every medical AI, every recommendation system needs labeled data to learn.</p>
      
      <h3>High-Paying Specializations</h3>
      <ul>
        <li><strong>Medical AI:</strong> Label X-rays and MRIs for diagnostic systems</li>
        <li><strong>Autonomous Vehicles:</strong> Annotate driving scenarios for Tesla, Waymo</li>
        <li><strong>Computer Vision:</strong> Train AI to recognize objects and faces</li>
        <li><strong>NLP Training:</strong> Teach ChatGPT-style systems to understand language</li>
      </ul>
      
      <div class="highlight-section">
        <h3>📈 Rapid Career Growth Path</h3>
        <p><strong>Entry Level:</strong> Remote work opportunities available<br>
        <strong>Specialists:</strong> Advanced roles with 2-3 years experience<br>
        <strong>Senior Roles:</strong> Team leadership & consulting opportunities</p>
      </div>
      
      <h3>Companies Hiring NOW</h3>
      <ul>
        <li><strong>Scale AI:</strong> Valued at $7.3B, always hiring</li>
        <li><strong>Google/Microsoft/Amazon:</strong> Massive data labeling teams</li>
        <li><strong>Tesla/Waymo:</strong> Autonomous vehicle specialists needed</li>
        <li><strong>Healthcare AI:</strong> Medical labeling experts in high demand</li>
      </ul>
      
      <h2>🛠️ Skills That Pay</h2>
      <ul>
        <li><strong>Labeling Tools:</strong> Labelbox, Scale AI platforms</li>
        <li><strong>Basic Python:</strong> Data manipulation and analysis</li>
        <li><strong>Domain Expertise:</strong> Medical, legal, or industry knowledge</li>
        <li><strong>Quality Control:</strong> Ensuring accuracy and consistency</li>
      </ul>
      
      <h2>🚀 Why Now is the Perfect Time</h2>
      <p>AI companies need <strong>millions of hours</strong> of labeled data. The demand far exceeds supply, creating incredible opportunities for trained professionals.</p>
      
      <h3>Future-Proof Career</h3>
      <ul>
        <li>AI will always need human-labeled training data</li>
        <li>Regulatory requirements increasing demand</li>
        <li>Specialized knowledge creates high barriers to entry</li>
        <li>Perfect for remote work and flexible schedules</li>
      </ul>
      
      <div class="cta-section">
        <h3>🎯 Launch Your Data Labeling Career</h3>
        <p><strong>Don't miss this opportunity.</strong> While others chase crowded fields, smart professionals are building careers in data labeling.</p>
        <p>Join Ottobon's Data Labeling Specialist program and position yourself in this high-growth, high-pay field.</p>
        <p><em>Limited enrollment - Secure your spot today!</em></p>
      </div>
    `
  },
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
  'ai-transforming-marketing-strategies': ['student-success-zero-to-ai-expert', 'essential-skills-ai-professional-2025'],
  'student-success-zero-to-ai-expert': ['ai-transforming-marketing-strategies', 'future-ai-data-labeling'],
  'future-ai-data-labeling': ['student-success-zero-to-ai-expert', 'getting-started-ai-agent-development'],
  'ai-web-development-future-freshers': ['getting-started-ai-agent-development', 'essential-skills-ai-professional-2025'],
  'getting-started-ai-agent-development': ['ai-web-development-future-freshers', 'future-ai-data-labeling'],
  'essential-skills-ai-professional-2025': ['ai-web-development-future-freshers', 'ai-transforming-marketing-strategies']
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
                to="/academy#blog" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                Back to Knowledge Hub
              </Link>
            </div>
          </div>
        </main>
        
      </div>
    );
  }

  const related = relatedArticles[slug!]?.map(relatedSlug => blogPosts[relatedSlug]).filter(Boolean) || [];

  return (
    <div className="font-sans text-white bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center mb-4 bg-indigo-500/20 px-4 py-2 rounded-full">
              <span className="text-indigo-300 font-medium text-sm uppercase tracking-wider">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="pb-16 pt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Content */}
            <article className="prose prose-lg prose-invert max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="blog-content enhanced-content"
              />
            </article>

            

            {/* Back to Blog */}
            <div className="text-center mb-12">
              <Link 
                to="/academy#blog" 
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
            to="/academy#courses" 
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors text-lg"
          >
            Explore Our Courses
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      </div>
  );
}
