"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Testimonials() {
  const { dict } = useLanguage();
  const t = dict.testimonials;

  return (
    <section id="testimonials" className="relative z-10 max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
          {t.title}
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {t.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 p-8 rounded-3xl flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-amber-400 text-sm">
                {[...Array(item.rating)].map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
                <span className="ml-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  VERIFIED
                </span>
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed italic mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black text-sm">
                {item.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white text-sm font-bold group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500 font-mono">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
