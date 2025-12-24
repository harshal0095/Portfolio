import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(imageRef.current,
        { y: 100, scale: 1.1 },
        {
          y: -100,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-6 md:px-24 flex flex-col md:flex-row items-center gap-16 overflow-hidden">
      <div ref={textRef} className="flex-1 space-y-8 z-10">
        <h2 className="syncopate text-[clamp(28px,5vw,32px)] font-bold text-zinc-100 leading-tight">
          Beyond <span className="text-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Pixels</span>
        </h2>
        <p className="text-[clamp(16px,1.5vw,18px)] text-zinc-500 font-light leading-relaxed max-w-xl">
          I'm a full-stack engineer who believes that software should be as beautiful as it is functional. 
          With 6 years of experience, I bridge the gap between technical complexity and intuitive design.
        </p>
        <div className="grid grid-cols-2 gap-8 pt-8">
          <div>
            <h4 className="syncopate text-zinc-400 text-[13px] tracking-widest mb-2 uppercase font-bold opacity-80">Focused On</h4>
            <p className="text-[15px] text-zinc-300/80">Scalable Architectures</p>
          </div>
          <div>
            <h4 className="syncopate text-zinc-400 text-[13px] tracking-widest mb-2 uppercase font-bold opacity-80">Philosophy</h4>
            <p className="text-[15px] text-zinc-300/80">Immersive User Experience</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative aspect-[4/5] w-full max-w-md group">
        <div 
          ref={imageRef}
          className="w-full h-full overflow-hidden rounded-2xl border border-zinc-800"
        >
          <img 
            src="https://picsum.photos/id/1012/800/1000" 
            alt="Portrait" 
            className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
          />
        </div>
        <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-zinc-800/10 blur-[100px] rounded-full -z-10" />
      </div>
    </section>
  );
};

export default About;