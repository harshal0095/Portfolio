import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = "Harshal Panchal";
    if (textRef.current) {
      textRef.current.innerHTML = name
        .split('')
        .map(char => `<span class="inline-block overflow-hidden align-bottom">
          <span class="load-char inline-block translate-y-[110%]">${char === ' ' ? '&nbsp;' : char}</span>
        </span>`)
        .join('');
    }

    const tl = gsap.timeline({
      onComplete: () => {
        const exitTl = gsap.timeline({ onComplete: onComplete });
        exitTl.to(lineRef.current, { scaleX: 0, opacity: 0, duration: 0.8, ease: "expo.inOut" });
        exitTl.to(".load-char", { y: "-110%", stagger: 0.01, duration: 0.9, ease: "expo.inOut" }, "-=0.6");
        exitTl.to(curtainRef.current, { yPercent: -100, duration: 1.4, ease: "expo.inOut" }, "-=0.5");
      }
    });

    tl.to(".load-char", { y: "0%", stagger: 0.05, duration: 1.8, ease: "power4.out", delay: 0.5 });
    tl.fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.4, duration: 2.2, ease: "expo.inOut" }, "-=1.4");
    tl.to(textRef.current, { scale: 1.03, duration: 4, ease: "sine.inOut" }, "-=1");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black pointer-events-auto">
      <div ref={curtainRef} className="absolute inset-0 bg-[#050505] z-0" />
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative mb-6 overflow-visible px-4">
          <h1 ref={textRef} className="serif italic text-[clamp(40px,8vw,60px)] font-light tracking-tight text-zinc-100 leading-none text-center select-none">
            Harshal Panchal
          </h1>
        </div>
        <div className="w-[60vw] max-w-[320px] h-[1px] relative overflow-hidden opacity-50">
          <div ref={lineRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-500 to-transparent origin-center" />
        </div>
        <div className="mt-10 overflow-hidden">
          <p className="load-char syncopate text-[13px] tracking-[0.6em] text-zinc-600 uppercase font-bold text-center">
            A New Standard in Engineering
          </p>
        </div>
      </div>
      <div className="absolute top-16 left-16 flex gap-4 opacity-10 hidden md:flex">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
      </div>
      <div className="absolute bottom-16 right-16 flex gap-4 opacity-10 hidden md:flex">
         <span className="syncopate text-[11px] tracking-[0.4em] font-bold uppercase text-zinc-700">LDR_MOD_01</span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `.load-char { will-change: transform; } .serif { font-family: 'Cormorant Garamond', serif; }` }} />
    </div>
  );
};

export default LoadingScreen;