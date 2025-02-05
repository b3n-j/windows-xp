'use client';

import { useState } from 'react';
import StartMenu from '@/app/_components/widgets/desktop/taskbar/start-menu';

export default function StartButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-full px-2 flex items-center gap-2 bg-gradient-to-r from-[#388543] to-[#4CAF50] hover:brightness-105 active:brightness-90 transition-all"
      >
        <img 
          src="/icons/start.png" 
          alt="Start" 
          className="h-6 w-6"
        />
        <span className="text-white font-bold text-sm">start</span>
      </button>

      {isOpen && <StartMenu onClose={() => setIsOpen(false)} />}
    </>
  );
} 