import Header from "@/components/Header";
import MethodologySection from "@/components/MethodologySection";
import CoursesSection from "@/components/CoursesSection";
import RequirementsSection from "@/components/RequirementsSection";
import AssessmentSection from "@/components/AssessmentSection";
import EnrollmentSection from "@/components/EnrollmentSection";
import IntegratedHeroJourney from "@/components/IntegratedHeroJourney";
import StorytellingOnboarding from "@/components/StorytellingOnboarding";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-dark bg-white">
      <Header />
      <main>
        <IntegratedHeroJourney />
        <MethodologySection />
        <StorytellingOnboarding />
        <CoursesSection />
        <RequirementsSection />
        <AssessmentSection />
        <EnrollmentSection />
      </main>
      <Footer />
    </div>
  );
}
