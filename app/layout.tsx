import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Atau font bawaanmu
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { PerformanceProvider } from "@/components/PerformanceProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://keigo.kawaragi.id"),
  title: "Ilmi | Video Editor & Multilingual Translator",
  description: "Portofolio profesional Ilmi. Spesialis pelokalan bahasa (Inggris & Jepang ke Indonesia), Video Editor, dan teknisi jaringan/hardware.",
  icons: {
    icon: "/ico.png",
  },
  keywords: ["Video Editor", "Subtitler", "Penerjemah Bahasa Jepang", "Freelance Video Editor Indonesia", "OpenWrt", "PC Builder", "Ilmi Kawaragi"],
  authors: [{ name: "Miftakhul Ilmi" }],
  creator: "Miftakhul Ilmi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://keigo.kawaragi.id", // Ganti dengan domain aslimu nanti jika berbeda
    title: "Ilmi | Video Editor & Multilingual Translator",
    description: "Merangkai cerita lewat potongan visual dan lokalisasi bahasa. Spesialis subtitling, produksi video, dan workstation tingkat tinggi.",
    siteName: "Ilmi Portfolio",
    images: [
      {
        url: "https://keigo.kawaragi.id/og-banner-main.png", // Kita akan siapkan gambarnya setelah ini
        width: 1200,
        height: 630,
        alt: "Ilmi Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilmi | Video Editor & Multilingual Translator",
    description: "Merangkai cerita lewat potongan visual dan lokalisasi bahasa. Lihat portofolio saya di sini.",
    images: ["/og-banner-main.png"], // Menggunakan gambar yang sama
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miftakhul Ilmi",
  alternateName: "Ilmi Kawaragi",
  url: "https://keigo.kawaragi.id",
  jobTitle: "Video Editor, Multilingual Translator & Coding Instructor",
  image: "https://keigo.kawaragi.id/og-banner-main.png",
  sameAs: [
    "https://www.upwork.com/freelancers/~01705729bdc457ff0f",
    "https://github.com/kawaragiid",
  ],
  knowsAbout: [
    "Video Editing",
    "CapCut Pro",
    "Aegisub",
    "Subtitle Edit",
    "Japanese to Indonesian Localization",
    "English to Indonesian Translation",
    "HTML & CSS",
    "Python Basics",
    "OpenWrt",
    "PC Building",
  ],
  description: "Multilingual Translator (EN/JP to ID), Video Editor, Network/PC Technician, and Extracurricular Coding Instructor at SMP Pancasila.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#050505] text-white min-h-screen selection:bg-cyan-500/30`}>
        <PerformanceProvider>
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}