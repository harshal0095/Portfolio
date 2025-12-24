import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const steps = [
  { id: '01', title: 'IDEA', desc: 'Strategizing vision and core objectives.' },
  { id: '02', title: 'DESIGN', desc: 'Crafting pixel-perfect, interactive blueprints.' },
  { id: '03', title: 'BUILD', desc: 'Scalable development with clean architecture.' },
  { id: '04', title: 'SHIP', desc: 'Optimization and global deployment.' }
];

const Process: React.FC = () => {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const pathLength = lineRef.current!.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-6 md:px-24 bg-white/[0.01] relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden md:block">
          <svg width="100%" height="20" className="overflow-visible">
            <path 
              ref={lineRef}
              d="M 0 10 L 1200 10" 
              stroke="url(#gradient)" 
              strokeWidth="1.5" 
              fill="none" 
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#222" />
                <stop offset="100%" stopColor="#666" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 group text-center md:text-left">
            <div className="w-16 h-16 rounded-full bg-black border border-zinc-800 flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:border-zinc-500 transition-colors duration-500">
              <span className="syncopate text-[22px] font-bold text-zinc-800 group-hover:text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]">{step.id}</span>
            </div>
            <h4 className="syncopate text-[24px] font-bold mb-4 uppercase text-zinc-300">{step.title}</h4>
            <p className="text-zinc-600 text-[15px] font-light max-w-[250px] mx-auto md:mx-0 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;