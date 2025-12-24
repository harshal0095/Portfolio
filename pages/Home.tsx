import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import paramImg from '../image/Param.png';
import Hero from '../components/Hero';
import { ArrowRight, Code, Database, Globe, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhatICreate = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        filter: 'blur(20px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      });
      gsap.from(rightRef.current, {
        x: 100,
        opacity: 0,
        filter: 'blur(20px)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 px-6 md:px-24 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div ref={leftRef}>
          <h2 className="syncopate text-[13px] tracking-[0.5em] text-zinc-600 mb-6 uppercase font-bold">Specialization</h2>
          <h3 className="syncopate text-[clamp(28px,5vw,32px)] font-bold leading-tight mb-8 uppercase text-zinc-100">
            CRAFTING DIGITAL <br /> <span className="text-zinc-900">FRONTIERS</span>
          </h3>
          <ul className="space-y-6">
            {[
              { label: 'Interactive Websites', icon: <Globe className="text-zinc-600" size={20} /> },
              { label: 'Scalable Full Stack Apps', icon: <Database className="text-zinc-600" size={20} /> },
              { label: 'WebGL & 3D Experiences', icon: <Zap className="text-zinc-600" size={20} /> },
              { label: 'Performance Systems', icon: <Code className="text-zinc-600" size={20} /> },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-[clamp(16px,1.5vw,18px)] font-light text-zinc-500 group">
                <span className="transition-transform group-hover:scale-110 duration-300 text-zinc-400">{item.icon}</span> 
                <span className="group-hover:text-zinc-100 transition-colors duration-300">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div ref={rightRef} className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-900 group">
          <img 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80" 
            alt="Abstract code visualization" 
            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-white/5 mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
};

const SkillsSnapshot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(scrollContainerRef.current, {
        x: '-60%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });
    });
    mm.add("(max-width: 767px)", () => {
      gsap.set(scrollContainerRef.current, { clearProps: "all" });
      gsap.set(containerRef.current, { clearProps: "all" });
    });
    return () => mm.revert();
  }, []);

  const previewSkills = ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'TOOLS'];

  return (
    <section ref={containerRef} className="md:h-screen overflow-hidden md:overflow-visible bg-zinc-900/10 py-20 md:py-0">
      <div className="h-full flex items-center">
        <div ref={scrollContainerRef} className="flex flex-col md:flex-row gap-8 md:gap-12 px-6 md:px-24 w-full md:w-auto">
          <div className="md:min-w-[40vw]">
             <h2 className="syncopate text-[13px] tracking-[0.5em] text-zinc-600 mb-6 uppercase font-bold">Arsenal</h2>
             <h3 className="syncopate text-[clamp(28px,6vw,36px)] font-black uppercase leading-tight text-zinc-100">CORE <br /> STACK</h3>
          </div>
          {previewSkills.map((skill, i) => (
            <div key={skill} className="min-w-full md:min-w-[300px] h-[300px] md:h-[400px] bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8 md:p-12 flex flex-col justify-between group transition-all duration-500 hover:bg-zinc-800 hover:border-zinc-600 md:hover:-translate-y-4">
               <span className="syncopate text-[14px] text-zinc-800 group-hover:text-zinc-100/40 font-bold">0{i+1}</span>
               <h4 className="syncopate text-[22px] font-bold group-hover:text-white uppercase text-zinc-400">{skill}</h4>
               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-500 group-hover:bg-zinc-900/20 transition-all duration-500">
                  <ArrowRight className="text-zinc-700 group-hover:text-zinc-100" size={20} />
               </div>
            </div>
          ))}
          <div className="md:min-w-[40vw] flex items-center pt-8 md:pt-0">
             <button className="syncopate text-[20px] font-bold hover:text-zinc-400 transition-colors flex items-center gap-4 uppercase text-zinc-100">
                EXPLORE ALL SKILLS <ArrowRight size={32} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechMarquee = () => {
  const techs = ['React', 'Node.js', 'PostgreSQL', 'Three.js', 'GSAP', 'AWS', 'Docker', 'Python', 'Go', 'Redis', 'TypeScript', 'GraphQL'];
  return (
    <div className="py-24 border-y border-zinc-900 overflow-hidden whitespace-nowrap relative">
      <div className="flex animate-[marquee_30s_linear_infinite] gap-12">
        {[...techs, ...techs].map((t, i) => (
          <span key={i} className="syncopate text-[28px] md:text-[36px] font-black text-white/[0.03] hover:text-zinc-700/40 transition-colors cursor-default select-none uppercase">
            {t}
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

const MiniAbout = () => (
  <section className="py-40 px-6 md:px-24">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
      <div className="flex-1 order-2 md:order-1">
        <h2 className="syncopate text-[13px] tracking-[0.5em] text-zinc-600 mb-8 uppercase font-bold">The Vision</h2>
        <p className="text-[clamp(18px,2.5vw,28px)] font-light leading-snug mb-12 text-zinc-500">
          I am a Full Stack Developer passionate about building <span className="text-zinc-200 italic">visually rich</span> and <span className="font-bold text-zinc-100">technically solid</span> digital products.
        </p>
        <button className="px-10 py-5 border border-zinc-800 rounded-full syncopate text-[11px] tracking-widest hover:bg-zinc-100 hover:text-black transition-all font-bold uppercase text-zinc-100">
          READ FULL STORY
        </button>
      </div>
      <div className="flex-1 relative order-1 md:order-2">
        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-900 grayscale brightness-75 hover:brightness-100 transition-all duration-1000">
            <img src={paramImg} alt="Harshal" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-zinc-800/10 blur-[120px] -z-10 rounded-full" />
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-black to-zinc-950/10">
    <h3 className="syncopate text-[13px] tracking-[0.5em] text-zinc-700 mb-8 uppercase font-bold">Let's Connect</h3>
    <h4 className="syncopate text-[clamp(48px,10vw,60px)] font-black mb-16 tracking-tighter uppercase leading-none text-zinc-100">
      HAVE A <br /> <span className="text-zinc-600 italic drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]">PROJECT?</span>
    </h4>
    <button className="group relative px-12 py-6 bg-zinc-100 text-black font-bold syncopate text-[12px] tracking-[0.3em] rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 uppercase">
      <span className="relative z-10 uppercase">START A CONVERSATION</span>
      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  </section>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-visible">
      <Hero />
      <WhatICreate />
      <SkillsSnapshot />
      <TechMarquee />
      <MiniAbout />
      <FinalCTA />
    </div>
  );
};

export default Home;