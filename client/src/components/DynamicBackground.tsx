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
  colorShift = true,
  parallax = true, 
  bubbles = true,
  grid = false,
  noise = false
}: DynamicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage (0 to 1)
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollPosition(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,  // normalized 0-1
        y: e.clientY / window.innerHeight, // normalized 0-1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate dynamic styles based on scroll and mouse position
  const gradientStyle = colorShift ? {
    backgroundImage: `linear-gradient(${135 + scrollPosition * 90}deg, 
      rgba(59, 130, 246, ${0.05 + scrollPosition * 0.1}) 0%, 
      rgba(147, 51, 234, ${0.05 + (1 - scrollPosition) * 0.1}) 100%)`,
    opacity: 0.8 + mousePosition.y * 0.2,
  } : {};

  const parallaxStyle = parallax ? {
    transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
  } : {};

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-500 ${className}`}
    >
      {/* Base background with gradient that changes with scroll */}
      <div 
        className="absolute inset-0 transition-all duration-1000" 
        style={gradientStyle}
      ></div>
      
      {/* Grid pattern that moves slightly with mouse */}
      {grid && (
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-5 transition-transform duration-500" 
          style={parallaxStyle}
        ></div>
      )}

      {/* Noise texture overlay */}
      {noise && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            opacity: 0.02 + scrollPosition * 0.03,
          }}
        ></div>
      )}

      {/* Floating bubble elements */}
      {bubbles && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="bubble" style={{ 
            '--duration': '15s', 
            '--delay': '0s',
            left: `${20 + mousePosition.x * 10}%`
          } as React.CSSProperties}></div>
          <div className="bubble" style={{ 
            '--duration': '25s', 
            '--delay': '2s',
            left: `${40 + mousePosition.x * -5}%`
          } as React.CSSProperties}></div>
          <div className="bubble" style={{ 
            '--duration': '20s', 
            '--delay': '5s',
            left: `${60 + mousePosition.x * 8}%`
          } as React.CSSProperties}></div>
          <div className="bubble" style={{ 
            '--duration': '18s', 
            '--delay': '7s',
            left: `${80 + mousePosition.x * -12}%`
          } as React.CSSProperties}></div>
        </div>
      )}

      {/* Radial glow that follows mouse */}
      <div 
        className="absolute rounded-full w-[800px] h-[800px] transition-all duration-1000 opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.8) 0%, rgba(79, 70, 229, 0) 70%)',
          left: `calc(${mousePosition.x * 100}% - 400px)`,
          top: `calc(${mousePosition.y * 100}% - 400px)`,
          opacity: 0.1 + scrollPosition * 0.1,
        }}
      ></div>
    </div>
  );
}