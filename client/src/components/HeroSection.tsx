export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative overflow-hidden">
      <div className="absolute w-full h-64 top-0 right-0 z-[-1] bg-gradient-to-r from-primary/10 to-primary/0 rounded-bl-[100%] transform -skew-y-3"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Level Up</span> Your Tech Game
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
              Skill up, stand out, and secure the bag 💰 with cutting-edge skills in Business Apps, AI, and Cloud. No cap - we'll get you industry-ready in weeks, not years.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#enroll" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg text-center relative overflow-hidden group"
              >
                <span className="relative z-10">Get In The Game</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#assessment" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-full transition text-center group"
              >
                <span className="group-hover:hidden">Check Your Vibe</span>
                <span className="hidden group-hover:inline">🔥 Let's Go 🔥</span>
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Technology consultants collaborating" 
              className="rounded-lg shadow-xl w-full object-cover h-80 md:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
