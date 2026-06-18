import Navbar from "../components/Navbar";
import Expertise from "../components/Expertise";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import FadeUp from "../components/FadeUp";
import HeroShowreel from "../components/HeroShowreel";
import HiddenTerminal from "../components/HiddenTerminal";
import MusicWidget from "../components/MusicWidget";
import LiquidBackground from "../components/LiquidBackground";
import CustomCursor from "../components/CustomCursor";
import InfiniteMarquee from "../components/InfiniteMarquee";
import Contact from "../components/Contact";
import { LanguageProvider } from "../components/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-gray-700 selection:text-white relative">
        {/* Efek Global */}
        <CustomCursor />
        <LiquidBackground />
        
        {/* Navigasi */}
        <Navbar />
        
        {/* Bagian Atas */}
        <HeroShowreel />
        <InfiniteMarquee />

        {/* Konten Utama (dibungkus relative z-10 agar di atas background animasi) */}
        <div className="relative z-10 pb-24">
          <FadeUp delay={0.2}>
            <Expertise />
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <Projects />
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <Experience />
          </FadeUp>
          
          {/* Bagian Contact Baru (menggantikan footer lama) */}
          <FadeUp delay={0.2}>
            <Contact />
          </FadeUp>
        </div>
        
        {/* Widget Melayang (selalu di atas/fixed) */}
        <HiddenTerminal />
        <MusicWidget />
        
      </div>
    </LanguageProvider>
  );
}