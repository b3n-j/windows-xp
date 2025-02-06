import Image from 'next/image';

export default function WindowsLogo() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-[150px] h-[50px]">
        <Image 
          src="/images/windows-xp-white-logo.png"
          alt="Windows XP"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 