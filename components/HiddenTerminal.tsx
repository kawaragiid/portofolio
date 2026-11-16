"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Language } from "./LanguageProvider";
import HudCorner from "./HudCorner";

type HistoryEntry =
  | { kind: "user"; text: string }
  | { kind: "system"; text: string }
  | { kind: "specs" }
  | { kind: "neofetch" };

const AUTOCOMPLETE_COMMANDS = [
  "help",
  "specs",
  "neofetch",
  "goto origin",
  "goto academy",
  "goto projects",
  "goto gateway",
  "goto experience",
  "goto contact",
  "music",
  "lang id",
  "lang en",
  "lang jp",
  "clear",
  "sudo",
];

export default function HiddenTerminal() {
  const { lang, setLang, dict } = useLanguage();
  const t = dict.terminal;

  const [isOpen, setIsOpen] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const allQuickCommands = Array.from(
    new Set([...t.quickCommands, "specs", "neofetch", "goto projects", "music"])
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isOpen, isTyping]);

  useEffect(() => {
    if (isOpen && !isTyping) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isTyping]);

  const startBootSequence = () => {
    setHasBooted(true);
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      const line = t.boot[i];
      if (line) {
        setHistory((prev) => [...prev, { kind: "system", text: line }]);
      }
      i++;
      if (i >= t.boot.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 220);
  };

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next && !hasBooted) {
          startBootSequence();
        }
        return next;
      });
    };
    const handleClose = () => setIsOpen(false);

    window.addEventListener("toggle-terminal", handleToggle);
    window.addEventListener("close-all-modals", handleClose);

    return () => {
      window.removeEventListener("toggle-terminal", handleToggle);
      window.removeEventListener("close-all-modals", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBooted]);

  const handleCommand = (cmd: string) => {
    if (isTyping || !cmd.trim()) return;

    const rawCmd = cmd.trim();
    const trimmedCmd = rawCmd.toLowerCase();

    setCmdHistory((prev) => [rawCmd, ...prev.slice(0, 29)]);
    setHistoryIdx(-1);
    setHistory((prev) => [...prev, { kind: "user", text: `ilmi@kawaragi:~$ ${rawCmd}` }]);
    setIsTyping(true);

    setTimeout(() => {
      if (trimmedCmd === "clear") {
        setHistory([]);
        setIsTyping(false);
        return;
      }

      if (trimmedCmd === "specs") {
        setHistory((prev) => [...prev, { kind: "specs" }]);
        setIsTyping(false);
        return;
      }

      if (trimmedCmd === "neofetch") {
        setHistory((prev) => [...prev, { kind: "neofetch" }]);
        setIsTyping(false);
        return;
      }

      let response = "";

      if (trimmedCmd === "sudo") {
        response = t.resSudo;
      } else if (trimmedCmd === "help") {
        response =
          `${t.resHelp}\n\n[CONSOLE COMMANDS]\n` +
          `• goto <origin|academy|projects|gateway|experience|contact>\n` +
          `• music          → Toggle Cyberpunk Audio Deck\n` +
          `• lang <id|en|jp> → Switch Interface Language`;
      } else if (trimmedCmd === "music") {
        window.dispatchEvent(new CustomEvent("toggle-music"));
        response = "[AUDIO DECK] Toggled Cyberpunk Audio Deck 🎵";
      } else if (trimmedCmd.startsWith("lang ")) {
        const targetLang = trimmedCmd.replace("lang ", "").trim().toUpperCase();
        if (targetLang === "ID" || targetLang === "EN" || targetLang === "JP") {
          setLang(targetLang as Language);
          response = `[LOCALE] Switched interface language → ${targetLang}`;
        } else {
          response = "[LOCALE ERROR] Available languages: id, en, jp";
        }
      } else if (trimmedCmd.startsWith("goto ")) {
        const target = trimmedCmd.replace("goto ", "").trim();
        const sectionMap: Record<string, string> = {
          origin: "origin",
          profile: "origin",
          academy: "academy",
          education: "academy",
          projects: "projects",
          works: "projects",
          gateway: "gateway",
          lab: "gateway",
          experience: "experience",
          contact: "terminus",
          terminus: "terminus",
        };
        const sectionId = sectionMap[target];
        if (sectionId) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            response = `[NAVIGATING] Scrolling to #${sectionId}...`;
          } else {
            response = `[NAV ERROR] Section #${sectionId} not found.`;
          }
        } else {
          response =
            "[NAV ERROR] Unknown station. Try: origin, academy, projects, gateway, experience, contact";
        }
      } else if (
        trimmedCmd.includes("siapa") ||
        trimmedCmd.includes("who") ||
        trimmedCmd.includes("だれ") ||
        trimmedCmd.includes("誰") ||
        trimmedCmd.includes("about") ||
        trimmedCmd.includes("profil")
      ) {
        response = t.resAbout;
      } else if (
        trimmedCmd.includes("skill") ||
        trimmedCmd.includes("kemampuan") ||
        trimmedCmd.includes("bisa") ||
        trimmedCmd.includes("tools") ||
        trimmedCmd.includes("スキル") ||
        trimmedCmd.includes("何")
      ) {
        response = t.resSkill;
      } else if (
        trimmedCmd.includes("pengalaman") ||
        trimmedCmd.includes("kerja") ||
        trimmedCmd.includes("experience") ||
        trimmedCmd.includes("work") ||
        trimmedCmd.includes("riwayat") ||
        trimmedCmd.includes("職歴") ||
        trimmedCmd.includes("仕事")
      ) {
        response = t.resExperience;
      } else if (
        trimmedCmd.includes("lokasi") ||
        trimmedCmd.includes("tinggal") ||
        trimmedCmd.includes("where") ||
        trimmedCmd.includes("asal") ||
        trimmedCmd.includes("surabaya") ||
        trimmedCmd.includes("location") ||
        trimmedCmd.includes("所在地") ||
        trimmedCmd.includes("住")
      ) {
        response = t.resLocation;
      } else if (
        trimmedCmd.includes("kontak") ||
        trimmedCmd.includes("email") ||
        trimmedCmd.includes("contact") ||
        trimmedCmd.includes("hubungi") ||
        trimmedCmd.includes("連絡")
      ) {
        response = t.resContact;
      } else {
        response = t.resFallback;
      }

      setHistory((prev) => [...prev, { kind: "system", text: response }]);
      setIsTyping(false);
    }, 240);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;
      const match = AUTOCOMPLETE_COMMANDS.find((c) => c.startsWith(val));
      if (match) setInput(match);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
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
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed z-[9999] flex flex-col font-mono text-xs sm:text-sm overflow-hidden bg-[#090a0f]/95 backdrop-blur-3xl border border-cyan-500/35 shadow-[0_24px_70px_rgba(0,0,0,0.9)]
              max-md:inset-x-3 max-md:top-16 max-md:bottom-20 max-md:rounded-2xl
              md:bottom-6 md:right-6 md:w-[640px] md:h-[440px] md:rounded-2xl"
          >
            <HudCorner color="text-cyan-400/75" />

            {/* Subtle Scanline Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#22d3ee_2px,#22d3ee_3px)]"
              aria-hidden="true"
            />

            {/* Header Bar */}
            <div className="relative bg-white/[0.04] border-b border-white/10 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">
                  ILMI.OS // {t.assistantName}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 text-[10px] text-cyan-300 font-semibold">
                  {lang}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-red-500/25 border border-white/10 text-[11px] text-gray-300 hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <span className="hidden sm:inline text-gray-400">ESC</span>
                <span className="font-bold">✕</span>
              </button>
            </div>

            {/* Quick Command Chips */}
            <div className="relative flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2.5 border-b border-white/10 bg-white/[0.02] shrink-0">
              {allQuickCommands.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => handleCommand(cmd)}
                  disabled={isTyping}
                  className="px-3 py-1 bg-white/5 hover:bg-cyan-500/20 disabled:opacity-50 active:scale-95 border border-white/10 hover:border-cyan-400/40 rounded-lg text-[11px] text-cyan-200 font-semibold tracking-wide whitespace-nowrap transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Output Body */}
            <div
              ref={terminalRef}
              onClick={() => inputRef.current?.focus()}
              className="relative p-4 flex-1 overflow-y-auto overscroll-contain scrollbar-hide space-y-3 cursor-text"
            >
              {history.map((entry, i) => {
                if (entry.kind === "user") {
                  return (
                    <div key={i} className="text-white font-bold leading-relaxed">
                      {entry.text}
                    </div>
                  );
                }

                if (entry.kind === "specs") {
                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-cyan-500/30 p-3.5 space-y-2"
                    >
                      <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest border-b border-white/10 pb-1.5">
                        WORKSTATION HARDWARE SCAN
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-400">CPU:</span> <span className="text-white">AMD Ryzen 5 5600GT (6C/12T)</span></div>
                        <div><span className="text-gray-400">MBO:</span> <span className="text-white">ASRock B450M Steel Legend</span></div>
                        <div><span className="text-gray-400">GPU:</span> <span className="text-white">Radeon Vega iGPU</span></div>
                        <div><span className="text-gray-400">NET:</span> <span className="text-emerald-300">OpenWrt Gigabit Gateway</span></div>
                      </div>
                    </div>
                  );
                }

                if (entry.kind === "neofetch") {
                  return (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-emerald-500/30 p-3.5 flex flex-col sm:flex-row gap-4 items-start"
                    >
                      <pre className="text-[11px] leading-tight text-cyan-400 font-bold shrink-0">
{`  ___ _           _ 
 |_ _| |_ __ ___ (_)
  | || | '_ \` _ \\| |
  | || | | | | | | |
 |___|_|_| |_| |_|_|`}
                      </pre>
                      <div className="text-xs space-y-1 text-gray-200">
                        <div><span className="text-cyan-300 font-bold">OS:</span> Kawaragi VisionQuest OS v2.4</div>
                        <div><span className="text-cyan-300 font-bold">HOST:</span> Miftakhul Ilmi</div>
                        <div><span className="text-cyan-300 font-bold">ROLE:</span> Coding Instructor &amp; Subtitler</div>
                        <div><span className="text-cyan-300 font-bold">LANG:</span> ID / EN / JP</div>
                        <div><span className="text-cyan-300 font-bold">STACK:</span> Next.js 16 • Tailwind • Anime.js</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    className="text-cyan-300/95 font-normal leading-relaxed whitespace-pre-wrap"
                  >
                    {entry.text}
                  </div>
                );
              })}

              {isTyping && (
                <div className="text-cyan-400/70 animate-pulse flex gap-1.5 items-center h-6">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" style={{ animationDelay: "0.3s" }} />
                </div>
              )}

              {!isTyping && hasBooted && (
                <form onSubmit={onSubmit} className="flex items-center pt-1">
                  <span className="text-emerald-400 font-bold mr-2 shrink-0">
                    ilmi@kawaragi:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="help / Tab / ↑↓"
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}