"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider'; 

export default function HiddenTerminal() {
  const { dict } = useLanguage();
  const t = dict.terminal;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [hasBooted, setHasBooted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  
  const [history, setHistory] = useState<{type: string, text: string}[]>([]);

  // Trik Menyuntikkan Tombol Rahasia Tanpa Mengedit Kamus Bahasa
  const allQuickCommands = [...t.quickCommands, 'specs', 'neofetch'];

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
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
  }, [history, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && !hasBooted) {
      setHasBooted(true);
      setIsTyping(true);
      
      let i = 0;
      const interval = setInterval(() => {
        setHistory(prev => [...prev, { type: 'system', text: t.boot[i] }]);
        i++;
        if (i >= t.boot.length) {
          clearInterval(interval);
          setIsTyping(false); 
        }
      }, 600); 
    }
  }, [isOpen, hasBooted, t.boot]);

  const handleCommand = (cmd: string) => {
    if (isTyping || !cmd.trim()) return;

    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'user', text: `guest@ilmi:~$ ${cmd}` }]);
    setIsTyping(true);

    setTimeout(() => {
      let response = '';

      if (trimmedCmd === 'clear') {
        setHistory([]);
        setIsTyping(false);
        return;
      } else if (trimmedCmd === 'sudo') {
        response = t.resSudo;
      } else if (trimmedCmd === 'help') {
        response = t.resHelp;
      } 
      else if (trimmedCmd === 'specs') {
        response = 
          "[HARDWARE SCAN COMPLETED]\n" +
          "----------------------------------------\n" +
          "CPU      : AMD Ryzen 5 5600GT (6C/12T)\n" +
          "MBO      : Asrock B450M Steel Legend\n" +
          "RAM      : Optimized Dual-Channel Config\n" +
          "GRAPHICS : Radeon Vega Graphics (iGPU Optimized)\n" +
          "STATUS   : Ready for 4K Video Editing & Subtitling\n" +
          "----------------------------------------";
      } else if (trimmedCmd === 'neofetch') {
        response = 
          "   ___ _           _ \n" +
          "  |_ _| | font    (_) \n" +
          "   | || |__  _ __  _ \n" +
          "   | || '_ \\| '_ \\| |\n" +
          "  |___|_| |_|_| |_|_|\n\n" +
          "OS          : Kawaragi UI Mint v2.0\n" +
          "CREATOR     : Miftakhul Ilmi\n" +
          "ROLE        : Video Editor & Subtitler\n" +
          "LANGUAGES   : Indonesian (Native), English, Japanese\n" +
          "SHELL       : Bash/NextJS-AppRouter\n" +
          "WIDGETS     : Framer Motion / Liquid Glass";
      }
      else if (trimmedCmd.includes('siapa') || trimmedCmd.includes('who') || trimmedCmd.includes('だれ') || trimmedCmd.includes('誰') || trimmedCmd.includes('about') || trimmedCmd.includes('profil')) {
        response = t.resAbout;
      } 
      else if (trimmedCmd.includes('skill') || trimmedCmd.includes('kemampuan') || trimmedCmd.includes('bisa') || trimmedCmd.includes('tools') || trimmedCmd.includes('スキル') || trimmedCmd.includes('何')) {
        response = t.resSkill;
      } 
      else if (trimmedCmd.includes('pengalaman') || trimmedCmd.includes('kerja') || trimmedCmd.includes('experience') || trimmedCmd.includes('work') || trimmedCmd.includes('riwayat') || trimmedCmd.includes('職歴') || trimmedCmd.includes('仕事')) {
        response = t.resExperience;
      } 
      else if (trimmedCmd.includes('lokasi') || trimmedCmd.includes('tinggal') || trimmedCmd.includes('where') || trimmedCmd.includes('asal') || trimmedCmd.includes('surabaya') || trimmedCmd.includes('location') || trimmedCmd.includes('所在地') || trimmedCmd.includes('住')) {
        response = t.resLocation;
      } 
      else if (trimmedCmd.includes('kontak') || trimmedCmd.includes('hubungi') || trimmedCmd.includes('hire') || trimmedCmd.includes('email') || trimmedCmd.includes('contact') || trimmedCmd.includes('連絡') || trimmedCmd.includes('メール')) {
        response = t.resContact;
      } 
      else {
        response = t.resFallback;
      }

      setHistory(prev => [...prev, { type: 'system', text: response }]);
      setIsTyping(false);
    }, 800); 
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
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between shrink-0">
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
              <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                <span>{t.assistantName}</span>
                {isTyping && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
              </div>
              <div className="w-10"></div>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3 border-b border-white/5 bg-white/[0.02] shrink-0">
              {/* MENGGUNAKAN VARIABEL BARU YANG SUDAH DIGABUNG */}
              {allQuickCommands.map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  disabled={isTyping}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-50 active:scale-95 border border-white/10 rounded-full text-xs text-gray-300 font-semibold tracking-wider whitespace-nowrap transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <div 
              ref={terminalRef}
              className="p-4 flex-1 overflow-y-auto overscroll-contain scrollbar-hide text-green-400 space-y-4"
            >
              {history.map((line, i) => (
                <div key={i} className={`${line.type === 'user' ? 'text-white font-bold' : 'text-cyan-400 font-light'} leading-relaxed whitespace-pre-wrap`}>
                  {line.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="text-cyan-400/50 animate-pulse flex gap-1 items-center h-6">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              
              {!isTyping && hasBooted && (
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: isScrolled && !isOpen ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`fixed bottom-6 right-6 z-[9997] md:block flex flex-col items-end transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 text-cyan-400 font-mono font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          aria-label="Buka Terminal AI"
        >
          {">_"}
        </motion.button>
      </motion.div>
    </>
  );
}