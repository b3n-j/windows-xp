'use client';

import Image from 'next/image';
import { useWindow } from "@/app/_hooks/useWindow";

export default function RunningApps() {
  const { windows, restoreWindow, focusWindow, activeWindowId } = useWindow();

  const handleClick = (windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    if (window) {
      if (window.isMinimized) {
        restoreWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    }
  };

  return (
    <div className="flex items-center h-full">
      {windows.map((window) => (
        <button
          key={window.id}
          onClick={() => handleClick(window.id)}
          className={`taskbar-button ${window.id === activeWindowId ? 'active' : ''}`}
        >
          <div className="flex relative">
            <Image src={window.icon || '/icons/help.svg'} alt={window.title} width={15} height={15} className="object-contain" />
          </div>
          <span className="taskbar-button-title">{window.title}</span>
        </button>
      ))}
    </div>
  );
} 