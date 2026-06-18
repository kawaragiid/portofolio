"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HiddenTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to Ilmi.OS v2.0' },
    { type: 'system', text: 'Tap a command below or type manually.' }
  ]);

  const quickCommands = ["help", "about", "skills", "contact", "clear"];

  useEffect(() => {
    const handleScroll = () => {
      // Cek apakah ini layar HP (lebar di bawah 768px)
      const isMobile = window.innerWidth < 768;
      // Bergeser HANYA jika sedang di-scroll DAN di layar HP
      setIsScrolled(window.scrollY > 50 && isMobile);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmedCmd) {
      case 'help':
        response = 'Available commands: about, skills, contact, clear, sudo';
        break;
      case 'about':
        response = 'Ilmi - Trilingual Subtitler & Video Editor.';
        break;
      case 'skills':
        response = 'CapCut, OpenWrt, Python, VS Code, Canva, Node.js, Subtitle Edit.';
        break;
      case 'contact':
        response = 'Email: miftakhulilmi54@gmail.com';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        response = 'Nice try. This incident will be reported.';
        break;
      case '':
        return;
      default:
        response = `Command not found: ${trimmedCmd}. Tap "help" for a list.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'user', text: `guest@ilmi:~$ ${cmd}` },
      { type: 'system', text: response }
    ]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed z-[9999] flex flex-col font-mono text-sm overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
              max-md:inset-x-4 max-md:top-[15%] max-md:bottom-[15%] max-md:rounded-3xl
              md:bottom-6 md:right-6 md:w-[600px] md:h-[400px] md:rounded-2xl"
          >
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex gap-2">
                <div 
                  className="w-3.5 h-3.5 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 flex items-center justify-center transition-colors" 
                  onClick={() => setIsOpen(false)} 
                >
                  <span className="opacity-0 hover:opacity-100 text-[8px] font-bold text-red-900">x</span>
                </div>
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Terminal</div>
              <div className="w-10"></div>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              {quickCommands.map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/10 rounded-full text-xs text-gray-300 font-semibold tracking-wider whitespace-nowrap transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div 
              ref={terminalRef}
              className="p-4 flex-1 overflow-y-auto scrollbar-hide text-green-400 space-y-3"
            >
              {history.map((line, i) => (
                <div key={i} className={`${line.type === 'user' ? 'text-white' : 'text-cyan-400'} leading-relaxed`}>
                  {line.text}
                </div>
              ))}
              
              <form onSubmit={onSubmit} className="flex items-center mt-4">
                <span className="text-white mr-2">guest@ilmi:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-700/50"
                  autoFocus
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: isScrolled && !isOpen ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        // Di PC, md:hidden kita HAPUS. Tapi kita ganti dengan layout responsif biasa.
        className={`fixed bottom-6 right-6 z-[9997] md:block flex flex-col items-end transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 text-cyan-400 font-mono font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          aria-label="Buka Terminal"
        >
          {">_"}
        </motion.button>
      </motion.div>
    </>
  );
}