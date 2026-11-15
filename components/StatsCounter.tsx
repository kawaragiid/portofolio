"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function StatsCounter() {
  const { dict } = useLanguage();
  const t = dict.stats;

  const stats = [
    {
      num: t.hoursNum,
      label: t.hoursLabel,
      icon: "⏱️",
      accent: "from-cyan-400 to-blue-500",
    },
    {
      num: t.videosNum,
      label: t.videosLabel,
      icon: "🎬",
      accent: "from-purple-400 to-pink-500",
    },
    {
      num: t.satisfactionNum,
      label: t.satisfactionLabel,
      icon: "🎯",
      accent: "from-emerald-400 to-teal-500",
    },
    {
      num: t.ratingNum,
      label: t.ratingLabel,
      icon: "⭐",
      accent: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="group relative bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-xl border border-white/10 hover:border-white/20 p-6 md:p-8 rounded-3xl transition-all shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl md:text-3xl filter drop-shadow">{stat.icon}</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
            </div>

            <div>
              <div className={`text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent mb-2`}>
                {stat.num}
              </div>
              <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed group-hover:text-gray-200 transition-colors">
                {stat.label}
              </p>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
