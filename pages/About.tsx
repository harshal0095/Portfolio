import React, { useEffect, useRef } from 'react';
import paramImg from '../image/Param.png';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight,
  MonitorCheck,
  Clock,
  MessageSquare,
  Calendar,
  MapPin,
  Briefcase,
  Target
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.from(".about-hero-sub", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" })
      .from(".about-hero-title", { y: 40, opacity: 0, duration: 1, ease: "expo.out" }, "-=0.4")
      .from(".about-hero-tag", { opacity: 0, letterSpacing: "0.2em", duration: 1, ease: "power2.out" }, "-=0.6");

      gsap.to(".parallax-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.utils.toArray('.section-header').forEach((header: any) => {
        gsap.from(header, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: { trigger: header, start: "top 92%", toggleActions: "play none none none" }
        });
      });

      const stats = [
        { el: ".stat-number-1", target: 6 },
        { el: ".stat-number-2", target: 45 },
        { el: ".stat-number-3", target: 18 },
        { el: ".stat-number-4", target: 24 }
      ];

      stats.forEach(stat => {
        gsap.fromTo(stat.el, { innerText: 0 }, {
            innerText: stat.target,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: "power1.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 85%" }
          }
        );
      });

      gsap.from(".approach-step", {
        y: 25,
        opacity: 0, stagger: 0.15, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".approach-list", start: "top 82%" }
      });

      gsap.from(".ethic-content", {
        y: 20, opacity: 0, stagger: 0.15, duration: 0.7,
        scrollTrigger: { trigger: ".ethic-section", start: "top 85%" }
      });

      gsap.from(".fact-item", {
        y: 15, opacity: 0, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: ".fact-grid", start: "top 95%" }
      });

    }, containerRef.current);
    return () => ctx.revert();
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div ref={containerRef} className="bg-black text-zinc-100 w-full overflow-x-hidden selection:bg-zinc-800/60">
      <section className="relative min-h-[85vh] md:min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="about-hero-sub syncopate text-zinc-700 text-[13px] tracking-[0.8em] mb-8 uppercase font-bold text-center md:text-left">
            The Identity
          </h2>
          <h1 className="about-hero-title syncopate text-[clamp(40px,8vw,52px)] font-black leading-tight tracking-tighter mb-10 text-center md:text-left uppercase text-zinc-100">
            ABOUT <span className="text-zinc-800 italic">HARSHAL.</span>
          </h1>
          <p className="about-hero-tag text-[14px] text-zinc-600 font-light tracking-[0.4em] uppercase syncopate text-center md:text-left font-bold">
            Engineering Excellence Through Human-Centric Code
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="parallax-container relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[380px] mx-auto rounded-2xl md:rounded-[3rem] lg:rounded-[4rem] overflow-hidden border border-zinc-900 group shadow-2xl order-2 lg:order-1">
            <img
              src={paramImg}
              alt="Harshal portrait"
              className="parallax-img absolute inset-0 w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </div>
          <div className="space-y-6 md:space-y-12 order-1 lg:order-2">
            <div className="section-header">
              <h2 className="syncopate text-zinc-600 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold">The Narrative</h2>
              <h3 className="syncopate text-[clamp(24px,4vw,32px)] font-black leading-tight uppercase text-zinc-100">BEYOND PIXELS</h3>
            </div>
            <div className="space-y-6 text-[16px] text-zinc-500 font-light leading-relaxed">
              <p>My passion for development isn't just about syntax and servers; it's about the <span className="text-zinc-100 font-medium">architecture of emotion.</span> I believe clean code is the invisible art form that powers our modern reality.</p>
              <p>I thrive at the intersection of logical rigor and aesthetic intuition. Every product I build is a balanced equation of <span className="text-zinc-400 font-medium">performance</span> and <span className="text-zinc-100/70 font-medium">user delight.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-zinc-900/10 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {[
            { label: "Years Exp", suffix: "+", class: "stat-number-1" },
            { label: "Projects Completed", suffix: "+", class: "stat-number-2" },
            { label: "Tech Mastered", suffix: "+", class: "stat-number-3" },
            { label: "Happy Partners", suffix: "+", class: "stat-number-4" }
          ].map((stat, i) => (
            <div key={i} className="text-center group border-r border-zinc-900 last:border-0 pr-4 md:pr-0">
              <div className="flex justify-center items-end mb-2 md:mb-6">
                <span className={`${stat.class} syncopate text-[clamp(30px,4.5vw,42px)] font-black group-hover:text-zinc-100 transition-colors leading-none text-zinc-400`}>0</span>
                <span className="syncopate text-[16px] font-black text-zinc-700 mb-1 ml-1">{stat.suffix}</span>
              </div>
              <p className="syncopate text-[11px] tracking-[0.3em] text-zinc-600 uppercase font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white/[0.01] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
          <div className="section-header lg:sticky lg:top-40 h-fit">
            <h2 className="syncopate text-zinc-600 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold">The Protocol</h2>
            <h3 className="syncopate text-[clamp(24px,4vw,32px)] font-black uppercase tracking-tighter text-zinc-100">MY APPROACH</h3>
          </div>
          <div className="approach-list space-y-12 md:space-y-20 relative">
            {[
              { id: "01", title: "Discovery", desc: "Immersion into the problem space to find the core leverage points." },
              { id: "02", title: "Solution Design", desc: "Mapping blueprints where logic meets human intuition." },
              { id: "03", title: "Precision Build", desc: "Developing with a modular mindset and performance-first engineering." },
              { id: "04", title: "Optimize", desc: "Iterative auditing for speed, security, and accessibility." },
              { id: "05", title: "Scale", desc: "Deploying to the cloud with robust CI/CD monitoring." }
            ].map((step, i) => (
              <div key={i} className="approach-step flex gap-6 md:gap-10 group">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full bg-black border border-zinc-800 flex items-center justify-center syncopate text-md font-bold text-zinc-600 group-hover:bg-zinc-100 group-hover:text-black transition-all duration-500">
                  {step.id}
                </div>
                <div className="pt-2 md:pt-4">
                  <h4 className="syncopate text-[17px] font-bold mb-3 uppercase tracking-tight text-zinc-300">{step.title}</h4>
                  <p className="text-zinc-600 text-[14px] leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ethic-section py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-zinc-900/10 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
           <div className="section-header ethic-content">
             <h2 className="syncopate text-zinc-600 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold">Standards</h2>
             <h3 className="syncopate text-[24px] font-black uppercase tracking-tight text-zinc-100">WORK ETHIC</h3>
           </div>
           <div className="space-y-10">
              {[
                { title: "OWNERSHIP MINDSET", icon: <MonitorCheck className="text-zinc-600" />, desc: "I treat every codebase as if I'm the end-user. Taking full accountability means never settling for 'good enough'." },
                { title: "COLLABORATION", icon: <MessageSquare className="text-zinc-600" />, desc: "Software is a team sport. I prioritize concise documentation and proactive communication." },
                { title: "DEADLINE DISCIPLINE", icon: <Clock className="text-zinc-600" />, desc: "Time is non-renewable. I manage projects with a strict eye on efficiency and milestones." }
              ].map((ethic, i) => (
                <div key={i} className="ethic-content group">
                   <h4 className="syncopate text-[15px] font-bold mb-4 flex items-center gap-4 transition-colors group-hover:text-zinc-300 text-zinc-100">
                     {React.cloneElement(ethic.icon as React.ReactElement<any>, { size: 18 })} {ethic.title}
                   </h4>
                   <p className="text-zinc-600 text-[14px] leading-relaxed">{ethic.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 text-center">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          <div className="section-header">
            <h2 className="syncopate text-zinc-700 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold text-center">Ecosystem</h2>
            <h3 className="syncopate text-[clamp(24px,4vw,32px)] font-black uppercase tracking-tighter text-zinc-100">ALWAYS LEARNING</h3>
          </div>
          <p className="text-[clamp(18px,2vw,24px)] font-light text-zinc-600 leading-relaxed italic py-8 border-x border-zinc-900 px-6">
            "The moment an engineer stops learning, they start becoming legacy. I spend 10+ hours a week exploring the latest in <span className="text-zinc-400 font-medium">Rust</span>, <span className="text-zinc-100 font-medium">WebGL</span>, and <span className="text-zinc-500 font-medium">AI orchestration</span>."
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-white/[0.01] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
           <div className="section-header mb-12">
              <h2 className="syncopate text-zinc-600 text-[12px] tracking-[0.6em] mb-6 uppercase font-bold">Essentials</h2>
              <h3 className="syncopate text-[24px] font-black uppercase text-zinc-100">QUICK FACTS</h3>
           </div>
           <div className="fact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Location", value: "SF / Remote Worldwide", icon: <MapPin /> },
                { label: "Work Model", value: "Contract / Full-time", icon: <Briefcase /> },
                { label: "Current Focus", value: "Creative Tech & Scale", icon: <Target /> },
                { label: "Available From", value: "Q2 2024", icon: <Calendar /> }
              ].map((fact, i) => (
                <div key={i} className="fact-item p-6 bg-zinc-900/10 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-zinc-700 transition-all group">
                   <div className="text-zinc-600 mb-4 transition-transform group-hover:scale-110">{React.cloneElement(fact.icon as React.ReactElement<any>, { size: 20 })}</div>
                   <h5 className="syncopate text-[11px] text-zinc-700 uppercase mb-2 tracking-widest font-bold">{fact.label}</h5>
                   <p className="text-[14px] font-bold uppercase tracking-tight text-zinc-400">{fact.value}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center bg-gradient-to-t from-zinc-950/10 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="about-hero-sub syncopate text-zinc-600 text-[12px] tracking-[0.8em] mb-8 uppercase font-bold text-center">Initiate Connection</h2>
          <h3 className="syncopate text-[clamp(36px,7vw,48px)] font-black mb-12 leading-none tracking-tighter uppercase text-zinc-100">LET'S BUILD <span className="text-zinc-600 italic drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">MEANINGFUL.</span></h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticReset} className="w-full sm:w-auto px-10 py-5 bg-zinc-100 text-black font-bold syncopate text-[11px] tracking-[0.3em] rounded-full transition-transform uppercase shadow-[0_0_30px_rgba(255,255,255,0.05)]">HIRE ME NOW</button>
            <button onMouseMove={handleMagneticMove} onMouseLeave={handleMagneticReset} className="w-full sm:w-auto px-10 py-5 border border-zinc-800 text-zinc-100 syncopate text-[11px] tracking-[0.3em] rounded-full hover:bg-zinc-100 hover:text-black transition-all uppercase font-bold flex items-center justify-center gap-4">VIEW PROJECTS <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;