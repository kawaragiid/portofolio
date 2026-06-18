"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Expertise() {
  const { dict } = useLanguage();
  const t = dict.expertise;
  
  // State untuk melacak ID kartu mana yang sedang diklik
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Mencari data item yang sedang dipilih
  const selectedItem = t.items.find(item => item.id === selectedId);

  return (
    <section id="expertise" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white tracking-tight">
          {t.title}
        </h2>
        
        {/* GRID KARTU KEAHLIAN (Tampilan Awal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((item) => (
            <motion.div
              // layoutId adalah kunci sihir Framer Motion untuk animasi membesar
              layoutId={`card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-colors cursor-pointer shadow-lg"
            >
              <motion.div layoutId={`icon-${item.id}`} className="text-4xl mb-6 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                {item.icon}
              </motion.div>
              <motion.h3 layoutId={`title-${item.id}`} className="text-xl font-bold text-white mb-3">
                {item.title}
              </motion.h3>
              <motion.p layoutId={`desc-${item.id}`} className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </motion.p>
              
              {/* Petunjuk Klik */}
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
          <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 md:px-10 py-10 pointer-events-auto">
            
            {/* Latar Belakang Gelap (Klik untuk menutup) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            {/* Kertas Halaman Detail */}
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="relative bg-[#0a0a0a] border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 flex flex-col"
            >
              {/* Header Modal */}
              <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 p-6 md:p-8 flex justify-between items-start z-20">
                <div className="flex items-center gap-4">
                  <motion.div layoutId={`icon-${selectedItem.id}`} className="text-4xl bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/20 shadow-inner">
                    {selectedItem.icon}
                  </motion.div>
                  <div>
                    <motion.h3 layoutId={`title-${selectedItem.id}`} className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {selectedItem.title}
                    </motion.h3>
                    <motion.p layoutId={`desc-${selectedItem.id}`} className="text-cyan-400 text-sm font-medium mt-1">
                      {selectedItem.desc}
                    </motion.p>
                  </div>
                </div>
                
                {/* Tombol X (Tutup) */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-red-400 p-2 rounded-full transition-colors group flex items-center gap-2"
                >
                  <span className="text-xs font-bold tracking-widest uppercase hidden md:block pl-2">{t.closeBtn}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Isi Konten Detail */}
              <div className="p-6 md:p-10 space-y-10">
                
                {/* Deskripsi Panjang */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300 text-lg leading-relaxed font-light">
                    {selectedItem.fullDesc}
                  </p>
                </motion.div>

                {/* Garis Pemisah */}
                <hr className="border-white/5" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Daftar Kemampuan Utama */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <span className="text-cyan-400">⚡</span> {t.coreSkills}
                    </h4>
                    <ul className="space-y-4">
                      {selectedItem.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <span className="text-gray-400 text-sm">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Daftar Tools & Teknologi */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                      <span className="text-cyan-400">🛠️</span> {t.techStack}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tools.map((tool, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300 shadow-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
              
              {/* Footer Bawah Modal */}
              <div className="mt-auto bg-white/[0.02] p-6 text-center border-t border-white/10 rounded-b-[2rem]">
                <button onClick={() => setSelectedId(null)} className="text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold transition-colors">
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