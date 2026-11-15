"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import HudCorner from "./HudCorner";

export default function BentoOperations() {
  const { dict } = useLanguage();
  const exp = dict.experience;
  const t = dict.contact;

  const [copied, setCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  const myEmail = "ilmi@kawaragi.id";
  const upworkLink = "https://www.upwork.com/freelancers/~01705729bdc457ff0f?mp_source=share";

  const copyToClipboard = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    const subject = encodeURIComponent(t.subject);
    const body = encodeURIComponent(`From: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
      
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-1">
            <span>MODULE 03 &amp; 04</span>
            <span>{"//"}</span>
            <span>OPERATIONAL TIMELINE &amp; DISPATCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
            {exp.title}
          </h2>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm font-mono max-w-md">
          {t.desc}
        </p>
      </div>

      {/* Bento 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── LEFT COLUMN: RIWAYAT KERJA & MENGAJAR (7 COLS) ── */}
        <div id="experience" className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <HudCorner />

            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
                LOG // RIWAYAT KERJA &amp; MENGAJAR
              </span>
              <span className="text-[10px] font-mono text-gray-400">4 REKOR RESMI</span>
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {exp.jobs.map((job, index) => {
                const isCurrent = index === 0;

                return (
                  <div key={index} className="relative pl-9 group">
                    {/* Node Dot */}
                    <div
                      className={`absolute left-2 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full border transition-all ${
                        isCurrent
                          ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                          : "bg-black border-white/30 group-hover:border-cyan-400"
                      }`}
                    />

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {job.title}
                        </h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                          {job.date}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
                        <span>{job.company}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-1.5 py-0.2 rounded font-mono">
                            AKTIF
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-light">
                        {job.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: MISSION DISPATCH & KONTAK (5 COLS) ── */}
        <div id="contact" className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Quick Message Box */}
          <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <HudCorner />

            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
                DISPATCH // {t.quickMessage}
              </span>
              <span className="text-[10px] font-mono text-gray-400">DIRECT MAIL</span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">
                  EMAIL_PENGIRIM:
                </label>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">
                  ISI_PESAN:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={t.msgPlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-sans font-light transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-cyan-300 font-bold text-xs tracking-wider uppercase transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {t.btnSend}
              </motion.button>
            </form>
          </div>

          {/* Quick Copy Email Card */}
          <div
            onClick={copyToClipboard}
            className="relative cursor-pointer bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all group"
          >
            <HudCorner />
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                {t.copyTitle}
              </span>
              <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                📋 KLIK UNTUK SALIN
              </span>
            </div>

            <div className="text-base sm:text-lg font-mono font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
              {myEmail}
            </div>

            <div className="mt-2 text-xs">
              {copied ? (
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  {t.copiedText}
                </span>
              ) : (
                <span className="text-gray-400 font-mono text-[11px]">
                  {t.copyText}
                </span>
              )}
            </div>
          </div>

          {/* Freelance & Location Split */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={upworkLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-4 rounded-2xl bg-white/[0.03] hover:bg-[#14a800]/10 border border-white/10 hover:border-[#14a800]/50 transition-colors text-center group"
            >
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">
                {t.freelance}
              </div>
              <div className="text-sm font-bold text-white group-hover:text-[#14a800] transition-colors flex items-center justify-center gap-1.5">
                <span>Upwork</span>
                <span className="text-xs">↗</span>
              </div>
            </a>

            <div className="relative p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <div className="text-xs font-mono text-gray-400 uppercase mb-1">
                {t.location}
              </div>
              <div className="text-sm font-bold text-white">
                Surabaya, ID
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                ● Remote Ready
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-gray-400">
        <p>© {new Date().getFullYear()} Miftakhul Ilmi. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>SYS // ILMI.OS</span>
          <span className="text-cyan-400">●</span>
          <span>Next.js • Tailwind v4 • Framer Motion</span>
        </p>
      </div>

    </section>
  );
}
