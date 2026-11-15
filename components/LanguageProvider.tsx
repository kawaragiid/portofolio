"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ID" | "EN" | "JP";

const dictionary = {
  ID: {
    nav: { expertise: "Keahlian", projects: "Karya", experience: "Pengalaman" },
    hero: {
      subtitle: "Merangkai cerita lewat potongan visual, lokalisasi bahasa, dan edukasi coding.",
      btnWork: "Lihat Karya",
      btnContact: "Kontak Saya",
      btnResume: "Unduh CV (PDF)",
      cvSelectTitle: "Pilih Bahasa CV",
    },
    hud: {
      telemetry: "TELEMETRI SISTEM",
      sysStatus: "ONLINE // OPERASIONAL",
      timeZone: "WIB (SURABAYA, ID)",
      location: "7.2575° S, 112.7521° E",
      activeRoleTitle: "Peran Aktif Saat Ini",
      activeRoleSubtitle: "Guru Ekstrakurikuler Coding",
      activeOrg: "SMP Pancasila (2026 - Sekarang)",
      activeStatus: "SEDANG MENGAJAR & TERBUKA PROYEK REMOTE",
      stackTitle: "Arsip Keahlian & Alat",
      stackSubtitle: "Klik kartu untuk melihat detail kemampuan",
      workstation: "Workstation & Rig",
      workstationDesc: "Ryzen Workstation • Dual Screen • OpenWrt Gateway",
      quickLaunch: "Pintasan Cepat",
      musicTrigger: "Buka Pemutar Audio",
      terminalTrigger: "Akses Terminal AI",
      scrollNotice: "GULIR KE MODUL KARYA & RIWAYAT ↓",
      layer1: "MODUL 01 // RINGKASAN & STATUS UTAMA",
      layer2Projects: "MODUL 02 // DOKUMENTASI KARYA NYATA",
      layer2Timeline: "MODUL 03 // RIWAYAT KERJA & MENGAJAR",
      layer2Contact: "MODUL 04 // DISPATCH & HUBUNGI SAYA",
      transit: {
        wp00: "WP-00 // TITIK AWAL",
        wp01: "WP-01 // EDUKASI CODING",
        wp02: "WP-02 // LOKALISASI & VIDEO",
        wp03: "WP-03 // JARINGAN & LAB",
        wp04: "WP-04 // RIWAYAT PERJALANAN",
        wp05: "WP-05 // DISPATCH & TERMINUS",
        scrollPrompt: "GULIR MOUSE MENELUSURI RUTE PETA ↓",
      },
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
            "Sinkronisasi Waktu (Timing) presisi",
            "Quality Control tata bahasa dan ejaan",
            "Hardcoding & Rendering Subtitle ke Video"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "Produksi & Editing Video", 
          desc: "Produksi konten video pendek dan pengaturan dasar siaran langsung.",
          fullDesc: "Terbiasa meracik visual untuk platform modern (YouTube Shorts, Instagram Reels, TikTok) maupun dokumentasi acara. Selain pasca-produksi, saya juga familier dengan pengaturan teknis siaran langsung (live streaming) skala komunitas.",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Video Editing Ritme Cepat (Short-form Content)",
            "Color Grading & Audio Mixing Dasar",
            "Manajemen Aset & Alur Kerja Pasca-Produksi",
            "Pengaturan Setup Dasar Live Streaming"
          ]
        },
        { 
          id: "coding-instructor",
          icon: "💻", 
          title: "Pengajar Ekskul Coding", 
          desc: "Mengajar dasar pemrograman web dan logika coding untuk siswa SMP.",
          fullDesc: "Membimbing siswa SMP Pancasila dalam memahami logika pemrograman dari nol secara praktis dan menyenangkan. Saya menyusun modul ajar interaktif berbasis HTML, CSS, JavaScript dasar, serta pengenalan logika Python melalui mini-proyek seperti halaman web profil, chatbot sederhana, dan simulasi kontrol robot.",
          tools: ["HTML & CSS", "JavaScript Dasar", "Python", "VS Code", "Modul Web Interaktif"],
          capabilities: [
            "Penyusunan Kurikulum & Program Kerja Ekstrakurikuler",
            "Pembuatan Lembar Materi & Cheat Sheet Siswa",
            "Pendampingan Praktik Live Pemrograman Web & Python",
            "Evaluasi & Gelar Karya Proyek Mini Siswa"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Teknik Jaringan", 
          desc: "Konfigurasi router, flashing OpenWrt, dan manajemen Access Point.",
          fullDesc: "Mampu mengonfigurasi jaringan lokal untuk kebutuhan transfer data multimedia maupun penggunaan harian. Terbiasa memanfaatkan firmware custom (OpenWrt) pada router untuk menjaga kestabilan koneksi antar perangkat.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Konfigurasi Custom Firmware (OpenWrt)",
            "Manajemen Access Point (AP) & Local Area Network",
            "Setup File Transfer untuk pengiriman data lokal",
            "Troubleshooting Jaringan Sederhana"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "Perakitan PC & Hardware", 
          desc: "Merakit, mengoptimalkan, dan memelihara PC untuk kebutuhan kerja & editing.",
          fullDesc: "Memiliki pemahaman praktis mengenai perangkat keras PC. Saya bisa merakit sistem dari nol (terutama ekosistem AMD Ryzen), melakukan instalasi sistem, serta memelihara kestabilan dan suhu perangkat untuk kebutuhan harian maupun editing video.",
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
      subtitle: "Klik pada kartu untuk melihat detail pekerjaan dan dokumentasi nyatanya.",
      modalClose: "Tutup Detail",
      toolsUsed: "Alat yang Digunakan",
      summaryTitle: "Ringkasan Pengerjaan",
      items: [
        { 
          id: "proj-1",
          title: "Subtitle & Lokalisasi", 
          desc: "Inggris/Jepang ke Indonesia",
          category: "Localization & Subtitling",
          details: "Penerjemahan dialog serial/film (contoh: Piece of Safe JP → ID) menggunakan Subtitle Edit. Fokus pada ketepatan timing dialog, penyesuaian kalimat agar alami di telinga penonton Indonesia, dan keterbacaan teks.",
          tools: ["Subtitle Edit", "Aegisub", "Format Factory"],
          image: "/images/project-1.png",
          video: ""
        },
        { 
          id: "proj-2",
          title: "Video Editing", 
          desc: "Dokumentasi & Pasca-Produksi",
          category: "Video Production",
          details: "Penyuntingan video dokumentasi acara dan konten pendek menggunakan CapCut Pro. Mencakup pemotongan klip sesuai ritme musik, penyesuaian warna dasar, serta penggabungan aset grafis.",
          tools: ["CapCut Pro", "Canva", "OBS Studio"],
          image: "/images/project-2.png",
          video: ""
        },
        { 
          id: "proj-3",
          title: "Jaringan & OpenWrt", 
          desc: "Manajemen Router & AP Lokal",
          category: "Networking",
          details: "Konfigurasi firmware OpenWrt pada router lokal untuk memantau beban jaringan, mengatur port LAN/WAN, dan memastikan koneksi stabil untuk transfer file multimedia maupun aktivitas harian.",
          tools: ["OpenWrt", "LuCI", "SSH / Terminal"],
          image: "/images/project-3.png",
          video: ""
        },
        { 
          id: "proj-4",
          title: "Materi Ekskul Coding", 
          desc: "SMP Pancasila — Web & Logika Dasar",
          category: "Coding Education",
          details: "Pembuatan modul web interaktif bertema monokrom lengkap dengan fitur mode gelap untuk pegangan siswa Ekstrakurikuler Coding SMP Pancasila, membantu siswa memahami tag HTML dan tombol kontrol interaktif secara langsung.",
          tools: ["HTML5", "CSS3", "JavaScript", "Python"],
          image: "/images/project-4.png",
          video: ""
        }
      ]
    },
    shortcuts: {
      hint: "Pintasan Keyboard:",
      terminal: "Terminal AI",
      music: "Pemutar Musik",
      lang: "Ganti Bahasa",
      esc: "Tutup Modal"
    },
    experience: {
      title: "Riwayat Kerja & Mengajar.",
      jobs: [
        { title: "Guru Ekstrakurikuler Coding", company: "SMP Pancasila", date: "2026 - Sekarang", desc: "Membimbing siswa kelas 7–9 mempelajari dasar pemrograman web (HTML, CSS, JS) serta logika Python melalui praktik langsung dan proyek mini." },
        { title: "Freelance Subtitler & Video Editor", company: "Wiraswasta", date: "Mei 2025 - Sekarang", desc: "Menerjemahkan dan menyelaraskan subtitle (EN/JP ke ID) serta mengedit berbagai proyek video pendek maupun dokumentasi." },
        { title: "Multimedia Specialist & Broadcast Lead", company: "Mitra Berkah Pratama", date: "Apr 2025 - Feb 2026", desc: "Mengelola kebutuhan multimedia, termasuk pengaturan teknis siaran langsung (live streaming) dan editing pasca-produksi." },
        { title: "Content Creator & Videographer", company: "Muhajirin Center", date: "Jan 2023 - Des 2024", desc: "Menangani produksi konten digital dari penulisan naskah sederhana, pengambilan gambar, hingga editing video." }
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
      resHelp: "Perintah tersedia: clear, sudo, specs, neofetch.\nAtau tanyakan hal seperti:\n- \"siapa kamu?\"\n- \"apa kemampuanmu?\"\n- \"pernah kerja dimana?\"\n- \"kamu tinggal dimana?\"",
      resAbout: "Ilmi adalah seorang Penerjemah Multibahasa (EN/JP ke ID), Video Editor, sekaligus Guru Ekskul Coding di SMP Pancasila.",
      resSkill: "Keahlian utamanya meliputi:\n- Subtitling (Aegisub, Subtitle Edit)\n- Video Editing (CapCut Pro, OBS)\n- Mengajar Coding Dasar (HTML, CSS, Python)\n- Networking (OpenWrt) & PC Hardware.",
      resExperience: "Saat ini Ilmi aktif mengajar sebagai Guru Ekskul Coding di SMP Pancasila serta mengerjakan proyek Freelance Subtitler & Video Editor. Sebelumnya pernah bertugas di Mitra Berkah Pratama dan Muhajirin Center.",
      resLocation: "Ilmi berdomisili di area Surabaya / Gresik, Indonesia 🇮🇩, dan terbuka untuk pekerjaan remote.",
      resContact: "Silakan kirimkan pesan atau penawaran kerja ke: ilmi@kawaragi.id",
      resFallback: "Maaf, saya belum memiliki data untuk menjawab perintah tersebut.\nJika Anda memiliki pertanyaan spesifik, silakan hubungi langsung via email di: ilmi@kawaragi.id 🚀"
    }
  },
  EN: {
    nav: { expertise: "Expertise", projects: "Projects", experience: "Experience" },
    hero: {
      subtitle: "Crafting stories through visual cuts, language localization, and coding education.",
      btnWork: "View Work",
      btnContact: "Contact Me",
      btnResume: "Download CV (PDF)",
      cvSelectTitle: "Choose CV Language",
    },
    hud: {
      telemetry: "SYSTEM TELEMETRY",
      sysStatus: "ONLINE // OPERATIONAL",
      timeZone: "WIB / UTC+7 (SURABAYA, ID)",
      location: "7.2575° S, 112.7521° E",
      activeRoleTitle: "Current Active Role",
      activeRoleSubtitle: "Coding Extracurricular Instructor",
      activeOrg: "SMP Pancasila (2026 - Present)",
      activeStatus: "ACTIVE INSTRUCTOR & AVAILABLE FOR REMOTE WORK",
      stackTitle: "Arsenal & Core Stack",
      stackSubtitle: "Click any card for full capability breakdown",
      workstation: "Workstation & Rig",
      workstationDesc: "Ryzen Workstation • Dual Screen • OpenWrt Gateway",
      quickLaunch: "Quick Launch",
      musicTrigger: "Open Audio Player",
      terminalTrigger: "Launch AI Terminal",
      scrollNotice: "SCROLL TO WORKS & OPERATIONS ARCHIVE ↓",
      layer1: "MODULE 01 // PRIMARY OVERVIEW & STATUS",
      layer2Projects: "MODULE 02 // VERIFIED WORKS ARCHIVE",
      layer2Timeline: "MODULE 03 // WORK & TEACHING HISTORY",
      layer2Contact: "MODULE 04 // MISSION DISPATCH & CONTACT",
      transit: {
        wp00: "WP-00 // ORIGIN",
        wp01: "WP-01 // CODING EDUCATION",
        wp02: "WP-02 // LOCALIZATION & VIDEO",
        wp03: "WP-03 // NETWORK & LAB",
        wp04: "WP-04 // CHRONOLOGY LOGS",
        wp05: "WP-05 // DISPATCH & TERMINUS",
        scrollPrompt: "SCROLL MOUSE TO TRAVERSE MAP ROUTE ↓",
      },
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
          desc: "Translating and timing subtitles for films and digital content.",
          fullDesc: "As a translator, I focus on transferring meaning and tone from source languages (English/Japanese) into natural Indonesian. I handle precise timing synchronization, cultural nuances (honorifics), and video hardcoding workflows.",
          tools: ["Subtitle Edit", "Aegisub", "VS Code", "Format Factory", "Notepad++"],
          capabilities: [
            "Contextual Translation (EN/JP to ID)",
            "Accurate Time Synchronization",
            "Grammar and Readability Quality Control",
            "Subtitle Hardcoding & Video Rendering"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "Video Editing & Production", 
          desc: "Short-form video editing, event highlights, and basic live stream setups.",
          fullDesc: "Experienced in editing visuals for social platforms (Shorts, Reels, TikTok) as well as event documentation. Beyond post-production, I also handle technical setups for community-scale live broadcasts.",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "Short-form & Event Highlight Editing",
            "Basic Color Grading & Audio Mixing",
            "Post-Production Asset Organization",
            "Basic Live Streaming Setup & Management"
          ]
        },
        { 
          id: "coding-instructor",
          icon: "💻", 
          title: "Coding Instructor", 
          desc: "Teaching web programming basics and coding logic to middle school students.",
          fullDesc: "Teaching extracurricular coding classes at SMP Pancasila, guiding students from zero experience through hands-on practice. I design interactive web-based learning modules covering HTML, CSS, basic JavaScript, and introductory Python logic.",
          tools: ["HTML & CSS", "Basic JavaScript", "Python", "VS Code", "Interactive Web Modules"],
          capabilities: [
            "Curriculum & Extracurricular Lesson Planning",
            "Creating Interactive Student Cheat Sheets & Guides",
            "Live Coding Guidance (Web & Python Basics)",
            "Mentoring Student Mini-Projects"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "Network Engineering", 
          desc: "Router configuration, OpenWrt flashing, and local AP management.",
          fullDesc: "Able to set up and manage local networks for multimedia file transfers and daily reliability. Experienced with custom OpenWrt router firmware to monitor traffic and maintain stable LAN/WAN connections.",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "Flashing & Configuring Custom Firmware (OpenWrt)",
            "Access Point (AP) & LAN Management",
            "Local File Transfer Setup",
            "Basic Network Troubleshooting"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC Building & Hardware", 
          desc: "Building, optimizing, and maintaining PCs for work and editing.",
          fullDesc: "Practical hands-on experience with PC hardware. I assemble systems from scratch (especially AMD Ryzen platforms), handle OS/driver installations, and maintain thermals and system stability for daily work and video editing.",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "PC/Workstation Component Selection & Assembly",
            "BIOS Updates & Driver Management",
            "Basic Performance & Power Optimization",
            "Hardware Maintenance & Thermal Care"
          ]
        }
      ]
    },
    projects: {
      title: "Featured Work.",
      subtitle: "Click any card to view project details and real work documentation.",
      modalClose: "Close Details",
      toolsUsed: "Tools Used",
      summaryTitle: "Work Summary",
      items: [
        { 
          id: "proj-1",
          title: "Subtitling & Localization", 
          desc: "English/Japanese to Indonesian",
          category: "Localization & Subtitling",
          details: "Dialogue translation (e.g., Piece of Safe JP → ID) using Subtitle Edit. Focused on accurate timing synchronization, natural Indonesian phrasing, and clean viewer readability.",
          tools: ["Subtitle Edit", "Aegisub", "Format Factory"],
          image: "/images/project-1.png",
          video: ""
        },
        { 
          id: "proj-2",
          title: "Video Editing", 
          desc: "Event Documentation & Post-Production",
          category: "Video Production",
          details: "Editing event documentation and short-form clips using CapCut Pro. Includes music-synced cuts, basic color correction, and clean graphic overlays.",
          tools: ["CapCut Pro", "Canva", "OBS Studio"],
          image: "/images/project-2.png",
          video: ""
        },
        { 
          id: "proj-3",
          title: "Network & OpenWrt", 
          desc: "Local Router & AP Management",
          category: "Networking",
          details: "Configuring OpenWrt firmware on local routers to monitor network load, manage LAN/WAN ports, and maintain stable connections for multimedia file transfers and daily operations.",
          tools: ["OpenWrt", "LuCI", "SSH / Terminal"],
          image: "/images/project-3.png",
          video: ""
        },
        { 
          id: "proj-4",
          title: "Coding Class Modules", 
          desc: "SMP Pancasila — Web & Logic Basics",
          category: "Coding Education",
          details: "Built clean, interactive monochrome web learning modules with dark-mode support for SMP Pancasila coding club students to learn HTML tags and interactive button controls hands-on.",
          tools: ["HTML5", "CSS3", "JavaScript", "Python"],
          image: "/images/project-4.png",
          video: ""
        }
      ]
    },
    shortcuts: {
      hint: "Keyboard Shortcuts:",
      terminal: "AI Terminal",
      music: "Music Player",
      lang: "Cycle Language",
      esc: "Close Modal"
    },
    experience: {
      title: "Work & Teaching History.",
      jobs: [
        { title: "Coding Extracurricular Instructor", company: "SMP Pancasila", date: "2026 - Present", desc: "Guiding grades 7–9 students in learning web programming fundamentals (HTML, CSS, JS) and Python logic through hands-on practice and mini-projects." },
        { title: "Freelance Subtitler & Video Editor", company: "Self-Employed", date: "May 2025 - Present", desc: "Translating and timing subtitles (EN/JP to ID) and editing short-form videos and event documentation." },
        { title: "Multimedia Specialist & Broadcast Lead", company: "Mitra Berkah Pratama", date: "Apr 2025 - Feb 2026", desc: "Managed multimedia operations including live streaming technical setups and post-production video editing." },
        { title: "Content Creator & Videographer", company: "Muhajirin Center", date: "Jan 2023 - Dec 2024", desc: "Handled digital content production from basic scripting and filming to video editing." }
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
      resHelp: "Available commands: clear, sudo, specs, neofetch.\nOr ask things like:\n- \"who are you?\"\n- \"what are your skills?\"\n- \"where have you worked?\"\n- \"where do you live?\"",
      resAbout: "Ilmi is a Multilingual Translator (EN/JP to ID), Video Editor, and Extracurricular Coding Instructor at SMP Pancasila.",
      resSkill: "Core expertise includes:\n- Subtitling (Aegisub, Subtitle Edit)\n- Video Editing (CapCut Pro, OBS)\n- Coding Instruction (HTML, CSS, Python)\n- Networking (OpenWrt) & PC Hardware.",
      resExperience: "Currently teaching coding at SMP Pancasila while taking Freelance Subtitling & Video Editing projects. Previously worked at Mitra Berkah Pratama and Muhajirin Center.",
      resLocation: "Ilmi is based in Surabaya / Gresik, Indonesia 🇮🇩, and is open to remote work.",
      resContact: "You can send a message or inquiry directly to: ilmi@kawaragi.id",
      resFallback: "Sorry, I don't have the data to answer that command yet.\nIf you have specific questions, please reach out via email at: ilmi@kawaragi.id 🚀"
    }
  },
  JP: {
    nav: { expertise: "専門知識", projects: "プロジェクト", experience: "経歴" },
    hero: {
      subtitle: "映像編集、多言語字幕翻訳、そしてプログラミング教育を通じて価値を届ける。",
      btnWork: "作品を見る",
      btnContact: "お問い合わせ",
      btnResume: "履歴書 (PDF)",
      cvSelectTitle: "履歴書の言語を選択",
    },
    hud: {
      telemetry: "システム テレメトリ",
      sysStatus: "稼働中 // オンライン",
      timeZone: "WIB / UTC+7 (スラバヤ, ID)",
      location: "南緯7.2575° 東経112.7521°",
      activeRoleTitle: "現在の主な活動",
      activeRoleSubtitle: "課外プログラミング講師",
      activeOrg: "SMP Pancasila (2026年 - 現在)",
      activeStatus: "授業実施中 & リモートワーク受付中",
      stackTitle: "スキル & 使用ツール",
      stackSubtitle: "カードをクリックして詳細を表示",
      workstation: "作業環境 & 機材",
      workstationDesc: "Ryzen ワークステーション • デュアル画面 • OpenWrt",
      quickLaunch: "クイック起動",
      musicTrigger: "オーディオプレイヤー",
      terminalTrigger: "AIターミナルを起動",
      scrollNotice: "制作実績と職歴アーカイブへスクロール ↓",
      layer1: "モジュール 01 // 概要 & ステータス",
      layer2Projects: "モジュール 02 // 制作・実績アーカイブ",
      layer2Timeline: "モジュール 03 // 職歴 & 指導実績",
      layer2Contact: "モジュール 04 // お問い合わせ & 連絡先",
      transit: {
        wp00: "WP-00 // 出発点",
        wp01: "WP-01 // プログラミング教育",
        wp02: "WP-02 // 字幕翻訳 & 映像制作",
        wp03: "WP-03 // ネットワーク & 機材",
        wp04: "WP-04 // 経歴タイムライン",
        wp05: "WP-05 // 連絡先 & 終着点",
        scrollPrompt: "スクロールしてルートを移動 ↓",
      },
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
          desc: "映画やデジタルコンテンツの字幕翻訳とタイミング同期。",
          fullDesc: "翻訳者として、英語や日本語のニュアンスや感情を自然なインドネシア語へ伝えることを重視しています。正確なタイミング調整、敬語などの文化的表現の維持、ハードコーディングまで対応します。",
          tools: ["Subtitle Edit", "Aegisub", "VS Code", "Format Factory", "Notepad++"],
          capabilities: [
            "文脈に沿った翻訳 (英語/日本語 → インドネシア語)",
            "正確なタイミング同期",
            "文法と読みやすさの品質管理",
            "字幕のハードコーディングと書き出し"
          ]
        },
        { 
          id: "video-editing",
          icon: "🎬", 
          title: "動画編集・制作", 
          desc: "ショート動画編集、イベント記録、基本的なライブ配信設定。",
          fullDesc: "SNS向けのショート動画やイベント記録映像の編集を行っています。ポストプロダクションに加え、コミュニティ規模のライブ配信の技術設定も担当します。",
          tools: ["CapCut Pro", "Canva", "OBS Studio", "TikTok Live Studio"],
          capabilities: [
            "ショート動画・イベント記録の編集",
            "基本的なカラー調整とオーディオミキシング",
            "アセット管理と編集ワークフロー",
            "基本的なライブ配信設定"
          ]
        },
        { 
          id: "coding-instructor",
          icon: "💻", 
          title: "プログラミング講師", 
          desc: "中学校でのWebプログラミング基礎・Python論理指導。",
          fullDesc: "SMP Pancasilaの課外プログラミング教室（エクスクル）の講師として、中学生にゼロからコードを書く楽しさを教えています。HTML/CSS/JavaScript基礎やPythonの論理を学ぶためのインタラクティブ教材も自作しています。",
          tools: ["HTML & CSS", "JavaScript基礎", "Python", "VS Code", "自作Web教材"],
          capabilities: [
            "課外授業カリキュラム・指導案の作成",
            "生徒向けWeb教材・チートシートの作成",
            "Web制作およびPython基礎のライブ指導",
            "生徒のミニプロジェクト制作サポート"
          ]
        },
        { 
          id: "networking",
          icon: "🌐", 
          title: "ネットワーク構築", 
          desc: "ルーター設定、OpenWrt導入、ローカルAP管理。",
          fullDesc: "大容量データの転送や日常利用のためのローカルネットワーク構築に対応します。OpenWrtカスタムファームウェアを活用し、安定したLAN/WAN接続環境を整えます。",
          tools: ["OpenWrt", "Tailscale", "Putty/SSH", "WinSCP", "Terminal"],
          capabilities: [
            "カスタムファームウェアの導入と設定 (OpenWrt)",
            "アクセスポイント(AP)とLAN管理",
            "ローカルファイル転送環境の設定",
            "基本的なネットワークのトラブルシューティング"
          ]
        },
        { 
          id: "hardware",
          icon: "⚙️", 
          title: "PC自作・ハードウェア", 
          desc: "編集や作業用途に合わせたPCの構築・保守。",
          fullDesc: "PCハードウェアの実践的な知識を持ち、AMD Ryzen環境を中心としたPCの組み立て、OS・ドライバー設定、日常や動画編集に向けた温度管理・安定性維持を行います。",
          tools: ["BIOS/UEFI", "HWMonitor", "CPU-Z", "Windows OS", "Thermal Tools"],
          capabilities: [
            "PCパーツ選定と組み立て",
            "BIOSアップデートとドライバー管理",
            "基本的なパフォーマンス・省電力最適化",
            "ハードウェア保守と温度管理"
          ]
        }
      ]
    },
    projects: {
      title: "注目の作品。",
      subtitle: "カードをクリックすると、制作の詳細と実際のドキュメントをご覧いただけます。",
      modalClose: "閉じる",
      toolsUsed: "使用ツール",
      summaryTitle: "制作概要",
      items: [
        { 
          id: "proj-1",
          title: "字幕翻訳・ローカリゼーション", 
          desc: "英語/日本語 → インドネシア語",
          category: "Localization & Subtitling",
          details: "Subtitle Editを使用した映像作品の字幕翻訳（例：Piece of Safe 日本語→インドネシア語）。正確なタイミング調整と、インドネシアの視聴者に自然に伝わる表現を心がけています。",
          tools: ["Subtitle Edit", "Aegisub", "Format Factory"],
          image: "/images/project-1.png",
          video: ""
        },
        { 
          id: "proj-2",
          title: "動画編集", 
          desc: "イベント記録・ポストプロダクション",
          category: "Video Production",
          details: "CapCut Proを用いたイベント記録映像およびショート動画の編集。音楽のリズムに合わせたカット割り、基本的な色補正、グラフィック素材の合成を担当しました。",
          tools: ["CapCut Pro", "Canva", "OBS Studio"],
          image: "/images/project-2.png",
          video: ""
        },
        { 
          id: "proj-3",
          title: "ネットワーク & OpenWrt", 
          desc: "ローカルルーター・AP管理",
          category: "Networking",
          details: "OpenWrtファームウェアを導入したローカルルーターの設定。トラフィック監視、LAN/WANポート管理、大容量データ転送のための安定した通信環境を構築しています。",
          tools: ["OpenWrt", "LuCI", "SSH / Terminal"],
          image: "/images/project-3.png",
          video: ""
        },
        { 
          id: "proj-4",
          title: "プログラミング授業教材", 
          desc: "SMP Pancasila — Web基礎と論理",
          category: "Coding Education",
          details: "SMP Pancasilaのプログラミング部生徒向けに自作した、ダークモード対応のWeb教材。HTMLタグやインタラクティブなボタン制御の仕組みを実践的に学べるよう設計しています。",
          tools: ["HTML5", "CSS3", "JavaScript", "Python"],
          image: "/images/project-4.png",
          video: ""
        }
      ]
    },
    shortcuts: {
      hint: "キーボードショートカット:",
      terminal: "AIターミナル",
      music: "音楽プレイヤー",
      lang: "言語切替",
      esc: "モーダルを閉じる"
    },
    experience: {
      title: "職歴・指導歴。",
      jobs: [
        { title: "課外プログラミング講師", company: "SMP Pancasila", date: "2026年 - 現在", desc: "中学1〜3年生を対象に、Webプログラミングの基礎（HTML, CSS, JS）とPythonの論理思考をハンズオン形式で指導。" },
        { title: "フリーランス 字幕翻訳 & 動画編集", company: "自営業", date: "2025年5月 - 現在", desc: "英語/日本語からインドネシア語への字幕翻訳・タイミング調整、およびショート動画やイベント映像の編集。" },
        { title: "マルチメディアスペシャリスト", company: "Mitra Berkah Pratama", date: "2025年4月 - 2026年2月", desc: "ライブ配信の技術設定や映像のポストプロダクションを含むマルチメディア業務を担当。" },
        { title: "コンテンツクリエイター & ビデオグラファー", company: "Muhajirin Center", date: "2023年1月 - 2024年12月", desc: "デジタルコンテンツの企画、撮影、動画編集まで一貫して担当。" }
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
      resHelp: "利用可能なコマンド: clear, sudo, specs, neofetch.\nまたは次のように質問してください：\n- \"あなたは誰？\"\n- \"スキルは何？\"\n- \"職歴は？\"\n- \"どこに住んでいるの？\"",
      resAbout: "Ilmi は多言語翻訳者（英語/日本語 → インドネシア語）、動画編集者、そして SMP Pancasila の課外プログラミング講師です。",
      resSkill: "主なスキルは以下の通りです：\n- 字幕翻訳 (Aegisub, Subtitle Edit)\n- 動画編集 (CapCut Pro, OBS)\n- プログラミング指導 (HTML, CSS, Python)\n- ネットワーク (OpenWrt) & PCハードウェア",
      resExperience: "現在は SMP Pancasila でプログラミングを教えながら、フリーランスの字幕翻訳・動画編集者として活動しています。以前は Mitra Berkah Pratama や Muhajirin Center で勤務していました。",
      resLocation: "インドネシアのスラバヤ / グレシク 🇮🇩 を拠点としており、リモートワークにも対応しています。",
      resContact: "メッセージやご依頼はこちらへお送りください: ilmi@kawaragi.id",
      resFallback: "申し訳ありませんが、そのコマンドに答えるデータがまだありません。\n具体的なご質問がある場合は、直接メールでお問い合わせください: ilmi@kawaragi.id 🚀"
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