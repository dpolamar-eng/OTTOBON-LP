
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAnimation } from '@/hooks/use-animation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Course Updates' | 'Career Tips' | 'AI Trends' | 'Student Success';
  date: string;
  image: string;
  author: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why AI in Web Development is the Future for Freshers',
    excerpt: 'Discover how AI is revolutionizing web development and why freshers who embrace these technologies will have a competitive edge in the job market.',
    content: `
      <p>The world of web development is experiencing a seismic shift. Artificial Intelligence is no longer a futuristic concept—it's reshaping how we build, design, and optimize websites today.</p>
      
      <h2>The AI Revolution in Web Development</h2>
      <p>From automated code generation to intelligent user experience optimization, AI tools are becoming indispensable for modern developers. Freshers entering the field now have an unprecedented opportunity to leverage these technologies from day one.</p>
      
      <h2>Key Areas Where AI is Making an Impact</h2>
      <ul>
        <li><strong>Code Generation:</strong> Tools like GitHub Copilot and ChatGPT are helping developers write code faster and more efficiently.</li>
        <li><strong>UI/UX Design:</strong> AI-powered design tools can create layouts, suggest color schemes, and optimize user interfaces.</li>
        <li><strong>Testing and Debugging:</strong> Automated testing frameworks powered by AI can identify bugs and performance issues.</li>
        <li><strong>Content Creation:</strong> AI can generate dynamic content, optimize SEO, and personalize user experiences.</li>
      </ul>
      
      <h2>Why Freshers Have the Advantage</h2>
      <p>Unlike experienced developers who might need to unlearn old habits, freshers can embrace AI-first development approaches from the beginning. This gives them a unique advantage in the rapidly evolving tech landscape.</p>
      
      <p>At OttoBon Academy, we're preparing the next generation of developers to not just use AI tools, but to think with an AI-first mindset. Our comprehensive courses ensure you're ready for the future of web development.</p>
    `,
    category: 'Career Tips',
    date: '2025-01-15',
    image: '/images/ai-automation.jpg',
    author: 'OttoBon Team',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Getting Started with AI Agent Development: What to Expect',
    excerpt: 'Explore the exciting world of AI agent development and learn what skills and knowledge you need to build intelligent autonomous systems.',
    content: `
      <p>AI agent development represents one of the most exciting frontiers in technology today. These intelligent systems can understand, reason, and act autonomously to solve complex problems.</p>
      
      <h2>What Are AI Agents?</h2>
      <p>AI agents are software entities that can perceive their environment, make decisions, and take actions to achieve specific goals. They range from simple chatbots to complex systems that can navigate real-world scenarios.</p>
      
      <h2>Key Technologies You'll Learn</h2>
      <ul>
        <li><strong>Natural Language Processing:</strong> Enabling agents to understand and generate human language</li>
        <li><strong>Machine Learning:</strong> Allowing agents to learn from data and improve over time</li>
        <li><strong>Decision Making Frameworks:</strong> Logic systems that help agents choose optimal actions</li>
        <li><strong>Integration APIs:</strong> Connecting agents to external systems and data sources</li>
      </ul>
      
      <h2>Real-World Applications</h2>
      <p>AI agents are transforming industries from customer service to healthcare, finance to entertainment. By mastering agent development, you're positioning yourself at the forefront of this technological revolution.</p>
      
      <p>Our upcoming AI Agent Development course will provide hands-on experience building real agents that can solve practical problems. Stay tuned for the launch!</p>
    `,
    category: 'Course Updates',
    date: '2025-01-12',
    image: '/images/consulting-team.jpg',
    author: 'OttoBon Team',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: '5 Essential Skills Every AI Professional Needs in 2025',
    excerpt: 'Master these five critical skills to thrive in the AI industry and position yourself for success in the rapidly evolving tech landscape.',
    content: `
      <p>The AI industry is booming, but success requires more than just technical knowledge. Here are the five essential skills that will set you apart as an AI professional in 2025.</p>
      
      <h2>1. Prompt Engineering</h2>
      <p>The ability to craft effective prompts for AI models is becoming increasingly valuable. This skill bridges the gap between human intent and AI capability.</p>
      
      <h2>2. Data Literacy</h2>
      <p>Understanding how to collect, clean, and interpret data is fundamental to any AI project. Data is the fuel that powers intelligent systems.</p>
      
      <h2>3. Ethical AI Understanding</h2>
      <p>As AI becomes more prevalent, understanding bias, fairness, and ethical implications is crucial for responsible development.</p>
      
      <h2>4. Cross-functional Collaboration</h2>
      <p>AI projects require diverse teams. The ability to communicate technical concepts to non-technical stakeholders is invaluable.</p>
      
      <h2>5. Continuous Learning Mindset</h2>
      <p>The AI field evolves rapidly. Successful professionals maintain curiosity and adaptability to stay current with new developments.</p>
      
      <p>Our courses at OttoBon Academy are designed to develop all these skills, ensuring you're well-rounded and ready for the AI-driven future.</p>
    `,
    category: 'Career Tips',
    date: '2025-01-10',
    image: '/images/career-growth.jpg',
    author: 'OttoBon Team',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'How AI is Transforming Modern Marketing Strategies',
    excerpt: 'Discover how artificial intelligence is revolutionizing marketing, from personalized campaigns to predictive analytics and automated content creation.',
    content: `
      <p>Marketing in 2025 is fundamentally different from just a few years ago. AI has transformed how brands connect with customers, optimize campaigns, and drive results.</p>
      
      <h2>Personalization at Scale</h2>
      <p>AI enables marketers to create highly personalized experiences for millions of customers simultaneously. Machine learning algorithms analyze user behavior to deliver the right message at the right time.</p>
      
      <h2>Predictive Analytics</h2>
      <p>Modern marketing teams use AI to predict customer behavior, forecast trends, and optimize budget allocation. This data-driven approach significantly improves campaign effectiveness.</p>
      
      <h2>Content Creation and Optimization</h2>
      <p>From generating social media posts to optimizing email subject lines, AI tools are helping marketers create more engaging content faster than ever before.</p>
      
      <h2>The Future of Marketing Careers</h2>
      <p>Marketers who understand AI tools and strategies will dominate the field. Those who don't risk being left behind in an increasingly competitive landscape.</p>
      
      <p>Our AI in Marketing course prepares you to leverage these powerful technologies, giving you the skills to excel in modern marketing roles.</p>
    `,
    category: 'AI Trends',
    date: '2025-01-08',
    image: '/images/digital-marketing.jpg',
    author: 'OttoBon Team',
    readTime: '7 min read'
  }
];

export default function BlogSection() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const sectionRef = useAnimation('animate-fade-in');
  const titleRef = useAnimation('animate-slide-up');

  const categories = ['All', 'Course Updates', 'Career Tips', 'AI Trends', 'Student Success'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (postId: string) => {
    setLocation(`/blog/${postId}`);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Course Updates': 'bg-blue-100 text-blue-800 border-blue-200',
      'Career Tips': 'bg-green-100 text-green-800 border-green-200',
      'AI Trends': 'bg-purple-100 text-purple-800 border-purple-200',
      'Student Success': 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen" ref={sectionRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12" ref={titleRef}>
          <div className="inline-flex items-center mb-4 bg-blue-500/20 px-4 py-2 rounded-full">
            <svg className="text-blue-600 mr-2 w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <span className="text-blue-700 font-medium text-sm uppercase tracking-wider">Knowledge Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            AI Education <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with the latest insights, trends, and tips in AI education, career development, and technology innovation.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 cursor-pointer group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  onClick={() => handlePostClick(post.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform duration-200">
                        Read More
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h3>
            <p className="text-blue-100 mb-6">Join thousands of students who are already building the future with AI.</p>
            <button
              onClick={() => setLocation('/enroll')}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
            >
              Explore Our Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { blogPosts };
