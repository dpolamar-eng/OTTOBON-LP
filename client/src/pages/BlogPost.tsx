
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

// Import blog posts from BlogSection to maintain consistency
const blogPostsFromSection = [
  {
    id: '1',
    title: 'Why AI in Web Development is the Future for Freshers',
    excerpt: 'Discover how AI is revolutionizing web development and why freshers should embrace this technology to accelerate their careers in the modern tech landscape.',
    category: 'Career Tips',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'ai-web-development-future-freshers'
  },
  {
    id: '2',
    title: 'Getting Started with AI Agent Development: What to Expect',
    excerpt: 'A comprehensive guide to understanding AI agent development, from basic concepts to advanced implementations that will shape the future of automation.',
    category: 'Course Updates',
    date: '2024-01-12',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'getting-started-ai-agent-development'
  },
  {
    id: '3',
    title: '5 Essential Skills Every AI Professional Needs in 2025',
    excerpt: 'Stay ahead in the AI industry by mastering these crucial skills that top employers are looking for in 2025 and beyond.',
    category: 'Career Tips',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'essential-skills-ai-professional-2025'
  },
  {
    id: '4',
    title: 'How AI is Transforming Modern Marketing Strategies',
    excerpt: 'Explore the latest AI-driven marketing trends and techniques that are reshaping how businesses connect with their customers in the digital age.',
    category: 'AI Trends',
    date: '2024-01-08',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'ai-transforming-marketing-strategies'
  },
  {
    id: '5',
    title: 'Student Success: From Zero to AI Expert in 12 Weeks',
    excerpt: 'Read inspiring stories of our students who transformed their careers through our intensive AI programs and landed their dream jobs.',
    category: 'Student Success',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'student-success-zero-to-ai-expert'
  },
  {
    id: '6',
    title: 'The Future of AI Data Labeling: Trends and Opportunities',
    excerpt: 'Understand the growing importance of data labeling in AI development and discover the career opportunities in this expanding field.',
    category: 'AI Trends',
    date: '2024-01-03',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    slug: 'future-ai-data-labeling'
  }
];

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
      <h2 id="revolution">The AI Marketing Revolution is Here</h2>
      <p>AI is <strong>transforming marketing strategies</strong> across industries. Companies are leveraging AI technologies to enhance customer experiences and optimize their marketing operations.</p>

      <div class="info-box">
        <p><strong>Key Insight:</strong> AI marketing tools are becoming essential for modern businesses to stay competitive in today's digital landscape.</p>
      </div>

      <h2 id="technologies">Top 3 AI Marketing Technologies</h2>

      <h3 id="personalization">1. AI-Powered Personalization 🎯</h3>
      <p>Create <em>hyper-personalized customer experiences</em> using advanced algorithms:</p>
      <ul>
        <li><strong>Dynamic Content:</strong> Real-time personalization systems</li>
        <li><strong>Smart Recommendations:</strong> Netflix-style recommendation engines</li>
        <li><strong>Predictive Analytics:</strong> Customer behavior prediction models</li>
      </ul>

      <h3 id="content-creation">2. Automated Content Creation ✍️</h3>
      <p>Explore AI tools that generate marketing content efficiently:</p>
      <ul>
        <li><strong>AI Writing:</strong> GPT-powered content generation</li>
        <li><strong>Visual AI:</strong> Automated image and video creation</li>
        <li><strong>Voice AI:</strong> Synthetic voice generation for audio content</li>
      </ul>

      <h3 id="optimization">3. Smart Campaign Optimization 📊</h3>
      <p>Implement AI systems to enhance marketing campaigns:</p>
      <ul>
        <li><strong>Programmatic Advertising:</strong> Real-time bidding optimization</li>
        <li><strong>Email Intelligence:</strong> Optimal timing and content selection</li>
        <li><strong>Performance Analytics:</strong> AI-driven marketing insights</li>
      </ul>

      <div class="highlight-section">
        <h3>🔍 Understanding AI Marketing</h3>
        <p>AI marketing involves using artificial intelligence technologies to make automated decisions based on data collection, audience analysis, and economic trends.</p>
      </div>
    `
  },
  'student-success-zero-to-ai-expert': {
    id: '5',
    title: 'Student Success: From Zero to AI Expert in 12 Weeks',
    excerpt: 'Read inspiring stories of our students who mastered AI fundamentals through our intensive learning programs and applied their knowledge effectively.',
    category: 'Student Success',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'student-success-zero-to-ai-expert',
    author: 'Ottobon Team',
    readTime: '4 min read',
    content: `
      <h2 id="real-students">Real Students, Real Learning</h2>
      <p>Our students come from diverse backgrounds and successfully master AI concepts through structured learning. These are real people who dedicated themselves to understanding AI technologies in 12 weeks.</p>

      <div class="info-box">
        <p><strong>Learning Focus:</strong> Our students develop strong foundational knowledge in AI through hands-on projects and comprehensive coursework.</p>
      </div>

      <h2 id="sarah-chen">Sarah Chen: Marketing Background → AI Product Development 💼</h2>
      <p><strong>Background:</strong> Marketing professional with no AI experience<br>
      <strong>Journey:</strong> Completed AI fundamentals and machine learning modules<br>
      <strong>Achievement:</strong> Built AI-powered product recommendation system</p>

      <blockquote style="border-left: 4px solid #8B5CF6; padding-left: 1rem; font-style: italic; color: #C4B5FD;">
        "The structured approach helped me understand AI concepts that seemed impossible at first. The hands-on projects made everything click." - Sarah Chen
      </blockquote>

      <h2 id="marcus-rodriguez">Marcus Rodriguez: Construction Background → AI Engineering 🔧</h2>
      <p><strong>Background:</strong> 8 years in construction, new to technology<br>
      <strong>Journey:</strong> Started with Python basics, progressed to neural networks<br>
      <strong>Achievement:</strong> Developed computer vision model for defect detection</p>

      <blockquote style="border-left: 4px solid #8B5CF6; padding-left: 1rem; font-style: italic; color: #C4B5FD;">
        "I discovered that AI concepts are logical and learnable, just like any other skill. The step-by-step progression was key." - Marcus Rodriguez
      </blockquote>

      <h2 id="priya-patel">Priya Patel: Teaching Background → AI Implementation 📚</h2>
      <p><strong>Background:</strong> High school math teacher for 12 years<br>
      <strong>Journey:</strong> Applied mathematical background to machine learning<br>
      <strong>Achievement:</strong> Created AI tutoring system for personalized learning</p>

      <div class="highlight-section">
        <h3>🎯 What Makes Our Approach Effective?</h3>
        <p><strong>1:1 Mentorship:</strong> Personal guidance from experienced instructors<br>
        <strong>Real Projects:</strong> 8+ portfolio pieces demonstrating practical skills<br>
        <strong>Structured Learning:</strong> Progressive curriculum building expertise step-by-step</p>
      </div>

      <h2 id="outcomes">Learning Outcomes 📈</h2>
      <ul>
        <li><strong>Comprehensive Understanding:</strong> Core AI and ML concepts</li>
        <li><strong>Practical Skills:</strong> Real-world project experience</li>
        <li><strong>Technical Foundation:</strong> Python, TensorFlow, PyTorch proficiency</li>
        <li><strong>Open Access:</strong> No specific degree requirements</li>
      </ul>

      <h2 id="path">Your 12-Week Learning Path 🚀</h2>
      <ul>
        <li><strong>Weeks 1-4:</strong> AI foundations and Python programming</li>
        <li><strong>Weeks 5-8:</strong> Machine learning and hands-on projects</li>
        <li><strong>Weeks 9-12:</strong> Advanced AI techniques and capstone project</li>
        <li><strong>Beyond:</strong> Continued learning support and community access</li>
      </ul>
    `
  },
  'future-ai-data-labeling': {
    id: '6',
    title: 'The Future of AI Data Labeling: Trends and Opportunities',
    excerpt: 'Understand the growing importance of data labeling in AI development and explore the technical aspects of this expanding field.',
    category: 'AI Trends',
    date: '2024-01-03',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'future-ai-data-labeling',
    author: 'Ottobon Team',
    readTime: '5 min read',
    content: `
      <h2 id="foundation">The Critical Foundation Behind Every AI System</h2>
      <p>While everyone talks about AI, <strong>data labeling specialists</strong> are quietly building the foundation that makes AI possible through precise annotation and quality control processes.</p>

      <div class="info-box">
        <p><strong>Technical Reality:</strong> Data labeling market is expanding rapidly as AI applications become more sophisticated and require higher-quality training data.</p>
      </div>

      <h2 id="what-is-labeling">What is AI Data Labeling? 🏷️</h2>
      <p>Data labeling is <em>the process of annotating raw data</em> to create training datasets for machine learning models. Every autonomous vehicle, medical AI system, and recommendation engine requires labeled data to function.</p>

      <h3 id="specializations">Technical Specializations</h3>
      <ul>
        <li><strong>Medical AI:</strong> Annotate X-rays, MRIs, and medical images for diagnostic systems</li>
        <li><strong>Autonomous Vehicles:</strong> Label driving scenarios, road signs, and obstacles</li>
        <li><strong>Computer Vision:</strong> Identify and annotate objects, faces, and scene elements</li>
        <li><strong>NLP Training:</strong> Annotate text data for language understanding models</li>
      </ul>

      <div class="highlight-section">
        <h3>📈 Technical Skill Development</h3>
        <p><strong>Foundation:</strong> Understanding annotation standards and quality metrics<br>
        <strong>Intermediate:</strong> Domain-specific annotation techniques<br>
        <strong>Advanced:</strong> Quality assurance and annotation workflow optimization</p>
      </div>

      <h3 id="companies">Companies Using Data Labeling 🏢</h3>
      <ul>
        <li><strong>Scale AI:</strong> Leading AI infrastructure company</li>
        <li><strong>Google/Microsoft/Amazon:</strong> Large-scale machine learning initiatives</li>
        <li><strong>Tesla/Waymo:</strong> Autonomous vehicle development</li>
        <li><strong>Healthcare AI:</strong> Medical diagnostic system development</li>
      </ul>

      <h2 id="skills">Essential Technical Skills 🛠️</h2>
      <ul>
        <li><strong>Annotation Tools:</strong> Labelbox, Scale AI platforms, CVAT</li>
        <li><strong>Python Programming:</strong> Data manipulation and analysis</li>
        <li><strong>Domain Knowledge:</strong> Medical, legal, or industry-specific expertise</li>
        <li><strong>Quality Assurance:</strong> Accuracy validation and consistency checking</li>
      </ul>

      <h2 id="landscape">Understanding the Technical Landscape 🌐</h2>
      <p>AI systems require <strong>massive amounts</strong> of accurately labeled training data. This creates a continuous need for skilled annotation specialists who understand both the technical requirements and domain-specific nuances.</p>

      <h3 id="considerations">Technical Considerations</h3>
      <ul>
        <li>Machine learning models require human-annotated training data</li>
        <li>Regulatory compliance demands high-quality annotation standards</li>
        <li>Specialized knowledge creates technical barriers to entry</li>
        <li>Remote work compatibility with digital annotation tools</li>
      </ul>

      <div class="cta-section">
        <h3>🎯 Learn Data Labeling Fundamentals</h3>
        <p><strong>Explore this growing field.</strong> Understanding data labeling is essential for anyone working in AI and machine learning.</p>
        <p>Join Ottobon's Data Labeling course to learn the technical skills and best practices for AI training data preparation.</p>
        <p><em>Limited enrollment - Start your technical education today!</em></p>
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
      <h2 id="introduction">Introduction 🚀</h2>
      <p>AI is revolutionizing web development, making it essential for freshers to embrace these technologies for career success. The future belongs to developers who can harness the power of AI to build smarter, more efficient applications.</p>

      <div class="info-box">
        <p><strong>Future Outlook:</strong> By 2025, AI-assisted development will become the industry standard, with 80% of developers using AI tools regularly.</p>
      </div>

      <h2 id="ai-tools">Key AI Tools for Web Development 🛠️</h2>
      <ul>
        <li><strong>GitHub Copilot:</strong> AI pair programmer for real-time code suggestions and auto-completion</li>
        <li><strong>ChatGPT:</strong> Debugging assistant and problem-solving companion for complex issues</li>
        <li><strong>Figma AI:</strong> Automated design suggestions and intelligent layout recommendations</li>
        <li><strong>Testim:</strong> AI-powered automated testing for comprehensive quality assurance</li>
        <li><strong>Tabnine:</strong> Code completion tool that learns from your coding patterns</li>
        <li><strong>DeepCode:</strong> AI-powered code review for identifying bugs and security issues</li>
      </ul>

      <div class="highlight-section">
        <h3>💡 Programming Languages & Frameworks for AI-Enhanced Development</h3>
        <p><strong>Frontend:</strong> React, Vue.js, Angular, Svelte<br>
        <strong>Backend:</strong> Node.js, Python (Django/Flask), Go, Rust<br>
        <strong>AI Integration:</strong> TensorFlow.js, PyTorch, OpenAI API, Hugging Face</p>
      </div>

      <h2 id="benefits">Career Benefits 📈</h2>
      <ul>
        <li><strong>Productivity Boost:</strong> AI tools increase development speed by 30-50%</li>
        <li><strong>Code Quality:</strong> Automated testing and code review improve overall quality</li>
        <li><strong>Competitive Edge:</strong> Stand out in the job market with AI skills</li>
        <li><strong>Learning Acceleration:</strong> AI mentors help you learn faster and avoid common pitfalls</li>
        <li><strong>Problem Solving:</strong> AI assistance for debugging and optimization</li>
      </ul>

      <h2 id="getting-started">Getting Started: Your Roadmap 🗺️</h2>
      <ol>
        <li><strong>Master Fundamentals:</strong> HTML, CSS, JavaScript basics</li>
        <li><strong>Learn a Framework:</strong> React or Vue.js for modern development</li>
        <li><strong>Integrate AI Tools:</strong> Start with GitHub Copilot in your daily workflow</li>
        <li><strong>Build AI-Enhanced Projects:</strong> Create portfolio pieces showcasing AI integration</li>
        <li><strong>Stay Updated:</strong> Follow AI development trends and new tools</li>
      </ol>

      <div class="cta-section">
        <h3>🎯 Ready to Start Your AI Web Development Journey?</h3>
        <p>Join Ottobon's comprehensive AI Web Development course and learn from industry experts. Master both traditional web development and cutting-edge AI integration.</p>
      </div>

      <h2 id="conclusion">Conclusion: The Future is Now ⭐</h2>
      <p>AI enhances developer capabilities rather than replacing them. By starting your AI integration journey today, you position yourself as a future leader in web development. The combination of human creativity and AI efficiency is unstoppable.</p>

      <div class="highlight-section">
        <h3>🚀 Key Takeaways</h3>
        <p>• AI tools boost productivity and code quality<br>
        • Early adoption gives you a competitive advantage<br>
        • The future of web development is AI-enhanced<br>
        • Start learning and integrating AI tools today</p>
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
      <h2 id="what-are-agents">What are AI Agents? 🤖</h2>
      <p>AI agents are <strong>autonomous software entities</strong> that perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional software with predetermined instructions, these intelligent systems can <em>adapt</em> and <em>learn</em> from their interactions.</p>

      <div class="info-box">
        <p><strong>Key Characteristics:</strong> Autonomy, Reactivity, Pro-activeness, and Social Ability</p>
      </div>

      <h2 id="development-process">Development Process 🔄</h2>
      <p>Creating effective AI agents involves a systematic approach that combines theoretical understanding with practical implementation:</p>

      <h3 id="phase-1">Phase 1: Problem Definition & Analysis 🎯</h3>
      <p>Before diving into development, we must clearly define the problem space and analyze the environment where our agent will operate. This includes understanding user needs, system constraints, and performance requirements.</p>

      <h3 id="phase-2">Phase 2: Architecture Design 🏗️</h3>
      <p>Design the agent's cognitive architecture, including perception modules, decision-making algorithms, and action execution systems. This phase is crucial for creating scalable and maintainable AI agents.</p>

      <div class="highlight-section">
        <h3>🎯 Popular Agent Types</h3>
        <p><strong>Reactive Agents:</strong> Respond directly to environmental stimuli<br>
        <strong>Deliberative Agents:</strong> Plan actions based on internal models<br>
        <strong>Hybrid Agents:</strong> Combine reactive and deliberative approaches<br>
        <strong>Learning Agents:</strong> Improve performance through experience</p>
      </div>

      <h2 id="technologies">Key Technologies & Frameworks 💻</h2>
      <ul>
        <li><strong>Python:</strong> The most popular language with rich AI libraries and extensive community support</li>
        <li><strong>LangChain:</strong> Powerful framework specifically designed for building LLM-powered applications</li>
        <li><strong>TensorFlow/PyTorch:</strong> Industry-standard deep learning frameworks for neural network implementation</li>
        <li><strong>OpenAI Gym:</strong> Standardized testing environment for reinforcement learning agents</li>
        <li><strong>Hugging Face Transformers:</strong> State-of-the-art pre-trained models for NLP tasks</li>
        <li><strong>AutoGen:</strong> Multi-agent conversation framework by Microsoft</li>
        <li><strong>CrewAI:</strong> Framework for orchestrating role-playing, autonomous AI agents</li>
      </ul>

      <h2 id="ottobon-program">Ottobon's AI Agent Development Program 🎓</h2>
      <p>Our comprehensive curriculum is designed to take you from beginner to expert level, covering both theoretical foundations and practical implementation skills.</p>

      <h3 id="foundation-module">Foundation Module 📚</h3>
      <ul>
        <li>Understanding AI agent theory and principles</li>
        <li>Types of agents and their applications</li>
        <li>Real-world case studies across industries</li>
        <li>Introduction to machine learning concepts</li>
      </ul>

      <h3 id="practical-development">Practical Development 🛠️</h3>
      <ul>
        <li>Hands-on coding with Python and popular frameworks</li>
        <li>Building your first conversational AI agent</li>
        <li>Implementing decision-making algorithms</li>
        <li>Integration with external APIs and databases</li>
      </ul>

      <h3 id="advanced-techniques">Advanced Techniques 🚀</h3>
      <ul>
        <li>Multi-agent systems and coordination</li>
        <li>Reinforcement learning for agent training</li>
        <li>Neural-symbolic integration approaches</li>
        <li>Deployment and scaling strategies</li>
      </ul>

      <div class="cta-section">
        <h3>🎯 Ready to Master AI Agent Development?</h3>
        <p>Join the waitlist for Ottobon's upcoming AI Agent Development course and secure your spot with exclusive early-bird pricing! Limited seats available.</p>
      </div>

      <h2 id="getting-started-roadmap">Getting Started on Your Journey 🗺️</h2>
      <ol>
        <li><strong>Master the Fundamentals:</strong> Start with basic AI and machine learning concepts</li>
        <li><strong>Learn Python Programming:</strong> Focus on libraries like NumPy, Pandas, and Scikit-learn</li>
        <li><strong>Build Simple Projects:</strong> Create chatbots, game AI, and automation scripts</li>
        <li><strong>Explore Advanced Topics:</strong> Dive into reinforcement learning and multi-agent systems</li>
        <li><strong>Join Communities:</strong> Connect with other AI developers and share knowledge</li>
      </ol>

      <h2 id="conclusion">Conclusion: The Future is Autonomous ⭐</h2>
      <p>AI agent development represents one of the most <strong>exciting and rapidly growing</strong> fields in technology today. With abundant career opportunities and the potential to create meaningful impact across industries, there has never been a better time to start your journey.</p>

      <div class="highlight-section">
        <h3>🚀 Key Takeaways</h3>
        <p>• AI agents are autonomous, adaptive software entities<br>
        • Development requires both theory and practical skills<br>
        • Multiple frameworks and tools are available<br>
        • Career opportunities are expanding rapidly<br>
        • Start with fundamentals and build progressively</p>
      </div>
    `
  },
  'essential-skills-ai-professional-2025': {
    id: '3',
    title: '5 Essential Skills Every AI Professional Needs in 2025',
    excerpt: 'Explore the technical and soft skills that are becoming increasingly important for AI practitioners and developers in 2025.',
    category: 'AI Education',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    slug: 'essential-skills-ai-professional-2025',
    author: 'Ottobon Team',
    readTime: '12 min read',
    content: `
      <h2 id="introduction">The AI Skills Landscape in 2025 🌟</h2>
      <p>The AI field evolves rapidly, with new technologies and methodologies emerging regularly. Staying current in 2025 requires a combination of deep technical knowledge, effective communication skills, and ethical awareness.</p>

      <div class="info-box">
        <p><strong>Industry Insight:</strong> 73% of companies plan to increase their AI investments in 2025, creating unprecedented demand for skilled AI professionals.</p>
      </div>

      <h2 id="skill-1">1. Advanced Machine Learning and Deep Learning 🧠</h2>
      <p>Master cutting-edge architectures and stay ahead of the technological curve with these essential competencies:</p>

      <h3 id="core-ml-skills">Core ML Competencies</h3>
      <ul>
        <li><strong>Transformer Models:</strong> BERT, GPT, T5, and custom transformer architectures</li>
        <li><strong>Multimodal AI:</strong> Vision-language models, CLIP, DALL-E style systems</li>
        <li><strong>Few-shot Learning:</strong> Meta-learning and prompt engineering techniques</li>
        <li><strong>Reinforcement Learning:</strong> PPO, SAC, and human feedback integration</li>
        <li><strong>Federated Learning:</strong> Distributed training and privacy-preserving methods</li>
      </ul>

      <div class="cta-section">
        <h3>🚀 Accelerate Your ML Journey</h3>
        <p>Join Ottobon's Advanced Machine Learning program to master these cutting-edge techniques with hands-on projects and expert guidance.</p>
      </div>

      <h2 id="skill-2">2. Programming Languages and Frameworks 💻</h2>
      <p>Versatility in programming languages and frameworks is crucial for AI implementation across different domains and platforms.</p>

      <h3 id="core-languages">Core Languages (2025 Focus)</h3>
      <ul>
        <li><strong>Python:</strong> Primary language for AI/ML development and research</li>
        <li><strong>JavaScript/TypeScript:</strong> Essential for AI web applications and Node.js backends</li>
        <li><strong>Julia:</strong> Growing popularity for high-performance scientific computing</li>
        <li><strong>Rust:</strong> Emerging for high-performance AI systems and infrastructure</li>
        <li><strong>SQL:</strong> Critical for data manipulation and analysis workflows</li>
      </ul>

      <h3 id="frameworks">Essential AI Frameworks</h3>
      <ul>
        <li><strong>Hugging Face Transformers:</strong> State-of-the-art NLP models and pipelines</li>
        <li><strong>LangChain:</strong> Building applications with large language models</li>
        <li><strong>Ray:</strong> Distributed computing for ML workloads</li>
        <li><strong>MLflow:</strong> ML lifecycle management and experiment tracking</li>
        <li><strong>FastAPI:</strong> Modern web framework for building AI APIs</li>
      </ul>

      <h3 id="cloud-platforms">Cloud Platforms Mastery</h3>
      <ul>
        <li><strong>AWS SageMaker:</strong> End-to-end ML platform with integrated tools</li>
        <li><strong>Google AI Platform:</strong> Vertex AI and advanced ML services</li>
        <li><strong>Azure Machine Learning:</strong> Enterprise-grade ML operations</li>
      </ul>

      <h2 id="skill-3">3. Communication and Collaboration 🤝</h2>
      <p>Technical skills alone aren't sufficient. Modern AI professionals must excel at communicating complex concepts and working effectively in diverse teams.</p>

      <h3 id="communication-skills">Key Communication Skills</h3>
      <ul>
        <li><strong>Technical Writing:</strong> Clear documentation, research papers, and technical blogs</li>
        <li><strong>Data Visualization:</strong> Creating compelling charts, dashboards, and interactive presentations</li>
        <li><strong>Presentation Skills:</strong> Explaining AI concepts to technical and non-technical audiences</li>
        <li><strong>Cross-functional Collaboration:</strong> Working with product managers, designers, and business stakeholders</li>
      </ul>

      <div class="highlight-section">
        <h3>💡 Communication Best Practices</h3>
        <p><strong>Storytelling with Data:</strong> Transform complex analyses into compelling narratives<br>
        <strong>Visual Communication:</strong> Use diagrams and visualizations to explain AI concepts<br>
        <strong>Active Listening:</strong> Understand business requirements and user needs</p>
      </div>

      <h2 id="skill-4">4. AI Ethics and Responsible Development ⚖️</h2>
      <p>As AI systems become more powerful and pervasive, ethical considerations and responsible development practices are paramount.</p>

      <h3 id="ethical-foundations">Ethical Foundations</h3>
      <ul>
        <li><strong>Bias Detection:</strong> Identifying and mitigating algorithmic bias in AI systems</li>
        <li><strong>Fairness Metrics:</strong> Implementing and measuring fairness across different groups</li>
        <li><strong>Transparency:</strong> Creating explainable AI systems and decision processes</li>
        <li><strong>Privacy Protection:</strong> Implementing differential privacy and data anonymization</li>
      </ul>

      <h3 id="regulatory-compliance">Regulatory Compliance</h3>
      <ul>
        <li><strong>GDPR Compliance:</strong> Data protection and privacy regulations</li>
        <li><strong>AI Act (EU):</strong> Understanding emerging AI legislation</li>
        <li><strong>Industry Standards:</strong> Following best practices for AI governance</li>
      </ul>

      <div class="cta-section">
        <h3>🛡️ Build Ethical AI Systems</h3>
        <p>Learn responsible AI development practices in Ottobon's Ethics in AI program, focusing on real-world applications and regulatory compliance.</p>
      </div>

      <h2 id="skill-5">5. Domain Expertise and Application 🎯</h2>
      <p>Deep understanding in specific application areas distinguishes exceptional AI professionals from generalists. Specialization creates unique value propositions.</p>

      <h3 id="high-demand-domains">High-Demand Domains</h3>
      <ul>
        <li><strong>Healthcare AI:</strong> Medical imaging, drug discovery, clinical decision support</li>
        <li><strong>Financial Technology:</strong> Fraud detection, algorithmic trading, risk assessment</li>
        <li><strong>Manufacturing:</strong> Predictive maintenance, quality control, supply chain optimization</li>
        <li><strong>Natural Language Processing:</strong> Conversational AI, content generation, language translation</li>
        <li><strong>Computer Vision:</strong> Autonomous vehicles, medical imaging, security systems</li>
      </ul>

      <h3 id="domain-bridge">Bridging Technical and Domain Knowledge</h3>
      <ul>
        <li><strong>Industry Understanding:</strong> Learning domain-specific challenges and requirements</li>
        <li><strong>Regulatory Knowledge:</strong> Understanding compliance requirements in different sectors</li>
        <li><strong>Business Acumen:</strong> Aligning technical solutions with business objectives</li>
      </ul>

      <h2 id="learning-progression">Learning Progression: Your 12-Month Roadmap 🗺️</h2>
      
      <h3 id="months-1-3">Months 1-3: Foundation Building</h3>
      <ul>
        <li>Master Python programming and core ML libraries</li>
        <li>Complete online courses in statistics and linear algebra</li>
        <li>Build first ML projects and create a portfolio</li>
        <li>Join AI communities and start networking</li>
      </ul>

      <h3 id="months-4-6">Months 4-6: Specialization Focus</h3>
      <ul>
        <li>Choose a domain of interest and dive deep</li>
        <li>Learn advanced frameworks and tools</li>
        <li>Contribute to open-source projects</li>
        <li>Start writing technical blog posts</li>
      </ul>

      <h3 id="months-7-12">Months 7-12: Advanced Applications</h3>
      <ul>
        <li>Work on complex, real-world projects</li>
        <li>Develop leadership and mentoring skills</li>
        <li>Present at conferences or meetups</li>
        <li>Consider pursuing certifications or advanced degrees</li>
      </ul>

      <div class="highlight-section">
        <h3>🏆 Success Metrics</h3>
        <p><strong>Technical Proficiency:</strong> Ability to implement complex AI systems<br>
        <strong>Portfolio Quality:</strong> Diverse projects demonstrating various skills<br>
        <strong>Community Engagement:</strong> Active participation in AI communities<br>
        <strong>Continuous Learning:</strong> Staying updated with latest developments</p>
      </div>

      <h2 id="conclusion">Conclusion: Your AI Career Success Formula ⭐</h2>
      <p>Excellence in AI requires balancing technical depth with communication skills, ethical considerations, and domain knowledge. The future belongs to AI professionals who can build solutions that are not only technically sophisticated but also practical, ethical, and business-aligned.</p>

      <div class="cta-section">
        <h3>🎯 Develop Your AI Expertise</h3>
        <p>Explore Ottobon's comprehensive AI education programs designed to build both technical proficiency and practical problem-solving skills. Join thousands of professionals who've accelerated their AI careers with us.</p>
      </div>

      <div class="highlight-section">
        <h3>🚀 Key Takeaways</h3>
        <p>• Master both technical and soft skills for AI success<br>
        • Stay updated with emerging technologies and frameworks<br>
        • Develop strong communication and collaboration abilities<br>
        • Prioritize ethical and responsible AI development<br>
        • Specialize in high-demand domain areas<br>
        • Commit to continuous learning and adaptation</p>
      </div>
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [showNewsletter, setShowNewsletter] = useState(false);

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const { top, height } = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = Math.max(0, Math.min(1, (windowHeight - top) / height));
      setReadingProgress(scrolled * 100);

      // Update active section for table of contents
      const headings = article.querySelectorAll('h2[id], h3[id]');
      let current = '';
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i] as HTMLElement;
        if (heading.getBoundingClientRect().top <= 100) {
          current = heading.id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="font-sans text-white bg-black min-h-screen">
        <main className="pt-8 pb-16">
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

  // Get table of contents from content
  const getTableOfContents = (content: string) => {
    const headings = content.match(/<h[23][^>]*id="([^"]*)"[^>]*>([^<]*)/g) || [];
    return headings.map(heading => {
      const idMatch = heading.match(/id="([^"]*)"/);
      const textMatch = heading.match(/>([^<]*)/);
      const levelMatch = heading.match(/<h([23])/);
      
      return {
        id: idMatch ? idMatch[1] : '',
        text: textMatch ? textMatch[1].replace(/[🎯💼🔧📚📈🚀🏷️🏢🛠️🌐🤖🔄🎯🏗️💻🎓📚🛠️🚀🗺️⭐🌟🧠💻🤝💡⚖️🎯🏆]/g, '').trim() : '',
        level: levelMatch ? parseInt(levelMatch[1]) : 2
      };
    });
  };

  const tableOfContents = getTableOfContents(post.content);

  // Get related articles
  const related = blogPostsFromSection
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Course Updates': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Career Tips': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'AI Trends': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Student Success': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'AI Education': return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="font-sans text-white bg-black min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1">
        <Progress value={readingProgress} className="h-full rounded-none" />
      </div>

      {/* Hero Section */}
      <section className="pt-8 md:pt-12 lg:pt-16 xl:pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link 
                to="/academy#blog"
                className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
              >
                ← Back to Knowledge Hub
              </Link>
            </nav>

            {/* Category Badge */}
            <div className={`inline-flex items-center mb-6 px-4 py-2 rounded-full border text-sm font-medium ${getCategoryColor(post.category)}`}>
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                By {post.author}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.date)}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Share:</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('linkedin')}
                  className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('twitter')}
                  className="border-sky-600 text-sky-400 hover:bg-sky-600 hover:text-white"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareOnSocial('facebook')}
                  className="border-blue-800 text-blue-400 hover:bg-blue-800 hover:text-white"
                >
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <Card className="bg-gray-900/50 border-gray-700">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Table of Contents
                      </h3>
                      <nav className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors ${
                              item.level === 3 ? 'ml-4' : ''
                            } ${
                              activeSection === item.id
                                ? 'bg-indigo-600/20 text-indigo-300'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                )}

                {/* Course CTA */}
                <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-600/30">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-white mb-2">Ready to Learn More?</h4>
                      <p className="text-sm text-gray-300 mb-4">
                        Explore our comprehensive AI courses designed for professionals like you.
                      </p>
                      <Button 
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => {
                          const coursesSection = document.querySelector('#courses');
                          if (coursesSection) {
                            coursesSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.location.href = '/academy#courses';
                          }
                        }}
                      >
                        View Courses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article className="prose prose-lg prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content enhanced-content"
                />
              </article>

              {/* Engagement Section */}
              <div className="mt-16 space-y-8">
                {/* Was this helpful section */}
                <Card className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-white mb-4">Was this article helpful?</h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant={isHelpful === true ? "default" : "outline"}
                        onClick={() => setIsHelpful(true)}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Yes, helpful!
                      </Button>
                      <Button
                        variant={isHelpful === false ? "default" : "outline"}
                        onClick={() => setIsHelpful(false)}
                        className="flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                        Could be better
                      </Button>
                    </div>
                    {isHelpful !== null && (
                      <p className="mt-4 text-gray-400">
                        {isHelpful 
                          ? "Thank you for your feedback! 🎉" 
                          : "Thanks for the feedback. We'll work on improving our content! 💪"
                        }
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-600/30">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                    <p className="text-gray-300 mb-6">
                      Get the latest AI insights, career tips, and course updates delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                      <Button 
                        onClick={() => setShowNewsletter(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      No spam, unsubscribe anytime. We respect your privacy.
                    </p>
                  </CardContent>
                </Card>

                <Separator className="bg-gray-700" />

                {/* Related Articles */}
                {related.length > 0 && (
                  <section className="mt-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Articles</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {related.map((relatedPost, index) => (
                        <Link 
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group block"
                        >
                          <Card className="bg-gray-800/50 hover:bg-gray-800/70 border-gray-700 transition-all duration-300 hover:scale-105 overflow-hidden">
                            <div className="relative overflow-hidden">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                            </div>
                            <CardContent className="p-6">
                              <div className={`inline-flex items-center mb-3 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)}`}>
                                {relatedPost.category}
                              </div>
                              <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                                {relatedPost.title}
                              </h3>
                              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                {relatedPost.excerpt}
                              </p>
                              <div className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 font-medium transition-colors text-sm">
                                Read More
                                <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Comment Section */}
                <Card className="bg-gray-900/50 border-gray-700 mt-16">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Join the Discussion
                    </h3>
                    
                    <div className="space-y-6">
                      {/* Comment Form */}
                      <div className="bg-gray-800/50 p-6 rounded-lg">
                        <textarea
                          placeholder="Share your thoughts about this article..."
                          className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                        />
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm text-gray-500">
                            Comments are moderated and will appear after approval.
                          </p>
                          <Button className="bg-indigo-600 hover:bg-indigo-700">
                            Post Comment
                          </Button>
                        </div>
                      </div>

                      {/* Sample Comments */}
                      <div className="space-y-4">
                        <div className="bg-gray-800/30 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                              A
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-white">Alex Chen</span>
                                <span className="text-xs text-gray-500">2 days ago</span>
                              </div>
                              <p className="text-gray-300 text-sm">
                                Great article! I've been looking into AI development and this really helps clarify the learning path. The practical examples are especially helpful.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-800/30 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                              S
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-white">Sarah Johnson</span>
                                <span className="text-xs text-gray-500">1 day ago</span>
                              </div>
                              <p className="text-gray-300 text-sm">
                                As someone who's currently switching careers into AI, this article gives me confidence that I'm on the right track. Thank you Ottobon team!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back to Blog Button */}
                <div className="text-center mt-16">
                  <Link to="/academy#blog">
                    <Button variant="outline" size="lg" className="border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Back to Knowledge Hub
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
