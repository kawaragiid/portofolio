export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blob Kiri Atas (Warna Biru Kehijauan - Tech Vibe) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
      
      {/* Blob Kanan Tengah (Warna Ungu - Creative Vibe) */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
      
      {/* Blob Bawah (Warna Biru Gelap) */}
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-800/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000" />
    </div>
  );
}