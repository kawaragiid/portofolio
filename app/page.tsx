import Navbar from "../components/Navbar";
import TransitJourneyMap from "../components/TransitJourneyMap";
import HiddenTerminal from "../components/HiddenTerminal";
import MusicWidget from "../components/MusicWidget";
import KeyboardShortcuts from "../components/KeyboardShortcuts";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-50 font-sans selection:bg-cyan-500/30 selection:text-white relative overflow-x-clip">
      {/* Navigasi Utama */}
      <Navbar />

      {/* VisionQuest Pure Obsidian Minimalist Zig-Zag Transit Map */}
      <TransitJourneyMap />

      {/* Widget Pendukung (Terminal AI, Musik, Keyboard Shortcuts) */}
      <HiddenTerminal />
      <MusicWidget />
      <KeyboardShortcuts />
    </div>
  );
}