"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Expertise() {
  const { dict } = useLanguage();
  const t = dict.expertise;
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = t.items.find(item => item.id === selectedId);

  // Mengunci scroll pada body utama (website di belakang) saat popup terbuka
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedId]);

  return (
    <section id="expertise" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white tracking-tight">
          {t.title}
        </h2>
        
        {/* GRID KARTU KEAHLIAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((item) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="group bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-all duration-300 cursor-pointer shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <motion.div layoutId={`icon-${item.id}`} className="text-4xl mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                {item.icon}
              </motion.div>
              <motion.h3 layoutId={`title-${item.id}`} className="text-xl font-bold text-white mb-3">
                {item.title}
              </motion.h3>
              <motion.p layoutId={`desc-${item.id}`} className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </motion.p>
              
              <div className="mt-6 flex items-center text-cyan-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Baca Selengkapnya →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN MODAL (Halaman Detail) */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 md:px-10 py-6 md:py-10 pointer-events-auto">
            
            {/* Latar Belakang Gelap */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Kertas Halaman Detail - LIQUID GLASS */}
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              // Kunci di sini: overflow-hidden pada bungkus luar, dan max-h mengunci ukuran di layar HP
              className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] z-10 overflow-hidden"
            >
              {/* Header Modal - Diam di atas (shrink-0) */}
              <div className="bg-white/5 border-b border-white/10 p-5 md:p-8 flex justify-between items-start z-20 shrink-0">
                <div className="flex items-center gap-4">
                  <motion.div layoutId={`icon-${selectedItem.id}`} className="text-3xl md:text-4xl bg-white/10 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border border-white/20 shadow-inner">
                    {selectedItem.icon}
                  </motion.div>
                  <div>
                    <motion.h3 layoutId={`title-${selectedItem.id}`} className="text-xl md:text-3xl font-black text-white tracking-tight">
                      {selectedItem.title}
                    </motion.h3>
                    <motion.p layoutId={`desc-${selectedItem.id}`} className="text-cyan-400 text-xs md:text-sm font-medium mt-1">
                      {selectedItem.desc}
                    </motion.p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedId(null)}
                  className="bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 p-2 md:p-2.5 rounded-full transition-colors group flex items-center gap-2 mt-1 md:mt-0"
                >
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase hidden md:block pl-2">{t.closeBtn}</span>
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* ISI KONTEN - Area Khusus Scroll (flex-1 overflow-y-auto overscroll-contain) */}
              <div className="p-6 md:p-10 space-y-10 overflow-y-auto flex-1 overscroll-contain scrollbar-hide">
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light">
                    {selectedItem.fullDesc}
                  </p>
                </motion.div>

                <hr className="border-white/5" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                      <span className="text-cyan-400">⚡</span> {t.coreSkills}
                    </h4>
                    <ul className="space-y-3 md:space-y-4">
                      {selectedItem.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-gray-300 text-xs md:text-sm">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-white font-bold text-base md:text-lg mb-4 md:mb-6 flex items-center gap-2">
                      <span className="text-cyan-400">🛠️</span> {t.techStack}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tools.map((tool, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-mono text-gray-300 shadow-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Footer Bawah Modal - Diam di bawah (shrink-0) */}
              <div className="bg-white/5 p-4 md:p-6 text-center border-t border-white/10 shrink-0">
                <button onClick={() => setSelectedId(null)} className="text-[10px] md:text-xs text-gray-400 hover:text-white uppercase tracking-widest font-bold transition-colors">
                  {t.closeBtn}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}