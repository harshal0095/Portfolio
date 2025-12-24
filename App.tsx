import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar';
import WebGLBackground from './components/WebGLBackground';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Experience from './pages/Experience';

// Register plugins and set globals to prevent ReferenceErrors
gsap.registerPlugin(ScrollTrigger);
(window as any).gsap = gsap;
(window as any).ScrollTrigger = ScrollTrigger;

// Fix: Added 'experience' to the PageID union to match its usage in WebGLBackground and other components
export type PageID = 'home' | 'about' | 'skills' | 'projects' | 'contact' | 'experience';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageID>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis - Configure for native-like smooth feel
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const navigateTo = useCallback((page: PageID) => {
    if (page === currentPage || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(page);
      
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        setTimeout(() => {
          setIsTransitioning(false);
          ScrollTrigger.refresh();
        }, 600);
      });
    }, 800); 
  }, [currentPage, isTransitioning]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'skills': return <Skills />;
      case 'projects': return <Projects />;
      case 'experience': return <Experience />;
      case 'contact': return <Contact />;
      default: return <Home />;
    }
  };

  return (
    <div className="relative bg-black selection:bg-zinc-800/80 min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <CustomCursor />
      <WebGLBackground page={currentPage} />
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      
      <PageTransition isTransitioning={isTransitioning} />

      <main key={currentPage} className="relative z-10 pt-24 min-h-screen overflow-visible">
        {renderPage()}
      </main>
      
      <Footer />
      <Analytics />
    </div>
  );
};

export default App;