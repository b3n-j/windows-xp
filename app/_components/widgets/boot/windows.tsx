'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ROUTES } from '@/app/_constants/routes';

export default function WindowsBootScreen() {
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
      {/* Animation GIF en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/windows-xp-loading-screen.gif"
          alt="Windows XP Loading Animeation"
          width={220}
          height={220}
          className="object-cover"
          priority
          unoptimized // Important pour les GIFs animés
        />
      </div>
    </div>
  );
} 