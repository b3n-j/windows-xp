"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ROUTES } from "@/app/_constants/routes";

export default function WindowsLoader() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push(ROUTES.LOGIN), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Gif background animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/windows-xp-loading-screen.gif"
          alt="Windows XP Loading Animation"
          width={190}
          height={0}
          priority
          unoptimized /* Important for animated gifs */
        />
      </div>
    </div>
  );
}
