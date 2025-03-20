export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Philosophy</h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          At OttoBon, we believe technical skills alone aren't enough. Our integrated approach prepares consultants who excel technically and interpersonally.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Human-Centered Expertise</h3>
            <p className="text-gray-700">
              We emphasize the human side of consulting. Technical knowledge must be paired with exceptional communication, adaptability, and empathy.
            </p>
          </div>
          
          {/* Pillar 2 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-rocket"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Accelerated Mastery</h3>
            <p className="text-gray-700">
              Our speedway approach accelerates learning through immersive, hands-on experiences with real-world scenarios and industry tools.
            </p>
          </div>
          
          {/* Pillar 3 */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <div className="text-primary text-4xl mb-4">
              <i className="fas fa-handshake"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Career Partnership</h3>
            <p className="text-gray-700">
              We're committed to your long-term success, providing ongoing mentorship and connections to top consulting opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
