import Image from 'next/image';

export default function ShutdownButton() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
      <div className="relative w-8 h-8">
        <Image 
          src="/icons/shutdown.ico" 
          alt="Shutdown"
          fill
          className="object-contain"
        />
      </div>
      <span className="text-white text-sm">Turn off computer</span>
    </button>
  );
} 