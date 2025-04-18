import { useEffect, useRef, useState } from 'react';

interface DynamicBackgroundProps {
  className?: string;
  colorShift?: boolean;
  parallax?: boolean;
  bubbles?: boolean;
  grid?: boolean;
  noise?: boolean;
}

export default function DynamicBackground({
  className = '',
  colorShift = false,
  parallax = false,
  bubbles = false,
  grid = false,
  noise = false,
}: DynamicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle scroll events and mouse movements
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const normalizedScroll = Math.min(scrollY / maxScroll, 1);
      setScroll(normalizedScroll);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;  // normalized 0-1
      const y = e.clientY / window.innerHeight; // normalized 0-1
      setMousePosition({ x, y });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate color based on scroll and mouse position
  const getBackgroundColor = () => {
    if (!colorShift) return 'transparent';
    
    // Base color (light blue to purple gradient)
    const hue1 = 210 + (scroll * 30); // Shift from blue towards purple as scroll increases
    const hue2 = 260 + (scroll * 20); // Shift from purple towards pink as scroll increases
    
    // Adjust saturation & lightness slightly based on mouse position
    const satAdj = 20 + (mousePosition.x * 10); // 20-30%
    const lightAdj = 92 + (mousePosition.y * 5); // 92-97%
    
    return `linear-gradient(
      ${135 + (scroll * 45)}deg, 
      hsla(${hue1}, ${satAdj}%, ${lightAdj}%, 0.03) 0%, 
      hsla(${hue2}, ${satAdj}%, ${lightAdj - 3}%, 0.06) 100%
    )`;
  };
  
  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 overflow-hidden ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Base gradient background that shifts with scroll */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ 
          background: getBackgroundColor(),
          opacity: colorShift ? 1 : 0,
        }}
      ></div>
      
      {/* Parallax floating elements */}
      {parallax && (
        <div className="absolute inset-0">
          <div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-3xl transition-all duration-700 ease-out"
            style={{
              left: `${20 + mousePosition.x * -10}%`,
              top: `${20 + (scroll * 20) + (mousePosition.y * -10)}%`,
              transform: `scale(${1 + scroll * 0.3})`,
              opacity: 0.7 - (scroll * 0.3),
            }}
          ></div>
          
          <div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl transition-all duration-700 ease-out"
            style={{
              right: `${20 + mousePosition.x * 10}%`,
              bottom: `${30 + (scroll * -30) + (mousePosition.y * 10)}%`,
              transform: `scale(${0.8 + scroll * 0.4})`,
              opacity: 0.5 + (scroll * 0.2),
            }}
          ></div>
        </div>
      )}
      
      {/* Floating bubbles */}
      {bubbles && (
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                width: `${(index + 1) * 50 + 50}px`,
                height: `${(index + 1) * 50 + 50}px`,
                background: index % 2 === 0 
                  ? 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, rgba(59, 130, 246, 0) 70%)' 
                  : 'radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, rgba(168, 85, 247, 0) 70%)',
                left: `${(index * 15) + (mousePosition.x * 5)}%`,
                top: `${(index * 20) + (scroll * (index % 2 === 0 ? 50 : -50))}%`,
                transform: `scale(${1 + (scroll * 0.2)})`,
                opacity: 0.7 - (index * 0.1),
                animation: `float-${index + 1} ${10 + index * 5}s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
      )}
      
      {/* Subtle grid overlay */}
      {grid && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: `${mousePosition.x * 10}px ${mousePosition.y * 10}px`,
            opacity: 0.4 - (scroll * 0.2),
          }}
        ></div>
      )}
      
      {/* Noise texture overlay */}
      {noise && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.02 + (scroll * 0.01),
          }}
        ></div>
      )}
    </div>
  );
}