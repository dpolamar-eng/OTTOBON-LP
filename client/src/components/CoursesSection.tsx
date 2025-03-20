import { useState } from 'react';

type CourseCategory = 'all' | 'business' | 'ai' | 'cloud';

interface Course {
  id: string;
  title: string;
  category: 'business' | 'ai' | 'cloud';
  categoryLabel: string;
  color: string;
  bgColor: string;
  description: string;
  outcomes: string[];
  logoUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export default function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState<CourseCategory>('all');
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  const courses: Course[] = [
    {
      id: 'salesforce',
      title: 'Salesforce CX Consultant',
      category: 'business',
      categoryLabel: 'Business Apps',
      color: 'blue-800',
      bgColor: 'blue-100',
      description: 'Become a certified Salesforce consultant specializing in customer experience solutions.',
      outcomes: [
        'Salesforce Administrator & Consultant certifications',
        'End-to-end implementation expertise',
        'Industry-specific CRM solutions'
      ],
      logoUrl: 'https://www.salesforce.com/content/dam/web/en_us/www/images/sales-cloud/sales-cloud-logo.png',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700'
    },
    {
      id: 'oracle',
      title: 'Oracle ERP Consultant',
      category: 'business',
      categoryLabel: 'Business Apps',
      color: 'red-800',
      bgColor: 'red-100',
      description: 'Master Oracle ERP Cloud implementation, configuration and integration.',
      outcomes: [
        'Oracle Cloud ERP certification',
        'Financial and operational module expertise',
        'Business process optimization'
      ],
      logoUrl: 'https://www.oracle.com/a/ocom/img/logo-red.png',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-red-700'
    },
    {
      id: 'microsoft',
      title: 'Microsoft Dynamics SCM',
      category: 'business',
      categoryLabel: 'Business Apps',
      color: 'green-800',
      bgColor: 'green-100',
      description: 'Specialize in Microsoft Dynamics 365 Supply Chain Management solutions.',
      outcomes: [
        'Microsoft Dynamics 365 SCM certification',
        'End-to-end supply chain optimization',
        'Power Platform integration expertise'
      ],
      logoUrl: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700'
    },
    {
      id: 'nlp',
      title: 'NLP Implementation Specialist',
      category: 'ai',
      categoryLabel: 'AI',
      color: 'purple-800',
      bgColor: 'purple-100',
      description: 'Deploy natural language processing solutions for enterprise applications.',
      outcomes: [
        'NLP model development and fine-tuning',
        'Conversational AI implementation',
        'Multilingual capabilities deployment'
      ],
      logoUrl: '',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700'
    },
    {
      id: 'genai',
      title: 'Generative AI Solutions Architect',
      category: 'ai',
      categoryLabel: 'AI',
      color: 'indigo-800',
      bgColor: 'indigo-100',
      description: 'Design and implement generative AI solutions for enterprise applications.',
      outcomes: [
        'Large language model implementation',
        'Responsible AI deployment frameworks',
        'Enterprise-ready AI architectures'
      ],
      logoUrl: '',
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-indigo-700'
    },
    {
      id: 'aws',
      title: 'AWS Solutions Architect',
      category: 'cloud',
      categoryLabel: 'Cloud',
      color: 'yellow-800',
      bgColor: 'yellow-100',
      description: 'Design and implement scalable, high-availability systems on AWS.',
      outcomes: [
        'AWS Solutions Architect certification',
        'Multi-tier cloud architecture design',
        'Security and cost optimization expertise'
      ],
      logoUrl: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png',
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-orange-500'
    }
  ];

  const toggleCourseDetails = (courseId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <section id="courses" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Course Offerings</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Specialized training in high-demand technology domains with hands-on experience and certification prep.
        </p>
        
        {/* Course Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            className={`font-medium py-2 px-6 rounded-full transition ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white shadow-sm'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Courses
          </button>
          <button 
            className={`font-medium py-2 px-6 rounded-full transition ${
              activeFilter === 'business' 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white shadow-sm'
            }`}
            onClick={() => setActiveFilter('business')}
          >
            Business Applications
          </button>
          <button 
            className={`font-medium py-2 px-6 rounded-full transition ${
              activeFilter === 'ai' 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white shadow-sm'
            }`}
            onClick={() => setActiveFilter('ai')}
          >
            AI Consulting
          </button>
          <button 
            className={`font-medium py-2 px-6 rounded-full transition ${
              activeFilter === 'cloud' 
                ? 'bg-primary text-white' 
                : 'bg-white hover:bg-primary hover:text-white shadow-sm'
            }`}
            onClick={() => setActiveFilter('cloud')}
          >
            Cloud Computing
          </button>
        </div>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <div className={`h-48 bg-gradient-to-r ${course.gradientFrom} ${course.gradientTo} flex items-center justify-center p-6`}>
                {course.logoUrl ? (
                  <img src={course.logoUrl} alt={course.title} className="h-12" />
                ) : (
                  course.id === 'nlp' ? (
                    <i className="fas fa-comments text-white text-5xl"></i>
                  ) : (
                    <i className="fas fa-robot text-white text-5xl"></i>
                  )
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <span className={`bg-${course.bgColor} text-${course.color} text-xs font-semibold px-2.5 py-0.5 rounded`}>
                    {course.categoryLabel}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">
                  {course.description}
                </p>
                <h4 className="font-semibold mb-2">Key Outcomes:</h4>
                <ul className="mb-4 space-y-1">
                  {course.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2"><i className="fas fa-check"></i></span>
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => toggleCourseDetails(course.id)} 
                  className="text-primary hover:text-primary/80 font-medium flex items-center"
                >
                  {expandedCourses[course.id] ? (
                    <>Hide Details <i className="fas fa-chevron-up ml-1 text-sm"></i></>
                  ) : (
                    <>View Details <i className="fas fa-chevron-right ml-1 text-sm"></i></>
                  )}
                </button>
                
                {expandedCourses[course.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Course Structure:</h4>
                    <p className="text-gray-700 mb-3">
                      12-week immersive program with hands-on projects and mentorship from industry experts.
                    </p>
                    <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                    <p className="text-gray-700">
                      Graduates work as specialized consultants in top firms with average starting salaries of $85,000-$115,000.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
