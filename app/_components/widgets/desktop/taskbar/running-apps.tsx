'use client';

import Image from 'next/image';
import { useWindows } from '@/app/_contexts/WindowContext';

export default function RunningApps() {
  const { windows, restoreWindow, focusWindow } = useWindows();

  const handleClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (window?.isMinimized) {
      restoreWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <div className="flex-1 flex items-center h-full px-1">
      {windows.map((window) => (
        <button
          key={window.id}
          onClick={() => handleClick(window.id)}
          className={`taskbar-button h-[90%] px-2 flex items-center gap-2 min-w-[150px] max-w-[200px] ${
            window.isActive ? 'bg-gradient-to-b from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.2)]' : ''
          }`}
        >
          <div className="relative w-6 h-6">
            <Image src={window.icon || '/icons/default.ico'} alt={window.title} fill className="object-contain" />
          </div>
          <span className="text-white text-sm truncate">{window.title}</span>
        </button>
      ))}
    </div>
  );
} 