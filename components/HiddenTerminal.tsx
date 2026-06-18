"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Log = {
  type: "input" | "output" | "system";
  text: string;
};

export default function HiddenTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<Log[]>([
    { type: "system", text: "IlmiOS Terminal [Version 1.0.0]" },
    { type: "system", text: "Type 'help' to see available commands." },
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk mendeteksi shortcut keyboard (Ctrl + I)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Menggunakan e.key.toLowerCase() agar bisa mendeteksi 'i' kecil atau 'I' kapital
      if (e.ctrlKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      // Tekan ESC untuk menutup terminal
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-scroll ke bawah setiap ada log baru
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Logika pemrosesan perintah (Command logic)
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLogs = [...logs, { type: "input", text: `admin@ilmi-server:~$ ${input}` } as Log];
    const cmd = input.trim().toLowerCase();

    switch (cmd) {
      case "help":
        newLogs.push({ type: "output", text: "Available commands: help, whoami, skills, ping openwrt, run bot.js, clear, exit" });
        break;
      case "whoami":
        newLogs.push({ type: "output", text: "Ilmi - Visual Creator, Trilingual Subtitler, & Tech Enthusiast." });
        break;
      case "skills":
        newLogs.push({ type: "output", text: "-> Visuals: CapCut, DaVinci, Premiere, Canva" });
        newLogs.push({ type: "output", text: "-> Code: Python, Node.js, Next.js, API Integrations" });
        newLogs.push({ type: "output", text: "-> Hardware: PC Building, Ryzen Overclocking, Router Modding" });
        break;
      case "ping openwrt":
        newLogs.push({ type: "system", text: "Pinging 192.168.1.1 with 32 bytes of data:" });
        newLogs.push({ type: "output", text: "Reply from 192.168.1.1: bytes=32 time<1ms TTL=64 (Network Stable)" });
        break;
      case "run bot.js":
        newLogs.push({ type: "system", text: "Starting Discord bot..." });
        newLogs.push({ type: "output", text: "[OK] Connected to Kawaragi server. Automation scripts active." });
        break;
      case "clear":
        setLogs([]);
        setInput("");
        return;
      case "exit":
        setIsOpen(false);
        break;
      default:
        newLogs.push({ type: "output", text: `Command not found: ${cmd}. Type 'help' for available commands.` });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <>
      {/* Tombol Trigger Khusus Mobile (Liquid Glass + Bouncy) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        // Animasi hover dan tap khas Apple (Spring Physics)
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        // Styling Liquid Glass
        className="fixed bottom-6 right-6 z-[9999] md:hidden bg-white/[0.05] backdrop-blur-3xl border border-white/20 text-green-400 font-mono font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
        aria-label="Buka Terminal"
      >
        {">_"}
      </motion.button>

      {/* Jendela Terminal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            // CLASS DI BAWAH INI YANG DIUBAH UNTUK EFEK LIQUID GLASS:
            className="fixed bottom-0 md:bottom-6 right-0 md:right-6 w-full md:w-[600px] h-[50vh] md:h-[400px] bg-black/40 backdrop-blur-3xl border-t md:border border-white/10 md:rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-[9999] flex flex-col font-mono text-sm overflow-hidden"
          >
            {/* Header Terminal */}
            <div className="bg-white/10 px-4 py-3 flex items-center justify-between border-b border-white/10 select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-xs hidden md:block">admin@ilmi-server ~ (Ctrl + I to toggle)</span>
              <span className="text-gray-400 text-xs md:hidden">admin@ilmi-server</span>
              <div className="w-12"></div> {/* Spacer untuk keseimbangan */}
            </div>

            {/* Area Log */}
            <div className="flex-1 p-4 overflow-y-auto text-gray-300 space-y-1">
              {logs.map((log, i) => (
                <div key={i} className={`${log.type === "system" ? "text-blue-400" : log.type === "input" ? "text-green-400" : "text-gray-300"}`}>
                  {log.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Area Input */}
            <form onSubmit={handleCommand} className="p-4 border-t border-white/10 flex items-center bg-black/40">
              <span className="text-green-400 mr-2">~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-100"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}