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
          fullDesc: "Sebagai penerjemah, saya berfokus memindahkan makna dan emosi dari bahasa sumber (Inggris/Jepang) ke bahasa target (Indonesia). Saya terbiasa menangani sinkronisasi waktu (timing), menjaga nuansa budaya (honorifics), serta melakukan proses hardcoding video.",
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
          desc: "Produksi konten video pendek dan pengaturan dasar siaran langsung.",
          fullDesc: "Terbiasa meracik visual untuk platform modern (YouTube Shorts, Instagram Reels, TikTok). Sebagai video editor yang masih terus belajar, saya fokus memahami ritme retensi penonton. Selain pasca-produksi, saya juga familier dengan pengaturan teknis siaran langsung (live streaming) skala komunitas.",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Video Editing Ritme Cepat (Short-form Content)",
            "Color Grading & Audio Mixing Dasar",
            "Manajemen Aset & Alur Kerja Pasca-Produksi",
            "Pengaturan Setup Dasar Live Streaming"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Teknik Jaringan", 
          desc: "Konfigurasi router, flashing OpenWrt, dan manajemen Access Point.",
          fullDesc: "Mampu mengonfigurasi jaringan lokal untuk kebutuhan transfer data multimedia. Berspesialisasi dalam pemanfaatan firmware custom (OpenWrt) pada router untuk mengoptimalkan bandwidth dan stabilitas koneksi antar perangkat dalam skala rumahan atau komunitas.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Konfigurasi Custom Firmware (OpenWrt)",
            "Manajemen Access Point (AP) & Local Area Network",
            "Setup P2P File Transfer untuk pengiriman data lokal",
            "Troubleshooting Jaringan Sederhana"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "Perakitan PC & Hardware", 
          desc: "Merakit, mengoptimalkan, dan memelihara PC untuk kebutuhan rendering.",
          fullDesc: "Memiliki pemahaman praktis mengenai perangkat keras PC. Saya bisa merakit sistem dari nol (terutama ekosistem AMD Ryzen), serta memastikan setiap komponen berjalan efisien. Saya juga terus belajar dalam menjaga suhu perangkat dan stabilitas untuk kebutuhan harian maupun editing video.",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "Pemilihan & Perakitan Komponen PC/Workstation",
            "Update BIOS & Manajemen Driver",
            "Optimasi performa & efisiensi daya dasar",
            "Maintenance Perangkat Keras & Manajemen Suhu"
          ]
        }
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
    },
    terminal: {
      assistantName: "Asisten AI",
      boot: [
        "Memulai sistem inti Ilmi.OS...",
        "Memuat Modul Asisten AI... [OK]",
        "Membangun koneksi aman... [OK]",
        "Halo! Saya adalah Asisten AI virtual Ilmi 🤖",
        "Kamu bisa bertanya tentang profil, skill, atau ketik 'help'."
      ],
      quickCommands: ["help", "siapa kamu?", "apa skillmu?", "pengalaman kerja", "lokasi", "clear"],
      resSudo: "Nice try. Akses root ditolak. Tindakan ini telah dicatat ke server.",
      resHelp: "Perintah tersedia: clear, sudo.\nAtau tanyakan hal seperti:\n- \"siapa kamu?\"\n- \"apa kemampuanmu?\"\n- \"pernah kerja dimana?\"\n- \"kamu tinggal dimana?\"",
      resAbout: "Ilmi adalah seorang Penerjemah Multibahasa (EN/JP ke ID) dan Video Editor yang berfokus pada pelokalan dan produksi konten digital kreatif.",
      resSkill: "Keahlian utamanya meliputi:\n- Subtitling (Aegisub, Subtitle Edit)\n- Video Editing (CapCut Pro)\n- Networking (OpenWrt)\n- PC Hardware & Perakitan.",
      resExperience: "Ilmi pernah bekerja sebagai Multimedia Specialist di Mitra Berkah Pratama, Content Creator di Muhajirin Center, dan saat ini aktif sebagai Freelance Subtitler.",
      resLocation: "Ilmi berdomisili di Surabaya, Indonesia 🇮🇩, namun sangat terbuka untuk pekerjaan remote dari seluruh penjuru dunia.",
      resContact: "Pilihan yang tepat! Kamu bisa langsung mengirimkan pesan atau penawaran kerja ke: ilmi@kawaragi.id",
      resFallback: "Maaf, saya belum memiliki data untuk menjawab perintah tersebut.\nJika Anda memiliki pertanyaan spesifik atau tawaran kolaborasi, silakan hubungi langsung via email di: ilmi@kawaragi.id 🚀"
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
          fullDesc: "As a translator, I focus on transferring meaning and emotion from the source language (English/Japanese) to the target language (Indonesian). I am accustomed to handling precise time synchronization, preserving cultural nuances (honorifics), and performing the video hardcoding process.",
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
          desc: "Short-form video content production and basic live broadcast setups.",
          fullDesc: "Accustomed to crafting visuals for modern platforms (YouTube Shorts, Instagram Reels, TikTok). As a continuously learning video editor, I focus on understanding viewer retention rhythms. Beyond post-production, I am also familiar with technical setups for community-scale live broadcasting.",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Fast-paced Video Editing (Short-form Content)",
            "Basic Color Grading & Audio Mixing",
            "Asset Management & Post-Production Workflow",
            "Basic Live Streaming Setup & Management"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Network Engineering", 
          desc: "Router configuration, OpenWrt flashing, and AP management.",
          fullDesc: "Capable of configuring local networks for multimedia data transfer needs. I specialize in utilizing custom firmware (OpenWrt) on routers to optimize bandwidth and connection stability between devices for home or community scale.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Configuring Custom Firmware (OpenWrt)",
            "Access Point (AP) & LAN Management",
            "P2P File Transfer Setup for Local Data",
            "Basic Network Troubleshooting"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC Building & Hardware", 
          desc: "Building, optimizing, and maintaining PCs for rendering needs.",
          fullDesc: "Possess a practical understanding of PC hardware. I can assemble systems from scratch (especially the AMD Ryzen ecosystem) and ensure components run efficiently. I am also continuously learning to manage device thermals and stability for daily use and video editing.",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "PC/Workstation Component Selection & Assembly",
            "BIOS Updates & Driver Management",
            "Basic Performance & Power Efficiency Optimization",
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
    },
    terminal: {
      assistantName: "AI Assistant",
      boot: [
        "Starting Ilmi.OS core system...",
        "Loading AI Assistant Module... [OK]",
        "Establishing secure connection... [OK]",
        "Hello! I am Ilmi's virtual AI Assistant 🤖",
        "You can ask about profile, skills, or type 'help'."
      ],
      quickCommands: ["help", "who are you?", "your skills?", "work experience", "location", "clear"],
      resSudo: "Nice try. Root access denied. This incident will be reported.",
      resHelp: "Available commands: clear, sudo.\nOr ask things like:\n- \"who are you?\"\n- \"what are your skills?\"\n- \"where have you worked?\"\n- \"where do you live?\"",
      resAbout: "Ilmi is a Multilingual Translator (EN/JP to ID) and Video Editor focusing on localization and creative digital content production.",
      resSkill: "Core expertise includes:\n- Subtitling (Aegisub, Subtitle Edit)\n- Video Editing (CapCut Pro)\n- Networking (OpenWrt)\n- PC Hardware & Assembly.",
      resExperience: "Ilmi has worked as a Multimedia Specialist at Mitra Berkah Pratama, Content Creator at Muhajirin Center, and is currently active as a Freelance Subtitler.",
      resLocation: "Ilmi is based in Surabaya, Indonesia 🇮🇩, but is highly open to remote work from around the globe.",
      resContact: "Great choice! You can directly send a message or job offer to: ilmi@kawaragi.id",
      resFallback: "Sorry, I don't have the data to answer that command yet.\nIf you have specific questions or collaboration offers, please contact directly via email at: ilmi@kawaragi.id 🚀"
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
          fullDesc: "翻訳者として、原文（英語/日本語）の意味と感情を対象言語（インドネシア語）に伝えることに焦点を当てています。正確なタイミング同期、文化的ニュアンス（敬語）の維持、ビデオのハードコーディングプロセスに慣れています。",
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
          desc: "ショートビデオのコンテンツ制作と基本的なライブ配信設定。",
          fullDesc: "最新プラットフォーム（YouTube Shorts、Instagram Reels、TikTok）向けの映像制作に慣れています。現在も学習中の動画編集者として、視聴者維持のリズムを理解することに焦点を当てています。ポストプロダクションに加え、コミュニティ規模のライブ配信の技術的な設定にも精通しています。",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "テンポの速い動画編集 (ショートコンテンツ)",
            "基本的なカラーグレーディングとオーディオミキシング",
            "アセット管理とポストプロダクションのワークフロー",
            "基本的なライブ配信の設定と管理"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "ネットワーク構築", 
          desc: "ルーター設定、OpenWrt導入、AP管理。",
          fullDesc: "マルチメディアデータ転送のニーズに合わせてローカルネットワークを設定できます。家庭やコミュニティ規模でのデバイス間の帯域幅と接続の安定性を最適化するためのルーターカスタムファームウェア（OpenWrt）の活用を専門としています。",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "カスタムファームウェアの導入と設定 (OpenWrt)",
            "アクセスポイント(AP)とLANの管理",
            "ローカルデータ用のP2Pファイル転送設定",
            "基本的なネットワークのトラブルシューティング"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC自作・ハードウェア", 
          desc: "レンダリングニーズに合わせたPCの構築、最適化、保守。",
          fullDesc: "PCハードウェアに関する実践的な理解を持っています。システムを一から組み立て（特にAMD Ryzenエコシステム）、コンポーネントを効率的に動作させることができます。また、日常使用や動画編集におけるデバイスの温度管理と安定性についても継続的に学んでいます。",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "PC/ワークステーションコンポーネントの選択と組み立て",
            "BIOSアップデートとドライバー管理",
            "基本的なパフォーマンスと電力効率の最適化",
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
    },
    terminal: {
      assistantName: "AI アシスタント",
      boot: [
        "Ilmi.OS コアシステムを起動中...",
        "AI アシスタントモジュールを読み込み中... [OK]",
        "安全な接続を確立中... [OK]",
        "こんにちは！私はIlmiのバーチャルAIアシスタントです 🤖",
        "プロフィールやスキルについて質問するか、'help' と入力してください。"
      ],
      quickCommands: ["help", "あなたは誰？", "スキルは何？", "職歴", "所在地", "clear"],
      resSudo: "惜しいですね。ルートアクセスが拒否されました。このインシデントは報告されます。",
      resHelp: "利用可能なコマンド: clear, sudo.\nまたは次のように質問してください：\n- \"あなたは誰？\"\n- \"スキルは何？\"\n- \"職歴は？\"\n- \"どこに住んでいるの？\"",
      resAbout: "Ilmi は、ローカリゼーションとクリエイティブなデジタルコンテンツ制作に焦点を当てた多言語翻訳者（英語/日本語からインドネシア語）および動画編集者です。",
      resSkill: "主な専門知識は以下の通りです：\n- 字幕翻訳 (Aegisub, Subtitle Edit)\n- 動画編集 (CapCut Pro)\n- ネットワーク (OpenWrt)\n- PCハードウェアと組み立て",
      resExperience: "Ilmi は Mitra Berkah Pratama でマルチメディアスペシャリスト、Muhajirin Center でコンテンツクリエイターとして勤務し、現在はフリーランスの字幕翻訳者として活動しています。",
      resLocation: "Ilmi はインドネシアのスラバヤ 🇮🇩 を拠点としていますが、世界中からのリモートワークにも積極的に対応しています。",
      resContact: "素晴らしい選択です！ メッセージや仕事の依頼は、直接こちらへお送りください: ilmi@kawaragi.id",
      resFallback: "申し訳ありませんが、そのコマンドに答えるデータがまだありません。\n具体的な質問やコラボレーションの提案がある場合は、直接メールでお問い合わせください: ilmi@kawaragi.id 🚀"
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