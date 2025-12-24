import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Terminal, Database, Cloud, Cpu, Layout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FrontendViz = () => (
  <div className="relative w-full h-32 bg-zinc-900/40 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-800">
    <div className="flex gap-2">
      {[40, 60, 30, 50].map((h, i) => (
        <div key={i} className="w-8 bg-zinc-600/30 rounded-t-sm animate-pulse" style={{ height: `${h}px`, animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
    <div className="absolute inset-0 flex flex-col p-4 gap-2">
      <div className="w-1/2 h-2 bg-zinc-800 rounded animate-[width_2s_ease-in-out_infinite]" />
      <div className="w-3/4 h-2 bg-zinc-800/50 rounded animate-[width_2.5s_ease-in-out_infinite]" />
      <div className="w-1/3 h-2 bg-zinc-800 rounded animate-[width_1.8s_ease-in-out_infinite]" />
    </div>
  </div>
);

const BackendViz = () => (
  <div className="relative w-full h-32 bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center">
    <div className="absolute left-4 w-4 h-4 bg-zinc-600 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
    <div className="absolute right-4 w-4 h-4 bg-zinc-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
    <div className="w-full px-12 relative h-1 bg-zinc-800">
      <div className="absolute top-0 left-0 h-full w-4 bg-zinc-500 rounded-full animate-[move_3s_linear_infinite]" />
      <div className="absolute top-0 left-0 h-full w-2 bg-white rounded-full animate-[move_3s_linear_infinite_0.5s]" />
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes move {
        0% { left: 0%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { left: 100%; opacity: 0; }
      }
      @keyframes width {
        0%, 100% { transform: scaleX(0.8); }
        50% { transform: scaleX(1.2); }
      }
    `}} />
  </div>
);

const DatabaseViz = () => (
  <div className="relative w-full h-32 flex flex-col items-center justify-center gap-1">
    {[0.4, 0.6, 0.8, 1].map((op, i) => (
      <div 
        key={i} 
        className="w-24 h-4 rounded-full border border-zinc-700 bg-zinc-800/5 animate-bounce" 
        style={{ opacity: op, animationDelay: `${i * 0.1}s`, transform: `scale(${1 - i * 0.1})` }} 
      />
    ))}
  </div>
);

const DevOpsViz = () => (
  <div className="relative w-full h-32 flex items-center justify-center">
    <div className="w-20 h-20 border-4 border-dashed border-zinc-800 rounded-full animate-[spin_10s_linear_infinite]" />
    <div className="absolute w-16 h-16 border-2 border-zinc-700 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
    <Cloud className="absolute text-zinc-500 animate-pulse" size={24} />
  </div>
);

const NativeViz = () => (
  <div className="relative w-20 h-32 mx-auto bg-black border-2 border-zinc-800 rounded-2xl overflow-hidden p-2">
    <div className="w-full h-full bg-zinc-900/50 rounded-lg flex flex-col gap-2 p-1">
      <div className="w-full h-1/2 bg-zinc-800 rounded animate-pulse" />
      <div className="w-full h-4 bg-zinc-800 rounded" />
      <div className="w-full h-4 bg-zinc-800 rounded" />
    </div>
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-700 rounded-full" />
  </div>
);

const ToolsViz = () => (
  <div className="relative w-full h-32 flex items-center justify-center gap-4">
    <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded rotate-45 animate-bounce" />
    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full animate-pulse" />
    <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-tr-3xl animate-spin" />
  </div>
);

const skills = [
  { name: 'Frontend', desc: 'React, Next.js, Three.js, GSAP', icon: <Layout className="text-zinc-400 opacity-80" />, viz: <FrontendViz /> },
  { name: 'Backend', desc: 'Node.js, Go, Python, GraphQL', icon: <Terminal className="text-zinc-400 opacity-80" />, viz: <BackendViz /> },
  { name: 'Database', desc: 'PostgreSQL, MongoDB, Redis', icon: <Database className="text-zinc-400 opacity-80" />, viz: <DatabaseViz /> },
  { name: 'DevOps', desc: 'Docker, K8s, AWS, CI/CD', icon: <Cloud className="text-zinc-400 opacity-80" />, viz: <DevOpsViz /> },
  { name: 'Native', desc: 'React Native, Flutter, Swift', icon: <Layers className="text-zinc-400 opacity-80" />, viz: <NativeViz /> },
  { name: 'Tools', desc: 'Figma, Git, Postman, Jest', icon: <Cpu className="text-zinc-400 opacity-80" />, viz: <ToolsViz /> },
];

const SkillsHorizontal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const windowWidth = window.innerWidth;
      if (!containerRef.current || !triggerRef.current) {
        return () => {};
      }

      const pin = gsap.to(
        containerRef.current,
        {
          x: () => {
            const sw = containerRef.current?.scrollWidth ?? windowWidth;
            return -(sw - windowWidth);
          },
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => {
              const sw = containerRef.current?.scrollWidth ?? windowWidth;
              return `+=${sw - windowWidth + 200}`;
            },
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
      return () => pin.kill();
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set(containerRef.current, { clearProps: "all" });
      return () => {};
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-black/40">
      <div 
        ref={containerRef} 
        className="lg:h-screen flex flex-col lg:flex-row flex-nowrap items-center gap-12 px-6 md:px-24 w-full lg:w-max py-20 lg:py-0"
      >
        <div className="flex flex-col min-w-[100%] lg:min-w-[40vw] flex-shrink-0">
          <h3 className="syncopate text-[clamp(28px,5vw,32px)] font-black text-zinc-100 leading-none mb-4 uppercase">
            ENGINEERING STACK
          </h3>
          <p className="text-[15px] text-zinc-500 syncopate tracking-[0.3em] font-bold uppercase">
            A symphony of technical mastery.
          </p>
        </div>

        {skills.map((skill, idx) => (
          <div 
            key={idx}
            className="group relative min-w-[100%] lg:min-w-[32vw] flex-shrink-0 h-auto lg:h-[65vh] bg-white/[0.02] border border-zinc-800 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-between overflow-hidden transition-all duration-700 hover:bg-zinc-900/20 hover:border-zinc-500 lg:hover:scale-[1.01] mb-8 lg:mb-0"
          >
            <div className="z-10 flex justify-between items-start mb-8 lg:mb-0">
              <div className="bg-black/50 p-4 rounded-2xl border border-zinc-800 group-hover:border-zinc-600 transition-all duration-500">
                {React.cloneElement(skill.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <span className="syncopate text-[13px] text-zinc-800 tracking-widest uppercase py-1 px-3 border border-zinc-800 rounded-full font-bold">
                Module {idx + 1}
              </span>
            </div>
            
            <div className="z-10 py-6 lg:py-8">
              {skill.viz}
            </div>
            
            <div className="z-10 mt-6 lg:mt-0">
              <h4 className="syncopate text-[22px] font-bold mb-4 group-hover:text-zinc-100 transition-colors duration-500 text-zinc-400">{skill.name}</h4>
              <p className="text-zinc-500 text-[15px] font-light leading-relaxed max-w-full lg:max-w-[80%]">
                {skill.desc}
              </p>
            </div>

            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] lg:text-[200px] font-black text-white/[0.02] syncopate pointer-events-none select-none">
              {idx + 1}
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 via-transparent to-zinc-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsHorizontal;