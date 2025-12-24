import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.innerText.split('') || [];
      if (titleRef.current) {
          titleRef.current.innerHTML = chars.map(c => `<span class="char inline-block opacity-0 translate-y-20 rotate-12">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      }

      const tl = gsap.timeline();

      tl.from(bgRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 2,
        ease: 'power4.out'
      });

      tl.to(titleRef.current?.querySelectorAll('.char') || [], {
        opacity: 1,
        y: 0,
        rotate: 0,
        stagger: 0.04,
        duration: 1.2,
        ease: 'expo.out'
      }, '-=1.5')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out'
      }, '-=0.8');

      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        opacity: 0.2,
        scale: 0.95
      });
    }, containerRef.current);

    return () => ctx.revert();

  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_0%,_transparent_70%)] opacity-50" />
      </div>

      <div className="z-10 text-center">
        <p className="syncopate text-[clamp(13px,1.5vw,14px)] tracking-[0.6em] text-zinc-400 mb-8 opacity-80 uppercase font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
          High Performance Engineering
        </p>
        <h1 
          ref={titleRef}
          className="syncopate text-[clamp(48px,10vw,60px)] font-black leading-tight tracking-tighter text-zinc-100"
        >
          HARSHAL
        </h1>
        <div 
          ref={subtitleRef}
          className="mt-12 text-[clamp(16px,2vw,18px)] font-light text-zinc-500 max-w-3xl mx-auto opacity-0 translate-y-10 leading-relaxed"
        >
          A cinematic full-stack engineer bridging the gap <br className="hidden md:block" /> between <span className="text-zinc-100">technical complexity</span> and <span className="text-zinc-400 italic">immersive design</span>.
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-800 animate-bounce">
        <span className="text-[13px] syncopate tracking-[0.4em] uppercase font-bold">Discover</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
};

export default Hero;