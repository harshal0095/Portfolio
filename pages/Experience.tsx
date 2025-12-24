import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Sparkles, 
  Rocket 
} from 'lucide-react';
import Process from '../components/Process';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-step", {
        x: -20, opacity: 0, stagger: 0.1, duration: 0.7,
        scrollTrigger: { trigger: ".timeline-container", start: "top 85%" }
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pb-32 bg-black text-zinc-100 selection:bg-zinc-800/60">
       <div className="px-6 md:px-24 pt-20 mb-20">
          <h2 className="syncopate text-[13px] tracking-[0.5em] text-zinc-600 mb-4 uppercase font-bold">The Workflow</h2>
          <h3 className="syncopate text-[clamp(48px,10vw,60px)] font-black uppercase leading-tight text-zinc-100">MY PROCESS</h3>
       </div>
       <Process />

       <section className="py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="section-header mb-12 md:mb-24 lg:mb-32">
            <h2 className="syncopate text-zinc-700 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold">Evolution</h2>
            <h3 className="syncopate text-[clamp(24px,4vw,32px)] font-black uppercase tracking-tighter text-zinc-100">MY JOURNEY</h3>
          </div>
          <div className="timeline-container relative space-y-12 md:space-y-24 max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-900" />
            {[
              { year: "2018", title: "The Foundation", desc: "Started as a self-taught enthusiast, mastering modern layout principles. Built over 50 landing pages to refine precision.", icon: <GraduationCap /> },
              { year: "2020", title: "Full Stack Pivot", desc: "Graduated to complex logic with Node.js and SQL. Shipped first major SaaS MVP for a FinTech startup.", icon: <Code2 /> },
              { year: "2021", title: "Architecture Mastery", desc: "Dived deep into distributed systems. Led a team of engineers to refactor a legacy enterprise app.", icon: <Briefcase /> },
              { year: "2023", title: "Creative & Immersive", desc: "Focus shifted towards Three.js and high-end visual physics. Bridging storytelling and engineering.", icon: <Sparkles /> },
              { year: "Present", title: "Future Focused", desc: "Leading architectural decisions for scale-ready startups while pushing interaction boundaries.", icon: <Rocket /> }
            ].map((step, i) => (
              <div key={i} className={`timeline-step relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="pl-12 md:pl-0 md:w-1/2 flex flex-col items-start text-left">
                  <span className="syncopate text-[20px] font-bold text-zinc-500 mb-2">{step.year}</span>
                  <h4 className="syncopate text-[15px] font-bold mb-3 uppercase tracking-tight text-zinc-400">{step.title}</h4>
                  <p className="text-zinc-600 text-[14px] leading-relaxed font-light">{step.desc}</p>
                </div>
                <div className="absolute left-0 md:left-1/2 top-0 md:translate-x-[-50%] w-8 h-8 rounded-full bg-black border-2 border-zinc-700 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                   {React.cloneElement(step.icon as React.ReactElement<any>, { size: 14, className: 'text-zinc-500' })}
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
       
       <section className="px-6 md:px-24 py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { year: '2022-2024', role: 'Sr. Creative Developer', company: 'Digital Pulse' },
               { year: '2020-2022', role: 'Full Stack Engineer', company: 'Zenith Labs' },
               { year: '2018-2020', role: 'Frontend Lead', company: 'Vertex Studio' },
             ].map((exp, i) => (
               <div key={i} className="p-10 bg-zinc-900/10 border border-zinc-900 rounded-3xl hover:border-zinc-700 transition-all group">
                  <span className="text-zinc-700 syncopate text-[11px] tracking-widest font-bold">{exp.year}</span>
                  <h4 className="text-[22px] font-bold mt-4 mb-2 uppercase tracking-tight text-zinc-400 group-hover:text-zinc-100 transition-colors">{exp.role}</h4>
                  <p className="text-zinc-600 uppercase syncopate text-[11px] tracking-widest font-bold">{exp.company}</p>
               </div>
             ))}
          </div>
       </section>
    </div>
  );
};

export default Experience;