export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-extrabold text-primary mb-4">
              OttoBon
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering the future of AI-driven consulting. Learn from AI to become faster, smarter, and more effective.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Core Skills</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Salesforce Consulting</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Oracle Systems</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Cloud Computing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Full Stack Development</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#assessment" className="text-muted-foreground hover:text-foreground transition">Talent Compass Assessment</a></li>
              <li><a href="#success-stories" className="text-muted-foreground hover:text-foreground transition">Student Success Stories</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Partner Companies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Career Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mr-2 mt-1"></i>
                <a href="mailto:info@ottobon.com" className="text-muted-foreground hover:text-foreground transition">info@ottobon.com</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-primary mr-2 mt-1"></i>
                <a href="tel:+18005551234" className="text-muted-foreground hover:text-foreground transition">+1 (800) 555-1234</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mr-2 mt-1"></i>
                <span className="text-muted-foreground">123 Tech Lane, San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center md:flex md:justify-between md:text-left">
          <p className="text-muted-foreground mb-4 md:mb-0">© {new Date().getFullYear()} OttoBon Technology Consulting Academy. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
