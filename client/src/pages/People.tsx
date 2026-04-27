import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import peopleData from "../tier3-content/people-content.json";
import { ContactModal } from '@/components/ContactModal';

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ─── FLOATING ICON POSITIONS ─────────────────────────────────
const HERO_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", top: "15%", left: "12%", dur: "8s", delay: "0s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", top: "20%", left: "82%", dur: "7s", delay: "1s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", top: "70%", left: "8%", dur: "9s", delay: "0.5s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", top: "25%", left: "45%", dur: "6s", delay: "2s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", top: "75%", left: "78%", dur: "8s", delay: "1.5s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", top: "55%", left: "90%", dur: "7s", delay: "0.8s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", top: "65%", left: "25%", dur: "9s", delay: "1.2s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", top: "40%", left: "5%", dur: "6s", delay: "0.3s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", top: "10%", left: "65%", dur: "8s", delay: "2.5s" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", top: "80%", left: "50%", dur: "7s", delay: "1.8s" },
];

// ─── HUB POSITIONS FOR 3D NETWORK ───────────────────────────
const HUB_POSITIONS: [number, number, number][] = [
  [-3.5, 2, 0],   // Product
  [3.5, 1.5, -1],  // AI/Backend
  [-2.5, -2, 1],   // UI/UX
  [3, -1.5, 2],    // DevOps
];

const HUB_COLORS = ["#E76F51", "#8B5CF6", "#2A9D8F", "#F4A261"];

const CAMERA_PATH = [
  { pos: [0, 0, 14] as [number,number,number], target: [0, 0, 0] as [number,number,number] },
  { pos: [-2, 2.5, 5] as [number,number,number], target: [-3.5, 2, 0] as [number,number,number] },
  { pos: [5, 2, 2] as [number,number,number], target: [3.5, 1.5, -1] as [number,number,number] },
  { pos: [-1, -1.5, 5] as [number,number,number], target: [-2.5, -2, 1] as [number,number,number] },
  { pos: [5, -1, 5] as [number,number,number], target: [3, -1.5, 2] as [number,number,number] },
  { pos: [0, 0, 10] as [number,number,number], target: [0, 0, 0] as [number,number,number] },
];

