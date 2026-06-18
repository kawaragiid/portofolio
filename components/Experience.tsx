"use client";

import { useLanguage } from "./LanguageProvider";
import TiltCard from "./TiltCard"; // <--- Import efek 3D

export default function Experience() {
  const { dict } = useLanguage();

  return (
    <section id="experience" className="max-w-4xl mx-auto px-6 py-24 border-t border-white/5 relative z-10 perspective-1000">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center text-white drop-shadow-md">
        {dict.experience.title}
      </h2>
      
      <div className="space-y-8">
        {dict.experience.jobs.map((job, index) => (
          // Bungkus dengan TiltCard
          <TiltCard key={index}>
            <div className="flex flex-col md:flex-row md:justify-between p-8 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.1)] pointer-events-none">
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {job.title}
                </h3>
                <p className="text-cyan-500/80 font-medium mt-1">{job.company}</p>
                <p className="text-gray-400 font-light mt-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {job.desc}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 text-sm md:text-right font-medium tracking-wide">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  {job.date}
                </span>
              </div>
              
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}