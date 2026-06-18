"use client";

import Image from 'next/image';
import { useLanguage } from "./LanguageProvider";
import TiltCard from "./TiltCard"; // <--- Import komponen 3D-nya

export default function Projects() {
  const { dict } = useLanguage();

  const images = [
    "/images/project-1.png",
    "/images/project-2.png",
    "/images/project-3.png"
  ];

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 perspective-1000">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center text-white drop-shadow-md">
        {dict.projects.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dict.projects.items.map((item, index) => (
          // Membungkus setiap karya dengan TiltCard
          <TiltCard key={index}>
            <div className="group relative aspect-video bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 flex flex-col justify-end p-6 pointer-events-none">
                <h3 className="text-xl font-bold text-white mb-1 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
              
              <Image 
                src={images[index]} 
                alt={item.title} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
              />
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}