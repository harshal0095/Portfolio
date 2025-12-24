import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Github, Zap, ChevronDown, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "NEOSIS", category: "AI ENGINE", description: "State-of-the-art neural engine for generative art and predictive analytics. High-performance inference at the edge.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80", tech: ['Rust', 'PyTorch', 'WebGL'], featured: true, liveUrl: "https://www.instagram.com/reel/DSjgKGUkrDu/?igsh=MTFwYThrMWo0aTE2NQ%3D%3D" },
  { id: 2, title: "VORTEX", category: "SaaS PLATFORM", description: "Unified cloud orchestration platform for high-performance computing clusters and container management.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80", tech: ['Golang', 'Kubernetes', 'AWS'], featured: true, liveUrl: "https://vortex.example.com" },
  { id: 3, title: "ETHOS", category: "WEB3 ECOSYSTEM", description: "Secure, decentralized asset management with biometric encryption and zero-knowledge proofs.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80", tech: ['Solidity', 'Ethers.js', 'Node.js'], featured: true, liveUrl: "https://ethos.example.com" },
  { id: 4, title: "ZENITH", category: "E-COMMERCE", description: "Hyper-fast headless commerce platform with 100/100 Lighthouse performance scores.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80", tech: ['Next.js', 'Shopify', 'Tailwind'], featured: false, liveUrl: "https://zenith.example.com" },
  { id: 5, title: "PULSE", category: "ADMIN ENGINE", description: "Real-time analytics dashboard for monitoring distributed server networks globally.", image: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&w=1000&q=80", tech: ['React', 'D3.js', 'Socket.io'], featured: false, liveUrl: "https://pulse.example.com" },
  { id: 6, title: "ORBIT", category: "BOOKING SYSTEM", description: "Enterprise-level reservation platform for luxury travel agencies and hospitality.", image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&w=1000&q=80", tech: ['Vue', 'Express', 'MongoDB'], featured: false, liveUrl: "https://orbit.example.com" },
  { id: 7, title: "SPECTRA", category: "ANIMATION TOOL", description: "A framework-agnostic physics-based animation library for modern web applications.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80", tech: ['JS', 'Physics', 'Canvas'], featured: false, liveUrl: "https://spectra.example.com" },
  { id: 8, title: "NEXUS", category: "COLLABORATION", description: "End-to-end encrypted real-time document editing and workspace tool for remote teams.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80", tech: ['WebRTC', 'Tiptap', 'Redis'], featured: false, liveUrl: "https://nexus.example.com" },
  { id: 9, title: "TITAN", category: "API GATEWAY", description: "High-throughput edge gateway with automated rate-limiting and threat detection.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&w=1000&q=80", tech: ['C++', 'Lua', 'Nginx'], featured: false, liveUrl: "https://titan.example.com" },
  { id: 10, title: "LUMEN", category: "CMS", description: "A developer-first content management system for global multi-tenant deployments.", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=80", tech: ['TypeScript', 'GraphQL', 'S3'], featured: false, liveUrl: "https://lumen.example.com" },
  { id: 11, title: "AURA", category: "MOBILE APP", description: "Biometric-driven wellness and meditation app for high-performance athletes.", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1000&q=80", tech: ['React Native', 'Firebase'], featured: false, liveUrl: "https://aura.example.com" },
  { id: 12, title: "QUANTUM", category: "DATA ENGINE", description: "Real-time big data processing engine for high-frequency financial markets.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80", tech: ['Apache Flink', 'Scala'], featured: false, liveUrl: "https://quantum.example.com" },
  { id: 13, title: "AEGIS", category: "SECURITY SUITE", description: "Automated vulnerability scanning and threat remediation platform.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80", tech: ['Python', 'Docker'], featured: false, liveUrl: "https://aegis.example.com" },
  { id: 14, title: "SYNERGY", category: "CRM PLATFORM", description: "Next-gen relationship management with predictive AI lead scoring.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", tech: ['Next.js', 'Prisma', 'OpenAI'], featured: false, liveUrl: "https://synergy.example.com" }
];

const categories = ["ALL", "AI ENGINE", "SaaS PLATFORM", "WEB3 ECOSYSTEM", "E-COMMERCE", "MOBILE APP", "SECURITY SUITE"];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });

      gsap.utils.toArray('.reveal-on-scroll').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            onComplete: () => gsap.set(el, { clearProps: "transform" })
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef.current);

    return () => ctx.revert();
  }, [activeFilter]);

  const openProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const featuredOnes = filteredProjects.filter(p => p.featured);
  const gridOnes = filteredProjects.filter(p => !p.featured);

  return (
    <div ref={containerRef} className="bg-black text-zinc-100 w-full min-h-screen">
      <section className="relative h-[80vh] flex flex-col justify-center px-6 md:px-24 overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_0%,_transparent_70%)] opacity-10 animate-pulse" />
        </div>
        
        <div className="max-w-7xl">
          <h2 className="hero-text syncopate text-zinc-600 text-[13px] tracking-[0.6em] mb-6 uppercase font-bold">Project Archive 2024</h2>
          <h1 className="hero-text syncopate text-[clamp(48px,10vw,60px)] font-black leading-tight tracking-tighter mb-10 uppercase text-zinc-100">
            THE <span className="text-zinc-800 italic">REPOSITORY</span>
          </h1>
          <p className="hero-text text-[clamp(15px,1.5vw,17px)] text-zinc-500 font-light leading-relaxed max-w-2xl mb-12">
            A curated showcase of architectural excellence, bridging the gap between high-performance backends 
            and immersive, minimal front-end experiences.
          </p>
          
          <div className="hero-text flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full syncopate text-[12px] tracking-widest transition-all duration-300 border ${
                  activeFilter === cat 
                    ? "bg-zinc-100 border-zinc-100 text-black font-bold" 
                    : "bg-white/5 border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-800 animate-bounce">
          <span className="text-[13px] syncopate tracking-widest uppercase font-bold">Scroll to Explore</span>
          <ChevronDown size={14} />
        </div>
      </section>

      <section className="py-24 px-6 md:px-24">
        <div className="mb-16 flex items-center justify-between">
           <div>
              <h2 className="syncopate text-zinc-600 text-[13px] tracking-[0.5em] mb-4 uppercase font-bold">Highlights</h2>
              <h3 className="syncopate text-[clamp(28px,5vw,32px)] font-black text-zinc-100">FEATURED WORKS</h3>
           </div>
           <div className="hidden md:block w-32 h-[1px] bg-zinc-900" />
        </div>

        <div className="space-y-32">
          {featuredOnes.map((p, idx) => (
            <div 
              key={p.id} 
              className={`reveal-on-scroll flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group cursor-pointer transition-all duration-500 hover:-translate-y-2`}
              onClick={() => openProject(p)}
            >
              <div className="flex-1 w-full">
                <div 
                  className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-zinc-900 bg-white/5"
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-105" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/30 border border-zinc-700 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                      <Zap className="text-zinc-100" size={24} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <span className="syncopate text-[12px] tracking-widest text-zinc-700 font-bold uppercase">{p.category}</span>
                <h4 className="syncopate text-[clamp(28px,4vw,36px)] font-bold group-hover:text-white group-hover:-translate-y-2 transition-all duration-500 text-zinc-100">{p.title}</h4>
                <p className="text-zinc-500 text-[16px] font-light leading-relaxed max-w-xl">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  {p.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-mono text-zinc-400 uppercase">{t}</span>
                  ))}
                </div>
                <div className="flex gap-6 pt-8">
                  <button className="px-10 py-4 bg-zinc-900 text-zinc-100 border border-zinc-800 font-bold syncopate text-[12px] tracking-widest rounded-xl hover:bg-zinc-800 transition-all uppercase shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    Explore Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-24 bg-zinc-900/10 border-y border-zinc-900">
        <div className="mb-20">
          <h2 className="syncopate text-zinc-600 text-[13px] tracking-[0.5em] mb-4 uppercase font-bold">Discovery</h2>
          <h3 className="syncopate text-[clamp(28px,5vw,32px)] font-black uppercase text-zinc-100">THE ARCHIVE</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridOnes.map((p) => (
            <div 
              key={p.id} 
              className="reveal-on-scroll group bg-white/[0.01] border border-zinc-900 rounded-[2rem] p-6 hover:bg-zinc-900/20 hover:border-zinc-700 hover:-translate-y-3 transition-all duration-500 cursor-pointer"
              onClick={() => openProject(p)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-zinc-900 bg-white/5">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-4">
                <span className="syncopate text-[12px] tracking-[0.3em] text-zinc-700 font-bold uppercase">{p.category}</span>
                <h5 className="syncopate text-[22px] font-bold group-hover:text-white group-hover:-translate-y-1 transition-all duration-500 uppercase text-zinc-100">{p.title}</h5>
                <p className="text-zinc-600 text-[14px] leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-zinc-900">
                  <div className="flex gap-2">
                    {p.tech.slice(0, 2).map(t => (
                      <span key={t} className="text-[11px] text-zinc-700 font-mono tracking-tighter uppercase">{t}</span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-zinc-500 group-hover:bg-zinc-800 transition-all duration-500">
                    <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-zinc-100" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={closeProject} />
          <div ref={modalRef} className="relative w-full h-full lg:max-w-7xl bg-[#0a0a0a] md:rounded-[2.5rem] border border-zinc-800 overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-black/40">
              <h4 className="syncopate text-[20px] font-bold text-zinc-400 tracking-tighter">{selectedProject.title}</h4>
              <button onClick={closeProject} className="p-3 bg-white/5 rounded-full hover:bg-zinc-800 transition-all">
                <X size={24} className="text-zinc-400" />
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-[2] bg-black p-4 md:p-12 flex items-center justify-center overflow-y-auto overscroll-contain scroll-smooth" data-lenis-prevent>
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden group border border-zinc-900 bg-white/[0.01]">
                  <img src={selectedProject.image} className="w-full h-full object-cover brightness-[0.3]" alt="Preview" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
                    <Zap className="text-zinc-600 mb-6 animate-pulse opacity-40" size={48} />
                    <h5 className="syncopate text-[18px] font-bold mb-6 tracking-tight text-zinc-100">ACTIVE INSTANCE</h5>
                    <button 
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      className="px-10 md:px-12 py-4 md:py-5 bg-zinc-100 text-black font-bold syncopate text-[12px] tracking-[0.4em] rounded-xl hover:bg-white hover:scale-105 active:scale-95 transition-all uppercase"
                    >
                      LAUNCH LIVE DEMO
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white/[0.01] border-l border-zinc-900 p-8 md:p-12 overflow-y-auto overscroll-contain scroll-smooth custom-scrollbar" data-lenis-prevent>
                <h5 className="syncopate text-[13px] tracking-[0.4em] text-zinc-600 mb-8 uppercase font-bold">The Architecture</h5>
                <p className="text-[17px] text-zinc-400 font-light leading-relaxed mb-12 italic border-l-2 border-zinc-900 pl-6">
                  "{selectedProject.description}"
                </p>
                
                <div className="space-y-12">
                  <div className="group">
                    <h6 className="syncopate text-[13px] tracking-widest text-zinc-600 uppercase mb-6 flex items-center gap-3 font-bold">
                      <Layers size={14} className="text-zinc-600" /> Technology Blueprint
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[12px] font-mono text-zinc-400 uppercase tracking-tight">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h6 className="syncopate text-[13px] tracking-widest text-zinc-600 uppercase mb-6 font-bold">Internal Specs</h6>
                    <p className="text-zinc-600 text-[13px] leading-relaxed font-mono p-6 bg-black rounded-2xl border border-zinc-900">
                      [INIT] Scaling nodes... OK<br/>
                      [BOOT] SSR complete... OK<br/>
                      [SYNC] State hydration... OK<br/>
                      [READY] Production environment live.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-zinc-900">
                    <button className="w-full py-5 border border-zinc-800 text-zinc-400 rounded-xl syncopate text-[12px] tracking-[0.4em] hover:bg-zinc-100 hover:text-black transition-all uppercase font-bold">
                       VIEW REPOSITORY SOURCE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="py-48 text-center px-6 bg-gradient-to-b from-black to-zinc-900/20">
        <h4 className="syncopate text-[13px] tracking-[0.8em] text-zinc-700 mb-8 uppercase font-bold">Engineering Future</h4>
        <h5 className="syncopate text-[clamp(48px,10vw,60px)] font-black mb-16 tracking-tighter leading-none uppercase text-zinc-100">
          READY TO <span className="text-zinc-600 italic">DISRUPT?</span>
        </h5>
        <button className="px-16 py-8 bg-zinc-100 text-black font-bold syncopate text-[14px] tracking-[0.4em] rounded-full hover:scale-110 hover:bg-white transition-all uppercase shadow-[0_20px_60px_-10px_rgba(255,255,255,0.05)]">
          Build With Me
        </button>
      </section>
    </div>
  );
};

export default Projects;