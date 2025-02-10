'use client';

import { useState } from 'react';
import StartMenu from '@/app/_components/widgets/taskbar/start-menu';

export default function StartButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex h-full items-end'>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`start-button ${isOpen ? 'active' : ''}`}
      >
      </button>

      {isOpen && <StartMenu onClose={() => setIsOpen(false)} />}
    </div>
  );
} 