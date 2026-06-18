"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "miftakhulilmi54@gmail.com";

  // Fungsi untuk menyalin email ke clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Tulisan "Copied!" hilang setelah 2 detik
  };

  return (
    <section id="contact" className="relative max-w-5xl mx-auto px-6 py-24 z-10">
      {/* Header Kontak */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
          Let's Collaborate.
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Currently available for freelance video editing, subtitling projects, and remote opportunities.
        </p>
      </div>

      {/* Grid Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        
        {/* Card Utama: Email (Bisa diklik untuk Copy) */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="md:col-span-2 group cursor-pointer relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-2">
            Send me an email
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 truncate">
            {email}
          </h3>
          
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
            {copied ? (
              <span className="text-green-400 text-sm font-bold flex items-center gap-2">
                ✓ Copied to clipboard!
              </span>
            ) : (
              <span className="text-gray-300 group-hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Click to copy
              </span>
            )}
          </div>
        </motion.div>

        {/* Card: Lokasi */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] relative overflow-hidden">
          {/* Ikon Globe/Map Pin */}
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">Location</p>
          <h3 className="text-xl font-bold text-white">Surabaya, ID</h3>
          <p className="text-xs text-gray-500 mt-2">Available for Remote</p>
        </div>

        {/* Card: Upwork */}
        <a 
          href="https://www.upwork.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-white/[0.02] hover:bg-[#14a800]/10 backdrop-blur-md border border-white/10 hover:border-[#14a800]/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300"
        >
          <div className="w-12 h-12 bg-white/5 group-hover:bg-[#14a800]/20 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#14a800]/50 transition-colors">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-[#14a800]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.4,14.04c-1.28,0-2.43-0.57-3.18-1.46l-0.27,1.06c-0.1,0.4-0.45,0.68-0.87,0.68H10.5v-8.5 h2.44v5.43c0.41,0.65,1.13,1.08,1.95,1.08c1.28,0,2.32-1.04,2.32-2.32V4.57h2.44v5.43C19.65,12.35,18.73,14.04,17.4,14.04z M4.35,10.08v-5.5h2.44v5.5c0,1.24,1.01,2.25,2.25,2.25s2.25-1.01,2.25-2.25v-5.5h2.44v5.5c0,2.59-2.11,4.69-4.69,4.69 S4.35,12.67,4.35,10.08z"/></svg>
          </div>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">Freelance</p>
          <h3 className="text-lg font-bold text-white">Upwork</h3>
        </a>

        {/* Card: Discord */}
        <a 
          href="https://discord.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-white/[0.02] hover:bg-[#5865F2]/10 backdrop-blur-md border border-white/10 hover:border-[#5865F2]/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300"
        >
          <div className="w-12 h-12 bg-white/5 group-hover:bg-[#5865F2]/20 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#5865F2]/50 transition-colors">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
          </div>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">Community</p>
          <h3 className="text-lg font-bold text-white">Discord</h3>
        </a>

      </div>

      {/* Footer Bawah */}
      <div className="mt-24 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
        <p>© {new Date().getFullYear()} Miftakhul Ilmi. All rights reserved.</p>
        <p>Built with Next.js & Framer Motion.</p>
      </div>
    </section>
  );
}