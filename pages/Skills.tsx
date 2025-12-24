import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, 
  Layers, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Activity, 
  Code2, 
  Monitor, 
  Database, 
  Cloud, 
  Terminal,
  Rocket,
  ArrowRight,
  Workflow,
  CheckCircle2,
  Sparkles,
  RefreshCcw,
  Box
} from 'lucide-react';
import SkillsHorizontal from '../components/SkillsHorizontal';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline();
      introTl.from(".skills-intro-sub", { y: 20, opacity: 0, duration: 1, ease: "power3.out" })
             .from(".skills-intro-title", { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.6")
             .from(".skills-intro-desc", { opacity: 0, y: 20, duration: 1 }, "-=0.8");

      gsap.utils.toArray('.skill-section-reveal').forEach((section: any) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: { trigger: section, start: "top 90%", toggleActions: "play none none none" }
        });
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div ref={containerRef} className="bg-black text-zinc-100 w-full overflow-x-hidden selection:bg-zinc-800/60">
      <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="skills-intro-sub syncopate text-zinc-600 text-[13px] tracking-[0.8em] mb-6 uppercase font-bold text-center md:text-left">
            The Arsenal
          </h2>
          <h1 className="skills-intro-title syncopate text-[clamp(48px,10vw,60px)] font-black leading-tight tracking-tighter mb-10 text-center md:text-left uppercase text-zinc-100">
            ENGINEERING <span className="text-zinc-800 italic">EXPERTISE</span>
          </h1>
          <p className="skills-intro-desc text-[clamp(15px,1.4vw,17px)] text-zinc-500 font-light max-w-2xl leading-relaxed text-center md:text-left mx-auto md:mx-0">
            A meticulously curated stack for high-performance interfaces and scalable systems. Precision-engineered from the foundation up.
          </p>
        </div>
      </section>

      <section className="skill-section-reveal py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="syncopate text-zinc-600 text-[13px] tracking-[0.5em] mb-4 uppercase font-bold">Foundation</h2>
            <h3 className="syncopate text-[clamp(28px,4vw,32px)] font-black uppercase tracking-tight text-zinc-100">DEPTH OF KNOWLEDGE</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Frontend Architecture", desc: "Building modular, state-driven interfaces with Next.js and specialized design systems.", icon: <Layers className="text-zinc-500" /> },
              { title: "Backend Systems", desc: "Crafting robust server-side logic, microservices, and high-throughput API gateways.", icon: <Cpu className="text-zinc-500" /> },
              { title: "Data Modeling", desc: "Designing scalable relational and non-relational database schemas for complex data flows.", icon: <Database className="text-zinc-500" /> },
              { title: "API Design", desc: "Implementing RESTful and GraphQL specifications with a focus on security.", icon: <Globe className="text-zinc-500" /> },
              { title: "Performance Tuning", desc: "Optimizing critical rendering path, asset delivery, and runtime execution.", icon: <Zap className="text-zinc-500" /> },
              { title: "System Security", desc: "Hardening applications with end-to-end encryption and security-first protocols.", icon: <ShieldCheck className="text-zinc-500" /> }
            ].map((item, i) => (
              <div key={i} className="group p-8 bg-white/[0.01] border border-zinc-900 rounded-[2rem] hover:bg-zinc-900/20 hover:border-zinc-700 transition-all duration-500 flex flex-col h-full">
                 <div className="mb-8 p-4 bg-black rounded-2xl w-fit border border-zinc-900 group-hover:border-zinc-700 transition-all text-zinc-600 group-hover:text-zinc-400">{item.icon}</div>
                 <h4 className="syncopate text-[18px] font-bold mb-4 uppercase group-hover:text-zinc-300 transition-colors tracking-tight text-zinc-400">{item.title}</h4>
                 <p className="text-zinc-500 text-[15px] leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-zinc-900">
        <SkillsHorizontal />
      </section>

      <section className="py-32 px-6 text-center bg-gradient-to-t from-zinc-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="syncopate text-zinc-600 text-[13px] tracking-[0.8em] mb-12 uppercase font-bold">The Verdict</h2>
          <h3 className="syncopate text-[clamp(48px,10vw,60px)] font-black mb-20 leading-none tracking-tighter uppercase text-zinc-100">SKILLS ARE TOOLS. <br /> <span className="text-zinc-700 italic drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">IMPACT</span> IS GOAL.</h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticReset} className="w-full sm:w-auto px-16 py-8 bg-zinc-100 text-black font-bold syncopate text-[11px] tracking-[0.4em] rounded-full transition-transform uppercase shadow-[0_0_30px_rgba(255,255,255,0.05)]">HIRE ME NOW</button>
            <button onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticReset} className="w-full sm:w-auto px-16 py-8 border border-zinc-800 text-zinc-100 syncopate text-[11px] tracking-[0.4em] rounded-full hover:bg-zinc-100 hover:text-black transition-all uppercase flex items-center justify-center gap-4 font-bold">VIEW PROJECTS <ArrowRight size={20} /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;