import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingExperience from "@/components/OnboardingExperience";
import DynamicBackground from "@/components/DynamicBackground";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    // Check if the user has seen the onboarding before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
      // Show onboarding after a slight delay to allow the main page to load first
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1500);
      
      // Mark as seen for future visits
      localStorage.setItem('hasSeenOnboarding', 'true');
      
      return () => clearTimeout(timer);
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
