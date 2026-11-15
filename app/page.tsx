import Navbar from "../components/Navbar";
import HeroShowreel from "../components/HeroShowreel";
import InfiniteMarquee from "../components/InfiniteMarquee";
import Projects from "../components/Projects";
import BentoOperations from "../components/BentoOperations";
import FadeUp from "../components/FadeUp";
import HiddenTerminal from "../components/HiddenTerminal";
import MusicWidget from "../components/MusicWidget";
import LiquidBackground from "../components/LiquidBackground";
import KeyboardShortcuts from "../components/KeyboardShortcuts";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-cyan-500/30 selection:text-white relative">
      {/* Efek Global */}
      <LiquidBackground />
      
      {/* Navigasi */}
      <Navbar />
      
      {/* Layer 1: Compact Hero + Bento Overview & HUD Dashboard */}
      <HeroShowreel />
      
      {/* Hairline Marquee Divider */}
      <InfiniteMarquee />

      {/* Layer 2: Works Archive & Operations Bento Console */}
      <div className="relative z-10 pb-16">
        <FadeUp delay={0.1}>
          <Projects />
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <BentoOperations />
        </FadeUp>
      </div>
      
      {/* Widget Melayang & Keyboard Shortcuts */}
      <HiddenTerminal />
      <MusicWidget />
      <KeyboardShortcuts />
    </div>
  );
}