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
      closeBtn: "Tutup Detail",
      techStack: "Alat & Teknologi",
      coreSkills: "Kemampuan Spesifik",
      items: [
        { 
          id: "localization",
          icon: "📝", 
          title: "Lokalisasi Multibahasa", 
          desc: "Menerjemahkan dan menyelaraskan subtitle untuk film dan konten digital.",
          fullDesc: "Sebagai seorang penerjemah multibahasa, saya tidak sekadar mengartikan kata-kata, melainkan memindahkan nyawa dan emosi dari bahasa sumber (Inggris/Jepang) ke bahasa target (Indonesia). Saya memiliki jam terbang tinggi dalam menangani sinkronisasi waktu (timing) yang akurat, menjaga nuansa budaya (honorifics), hingga proses hardcoding video.",
          tools: ["Subtitle Edit", "Aegisub", "VS Code", "Format Factory", "Notepad++"],
          capabilities: [
            "Terjemahan Kontekstual (EN/JP ke ID)",
            "Sinkronisasi Waktu (Timing & Tying) presisi milidetik",
            "Quality Control tata bahasa dan ejaan",
            "Hardcoding, Encoding, & Rendering Subtitle ke Video"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "Produksi & Editing Video", 
          desc: "Produksi konten dari editing kreatif hingga pengaturan siaran langsung.",
          fullDesc: "Berpengalaman dalam meracik visual untuk berbagai platform modern (YouTube Shorts, Instagram Reels, TikTok). Saya memahami ritme retensi penonton dan terbiasa bekerja dengan tenggat waktu ketat. Selain pasca-produksi, saya juga berpengalaman dalam pengaturan teknis untuk siaran langsung (Broadcasting) skala komunitas dan perusahaan.",
          tools: ["CapCut Pro", "DaVinci Resolve", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Video Editing Ritme Cepat (Short-form Content)",
            "Color Grading & Audio Mixing Dasar",
            "Manajemen Aset & Alur Kerja Pasca-Produksi",
            "Pengaturan Setup Live Streaming"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Teknik Jaringan", 
          desc: "Konfigurasi router, flashing OpenWrt, dan manajemen Access Point.",
          fullDesc: "Mampu merancang dan merawat infrastruktur jaringan lokal untuk menunjang alur kerja multimedia yang berat. Saya berspesialisasi dalam modifikasi firmware router kelas gigabit untuk memaksimalkan bandwidth, stabilitas transmisi data antar PC, dan mengelola lalu lintas data tanpa hambatan.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Konfigurasi Custom Firmware (OpenWrt)",
            "Manajemen Access Point (AP) & Local Area Network",
            "Setup P2P File Transfer untuk pengiriman data besar",
            "Troubleshooting Jaringan & Optimalisasi Bandwidth"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "Perakitan PC & Hardware", 
          desc: "Merakit, mengoptimalkan, dan memelihara workstation performa tinggi.",
          fullDesc: "Memiliki pemahaman teknis mendalam mengenai arsitektur perangkat keras PC. Saya merakit dan mengkonfigurasi sistem dari nol, memastikan setiap komponen (terutama ekosistem AMD Ryzen) berjalan pada efisiensi maksimal. Saya memastikan suhu tetap dingin dan performa tetap stabil saat digunakan untuk rendering video berat.",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "Pemilihan & Perakitan Komponen Workstation",
            "Update BIOS & Manajemen Driver",
            "Overclocking ringan & Optimalisasi TDP",
            "Maintenance Perangkat Keras & Manajemen Suhu"
          ]
        }
      ]
    },
    // DATA KARYA DIKEMBALIKAN
    projects: {
      title: "Karya Pilihan.",
      items: [
        { title: "Subtitle & Lokalisasi", desc: "Inggris/Jepang ke Indonesia" },
        { title: "Video Editing", desc: "Sinematografi & Pasca-Produksi" },
        { title: "Jaringan & Server", desc: "Manajemen OpenWrt & AP" }
      ]
    },
    // DATA PENGALAMAN DIKEMBALIKAN
    experience: {
      title: "Riwayat Kerja.",
      jobs: [
        { title: "Freelance Subtitler & Video Editor", company: "Wiraswasta", date: "Mei 2025 - Sekarang", desc: "Menerjemahkan dan menyematkan subtitle untuk berbagai proyek video, memastikan sinkronisasi dan akurasi linguistik untuk penonton Indonesia." },
        { title: "Multimedia Specialist & Broadcast Lead", company: "Mitra Berkah Pratama", date: "Apr 2025 - Feb 2026", desc: "Mengelola operasi multimedia skala penuh, termasuk siaran langsung dan produksi video. Bertanggung jawab atas pengaturan teknis dan editing pasca-produksi." },
        { title: "Content Creator & Videographer", company: "Muhajirin Center", date: "Jan 2023 - Des 2024", desc: "Memimpin proses kreatif untuk konten digital. Menangani produksi end-to-end termasuk penulisan naskah, sinematografi, dan editing video." }
      ]
    },
    contact: {
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
      closeBtn: "Close Details",
      techStack: "Tools & Technologies",
      coreSkills: "Core Capabilities",
      items: [
        { 
          id: "localization",
          icon: "📝", 
          title: "Multilingual Localization", 
          desc: "Translating and hardcoding subtitles for movies and digital content.",
          fullDesc: "As a multilingual translator, I don't just translate words; I transfer the soul and emotion from the source language (English/Japanese) to the target language (Indonesian). I have extensive experience in precise time synchronization, preserving cultural nuances (honorifics), and the video hardcoding process.",
          tools: ["Subtitle Edit", "Aegisub", "VS Code", "Format Factory", "Notepad++"],
          capabilities: [
            "Contextual Translation (EN/JP to ID)",
            "Millisecond-precision Time Synchronization",
            "Grammar and Spelling Quality Control",
            "Hardcoding, Encoding, & Rendering Subtitles"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "Video Editing & Production", 
          desc: "Content production from creative editing to live broadcast setups.",
          fullDesc: "Experienced in crafting visuals for modern platforms (YouTube Shorts, Instagram Reels, TikTok). I understand viewer retention rhythms and am accustomed to working under tight deadlines. Beyond post-production, I also handle technical setups for community and corporate-scale live broadcasting.",
          tools: ["CapCut Pro", "DaVinci Resolve", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Fast-paced Video Editing (Short-form Content)",
            "Basic Color Grading & Audio Mixing",
            "Asset Management & Post-Production Workflow",
            "Live Streaming Setup & Management"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Network Engineering", 
          desc: "Router configuration, OpenWrt flashing, and AP management.",
          fullDesc: "Capable of designing and maintaining local network infrastructures to support heavy multimedia workflows. I specialize in modifying gigabit-class router firmware to maximize bandwidth, stabilize PC-to-PC data transmission, and seamlessly manage data traffic.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Configuring Custom Firmware (OpenWrt)",
            "Access Point (AP) & LAN Management",
            "P2P File Transfer Setup for Large Files",
            "Network Troubleshooting & Bandwidth Optimization"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC Building & Hardware", 
          desc: "Building, optimizing, and maintaining high-performance workstations.",
          fullDesc: "Possess deep technical understanding of PC hardware architecture. I assemble and configure systems from scratch, ensuring every component (especially the AMD Ryzen ecosystem) runs at peak efficiency. I ensure thermals remain cool and performance remains stable during heavy video rendering.",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "Workstation Component Selection & Assembly",
            "BIOS Updates & Driver Management",
            "Light Overclocking & TDP Optimization",
            "Hardware Maintenance & Thermal Management"
          ]
        }
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
    },
    contact: {
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
      closeBtn: "詳細を閉じる",
      techStack: "ツールと技術",
      coreSkills: "主なスキル",
      items: [
        { 
          id: "localization",
          icon: "📝", 
          title: "多言語ローカリゼーション", 
          desc: "映画やデジタルコンテンツの字幕翻訳とハードコーディング。",
          fullDesc: "多言語翻訳者として、単に言葉を訳すだけでなく、原文（英語/日本語）の魂と感情を対象言語（インドネシア語）に伝えます。正確なタイミング同期、文化的ニュアンス（敬語）の維持、ビデオのハードコーディングプロセスにおいて豊富な経験を持っています。",
          tools: ["Subtitle Edit", "Aegisub", "VS Code", "Format Factory", "Notepad++"],
          capabilities: [
            "文脈翻訳 (英語/日本語 から インドネシア語)",
            "ミリ秒単位のタイミング同期",
            "文法とスペルの品質管理",
            "字幕のハードコーディング、エンコード、レンダリング"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "動画編集・制作", 
          desc: "クリエイティブな編集からライブ配信設定までのコンテンツ制作。",
          fullDesc: "最新プラットフォーム（YouTube Shorts、Instagram Reels、TikTok）向けの映像制作に精通。視聴者の維持率のリズムを理解し、厳しい締め切りの中での作業にも慣れています。ポストプロダクションに加え、コミュニティや企業規模のライブ配信の技術設定も担当します。",
          tools: ["CapCut Pro", "DaVinci Resolve", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "テンポの速い動画編集 (ショートコンテンツ)",
            "基本的なカラーグレーディングとオーディオミキシング",
            "アセット管理とポストプロダクションのワークフロー",
            "ライブ配信の設定と管理"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "ネットワーク構築", 
          desc: "ルーター設定、OpenWrt導入、AP管理。",
          fullDesc: "重いマルチメディアワークフローをサポートするためのローカルネットワークインフラの設計と保守が可能です。ギガビットクラスのルーターのファームウェアを変更し、帯域幅を最大化し、PC間のデータ転送を安定させ、データトラフィックをスムーズに管理することを専門としています。",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "カスタムファームウェアの導入と設定 (OpenWrt)",
            "アクセスポイント(AP)とLANの管理",
            "大容量ファイル用のP2Pファイル転送設定",
            "ネットワークのトラブルシューティングと帯域幅の最適化"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC自作・ハードウェア", 
          desc: "高性能ワークステーションの構築、最適化、保守。",
          fullDesc: "PCハードウェアアーキテクチャに関する深い技術的理解を持っています。システムを一から組み立てて設定し、すべてのコンポーネント（特にAMD Ryzenエコシステム）が最大効率で動作するようにします。重い動画レンダリング時でも、温度を低く保ち、パフォーマンスを安定させます。",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "ワークステーションコンポーネントの選択と組み立て",
            "BIOSアップデートとドライバー管理",
            "ライトオーバークロックとTDP最適化",
            "ハードウェアの保守と温度管理"
          ]
        }
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
    },
    contact: {
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