import Navbar from "../components/Navbar";
import Expertise from "../components/Expertise";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import FadeUp from "../components/FadeUp";
import HeroShowreel from "../components/HeroShowreel";
import HiddenTerminal from "../components/HiddenTerminal";
import MusicWidget from "../components/MusicWidget";
import LiquidBackground from "../components/LiquidBackground";
import InfiniteMarquee from "../components/InfiniteMarquee";
import Contact from "../components/Contact";
import StatsCounter from "../components/StatsCounter";
import InteractiveShowcase from "../components/InteractiveShowcase";
import Testimonials from "../components/Testimonials";
import KeyboardShortcuts from "../components/KeyboardShortcuts";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-cyan-500/30 selection:text-white relative">
      {/* Efek Global */}
      <LiquidBackground />
      
      {/* Navigasi */}
      <Navbar />
      
      {/* Bagian Atas */}
      <HeroShowreel />
      <StatsCounter />
      <InfiniteMarquee />

      {/* Konten Utama (dibungkus relative z-10 agar di atas background animasi) */}
      <div className="relative z-10 pb-24">
        <FadeUp delay={0.2}>
          <Expertise />
        </FadeUp>

        <FadeUp delay={0.2}>
          <InteractiveShowcase />
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <Projects />
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <Experience />
        </FadeUp>

        <FadeUp delay={0.2}>
          <Testimonials />
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <Contact />
        </FadeUp>
      </div>
      
      {/* Widget Melayang & Keyboard Shortcuts */}
      <HiddenTerminal />
      <MusicWidget />
      <KeyboardShortcuts />
    </div>
  );
}