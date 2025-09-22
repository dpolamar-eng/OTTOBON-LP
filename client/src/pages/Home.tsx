import Header from "@/components/Header";
import MethodologySection from "@/components/MethodologySection";
import CoursesSection from "@/components/CoursesSection";
import BlogSection from "@/components/BlogSection";
import RequirementsSection from "@/components/RequirementsSection";
import IntegratedHeroJourney from "@/components/IntegratedHeroJourney";
import StorytellingOnboarding from "@/components/StorytellingOnboarding";
import TalentCompassAssessment from "@/components/TalentCompassAssessment";
import CallToActionSection from "@/components/CallToActionSection";
import AcademyFAQSection from "@/components/AcademyFAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans text-white bg-black min-h-screen">
      <Header />
      <main>
        <IntegratedHeroJourney />
        <MethodologySection />
        <StorytellingOnboarding />
        <CoursesSection />
        <BlogSection />
        <RequirementsSection />
        <TalentCompassAssessment />
        <CallToActionSection />
        <AcademyFAQSection />
      </main>
      <Footer />
    </div>
  );
}
