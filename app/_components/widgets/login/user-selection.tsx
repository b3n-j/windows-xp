'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UserSelection() {
  const router = useRouter();

  const handleUserClick = () => {
    router.push('/desktop');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#235BCE] to-[#78B4FF] flex flex-col items-center justify-center">
      <h1 className="text-white text-2xl mb-8">
        Welcome to Windows XP
      </h1>
      
      <div 
        onClick={handleUserClick}
        className="bg-white/20 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/30 transition-colors"
      >
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/images/account/airplane.jpg"
            alt="Benjamin"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <p className="text-white text-center">Benjamin</p>
      </div>
    </div>
  );
} 