
export default function RequirementsSection() {
  return (
    <section className="py-16 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Hardware & Connectivity */}
          <div className="flex flex-col">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-center text-center">
                <i className="fas fa-laptop text-primary mr-3 text-2xl md:text-3xl"></i>
                <span className="leading-tight">Hardware & Connectivity Requirements</span>
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                <p className="mb-4 text-gray-700 text-sm md:text-base text-center">
                  Our cloud-based learning platform is accessible with minimal hardware requirements:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Computer:</strong> Standard Chromebook or basic laptop
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Internet:</strong> 10+ Mbps connection speed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Software:</strong> Modern web browser (Chrome, Firefox, Safari)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Optional:</strong> Webcam and microphone for collaborative sessions
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Program Structure */}
          <div className="flex flex-col">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-center text-center">
                <i className="fas fa-calendar-alt text-primary mr-3 text-2xl md:text-3xl"></i>
                <span className="leading-tight">Program Structure & Time Commitment</span>
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                <p className="mb-4 text-gray-700 text-sm md:text-base text-center">
                  Our immersive 12-week program prepares you for real-world consulting challenges:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Duration:</strong> 12 weeks intensive training
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Weekly commitment:</strong> 40 hours (full-time)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Structure:</strong> Core modules (AM) + Hands-on practice (PM)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1 flex-shrink-0">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">
                      <strong>Career Support:</strong> 4 additional weeks of job placement
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
