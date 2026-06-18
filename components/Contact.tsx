"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

// Kamus lengkap untuk 3 bahasa
const translations = {
  en: {
    title: "Let's Collaborate.",
    desc: "Feel free to reach out for video editing projects, subtitling, or other collaborative opportunities.",
    quickMessage: "Quick Message",
    emailPlaceholder: "enter your email here...",
    msgPlaceholder: "write your message or project offer here...",
    btnSend: "Send Me a Message 🚀",
    location: "Location",
    remote: "Available for Remote Work",
    copyTitle: "Direct Copy Email",
    copiedText: "✓ Copied to clipboard!",
    copyText: "Copy Email Address",
    freelance: "Freelance Profile",
    subject: "Project Inquiry from Portfolio"
  },
  id: {
    title: "Mari Berkolaborasi.",
    desc: "Silakan hubungi saya untuk proyek penyuntingan video, pembuatan subtitle, atau peluang kerja sama lainnya.",
    quickMessage: "Pesan Cepat",
    emailPlaceholder: "masukkan email kamu di sini...",
    msgPlaceholder: "tulis pesan atau penawaran proyekmu di sini...",
    btnSend: "Kirimi Saya Pesan 🚀",
    location: "Lokasi",
    remote: "Bisa Bekerja Secara Remote",
    copyTitle: "Salin Email Langsung",
    copiedText: "✓ Berhasil disalin!",
    copyText: "Salin Alamat Email",
    freelance: "Profil Freelance",
    subject: "Pertanyaan Proyek dari Portofolio"
  },
  jp: {
    title: "コラボしましょう。",
    desc: "ビデオ編集、字幕制作、またはその他のコラボレーションについて、お気軽にお問い合わせください。",
    quickMessage: "クイックメッセージ",
    emailPlaceholder: "ここにメールアドレスを入力してください...",
    msgPlaceholder: "ここにメッセージやプロジェクトの提案を書いてください...",
    btnSend: "メッセージを送信 🚀",
    location: "所在地",
    remote: "リモートワーク対応可能",
    copyTitle: "メールアドレスをコピー",
    copiedText: "✓ コピーしました！",
    copyText: "アドレスをコピーする",
    freelance: "フリーランスプロフィール",
    subject: "ポートフォリオからのお問い合わせ"
  }
};

export default function Contact() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const myEmail = "ilmi@kawaragi.id";
  const upworkLink = "https://www.upwork.com/freelancers/~01705729bdc457ff0f?mp_source=share";

  // Ambil kamus sesuai bahasa yang sedang aktif (fallback ke 'id' jika tidak ditemukan)
  const t = translations[language as keyof typeof translations] || translations.id;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(t.subject);
    const body = encodeURIComponent(`From: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative max-w-5xl mx-auto px-6 py-24 z-10">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
          {t.title}
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: FORMULIR KONTAK LANGSUNG */}
        <div className="md:col-span-2 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between">
          <div>
            <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
              {t.quickMessage}
            </p>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">GUEST_EMAIL_INPUT:</label>
                <input 
                  type="email" 
                  required
                  placeholder={t.emailPlaceholder}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors font-mono"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-400 font-mono mb-2">MESSAGE_BODY:</label>
                <textarea 
                  rows={4}
                  required
                  placeholder={t.msgPlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none font-sans font-light"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm tracking-wide hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 shadow-lg"
              >
                {t.btnSend}
              </motion.button>
            </form>
          </div>
        </div>

        {/* CARD 2: LOKASI */}
        <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">{t.location}</p>
          <h3 className="text-xl font-bold text-white">Surabaya, ID</h3>
          <p className="text-xs text-gray-500 mt-2">{t.remote}</p>
        </div>

        {/* CARD 3: EMAIL QUICK COPY */}
        <motion.div 
          whileHover={{ scale: 0.99 }}
          whileTap={{ scale: 0.97 }}
          onClick={copyToClipboard}
          className="md:col-span-2 group cursor-pointer relative bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          <div>
            <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">
              {t.copyTitle}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
              {myEmail}
            </h3>
          </div>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
            {copied ? (
              <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                {t.copiedText}
              </span>
            ) : (
              <span className="text-gray-400 group-hover:text-white text-xs font-medium transition-colors flex items-center gap-1">
                {t.copyText}
              </span>
            )}
          </div>
        </motion.div>

        {/* CARD 4: UPWORK */}
        <a 
          href={upworkLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="group bg-white/[0.02] hover:bg-[#14a800]/10 backdrop-blur-md border border-white/10 hover:border-[#14a800]/50 rounded-3xl p-8 flex flex-col justify-center items-center text-center transition-all duration-300"
        >
          <div className="w-12 h-12 bg-white/5 group-hover:bg-[#14a800]/20 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#14a800]/50 transition-colors">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-[#14a800]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.4,14.04c-1.28,0-2.43-0.57-3.18-1.46l-0.27,1.06c-0.1,0.4-0.45,0.68-0.87,0.68H10.5v-8.5 h2.44v5.43c0.41,0.65,1.13,1.08,1.95,1.08c1.28,0,2.32-1.04,2.32-2.32V4.57h2.44v5.43C19.65,12.35,18.73,14.04,17.4,14.04z M4.35,10.08v-5.5h2.44v5.5c0,1.24,1.01,2.25,2.25,2.25s2.25-1.01,2.25-2.25v-5.5h2.44v5.5c0,2.59-2.11,4.69-4.69,4.69 S4.35,12.67,4.35,10.08z"/>
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-1">{t.freelance}</p>
          <h3 className="text-lg font-bold text-white group-hover:text-[#14a800] transition-colors">Upwork</h3>
        </a>

      </div>

      <div className="mt-24 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
        <p>© {new Date().getFullYear()} Miftakhul Ilmi. All rights reserved.</p>
        <p>Built with Next.js & Framer Motion.</p>
      </div>
    </section>
  );
}