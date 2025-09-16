
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Portal from "@/pages/Portal";
import Services from "@/pages/Services";
import EnrollmentSection from "@/components/EnrollmentSection";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingExperience from "@/components/OnboardingExperience";
import DynamicBackground from "@/components/DynamicBackground";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portal} />
      <Route path="/academy" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/enroll" component={EnrollmentSection} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
      localStorage.setItem('hasSeenOnboarding', 'true');
    }
  }, []);
  
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <DynamicBackground colorShift={true} parallax={true} bubbles={true} noise={true} />
      <ScrollToTop />
      <Router />
      <Toaster />
      {showOnboarding && <OnboardingExperience onClose={handleOnboardingClose} />}
    </QueryClientProvider>
  );
}

export default App;