const STYLES = `/* === PEOPLE v2 — Warm Premium Design === */

@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

.mts-page {
  --bg-cream: #FBF7F0;
  --bg-warm: #F5EFE6;
  --text-charcoal: #2B2D42;
  --text-secondary: #555B6E;
  --text-muted: #8D93A5;
  --accent-terracotta: #E76F51;
  --accent-sage: #2A9D8F;
  --accent-purple: #8B5CF6;
  --accent-gold: #F4A261;
  --border-light: rgba(43,45,66,0.08);
  --font-display: 'Newsreader', Georgia, serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  background: var(--bg-cream);
  color: var(--text-charcoal);
  font-family: var(--font-body);
  min-height: 100vh;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
}

.mts-page *, .mts-page *::before, .mts-page *::after { box-sizing: border-box; }

/* Nav */
.mts-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 20px 48px; display: flex; align-items: center; justify-content: space-between; transition: all 0.4s ease; }
.mts-nav.scrolled { background: rgba(10,10,11,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 14px 48px; }
.mts-nav-logo { display: flex; align-items: center; text-decoration: none; }
.mts-nav-links { display: flex; gap: 36px; list-style: none; margin: 0; padding: 0; }
.mts-nav-links a { font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; position: relative; }
.mts-nav-links a:hover { color: #FFFFFF; }
.mts-nav-links a::after { content:''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px; background: var(--accent-terracotta); transition: width 0.3s; }
.mts-nav-links a:hover::after { width: 100%; }
.mts-nav-cta { font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 28px; background: #FFFFFF; color: #0A0A0B; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; transition: all 0.3s; }
.mts-nav-cta:hover { background: var(--accent-terracotta); color: #FFFFFF; transform: translateY(-1px); }
.mts-nav-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
.mts-nav-hamburger span { display: block; width: 22px; height: 1.5px; background: #FFFFFF; margin: 5px 0; transition: all 0.3s; }

/* Hero */
.mts-hero { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.mts-hero-mesh { position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse at 25% 45%, rgba(231,111,81,0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(139,92,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 55% 80%, rgba(42,157,143,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 65%, rgba(244,162,97,0.07) 0%, transparent 45%), #0A0A0B; background-size: 100% 100%; animation: meshShift 20s ease-in-out infinite; }
.mts-hero-icons { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.mts-float-icon { position: absolute; width: 44px; height: 44px; opacity: 0.8; transition: opacity 0.3s; animation: iconFloat var(--dur, 7s) ease-in-out infinite; animation-delay: var(--delay, 0s); filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4)); }
.mts-float-icon img { width: 100%; height: 100%; object-fit: contain; }
.mts-hero-content { position: relative; z-index: 2; text-align: center; max-width: 900px; padding: 0 24px; }
.mts-hero-eyebrow { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent-terracotta); margin-bottom: 28px; }
.mts-hero-title { font-family: var(--font-display); font-size: clamp(40px, 6.5vw, 80px); font-weight: 700; line-height: 1.1; margin-bottom: 28px; color: #FFFFFF; }
.mts-gradient-text { background: linear-gradient(-45deg, #E76F51, #F4A261, #2A9D8F, #8B5CF6); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientWave 5s ease infinite; }
.mts-hero-prop { font-family: var(--font-body); font-size: clamp(16px, 2vw, 20px); font-weight: 400; color: rgba(255,255,255,0.7); line-height: 1.6; min-height: 60px; display: flex; align-items: center; justify-content: center; }
.mts-hero-scroll { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.4); animation: bounce 2s ease-in-out infinite; }
.mts-hero-scroll span { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; }

/* 3D Network Section */
.mts-network { position: relative; height: 280vh; z-index: 2; background: var(--text-charcoal); }
.mts-network-sticky { position: sticky; top: 0; height: 100vh; display: flex; }
.mts-network-canvas { position: absolute; inset: 0; z-index: 1; }
.mts-network-overlay { position: relative; z-index: 2; width: 100%; height: 100%; pointer-events: none; display: flex; align-items: center; }
.mts-layer-panel { position: absolute; right: 48px; top: 0; bottom: 0; margin: auto; height: fit-content; max-height: 85vh; width: 380px; overflow-y: auto; background: rgba(43,45,66,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 36px; color: #F0EDE8; pointer-events: auto; }
.mts-layer-panel::-webkit-scrollbar { display: none; }
.mts-layer-panel-number { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
.mts-layer-panel-title { font-family: var(--font-display); font-size: 28px; font-weight: 600; line-height: 1.2; margin-bottom: 4px; }
.mts-layer-panel-subtitle { font-size: 14px; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
.mts-layer-panel-tagline { font-family: var(--font-display); font-size: 15px; font-style: italic; color: rgba(255,255,255,0.6); margin-bottom: 20px; line-height: 1.5; }
.mts-layer-panel-roles { list-style: none; padding: 0; margin: 0 0 20px 0; }
.mts-layer-panel-roles li { font-size: 14px; padding: 4px 0; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); }
.mts-layer-panel-roles li::before { content: '→'; color: rgba(255,255,255,0.35); font-size: 13px; }
.mts-layer-panel-skills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.mts-skill-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 100px; font-family: var(--font-mono); font-size: 11px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.85); }
.mts-skill-badge img { width: 14px; height: 14px; }
.mts-layer-progress { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; align-items: center; pointer-events: auto; }
.mts-layer-progress-item { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); transition: color 0.4s; }
.mts-layer-progress-item.active { color: rgba(255,255,255,0.9); }
.mts-layer-progress-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.2); transition: all 0.4s; }
.mts-layer-progress-item.active .mts-layer-progress-dot { background: currentColor; transform: scale(1.4); box-shadow: 0 0 8px currentColor; }
.mts-layer-progress-line { width: 24px; height: 1px; background: rgba(255,255,255,0.15); }

/* Projects */
.mts-projects { position: relative; z-index: 3; background: var(--bg-cream); padding: 120px 48px 80px; }
.mts-projects-header { text-align: center; max-width: 600px; margin: 0 auto 64px; }
.mts-projects-header h2 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 48px); font-weight: 600; margin-bottom: 16px; color: var(--text-charcoal); }
.mts-projects-header p { font-size: 16px; color: var(--text-secondary); line-height: 1.6; }
.mts-projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
.mts-project-card { background: white; border: 1px solid var(--border-light); border-radius: 16px; overflow: hidden; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: default; }
.mts-project-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(43,45,66,0.1); border-color: rgba(43,45,66,0.1); }
.mts-project-thumb { height: 160px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.mts-project-thumb::after { content: ''; position: absolute; inset: 0; background: inherit; opacity: 0.9; }
.mts-project-body { padding: 24px; }
.mts-project-title { font-family: var(--font-display); font-size: 20px; font-weight: 600; margin-bottom: 16px; color: var(--text-charcoal); }
.mts-project-row { display: flex; gap: 8px; margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
.mts-project-label { font-weight: 600; min-width: 70px; color: var(--text-charcoal); }
.mts-project-value { color: var(--text-secondary); }
.mts-project-tech { display: flex; gap: 6px; margin-top: 16px; flex-wrap: wrap; }
.mts-project-tech-tag { font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 4px; background: var(--bg-warm); border: 1px solid var(--border-light); color: var(--text-secondary); }

/* Talent */
.mts-talent { position: relative; z-index: 3; background: var(--bg-warm); padding: 100px 48px; border-top: 1px solid var(--border-light); }
.mts-talent-header { text-align: center; max-width: 600px; margin: 0 auto 64px; }
.mts-talent-header h2 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 48px); font-weight: 600; margin-bottom: 16px; color: var(--text-charcoal); }
.mts-talent-header p { font-size: 16px; color: var(--text-secondary); }
.mts-talent-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1100px; margin: 0 auto; }
.mts-talent-card { background: white; border: 1px solid var(--border-light); border-radius: 16px; padding: 32px 24px; text-align: center; transition: all 0.4s ease; }
.mts-talent-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(43,45,66,0.08); border-color: rgba(43,45,66,0.1); }
.mts-talent-avatar { width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 28px; color: white; position: relative; overflow: hidden; }
.mts-talent-avatar::before { content: ''; position: absolute; inset: 0; background: inherit; opacity: 0.15; border-radius: inherit; }
.mts-talent-role { font-family: var(--font-display); font-size: 18px; font-weight: 600; margin-bottom: 8px; color: var(--text-charcoal); }
.mts-talent-layer { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 20px; }
.mts-talent-coming { font-size: 13px; color: var(--text-muted); font-style: italic; padding: 10px 16px; background: var(--bg-cream); border-radius: 8px; border: 1px solid var(--border-light); }

/* CTA */
.mts-cta { position: relative; z-index: 4; background: var(--text-charcoal); padding: 120px 48px; text-align: center; overflow: hidden; border-top: 1px solid var(--border-light); }
.mts-cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 500px; height: 500px; background: radial-gradient(circle, rgba(231,111,81,0.12) 0%, transparent 60%); pointer-events: none; }
.mts-cta h2 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 56px); font-weight: 700; color: #F0EDE8; margin-bottom: 20px; position: relative; z-index: 1; }
.mts-cta p { font-size: 18px; color: rgba(240,237,232,0.6); max-width: 500px; margin: 0 auto 40px; line-height: 1.6; position: relative; z-index: 1; }
.mts-cta-btn { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-body); font-size: 14px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 16px 40px; background: var(--accent-terracotta); color: white; border: none; border-radius: 6px; text-decoration: none; cursor: pointer; transition: all 0.3s; position: relative; z-index: 1; }
.mts-cta-btn:hover { background: #d4604a; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(231,111,81,0.3); }

/* Footer */
.mts-footer { background: var(--text-charcoal); border-top: 1px solid rgba(255,255,255,0.06); padding: 40px 48px; position: relative; z-index: 5; }
.mts-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.mts-footer-copy { font-size: 12px; color: rgba(255,255,255,0.35); font-family: var(--font-mono); }
.mts-footer-links { display: flex; gap: 28px; }
.mts-footer-links a { font-size: 12px; color: rgba(255,255,255,0.35); text-decoration: none; font-family: var(--font-mono); transition: color 0.3s; }
.mts-footer-links a:hover { color: rgba(255,255,255,0.7); }

/* Animations */
@keyframes meshShift { 0%,100% { background-position: 0% 0%, 100% 0%, 50% 100%, 80% 60%; } 50% { background-position: 30% 20%, 70% 40%, 40% 70%, 60% 80%; } }
@keyframes iconFloat { 0%,100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(var(--dx1,8px), var(--dy1,-12px)) rotate(3deg); } 66% { transform: translate(var(--dx2,-6px), var(--dy2,8px)) rotate(-2deg); } }
@keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
@keyframes gradientWave { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes fadeInUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 1024px) {
  .mts-nav { padding: 16px 24px; }
  .mts-nav-links { display: none; }
  .mts-nav-hamburger { display: block; }
  .mts-layer-panel { right: 24px; width: 300px; padding: 24px; }
  .mts-projects-grid { grid-template-columns: 1fr 1fr; }
  .mts-talent-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .mts-network-canvas { display: none; }
  .mts-network { height: auto; min-height: 100vh; background: var(--text-charcoal); }
  .mts-network-sticky { position: relative; height: auto; flex-direction: column; padding: 80px 24px; }
  .mts-layer-panel { position: relative; right: auto; top: auto; transform: none; width: 100%; margin-bottom: 32px; }
  .mts-layer-progress { position: relative; bottom: auto; left: auto; transform: none; justify-content: center; margin-top: 24px; }
  .mts-projects { padding: 80px 24px; }
  .mts-projects-grid { grid-template-columns: 1fr; }
  .mts-talent { padding: 80px 24px; }
  .mts-talent-grid { grid-template-columns: 1fr 1fr; }
  .mts-cta { padding: 80px 24px; }
  .mts-footer-inner { flex-direction: column; gap: 16px; }
}
`;
// ─── REACT COMPONENTS FOR PEOPLE v2 ─────────────────

