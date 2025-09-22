
import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <p>The landscape of web development is rapidly evolving, and artificial intelligence (AI) is at the forefront of this transformation. For freshers entering the tech industry, understanding and embracing AI in web development isn't just an advantage—it's becoming essential for future career success.</p>
      
      <h2>AI Tools Overview</h2>
      <p>Modern web development is being revolutionized by AI-powered tools that enhance productivity and code quality:</p>
      
      <h3>Code Generation and Assistance</h3>
      <ul>
        <li><strong>GitHub Copilot:</strong> AI pair programmer that suggests code in real-time</li>
        <li><strong>ChatGPT & Claude:</strong> For debugging, code explanation, and problem-solving</li>
        <li><strong>Tabnine:</strong> Intelligent code completion across multiple languages</li>
      </ul>
      
      <h3>Design and UI/UX</h3>
      <ul>
        <li><strong>Figma AI:</strong> Automated design suggestions and component generation</li>
        <li><strong>Midjourney/DALL-E:</strong> AI-generated images and graphics for web projects</li>
        <li><strong>Uizard:</strong> Transform sketches into working prototypes</li>
      </ul>
      
      <h3>Testing and Optimization</h3>
      <ul>
        <li><strong>Testim:</strong> AI-powered automated testing</li>
        <li><strong>Lighthouse AI:</strong> Performance optimization suggestions</li>
        <li><strong>Sentry:</strong> AI-driven error detection and resolution</li>
      </ul>
      
      <h2>Career Benefits</h2>
      <p>Embracing AI in web development offers numerous career advantages:</p>
      
      <h3>Increased Productivity</h3>
      <p>AI tools can boost your coding speed by 30-50%, allowing you to focus on complex problem-solving and creative aspects of development.</p>
      
      <h3>Enhanced Code Quality</h3>
      <p>AI assistants help identify bugs, suggest optimizations, and ensure best practices, leading to more robust applications.</p>
      
      <h3>Competitive Edge</h3>
      <p>Developers who leverage AI tools are increasingly preferred by employers who value efficiency and innovation.</p>
      
      <h3>Learning Acceleration</h3>
      <p>AI can explain complex concepts, provide instant feedback, and offer personalized learning paths.</p>
      
      <h2>Getting Started</h2>
      <p>Here's your roadmap to integrating AI into your web development journey:</p>
      
      <h3>1. Master the Fundamentals</h3>
      <p>Before diving into AI tools, ensure you have a solid foundation in:</p>
      <ul>
        <li>HTML, CSS, and JavaScript</li>
        <li>React, Vue, or Angular frameworks</li>
        <li>Backend technologies (Node.js, Python, etc.)</li>
        <li>Database management</li>
      </ul>
      
      <h3>2. Start with AI Coding Assistants</h3>
      <p>Begin by integrating tools like GitHub Copilot or ChatGPT into your development workflow.</p>
      
      <h3>3. Explore AI-Powered Design Tools</h3>
      <p>Experiment with AI design tools to enhance your UI/UX capabilities.</p>
      
      <h3>4. Learn AI Integration</h3>
      <p>Understand how to integrate AI APIs and services into your web applications.</p>
      
      <h3>5. Build AI-Enhanced Projects</h3>
      <p>Create portfolio projects that showcase your ability to work with AI technologies.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is intertwined with AI, and freshers who embrace this technology today will be the leaders of tomorrow. By understanding AI tools, leveraging their capabilities, and continuously learning, you'll position yourself at the forefront of the industry.</p>
      
      <p>Remember, AI is not here to replace developers—it's here to enhance their capabilities and free them to focus on innovation and creativity. Start your AI-powered web development journey today and unlock unlimited potential in your career.</p>
      
      <div class="cta-section">
        <h3>Ready to Start Your AI Web Development Journey?</h3>
        <p>Join Ottobon's comprehensive AI Web Development course and learn from industry experts how to integrate cutting-edge AI tools into your development workflow.</p>
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
      <p>AI agents are autonomous software entities that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional software that follows predetermined instructions, AI agents can adapt, learn, and respond to changing conditions.</p>
      
      <h3>Types of AI Agents</h3>
      <ul>
        <li><strong>Simple Reflex Agents:</strong> React to current percepts based on condition-action rules</li>
        <li><strong>Model-Based Agents:</strong> Maintain internal state to track aspects of the world</li>
        <li><strong>Goal-Based Agents:</strong> Act to achieve specific objectives</li>
        <li><strong>Utility-Based Agents:</strong> Optimize for maximum expected utility</li>
        <li><strong>Learning Agents:</strong> Improve performance through experience</li>
      </ul>
      
      <h2>Development Process</h2>
      <p>Creating effective AI agents involves several key phases:</p>
      
      <h3>1. Problem Definition</h3>
      <p>Clearly define what your agent needs to accomplish:</p>
      <ul>
        <li>Identify the environment and constraints</li>
        <li>Define success metrics</li>
        <li>Determine required capabilities</li>
        <li>Set performance benchmarks</li>
      </ul>
      
      <h3>2. Environment Analysis</h3>
      <p>Understand the operating environment:</p>
      <ul>
        <li><strong>Observable vs. Partially Observable:</strong> Can the agent see everything?</li>
        <li><strong>Deterministic vs. Stochastic:</strong> Are outcomes predictable?</li>
        <li><strong>Static vs. Dynamic:</strong> Does the environment change?</li>
        <li><strong>Discrete vs. Continuous:</strong> What's the nature of actions and percepts?</li>
      </ul>
      
      <h3>3. Agent Architecture Design</h3>
      <p>Choose the appropriate architecture based on your requirements:</p>
      <ul>
        <li><strong>Reactive Architecture:</strong> Direct stimulus-response mapping</li>
        <li><strong>Deliberative Architecture:</strong> Planning and reasoning capabilities</li>
        <li><strong>Hybrid Architecture:</strong> Combination of reactive and deliberative components</li>
      </ul>
      
      <h3>4. Implementation and Testing</h3>
      <p>Build, test, and iterate on your agent:</p>
      <ul>
        <li>Implement core functionality</li>
        <li>Test in controlled environments</li>
        <li>Evaluate performance metrics</li>
        <li>Refine and optimize</li>
      </ul>
      
      <h2>Tools & Technologies</h2>
      <p>Modern AI agent development leverages various tools and frameworks:</p>
      
      <h3>Programming Languages</h3>
      <ul>
        <li><strong>Python:</strong> Most popular for AI development with rich libraries</li>
        <li><strong>JavaScript/TypeScript:</strong> Great for web-based agents and real-time applications</li>
        <li><strong>Java:</strong> Enterprise-grade agent systems</li>
        <li><strong>C++:</strong> High-performance requirements</li>
      </ul>
      
      <h3>Frameworks and Libraries</h3>
      <ul>
        <li><strong>LangChain:</strong> Framework for developing LLM-powered applications</li>
        <li><strong>AutoGPT:</strong> Autonomous GPT-4 agent framework</li>
        <li><strong>OpenAI Gym:</strong> Environment for developing and testing agents</li>
        <li><strong>TensorFlow/PyTorch:</strong> Deep learning frameworks</li>
        <li><strong>JADE (Java Agent DEvelopment Framework):</strong> Multi-agent systems</li>
      </ul>
      
      <h3>Development Tools</h3>
      <ul>
        <li><strong>Jupyter Notebooks:</strong> Interactive development and experimentation</li>
        <li><strong>Docker:</strong> Containerization for consistent environments</li>
        <li><strong>MLflow:</strong> Machine learning lifecycle management</li>
        <li><strong>Weights & Biases:</strong> Experiment tracking and visualization</li>
      </ul>
      
      <h2>Course Preview: Ottobon's AI Agent Development Program</h2>
      <p>At Ottobon, we're preparing to launch a comprehensive AI Agent Development course that will take you from beginner to expert. Here's what you can expect:</p>
      
      <h3>Module 1: Foundations</h3>
      <ul>
        <li>AI agent theory and concepts</li>
        <li>Environment types and characteristics</li>
        <li>Agent architectures and design patterns</li>
      </ul>
      
      <h3>Module 2: Practical Development</h3>
      <ul>
        <li>Setting up development environments</li>
        <li>Building simple reflex agents</li>
        <li>Implementing goal-based agents</li>
      </ul>
      
      <h3>Module 3: Advanced Techniques</h3>
      <ul>
        <li>Machine learning integration</li>
        <li>Multi-agent systems</li>
        <li>Natural language processing for agents</li>
      </ul>
      
      <h3>Module 4: Real-World Applications</h3>
      <ul>
        <li>Chatbots and virtual assistants</li>
        <li>Automated trading systems</li>
        <li>Game AI and autonomous vehicles</li>
      </ul>
      
      <h3>Module 5: Deployment and Scaling</h3>
      <ul>
        <li>Cloud deployment strategies</li>
        <li>Performance optimization</li>
        <li>Monitoring and maintenance</li>
      </ul>
      
      <h2>Getting Started Today</h2>
      <p>While you wait for our comprehensive course, here's how you can start your AI agent development journey:</p>
      
      <h3>1. Learn the Basics</h3>
      <ul>
        <li>Study AI fundamentals and agent theory</li>
        <li>Practice Python programming</li>
        <li>Familiarize yourself with machine learning concepts</li>
      </ul>
      
      <h3>2. Experiment with Simple Projects</h3>
      <ul>
        <li>Build a basic chatbot</li>
        <li>Create a simple game AI</li>
        <li>Develop a recommendation agent</li>
      </ul>
      
      <h3>3. Join the Community</h3>
      <ul>
        <li>Participate in AI forums and discussions</li>
        <li>Contribute to open-source agent projects</li>
        <li>Attend AI conferences and workshops</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>AI agent development represents one of the most exciting frontiers in technology today. As businesses increasingly adopt AI solutions, the demand for skilled agent developers will continue to grow exponentially.</p>
      
      <p>Whether you're a complete beginner or an experienced developer looking to specialize, understanding AI agents will open doors to incredible career opportunities. The field combines creativity, technical skill, and problem-solving in ways that are both challenging and rewarding.</p>
      
      <div class="cta-section">
        <h3>Ready to Master AI Agent Development?</h3>
        <p>Stay tuned for Ottobon's upcoming AI Agent Development course. Be among the first to know when enrollment opens and get exclusive early-bird access!</p>
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
      <p>The AI industry is evolving at breakneck speed, and the skills that were valuable just two years ago may not be sufficient for success in 2025. As AI becomes more integrated into every aspect of business and technology, professionals need to develop a unique blend of technical expertise and soft skills to thrive in this dynamic field.</p>
      
      <p>Based on industry trends, job market analysis, and insights from leading AI companies, we've identified five essential skills that every AI professional must master to remain competitive and drive innovation in 2025.</p>
      
      <h2>1. Advanced Machine Learning and Deep Learning</h2>
      <p>While basic ML knowledge was sufficient in the past, 2025 demands deep expertise in advanced machine learning techniques and architectures.</p>
      
      <h3>Key Technical Skills:</h3>
      <ul>
        <li><strong>Transformer Architectures:</strong> Master attention mechanisms, BERT, GPT, and their variants</li>
        <li><strong>Multimodal AI:</strong> Work with models that process text, images, audio, and video simultaneously</li>
        <li><strong>Few-Shot and Zero-Shot Learning:</strong> Develop models that learn from minimal data</li>
        <li><strong>Reinforcement Learning:</strong> Implement RL algorithms for complex decision-making tasks</li>
        <li><strong>Federated Learning:</strong> Build privacy-preserving distributed ML systems</li>
      </ul>
      
      <h3>Practical Applications:</h3>
      <ul>
        <li>Fine-tuning large language models for specific domains</li>
        <li>Creating custom neural network architectures</li>
        <li>Optimizing model performance and efficiency</li>
        <li>Implementing transfer learning strategies</li>
      </ul>
      
      <h3>Learning Path:</h3>
      <ol>
        <li>Master PyTorch and TensorFlow frameworks</li>
        <li>Study state-of-the-art research papers</li>
        <li>Implement models from scratch</li>
        <li>Participate in Kaggle competitions</li>
        <li>Contribute to open-source ML projects</li>
      </ol>
      
      <h2>2. Programming Languages and Frameworks</h2>
      <p>The AI landscape requires proficiency in multiple programming languages and staying current with the latest frameworks and tools.</p>
      
      <h3>Essential Programming Languages:</h3>
      <ul>
        <li><strong>Python:</strong> Still the king of AI/ML with libraries like scikit-learn, pandas, NumPy</li>
        <li><strong>JavaScript/TypeScript:</strong> For AI web applications and real-time systems</li>
        <li><strong>Julia:</strong> Growing in popularity for high-performance scientific computing</li>
        <li><strong>Rust:</strong> For building efficient AI infrastructure and systems</li>
        <li><strong>SQL:</strong> Essential for data manipulation and database optimization</li>
      </ul>
      
      <h3>Key Frameworks and Libraries:</h3>
      <ul>
        <li><strong>Hugging Face Transformers:</strong> Pre-trained models and tokenizers</li>
        <li><strong>LangChain:</strong> Building applications with large language models</li>
        <li><strong>Ray:</strong> Distributed computing for AI workloads</li>
        <li><strong>MLflow:</strong> ML lifecycle management</li>
        <li><strong>FastAPI:</strong> Building high-performance APIs for AI services</li>
      </ul>
      
      <h3>Cloud and Infrastructure:</h3>
      <ul>
        <li>AWS SageMaker, Google AI Platform, Azure Machine Learning</li>
        <li>Kubernetes for container orchestration</li>
        <li>Docker for containerization</li>
        <li>Apache Spark for big data processing</li>
      </ul>
      
      <h2>3. Soft Skills and Communication</h2>
      <p>Technical skills alone aren't enough. AI professionals must effectively communicate complex concepts and collaborate with diverse teams.</p>
      
      <h3>Critical Thinking and Problem-Solving:</h3>
      <ul>
        <li>Break down complex problems into manageable components</li>
        <li>Evaluate multiple solution approaches</li>
        <li>Think critically about model limitations and biases</li>
        <li>Develop creative solutions to novel challenges</li>
      </ul>
      
      <h3>Communication Skills:</h3>
      <ul>
        <li><strong>Technical Writing:</strong> Document models, experiments, and findings clearly</li>
        <li><strong>Data Storytelling:</strong> Present insights through compelling narratives</li>
        <li><strong>Stakeholder Management:</strong> Translate technical concepts for non-technical audiences</li>
        <li><strong>Presentation Skills:</strong> Deliver effective presentations to diverse audiences</li>
      </ul>
      
      <h3>Collaboration and Leadership:</h3>
      <ul>
        <li>Work effectively in cross-functional teams</li>
        <li>Mentor junior developers and data scientists</li>
        <li>Lead AI projects from conception to deployment</li>
        <li>Foster innovation and experimentation</li>
      </ul>
      
      <h3>Developing Soft Skills:</h3>
      <ol>
        <li>Practice explaining AI concepts to non-technical friends</li>
        <li>Write blog posts about your projects</li>
        <li>Participate in AI meetups and conferences</li>
        <li>Take on leadership roles in projects</li>
        <li>Seek feedback and continuously improve</li>
      </ol>
      
      <h2>4. AI Ethics and Responsible AI Development</h2>
      <p>As AI systems become more powerful and pervasive, understanding ethics and responsible development practices is crucial for every AI professional.</p>
      
      <h3>Core Ethics Concepts:</h3>
      <ul>
        <li><strong>Bias and Fairness:</strong> Identify and mitigate algorithmic bias</li>
        <li><strong>Transparency and Explainability:</strong> Build interpretable AI systems</li>
        <li><strong>Privacy and Security:</strong> Protect user data and prevent misuse</li>
        <li><strong>Accountability:</strong> Take responsibility for AI system outcomes</li>
      </ul>
      
      <h3>Practical Implementation:</h3>
      <ul>
        <li>Conduct bias audits on training data and models</li>
        <li>Implement explainable AI techniques</li>
        <li>Design privacy-preserving algorithms</li>
        <li>Establish AI governance frameworks</li>
        <li>Create ethical guidelines for AI development</li>
      </ul>
      
      <h3>Regulatory Compliance:</h3>
      <ul>
        <li>Understand GDPR, CCPA, and emerging AI regulations</li>
        <li>Stay updated on industry standards and best practices</li>
        <li>Implement compliance monitoring systems</li>
        <li>Document decision-making processes</li>
      </ul>
      
      <h2>5. Business Acumen and Domain Expertise</h2>
      <p>Successful AI professionals understand how to align technical solutions with business objectives and develop domain-specific expertise.</p>
      
      <h3>Business Understanding:</h3>
      <ul>
        <li><strong>ROI Analysis:</strong> Calculate and communicate the business value of AI projects</li>
        <li><strong>Strategic Thinking:</strong> Align AI initiatives with company goals</li>
        <li><strong>Market Awareness:</strong> Understand industry trends and competitive landscape</li>
        <li><strong>Product Management:</strong> Bridge the gap between technical and business teams</li>
      </ul>
      
      <h3>Domain Expertise:</h3>
      <ul>
        <li><strong>Healthcare:</strong> Medical imaging, drug discovery, patient care</li>
        <li><strong>Finance:</strong> Fraud detection, algorithmic trading, risk assessment</li>
        <li><strong>Retail:</strong> Recommendation systems, inventory optimization, customer analytics</li>
        <li><strong>Manufacturing:</strong> Predictive maintenance, quality control, supply chain optimization</li>
      </ul>
      
      <h3>Developing Business Skills:</h3>
      <ol>
        <li>Take business and finance courses</li>
        <li>Work closely with business stakeholders</li>
        <li>Study successful AI implementations in your industry</li>
        <li>Understand customer needs and pain points</li>
        <li>Learn to speak the language of business</li>
      </ol>
      
      <h2>Learning Path for 2025</h2>
      <p>Here's a structured approach to developing these essential skills:</p>
      
      <h3>Months 1-3: Foundation Building</h3>
      <ul>
        <li>Strengthen core ML/DL knowledge</li>
        <li>Master primary programming language (Python)</li>
        <li>Learn AI ethics fundamentals</li>
        <li>Develop basic business understanding</li>
      </ul>
      
      <h3>Months 4-6: Skill Expansion</h3>
      <ul>
        <li>Learn additional programming languages</li>
        <li>Practice communication and presentation skills</li>
        <li>Implement responsible AI practices</li>
        <li>Choose a domain specialization</li>
      </ul>
      
      <h3>Months 7-12: Advanced Application</h3>
      <ul>
        <li>Lead AI projects from start to finish</li>
        <li>Mentor others and build leadership skills</li>
        <li>Stay current with latest research and trends</li>
        <li>Build a portfolio of diverse AI applications</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The AI landscape of 2025 will reward professionals who combine deep technical expertise with strong soft skills, ethical understanding, and business acumen. While the technical requirements continue to evolve, the ability to communicate, lead, and think strategically will remain timeless assets.</p>
      
      <p>Success in AI isn't just about building the most sophisticated models—it's about creating solutions that genuinely improve people's lives while considering the broader implications of your work. By developing these five essential skills, you'll be well-positioned to thrive in the AI industry and make meaningful contributions to this transformative field.</p>
      
      <p>Remember, learning is a continuous journey in AI. Stay curious, keep experimenting, and never stop growing. The future of AI is bright, and with these skills, you'll be ready to shape it.</p>
      
      <div class="cta-section">
        <h3>Accelerate Your AI Career Journey</h3>
        <p>Join Ottobon's comprehensive AI professional development programs designed to build these essential skills through hands-on projects, expert mentorship, and real-world applications.</p>
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

            {/* Social Sharing */}
            <div className="border-t border-gray-800 pt-8 mb-12">
              <h3 className="text-xl font-bold mb-4">Share this article</h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                  Facebook
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </button>
              </div>
            </div>

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
