import React from 'react';

export function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — Blue (bright) */}
      <div
        className="es-animate-orb1 absolute w-[400px] h-[400px] rounded-full opacity-[0.35] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #3B82F6, transparent 70%)',
          top: '5%',
          left: '8%',
        }}
      />
      {/* Orb 2 — Purple (bright) */}
      <div
        className="es-animate-orb2 absolute w-[350px] h-[350px] rounded-full opacity-[0.30] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #8B5CF6, transparent 70%)',
          top: '35%',
          right: '5%',
        }}
      />
      {/* Orb 3 — Teal (bright) */}
      <div
        className="es-animate-orb3 absolute w-[300px] h-[300px] rounded-full opacity-[0.30] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #14B8A6, transparent 70%)',
          bottom: '10%',
          left: '25%',
        }}
      />
      {/* Orb 4 — Orange/Amber */}
      <div
        className="es-animate-orb2 absolute w-[280px] h-[280px] rounded-full opacity-[0.25] blur-[70px]"
        style={{
          background: 'radial-gradient(circle, #F59E0B, transparent 70%)',
          top: '60%',
          right: '25%',
          animationDelay: '5s',
        }}
      />
      {/* Orb 5 — Pink/Rose */}
      <div
        className="es-animate-orb1 absolute w-[320px] h-[320px] rounded-full opacity-[0.25] blur-[75px]"
        style={{
          background: 'radial-gradient(circle, #EC4899, transparent 70%)',
          top: '15%',
          right: '30%',
          animationDelay: '8s',
        }}
      />

      {/* Animated Grid Pattern */}
      <div
        className="es-animate-grid absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
