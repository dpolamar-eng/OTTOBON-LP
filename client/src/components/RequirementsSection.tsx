export default function RequirementsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Hardware & Connectivity */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-laptop text-primary mr-3"></i>
              Hardware & Connectivity Requirements
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="mb-4">Our cloud-based learning platform is accessible with minimal hardware requirements:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Computer:</strong> Standard Chromebook or basic laptop</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Internet:</strong> 10+ Mbps connection speed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Software:</strong> Modern web browser (Chrome, Firefox, Safari)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Optional:</strong> Webcam and microphone for collaborative sessions</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Program Structure */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <i className="fas fa-calendar-alt text-primary mr-3"></i>
              Program Structure & Time Commitment
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="mb-4">Our immersive 12-week program prepares you for real-world consulting challenges:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Duration:</strong> 12 weeks intensive training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Weekly commitment:</strong> 40 hours (full-time)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Structure:</strong> Core modules (AM) + Hands-on practice (PM)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2"><i className="fas fa-check-circle"></i></span>
                  <span className="text-gray-700"><strong>Career Support:</strong> 4 additional weeks of job placement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
