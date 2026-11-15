"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Language } from "./LanguageProvider";

export default function KeyboardShortcuts() {
  const { lang, setLang, dict } = useLanguage();
  const t = dict.shortcuts;
  const [isOpen, setIsOpen] = useState(false);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika user sedang mengetik di input / textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (key === "t") {
        window.dispatchEvent(new CustomEvent("toggle-terminal"));
      } else if (key === "m") {
        window.dispatchEvent(new CustomEvent("toggle-music"));
      } else if (key === "l") {
        const order: Language[] = ["ID", "EN", "JP"];
        const next = order[(order.indexOf(lang) + 1) % order.length];
        setLang(next);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("close-all-modals"));
      } else if (e.key === "?") {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lang, setLang]);

  if (!isClient) return null;

  return (
    <>
      {/* Tombol Bantuan Shortcut Kecil di Pojok Bawah */}
      <div className="fixed bottom-6 right-24 z-[9996] hidden lg:block">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-1.5 transition-colors shadow-lg"
          aria-label="Pintasan Keyboard"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>[?] Shortcuts</span>
        </button>
      </div>

      {/* Modal Panduan Keyboard Shortcuts */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="relative bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/20 p-6 rounded-3xl w-full max-w-sm shadow-2xl z-10 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="text-cyan-400 font-bold uppercase tracking-widest text-[11px]">
                  ⌨️ {t.hint}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t.terminal}</span>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-cyan-300 font-bold">
                    T
                  </kbd>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t.music}</span>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-cyan-300 font-bold">
                    M
                  </kbd>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t.lang}</span>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-cyan-300 font-bold">
                    L
                  </kbd>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t.esc}</span>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-gray-400 font-bold text-[10px]">
                    ESC
                  </kbd>
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-white/5 text-[10px] text-gray-500 text-center">
                Tekan tombol kapan saja di halaman ini.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
