import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  isTransitioning: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isTransitioning }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      gsap.to(overlayRef.current, {
        scaleY: 1,
        duration: 0.8,
        ease: "expo.inOut",
        transformOrigin: "bottom"
      });
    } else {
      gsap.to(overlayRef.current, {
        scaleY: 0,
        duration: 0.8,
        ease: "expo.inOut",
        transformOrigin: "top"
      });
    }
  }, [isTransitioning]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] scale-y-0 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-[1.5px] bg-zinc-600 animate-[width_1s_infinite]" />
        <span className="syncopate text-[11px] tracking-[0.8em] text-zinc-600 mt-4 uppercase font-bold text-center">INITIALIZING EXPERIENCE</span>
      </div>
    </div>
  );
};

export default PageTransition;