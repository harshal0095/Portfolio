import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const bigLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-section", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".big-link-char", {
        y: "100%",
        stagger: 0.02,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: bigLinkRef.current,
          start: "top 90%",
        }
      });
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMagneticReset = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      ref={footerRef} 
      className="relative z-10 bg-[#020202] border-t border-zinc-900 pt-20 md:pt-32 pb-12 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-white/[0.005] blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="footer-section mb-24 md:mb-40">
          <p className="syncopate text-[12px] tracking-[0.5em] text-zinc-700 font-bold uppercase mb-8">
            HAVE A PROJECT IN MIND?
          </p>
          <a 
            ref={bigLinkRef}
            href="mailto:hello@harshal.dev"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticReset}
            className="group relative inline-block overflow-hidden"
          >
            <h2 className="syncopate text-[clamp(48px,10vw,60px)] font-black leading-none tracking-tighter transition-colors duration-500 group-hover:text-zinc-400 uppercase text-zinc-100">
              {"LET'S TALK.".split('').map((char, i) => (
                <span key={i} className="big-link-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-expo" />
          </a>
          <div className="mt-8 md:mt-12 flex flex-wrap gap-8 items-center">
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 opacity-60 animate-pulse" />
              <span className="syncopate text-[11px] tracking-widest text-zinc-500 font-bold">AVAILABLE FOR COLLAB</span>
            </div>
            <p className="text-zinc-600 text-[14px] max-w-sm font-light leading-relaxed">
              Open for creative collaborations, full-stack architecture roles, and forward-thinking digital products.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-24 md:mb-32">
          
          <div className="footer-section space-y-6">
            <h3 className="syncopate text-[18px] font-black tracking-tighter uppercase text-zinc-100">HARSHAL.</h3>
            <p className="text-zinc-600 text-[13px] font-light leading-relaxed max-w-[200px]">
              Cinematic Full Stack Engineer specializing in high-performance digital interfaces.
            </p>
            <div className="flex items-center gap-2 text-zinc-700 hover:text-zinc-400 transition-colors cursor-default">
              <Globe size={14} className="text-zinc-600" />
              <span className="text-[11px] syncopate tracking-widest font-bold">SF / GLOBAL REMOTE</span>
            </div>
          </div>

          <div className="footer-section space-y-6">
            <h4 className="syncopate text-[11px] tracking-[0.3em] text-zinc-800 font-bold uppercase">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
                <li key={link}>
                  <button className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-all text-[14px] font-light">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-zinc-500 transition-all duration-300" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section space-y-6">
            <h4 className="syncopate text-[11px] tracking-[0.3em] text-zinc-800 font-bold uppercase">Social</h4>
            <ul className="space-y-4">
              {[
                { label: 'LinkedIn', icon: <Linkedin size={13} /> },
                { label: 'Github', icon: <Github size={13} /> },
                { label: 'Twitter', icon: <Twitter size={13} /> }
              ].map(social => (
                <li key={social.label}>
                  <a href="#" className="group flex items-center gap-3 text-zinc-600 hover:text-zinc-300 transition-all text-[14px] font-light">
                    <span className="text-zinc-800 group-hover:text-zinc-400 transition-colors">{social.icon}</span>
                    {social.label}
                    <ArrowUpRight size={11} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section space-y-8">
            <div className="space-y-4">
              <h4 className="syncopate text-[11px] tracking-[0.3em] text-zinc-800 font-bold uppercase">Work With Me</h4>
              <p className="text-zinc-600 text-[13px] font-light">
                Want to discuss a project or just say hi?
              </p>
              <a 
                href="mailto:hello@harshal.dev"
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticReset}
                className="inline-flex items-center justify-center w-full py-4 bg-zinc-100 text-black font-bold syncopate text-[11px] tracking-widest rounded-xl hover:bg-white transition-all uppercase"
              >
                BOOK A CALL
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-zinc-800 text-[11px] tracking-[0.3em] syncopate uppercase font-bold">
              © {currentYear} HARSHAL PANCHAL
            </p>
            <div className="hidden md:block w-[1px] h-3 bg-zinc-900" />
            <p className="text-zinc-900 text-[10px] tracking-[0.2em] syncopate uppercase font-bold">
              Precision Architecture — Built for impact
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticReset}
              className="group flex items-center gap-3 text-zinc-700 hover:text-zinc-100 transition-colors"
            >
              <span className="syncopate text-[11px] tracking-widest font-bold uppercase">Back to Top</span>
              <div className="w-10 h-10 rounded-full border border-zinc-900 flex items-center justify-center group-hover:border-zinc-500 transition-all">
                <ArrowUp size={15} className="group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .ease-expo { transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
      `}} />
    </footer>
  );
};

export default Footer;