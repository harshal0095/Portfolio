import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-24 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="syncopate text-[clamp(48px,10vw,60px)] font-black mb-12 uppercase leading-tight text-zinc-100">GET IN <br /><span className="text-zinc-600 italic drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">TOUCH</span></h2>
            <p className="text-[clamp(16px,1.5vw,18px)] text-zinc-500 font-light mb-12 max-w-md leading-relaxed">
              Have a bold vision? Let's build something exceptional together. 
              Currently accepting selected projects for 2024.
            </p>
            
            <div className="space-y-6">
              <div className="group">
                <span className="block text-[13px] syncopate text-zinc-700 uppercase mb-2 tracking-widest font-bold">Email</span>
                <a href="mailto:hello@harshal.dev" className="text-[22px] text-zinc-400 hover:text-zinc-100 transition-colors">hello@harshal.dev</a>
              </div>
              <div className="group">
                <span className="block text-[13px] syncopate text-zinc-700 uppercase mb-2 tracking-widest font-bold">Social</span>
                <div className="flex gap-6 mt-4">
                  {['Twitter', 'LinkedIn', 'Github'].map(s => (
                    <a key={s} href="#" className="text-[13px] syncopate tracking-widest text-zinc-600 hover:text-zinc-100 transition-colors uppercase font-bold">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-8 bg-white/[0.01] p-8 md:p-12 rounded-[2.5rem] border border-zinc-900 backdrop-blur-3xl">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-transparent border-b border-zinc-900 py-4 focus:border-zinc-600 focus:outline-none transition-all placeholder:text-zinc-800 text-[16px]"
              />
            </div>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-zinc-900 py-4 focus:border-zinc-600 focus:outline-none transition-all placeholder:text-zinc-800 text-[16px]"
              />
            </div>
            <div className="relative group">
              <textarea 
                rows={4} 
                placeholder="Project Details" 
                className="w-full bg-transparent border-b border-zinc-900 py-4 focus:border-zinc-600 focus:outline-none transition-all placeholder:text-zinc-800 resize-none text-[16px]"
              />
            </div>
            
            <button className="w-full py-6 bg-zinc-100 text-black font-bold syncopate tracking-[0.2em] rounded-2xl flex items-center justify-center gap-4 hover:bg-white hover:scale-[0.98] transition-all duration-300 text-[13px]">
              SEND MESSAGE <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;