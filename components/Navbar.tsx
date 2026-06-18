"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

export default function Navbar() {
  const { dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Menyimpan daftar menu agar lebih rapi
  const menuItems = [
    { href: "#expertise", label: dict.nav.expertise },
    { href: "#projects", label: dict.nav.projects },
    { href: "#experience", label: dict.nav.experience },
  ];

  return (
    // Pembungkus utama Navbar, kita lepas warna latar belakang dari sini...
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl">
      
      {/* ...lalu pindahkan latar belakang Kaca Cair ke dalam kapsul utama */}
      <div className="relative z-20 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
        <div className="px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white drop-shadow-md">
            Ilmi.
          </Link>
          
          {/* Menu Desktop (Sembunyi di HP) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Tombol Hamburger/X untuk Mobile */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle Menu"
          >
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              // Animasi berputar sedikit saat ikon berganti
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                // Ikon X saat menu terbuka
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Ikon Garis 3 saat menu tertutup
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </motion.svg>
          </button>
        </div>
      </div>

      {/* Popup Menu Mobile (Liquid Glass) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            // Efek meluncur dari balik kapsul utama, dengan efek blur optik
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-full mt-2 w-full left-0 z-10 md:hidden bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col py-2 px-4 overflow-hidden"
          >
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                // Otomatis menutup popup saat menu dipilih
                onClick={() => setIsOpen(false)}
                className="py-4 px-4 text-center text-sm font-bold tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  );
}