"use client";

import { useEffect, useState } from "react";

export default function RandomOGHandler() {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const images = [
      "/og-banner-main.png",
      "/profile-banner.png",
      "/hero-bg-abstract.png"
    ];
    // Pilih acak
    const selected = images[Math.floor(Math.random() * images.length)];
    setRandomImage(selected);
  }, []);

  // Kamu bisa pakai ini untuk kebutuhan lain, misal background khusus
  return null; 
}