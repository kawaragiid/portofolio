import Navbar from "../components/Navbar";
import Expertise from "../components/Expertise";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import FadeUp from "../components/FadeUp";
import HeroShowreel from "../components/HeroShowreel";
import HiddenTerminal from "../components/HiddenTerminal";
import MusicWidget from "../components/MusicWidget"; // <--- 1. Import ini
import LiquidBackground from "../components/LiquidBackground";
import CustomCursor from "../components/CustomCursor";
import InfiniteMarquee from "../components/InfiniteMarquee";
import { LanguageProvider } from "../components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-gray-700 selection:text-white relative">
        <CustomCursor />
        <LiquidBackground />
        
        <Navbar />
        
        <HeroShowreel />

        <InfiniteMarquee />

        <div className="relative z-10">
          <FadeUp delay={0.2}>
            <Expertise />
          </FadeUp>
          <FadeUp delay={0.2}>
            <Projects />
          </FadeUp>
          <FadeUp delay={0.2}>
            <Experience />
          </FadeUp>
        </div>
        
        <HiddenTerminal />
        <MusicWidget /> {/* <--- 2. Pasang di sini */}

        <footer id="contact" className="border-t border-white/5 py-12 text-center relative z-10">
          <p className="text-gray-400 text-sm mb-4">
            Ready to build something together?
          </p>
          <a href="mailto:miftakhulilmi54@gmail.com" className="text-white hover:text-gray-300 font-medium transition-colors">
            miftakhulilmi54@gmail.com
          </a>
          <p className="text-gray-600 text-xs mt-8">
            © {new Date().getFullYear()} Miftakhul Ilmi. All rights reserved.
          </p>
        </footer>
      </div>
    </LanguageProvider>
  );
}