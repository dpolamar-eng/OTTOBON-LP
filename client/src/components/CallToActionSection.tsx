import { useState } from 'react';

export default function CallToActionSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email signup
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden border-t border-border">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-background"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully transitioned into independent consultants through our AI-enhanced learning programs.
          </p>
          
          {/* Key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-lg p-6 border border-border shadow-md">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-card-foreground font-semibold mb-2">Industry-Ready Skills</h3>
              <p className="text-muted-foreground text-sm">Salesforce, Oracle, Cloud Computing & Full Stack Development</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-card-foreground font-semibold mb-2">AI-Enhanced Learning</h3>
              <p className="text-muted-foreground text-sm">Personalized curriculum that adapts to your learning style</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border shadow-md">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-card-foreground font-semibold mb-2">Consulting Success</h3>
              <p className="text-muted-foreground text-sm">Graduate as an independent consultant, not just an employee</p>
            </div>
          </div>
          
          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button 
              onClick={() => {
                const assessmentElement = document.getElementById('talent-compass');
                if (assessmentElement) {
                  assessmentElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-4 px-8 rounded-lg transition shadow-lg hover:shadow-xl text-lg group"
            >
              <span className="flex items-center">
                Take Free Assessment
                <svg className="ml-2 w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </button>
            <button 
              onClick={() => {
                const coursesElement = document.getElementById('courses');
                if (coursesElement) {
                  coursesElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 rounded-lg transition text-lg"
            >
              View Programs
            </button>
          </div>
          
          {/* Email signup */}
          <div className="bg-card rounded-xl p-4 sm:p-6 max-w-md mx-auto border border-border shadow-md">
            <h3 className="text-card-foreground font-semibold mb-3 text-center">Get Program Updates</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition text-sm whitespace-nowrap"
              >
                {isSubmitted ? 'Thanks!' : 'Notify Me'}
              </button>
            </form>
            <p className="text-muted-foreground text-xs mt-2 text-center">
              Get notified about new programs and special offers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}