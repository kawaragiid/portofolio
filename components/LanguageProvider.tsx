"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ID" | "EN" | "JP";

const dictionary = {
  ID: {
    nav: { expertise: "Keahlian", projects: "Karya", experience: "Pengalaman" },
    hero: {
      subtitle: "Merangkai cerita lewat potongan visual dan lokalisasi bahasa.",
      btnWork: "Lihat Karya",
      btnContact: "Kontak Saya",
    },
    expertise: {
      title: "Keahlian Utama.",
      items: [
        { icon: "📝", title: "Lokalisasi Multibahasa", desc: "Ahli menerjemahkan dan menyelaraskan subtitle untuk film, serial TV, dan konten web. Menjaga nuansa budaya dan tata krama bahasa dengan akurasi kontekstual tinggi." },
        { icon: "🎬", title: "Produksi & Editing Video", desc: "Produksi konten digital dari awal hingga akhir. Mulai dari editing kreatif hingga pengaturan siaran langsung, memastikan setiap potongan visual bercerita dengan kuat." },
        { icon: "🌐", title: "Teknik Jaringan", desc: "Konfigurasi router tingkat lanjut dan flashing OpenWrt. Mengelola Access Point (AP) untuk memastikan jaringan stabil untuk alur kerja multimedia berat." },
        { icon: "⚙️", title: "Perakitan PC & Hardware", desc: "Merakit dan mengoptimalkan workstation performa tinggi. Melakukan overclocking komponen untuk efisiensi maksimal pada tugas berat." }
      ]
    },
    projects: {
      title: "Karya Pilihan.",
      items: [
        { title: "Subtitle & Lokalisasi", desc: "Inggris/Jepang ke Indonesia" },
        { title: "Video Editing", desc: "Sinematografi & Pasca-Produksi" },
        { title: "Jaringan & Server", desc: "Manajemen OpenWrt & AP" }
      ]
    },
    experience: {
      title: "Riwayat Kerja.",
      jobs: [
        { title: "Freelance Subtitler & Video Editor", company: "Wiraswasta", date: "Mei 2025 - Sekarang", desc: "Menerjemahkan dan menyematkan subtitle untuk berbagai proyek video, memastikan sinkronisasi dan akurasi linguistik untuk penonton Indonesia." },
        { title: "Multimedia Specialist & Broadcast Lead", company: "Mitra Berkah Pratama", date: "Apr 2025 - Feb 2026", desc: "Mengelola operasi multimedia skala penuh, termasuk siaran langsung dan produksi video. Bertanggung jawab atas pengaturan teknis dan editing pasca-produksi." },
        { title: "Content Creator & Videographer", company: "Muhajirin Center", date: "Jan 2023 - Des 2024", desc: "Memimpin proses kreatif untuk konten digital. Menangani produksi end-to-end termasuk penulisan naskah, sinematografi, dan editing video." }
      ]
    }
  },
  EN: {
    nav: { expertise: "Expertise", projects: "Projects", experience: "Experience" },
    hero: {
      subtitle: "Crafting stories through visual cuts and language localization.",
      btnWork: "View Work",
      btnContact: "Contact Me",
    },
    expertise: {
      title: "Core Expertise.",
      items: [
        { icon: "📝", title: "Multilingual Localization", desc: "Expert in translating and hardcoding subtitles for movies, TV series, and web content. Preserving cultural nuances and honorifics with high contextual accuracy." },
        { icon: "🎬", title: "Video Editing & Production", desc: "End-to-end digital content production. From creative editing to broadcast setups, ensuring every cut tells a compelling story." },
        { icon: "🌐", title: "Network Engineering", desc: "Advanced router configuration and OpenWrt flashing. Managing Access Points (AP) to ensure stable, high-speed environments for heavy multimedia workflows." },
        { icon: "⚙️", title: "PC Building & Hardware", desc: "Building and optimizing high-performance workstations. Overclocking components (RAM, CPU, GPU) for maximum efficiency in resource-heavy tasks." }
      ]
    },
    projects: {
      title: "Featured Work.",
      items: [
        { title: "Subtitling & Localization", desc: "English/Japanese to Indonesian" },
        { title: "Video Editing", desc: "Cinematography & Post-Production" },
        { title: "Network & Server Setup", desc: "OpenWrt & AP Management" }
      ]
    },
    experience: {
      title: "Employment History.",
      jobs: [
        { title: "Freelance Subtitler & Video Editor", company: "Self-Employed", date: "May 2025 - Present", desc: "Translating and hardcoding subtitles for various video projects, ensuring synchronization and linguistic accuracy for Indonesian audiences." },
        { title: "Multimedia Specialist & Broadcast Lead", company: "Mitra Berkah Pratama", date: "Apr 2025 - Feb 2026", desc: "Managed full-scale multimedia operations, including live broadcasting and video production. Responsible for technical setups and post-production editing." },
        { title: "Content Creator & Videographer", company: "Muhajirin Center", date: "Jan 2023 - Dec 2024", desc: "Led the creative process for digital content. Handled end-to-end production including scriptwriting, filming (cinematography), and creative video editing." }
      ]
    }
  },
  JP: {
    nav: { expertise: "専門知識", projects: "プロジェクト", experience: "経歴" },
    hero: {
      subtitle: "映像のカットと翻訳を通じて、物語を紡ぎ出す。",
      btnWork: "作品を見る",
      btnContact: "お問い合わせ",
    },
    expertise: {
      title: "主な専門知識。",
      items: [
        { icon: "📝", title: "多言語ローカリゼーション", desc: "映画、ドラマ、ウェブコンテンツの字幕翻訳の専門家。文化的ニュアンスや敬語を正確に維持します。" },
        { icon: "🎬", title: "動画編集・制作", desc: "デジタルコンテンツ制作全般。クリエイティブな編集から配信設定まで、魅力的なストーリーを構築します。" },
        { icon: "🌐", title: "ネットワーク構築", desc: "高度なルーター設定とOpenWrtの導入。マルチメディア作業向けの高速で安定したネットワーク環境を管理します。" },
        { icon: "⚙️", title: "PC自作・ハードウェア", desc: "高性能ワークステーションの構築と最適化。重いレンダリング作業のためにCPU/GPUをオーバークロックします。" }
      ]
    },
    projects: {
      title: "注目の作品。",
      items: [
        { title: "字幕翻訳", desc: "英語/日本語 から インドネシア語へ" },
        { title: "動画編集", desc: "シネマトグラフィー・ポストプロダクション" },
        { title: "ネットワーク設定", desc: "OpenWrt と AP管理" }
      ]
    },
    experience: {
      title: "職歴。",
      jobs: [
        { title: "フリーランス 字幕翻訳 & 動画編集", company: "自営業", date: "2025年5月 - 現在", desc: "インドネシアの視聴者向けに、映像プロジェクトの字幕を正確に翻訳し、映像と同期させます。" },
        { title: "マルチメディアスペシャリスト", company: "Mitra Berkah Pratama", date: "2025年4月 - 2026年2月", desc: "ライブ配信や映像制作を含むマルチメディア業務全般を管理。技術設定や編集を担当。" },
        { title: "コンテンツクリエイター & ビデオグラファー", company: "Muhajirin Center", date: "2023年1月 - 2024年12月", desc: "デジタルコンテンツの制作を主導。脚本作成、撮影、クリエイティブな動画編集を担当。" }
      ]
    }
  }
};

const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  dict: typeof dictionary.ID;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ID");
  const dict = dictionary[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}