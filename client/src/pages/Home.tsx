import Header from "@/components/Header";
import MethodologySection from "@/components/MethodologySection";
import CoursesSection from "@/components/CoursesSection";
import RequirementsSection from "@/components/RequirementsSection";
import IntegratedHeroJourney from "@/components/IntegratedHeroJourney";
import StorytellingOnboarding from "@/components/StorytellingOnboarding";
import TalentCompassAssessment from "@/components/TalentCompassAssessment";
import CallToActionSection from "@/components/CallToActionSection";
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
        <TalentCompassAssessment />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
