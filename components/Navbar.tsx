import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { gsap } from 'gsap';
import { PageID } from '../App';

interface NavbarProps {
  currentPage: PageID;
  onNavigate: (page: PageID) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);

  const navItems: { label: string; id: PageID }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: "expo.out",
      });
      tl.fromTo(menuLinksRef.current?.querySelectorAll('button') || [], 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.6,
        ease: "expo.in",
      });
    }
  }, [isMenuOpen]);

  const handleNavigate = (id: PageID) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[9999] flex items-center justify-between px-6 md:px-12 py-6 md:py-8 pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={() => handleNavigate('home')}
            className="syncopate font-black text-[20px] md:text-[24px] tracking-tighter hover:text-zinc-400 transition-all uppercase text-zinc-100"
          >
            HP.
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8 pointer-events-auto bg-black/60 backdrop-blur-2xl px-8 py-4 rounded-full border border-zinc-900 shadow-2xl">
          {navItems.map(item => (
            <button 
              key={item.id} 
              onClick={() => handleNavigate(item.id)}
              className={`syncopate text-[11px] tracking-[0.3em] uppercase transition-all relative group font-bold ${
                currentPage === item.id ? 'text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white opacity-60" />
              )}
            </button>
          ))}
        </div>

        <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
          <button className="hidden sm:flex items-center gap-2 syncopate text-[11px] tracking-widest text-zinc-500 border border-zinc-800 px-6 py-3 rounded-full hover:bg-zinc-100 hover:text-black transition-all uppercase font-bold">
            <FileText size={13} /> RESUME.PDF
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-4 bg-white/5 backdrop-blur-md rounded-full border border-zinc-900 hover:bg-zinc-800 transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} className="text-zinc-100" /> : <Menu size={24} className="text-zinc-100" />}
          </button>
        </div>
      </nav>

      <div 
        ref={menuRef}
        className="fixed inset-0 z-[9998] bg-[#050505] translate-x-full lg:hidden flex flex-col justify-center px-10"
      >
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
        </div>

        <div ref={menuLinksRef} className="flex flex-col gap-8 md:gap-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="group flex items-baseline gap-6 text-left"
            >
              <span className="syncopate text-[14px] text-zinc-800 font-bold opacity-40 group-hover:opacity-100 transition-opacity uppercase">
                0{navItems.indexOf(item) + 1}
              </span>
              <span className={`syncopate text-[clamp(28px,8vw,48px)] font-black transition-all group-hover:pl-4 group-hover:text-white uppercase ${
                currentPage === item.id ? 'text-zinc-100' : 'text-zinc-900'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-col gap-6">
          <p className="syncopate text-[11px] tracking-[0.5em] text-zinc-800 uppercase font-bold">Connection</p>
          <div className="flex gap-8">
            {['Twitter', 'Github', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="syncopate text-[11px] tracking-widest text-zinc-600 hover:text-zinc-100 transition-colors uppercase font-bold">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;