// Infrastructure
function StylesInjection({ styles }: { styles: string }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    if (!document.getElementById("mts-v2")) {
      const s = document.createElement("style");
      s.id = "mts-v2";
      s.innerHTML = styles;
      document.head.appendChild(s);
    }
    return () => { document.getElementById("mts-v2")?.remove(); link.remove(); };
  }, []);
  return null;
}

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.8, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true } as any);
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(update); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`mts-nav ${scrolled ? "scrolled" : ""}`}>
      <a href="/" className="mts-nav-logo">
        <img src="/assets/logo.png" alt="Ottobon" style={{ height: "44px", width: "auto" }} />
      </a>
      <ul className="mts-nav-links">
        <li><a href="#system">Our People</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#talent">Team</a></li>
      </ul>
      <ContactModal>
        <button className="mts-nav-cta cursor-pointer">Talk to Us</button>
      </ContactModal>
      <button className="mts-nav-hamburger" aria-label="Menu"><span/><span/><span/></button>
    </nav>
  );
}

// Hero
function HeroSection() {
  const [propIdx, setPropIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setPropIdx(i => (i + 1) % peopleData.hero.rotatingProps.length), 3500);
    return () => clearInterval(iv);
  }, []);
  return (
    <section className="mts-hero" id="hero">
      <div className="mts-hero-mesh" />
      <div className="mts-hero-icons">
        {HERO_ICONS.map((ic, i) => (
          <div key={i} className="mts-float-icon" style={{ top: ic.top, left: ic.left, "--dur": ic.dur, "--delay": ic.delay } as React.CSSProperties}>
            <img src={ic.src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      <motion.div className="mts-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
        <div className="mts-hero-eyebrow">{peopleData.hero.eyebrow}</div>
        <h1 className="mts-hero-title">
          The Engine Behind Your Next <br/>
          <span className="mts-gradient-text">Breakthrough</span>
        </h1>
        <AnimatePresence mode="wait">
          <motion.div key={propIdx} className="mts-hero-prop" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }}>
            {peopleData.hero.rotatingProps[propIdx]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="mts-hero-scroll"><span>Scroll to enter</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg></div>
    </section>
  );
}

// 3D Network Components
function HubNode({ position, color }: { position: [number,number,number]; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => { 
    if(groupRef.current) {
      const t = clock.getElapsedTime();
      coreRef.current.rotation.y = t * 0.3;
      wireRef.current.rotation.x = t * -0.2;
      wireRef.current.rotation.z = t * 0.15;
    } 
  });
  
  return (
    <group ref={groupRef} position={position}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.3} metalness={0.8} transparent opacity={0.9} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

const DEFAULT_ICONS: Record<string, string> = {
  "Generative AI": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  "RAG": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  "System Design": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
  "Roadmapping": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>',
  "Product Strategy": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/></svg>',
  "default": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
};

function SkillOrbiters({ hubPos, color, skills }: { hubPos: [number,number,number]; color: string; skills: any[] }) {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={groupRef} position={hubPos}>
      {skills.map((s, i) => {
        const count = skills.length;
        const angle = (i / count) * Math.PI * 2;
        const r = 1.5 + Math.sin(i * 1.5) * 0.15;
        const px = Math.cos(angle) * r;
        const pz = Math.sin(angle) * r;
        const py = Math.sin(angle * 3) * 0.2;
        
        return (
          <group key={s.name} position={[px, py, pz]}>
            <mesh>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.4} />
            </mesh>
            <Html transform sprite center distanceFactor={2.5} zIndexRange={[100, 0]}>
              <div style={{
                width: "90px", height: "90px", display: "flex", alignItems: "center",
                justifyContent: "center", color: "white", pointerEvents: "none",
                borderRadius: "50%", overflow: "hidden"
              }}>
                {s.icon ? (
                  <img src={s.icon} style={{ width: "44px", height: "44px", objectFit: "contain", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }} alt={s.name} />
                ) : (
                  <div style={{ fontSize: "12px", lineHeight: "1.1", fontWeight: "bold", fontFamily: "var(--font-mono)", textTransform: "uppercase", textAlign: "center", textShadow: "0 2px 4px rgba(0,0,0,0.8)", padding: "0 6px", wordWrap: "break-word", width: "100%" }}>
                    {s.name}
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

function NetworkConnections() {
  const ref = useRef<THREE.LineSegments>(null!);
  const geo = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < HUB_POSITIONS.length; i++) {
      for (let j = i + 1; j < HUB_POSITIONS.length; j++) {
        pts.push(...HUB_POSITIONS[i], ...HUB_POSITIONS[j]);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </lineSegments>
  );
}

  function ScrollCamera({ progress }: { progress: number }) {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const idx = progress * (CAMERA_PATH.length - 1);
    const lo = Math.max(0, Math.floor(idx));
    const hi = Math.min(CAMERA_PATH.length - 1, Math.ceil(idx));
    const t = idx - lo;
    const lp = CAMERA_PATH[lo], hp = CAMERA_PATH[hi];
    
    // Parallax breathing effect
    const breathX = Math.sin(clock.getElapsedTime() * 0.4) * 0.4;
    const breathY = Math.cos(clock.getElapsedTime() * 0.5) * 0.3;

    camera.position.set(
      lp.pos[0] + (hp.pos[0] - lp.pos[0]) * t + breathX,
      lp.pos[1] + (hp.pos[1] - lp.pos[1]) * t + breathY,
      lp.pos[2] + (hp.pos[2] - lp.pos[2]) * t
    );
    camera.lookAt(
      lp.target[0] + (hp.target[0] - lp.target[0]) * t,
      lp.target[1] + (hp.target[1] - lp.target[1]) * t,
      lp.target[2] + (hp.target[2] - lp.target[2]) * t
    );
  });
  return null;
}

function NetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", end: "bottom bottom",
        onUpdate: (self) => {
          setProgress(self.progress);
          const p = self.progress;
          if (p < 0.2) setActiveLayer(0);
          else if (p < 0.4) setActiveLayer(0);
          else if (p < 0.6) setActiveLayer(1);
          else if (p < 0.8) setActiveLayer(2);
          else setActiveLayer(3);
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile]);

  const layer = peopleData.layers[activeLayer];

  return (
    <section ref={sectionRef} className="mts-network" id="system">
      <div className="mts-network-sticky" style={{ background: "var(--text-charcoal)" }}>
        {!isMobile && (
          <div className="mts-network-canvas">
            <Canvas camera={{ position: [0, 0, 14], fov: 60 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -5, 5]} intensity={0.5} color="#8B5CF6" />
              {HUB_POSITIONS.map((pos, i) => (
                <React.Fragment key={i}>
                  <HubNode position={pos} color={HUB_COLORS[i]} />
                  <SkillOrbiters hubPos={pos} color={HUB_COLORS[i]} skills={peopleData.layers[i].skills} />
                </React.Fragment>
              ))}
              <NetworkConnections />
              <ScrollCamera progress={progress} />
            </Canvas>
          </div>
        )}

        <div className="mts-network-overlay">
          <AnimatePresence mode="wait">
            <motion.div key={activeLayer} className="mts-layer-panel" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              <div className="mts-layer-panel-number">LAYER {layer.number}</div>
              <h3 className="mts-layer-panel-title" style={{ color: layer.colorLight }}>{layer.title}</h3>
              <div className="mts-layer-panel-subtitle">{layer.subtitle}</div>
              <p className="mts-layer-panel-tagline">{layer.tagline}</p>
              <ul className="mts-layer-panel-roles">
                {layer.roles.map((r: string) => <li key={r}>{r}</li>)}
              </ul>
              <div className="mts-layer-panel-skills">
                {layer.skills.map((s: any) => (
                  <span key={s.name} className="mts-skill-badge">
                    {s.icon && <img src={s.icon} alt={s.name} />}
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mts-layer-progress">
            {peopleData.layers.map((l: any, i: number) => (
              <React.Fragment key={l.id}>
                {i > 0 && <div className="mts-layer-progress-line" />}
                <div className={`mts-layer-progress-item ${activeLayer === i ? "active" : ""}`} style={activeLayer === i ? { color: l.colorLight } : {}}>
                  <div className="mts-layer-progress-dot" />
                  <span>{l.number}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {isMobile && peopleData.layers.map((l: any, i: number) => (
        <div key={l.id} className="mts-layer-panel" style={{ position: "relative", right: "auto", top: "auto", transform: "none", width: "100%", margin: "0 auto 24px", maxWidth: 500 }}>
          <div className="mts-layer-panel-number">LAYER {l.number}</div>
          <h3 className="mts-layer-panel-title" style={{ color: l.colorLight }}>{l.title}</h3>
          <div className="mts-layer-panel-subtitle">{l.subtitle}</div>
          <p className="mts-layer-panel-tagline">{l.tagline}</p>
          <ul className="mts-layer-panel-roles">{l.roles.map((r: string) => <li key={r}>{r}</li>)}</ul>
          <div className="mts-layer-panel-skills">
            {l.skills.map((s: any) => <span key={s.name} className="mts-skill-badge">{s.icon && <img src={s.icon} alt={s.name}/>}{s.name}</span>)}
          </div>
        </div>
      ))}
    </section>
  );
}

// Projects
function ProjectsSection() {
  return (
    <section className="mts-projects" id="projects">
      <motion.div className="mts-projects-header" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
        <h2>What This Looks Like in Practice</h2>
        <p>Real systems we've built — from concept to production.</p>
      </motion.div>
      <div className="mts-projects-grid">
        {peopleData.projects.map((p: any, i: number) => (
          <motion.div key={i} className="mts-project-card" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay: i*0.1 }}>
            <div className="mts-project-thumb">
              <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="mts-project-body">
              <h3 className="mts-project-title">{p.title}</h3>
              <div className="mts-project-row"><span className="mts-project-label">Challenge</span><span className="mts-project-value">{p.challenge}</span></div>
              <div className="mts-project-row"><span className="mts-project-label">Solution</span><span className="mts-project-value">{p.solution}</span></div>
              <div className="mts-project-row"><span className="mts-project-label">Result</span><span className="mts-project-value">{p.result}</span></div>
              <div className="mts-project-tech">{p.techStack.map((t: string) => <span key={t} className="mts-project-tech-tag">{t}</span>)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Talent Placeholders
const AVATAR_ICONS = ["⚙", "⟁", "◈", "▲"];
function TalentSection() {
  return (
    <section className="mts-talent" id="talent">
      <motion.div className="mts-talent-header" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
        <h2>Know Our Candidates</h2>
        <p>Specialized talent ready to build your next breakthrough.</p>
      </motion.div>
      <div className="mts-talent-grid">
        {peopleData.talentProfiles.map((t: any, i: number) => (
          <motion.div key={i} className="mts-talent-card" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay: i*0.1 }}>
            <div className="mts-talent-avatar" style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
              <span style={{ position:"relative", zIndex:1, fontSize: 24, opacity: 0.9 }}>{AVATAR_ICONS[i]}</span>
            </div>
            <h3 className="mts-talent-role">{t.role}</h3>
            <div className="mts-talent-coming">Profile coming soon</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// CTA
function CTASection() {
  return (
    <section className="mts-cta" id="cta">
      <div className="mts-cta-glow" />
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
        <h2>{peopleData.cta.title}</h2>
        <p>{peopleData.cta.subtitle}</p>
        <ContactModal>
          <button className="mts-cta-btn cursor-pointer">{peopleData.cta.buttonText} →</button>
        </ContactModal>
      </motion.div>
    </section>
  );
}

// Footer
function PageFooter() {
  return (
    <footer className="mts-footer">
      <div className="mts-footer-inner">
        <span className="mts-footer-copy">© {new Date().getFullYear()} Ottobon</span>
        <div className="mts-footer-links">
          <a href="/services">Services</a>
          <a href="/talentops">Talent Ops</a>
          <a href="/">Home</a>
        </div>
      </div>
    </footer>
  );
}


// ─── MAIN PAGE COMPONENT ─────────────────────────────────────
export default function People() {
  return (
    <div className="mts-page">
      <StylesInjection styles={STYLES} />
      <SmoothScroll>
        <Nav />
        <HeroSection />
        <NetworkSection />
        <ProjectsSection />
        <TalentSection />
        <CTASection />
        <PageFooter />
      </SmoothScroll>
    </div>
  );
}
