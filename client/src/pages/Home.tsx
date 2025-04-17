import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import CoursesSection from "@/components/CoursesSection";
import RequirementsSection from "@/components/RequirementsSection";
import AssessmentSection from "@/components/AssessmentSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import OnboardingJourneySection from "@/components/OnboardingJourneySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-dark bg-white">
      <Header />
      <main>
        <HeroSection />
        <MethodologySection />
        <OnboardingJourneySection />
        <CoursesSection />
        <RequirementsSection />
        <AssessmentSection />
        <EnrollmentSection />
      </main>
      <Footer />
    </div>
  );
}
