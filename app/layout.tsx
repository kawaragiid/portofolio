import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Atau font bawaanmu
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-[#050505] text-white min-h-screen selection:bg-cyan-500/30`}>
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}