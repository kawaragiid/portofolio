"use client";

import { useLanguage } from "./LanguageProvider";
import TiltCard from "./TiltCard"; // <--- Import efek 3D

export default function Expertise() {
  const { dict } = useLanguage();

  return (
    <section id="expertise" className="max-w-7xl mx-auto px-6 py-24 perspective-1000">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center text-white drop-shadow-md">
        {dict.expertise.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dict.expertise.items.map((item, index) => (
          // Bungkus dengan TiltCard
          <TiltCard key={index}>
            <div className="bg-white/[0.02] backdrop-blur-md p-10 rounded-3xl h-full transition-all duration-300 border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] group pointer-events-none">
              
              <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform duration-300 origin-left">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                {item.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {item.desc}
              </p>
              
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}