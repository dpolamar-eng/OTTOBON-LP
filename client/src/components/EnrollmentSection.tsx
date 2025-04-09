import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  education: string;
  experience: string;
  interests: string[];
  referral: string;
  consent: boolean;
}

export default function EnrollmentSection() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentRole: '',
    education: '',
    experience: '',
    interests: [],
    referral: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    
    if (name === 'interest') {
      setFormData(prev => {
        const updatedInterests = checked 
          ? [...prev.interests, value]
          : prev.interests.filter(interest => interest !== value);
          
        return {
          ...prev,
          interests: updatedInterests
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const nextStep = () => {
    // Basic validation for required fields before proceeding
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.currentRole || !formData.education || !formData.experience) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate final step
    if (formData.interests.length === 0 || !formData.consent) {
      toast({
        title: "Missing Information",
        description: "Please select at least one area of interest and confirm your consent.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/enroll', formData);
      
      toast({
        title: "Application Submitted",
        description: "Thank you for your interest in OttoBon! Our team will contact you within 24 hours.",
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentRole: '',
        education: '',
        experience: '',
        interests: [],
        referral: '',
        consent: false
      });
      setStep(1);
      
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
      console.error("Enrollment submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enroll" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Join the Fast lane</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Complete this simple form to begin your application process, and one of our advisors will contact you within 24 hours.
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex mb-8">
              <div className={`flex items-center ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>1</div>
                <span className="text-sm font-medium">Basic Info</span>
                <div className="h-1 w-12 bg-gray-200 mx-2"></div>
              </div>
              <div className={`flex items-center ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>2</div>
                <span className="text-sm font-medium">Experience</span>
                <div className="h-1 w-12 bg-gray-200 mx-2"></div>
              </div>
              <div className={`flex items-center ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                  step >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>3</div>
                <span className="text-sm font-medium">Preferences</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="mt-8">
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
                    >
                      Continue to Experience
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Experience */}
              {step === 2 && (
                <div>
                  <div className="mb-6">
                    <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700 mb-1">Current Role/Position*</label>
                    <input 
                      type="text" 
                      id="currentRole" 
                      name="currentRole" 
                      value={formData.currentRole}
                      onChange={handleChange}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education Background*</label>
                    <select 
                      id="education" 
                      name="education" 
                      value={formData.education}
                      onChange={handleChange}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select your highest education level</option>
                      <option value="high-school">High School</option>
                      <option value="associates">Associate's Degree</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="doctorate">Doctorate</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Professional Experience*</label>
                    <select 
                      id="experience" 
                      name="experience" 
                      value={formData.experience}
                      onChange={handleChange}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select your experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition"
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg"
                    >
                      Continue to Preferences
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Preferences */}
              {step === 3 && (
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Areas of Interest*</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="interest" 
                          value="business-apps"
                          checked={formData.interests.includes('business-apps')}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span>Business Applications (Salesforce, Oracle, Microsoft)</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="interest" 
                          value="ai"
                          checked={formData.interests.includes('ai')}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span>AI Consulting</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          name="interest" 
                          value="cloud"
                          checked={formData.interests.includes('cloud')}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        <span>Cloud Computing</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
                    <select 
                      id="referral" 
                      name="referral" 
                      value={formData.referral}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    >
                      <option value="">Select an option</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend or Colleague</option>
                      <option value="alumni">Alumni Recommendation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-8">
                    <label className="flex items-start">
                      <input 
                        type="checkbox" 
                        name="consent" 
                        checked={formData.consent}
                        onChange={handleCheckboxChange}
                        required 
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-gray-700">
                        I consent to OttoBon processing my personal data in accordance with the <a href="#" className="text-primary hover:underline">Privacy Policy</a>*
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-full transition shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-700 text-sm">
            Need help? Contact our admissions team at <a href="mailto:admissions@ottobon.com" className="text-primary hover:underline">admissions@ottobon.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
