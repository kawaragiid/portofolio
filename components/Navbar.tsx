"use client"; // Tambahkan ini karena kita pakai hooks

import Link from 'next/link';
import { useLanguage } from './LanguageProvider'; // Panggil otak bahasanya

export default function Navbar() {
  const { dict } = useLanguage(); // Tarik kamusnya

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-4xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
      <div className="px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white drop-shadow-md">
          Ilmi.
        </Link>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <Link href="#expertise" className="hover:text-white transition-colors">
            {dict.nav.expertise}
          </Link>
          <Link href="#projects" className="hover:text-white transition-colors">
            {dict.nav.projects}
          </Link>
          <Link href="#experience" className="hover:text-white transition-colors">
            {dict.nav.experience}
          </Link>
        </div>
        <button className="md:hidden text-gray-300 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}