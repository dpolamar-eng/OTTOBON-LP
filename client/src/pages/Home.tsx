
import { useMemo } from "react";
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
  // Memoize bubble positions/sizes so background doesn't change on re-renders
  const bubbles = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        w: Math.random() * 20 + 10,
        h: Math.random() * 20 + 10,
        left: Math.random() * 100,
        bottomVh: Math.random() * 80, // 0–80vh from bottom
      })),
    [],
  );

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Static particles (no animation) */}
        <div className="absolute inset-0 overflow-hidden">
          {bubbles.map((b, i) => (
            <div
              key={i}
              className="gateway-bubble"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                left: `${b.left}%`,
                bottom: `${b.bottomVh}vh`,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.1))",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <IntegratedHeroJourney />
          <MethodologySection />
          <StorytellingOnboarding />
          <CoursesSection />
          <RequirementsSection />
          <TalentCompassAssessment />
          <CallToActionSection />
          
          {/* Academy FAQ Section */}
          <section
            id="faq"
            className="relative z-10 py-14 sm:py-16 scroll-mt-24 md:scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  Academy FAQ
                </h2>
                <div className="h-0.5 w-28 md:w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3"></div>
              </div>
              <div className="max-w-3xl mx-auto">
                {[
                  {
                    q: "What does Ottobon Academy include?",
                    a: "Guided learning paths, mentor sessions, portfolio projects, assessments, resume craft, role matching, and interview prep—optimized with AI to cut learning time.",
                  },
                  {
                    q: "Do you help with job placement?",
                    a: "We support your full job journey: ATS-ready resume, role targeting, mock interviews with feedback, and post-placement check-ins.",
                  },
                  {
                    q: "How much time should I budget for Academy?",
                    a: "Expect structured weekly cadence with project work. Many learners complete core paths in 12–16 weeks, depending on prior experience.",
                  },
                  {
                    q: "Can I join while working full-time?",
                    a: "Yes. We design schedules for working professionals with asynchronous modules plus mentor checkpoints.",
                  },
                  {
                    q: "What courses are available in the Academy?",
                    a: "We offer AI for UI/UX Design, AI in Marketing, AI Agent Development, and AI Data Labeling. Each course includes practical projects and industry-relevant skills.",
                  },
                  {
                    q: "How does the AI-powered learning work?",
                    a: "Our AI system personalizes your learning path, provides instant feedback on projects, and adapts the curriculum based on your progress and career goals.",
                  },
                  {
                    q: "What support do I get as a student?",
                    a: "You'll have access to dedicated mentors, peer study groups, career counseling, and our AI-powered learning assistant available 24/7.",
                  },
                ].map((item, idx) => (
                  <details
                    key={idx}
                    className="bg-[#112537]/70 backdrop-blur-sm rounded-2xl border border-white/10 p-5 mb-3 transition-all duration-300 hover:scale-105 hover:bg-[#112537]/80"
                    style={{ boxShadow: "none" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(59, 130, 246, 0.4)")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <summary className="cursor-pointer text-white font-medium select-none text-base md:text-lg">
                      {item.q}
                    </summary>
                    <p className="text-blue-100 mt-2 text-sm md:text-base">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
