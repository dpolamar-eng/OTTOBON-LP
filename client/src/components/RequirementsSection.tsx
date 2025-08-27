export default function RequirementsSection() {
  return (
    <section className="py-16 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Hardware & Connectivity */}
          <div className="w-full max-w-2xl mx-auto mb-8 lg:mb-0">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center">
                <i className="fas fa-laptop text-primary mr-3"></i>
                Hardware & Connectivity Requirements
              </h2>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
              <p className="mb-4 text-sm sm:text-base">Our cloud-based learning platform is accessible with minimal hardware requirements:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Computer:</strong> Standard Chromebook or basic laptop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Internet:</strong> 10+ Mbps connection speed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Software:</strong> Modern web browser (Chrome, Firefox, Safari)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Optional:</strong> Webcam and microphone for collaborative sessions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Program Structure */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center">
                <i className="fas fa-calendar-alt text-primary mr-3"></i>
                Program Structure & Time Commitment
              </h2>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
              <p className="mb-4 text-sm sm:text-base">Our immersive 12-week program prepares you for real-world consulting challenges:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Duration:</strong> 12 weeks intensive training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Weekly commitment:</strong> 40 hours (full-time)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Structure:</strong> Core modules (AM) + Hands-on practice (PM)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2 flex-shrink-0"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700 text-sm sm:text-base"><strong>Career Support:</strong> 4 additional weeks of job placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}