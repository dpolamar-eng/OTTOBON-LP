import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function EnrollmentSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentRole: '',
    educationBackground: '',
    yearsExperience: '',
    areasOfInterest: [] as string[],
    howHeardAboutUs: '',
    privacyConsent: false,
    skills: [] as string[]
  });

  const interestAreas = [
    'AI Consulting',
    'Business Applications',
    'Cloud Computing',
    'Data Analytics',
    'UI/UX Design',
    'Digital Marketing'
  ];

  const skillCategories = {
    'Programming': ['JavaScript', 'Python', 'React', 'Node.js'],
    'Cloud': ['AWS', 'Azure', 'Google Cloud'],
    'AI/ML': ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    'Business': ['Project Management', 'Business Analysis', 'Strategy']
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter(i => i !== interest)
        : [...prev.areasOfInterest, interest]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.privacyConsent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and accept the privacy policy.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Store data locally instead of sending to backend
      const applicationData = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };

      // Save to localStorage
      const existingApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('applications', JSON.stringify(existingApplications));

      toast({
        title: "Application Submitted!",
        description: "Your application has been saved locally. Thank you for your interest!",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentRole: '',
        educationBackground: '',
        yearsExperience: '',
        areasOfInterest: [],
        howHeardAboutUs: '',
        privacyConsent: false,
        skills: []
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join Ottobon Academy
          </h1>
          <p className="text-xl text-gray-600">
            Start your journey to becoming a technology consultant
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Application Form</CardTitle>
            <CardDescription>
              Please fill out the form below to apply for our technology consultant program.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              {/* Experience Information */}
              <div>
                <label className="block text-sm font-medium mb-2">Current Role</label>
                <Input
                  value={formData.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  placeholder="e.g., Software Developer, Business Analyst"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Education Background</label>
                <Textarea
                  value={formData.educationBackground}
                  onChange={(e) => handleInputChange('educationBackground', e.target.value)}
                  placeholder="Tell us about your educational background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Years of Experience</label>
                <Input
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  placeholder="e.g., 0-2 years, 3-5 years, 5+ years"
                />
              </div>

              {/* Areas of Interest */}
              <div>
                <label className="block text-sm font-medium mb-4">Areas of Interest</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestAreas.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.areasOfInterest.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                      />
                      <label className="text-sm">{interest}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-4">Skills</label>
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={formData.skills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                <Input
                  value={formData.howHeardAboutUs}
                  onChange={(e) => handleInputChange('howHeardAboutUs', e.target.value)}
                  placeholder="e.g., Social media, friend referral, search engine"
                />
              </div>

              {/* Privacy Consent */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  checked={formData.privacyConsent}
                  onCheckedChange={(checked) => handleInputChange('privacyConsent', checked)}
                  required
                />
                <label className="text-sm text-gray-600">
                  I consent to the processing of my personal data for the purpose of this application and future communications about Ottobon Academy programs. *
                </label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}