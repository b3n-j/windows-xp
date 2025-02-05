'use client';

import { useEffect, useState } from 'react';

export default function SystemTray() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-full ml-auto bg-gradient-to-r from-[#1E46AA] to-[#2258CD]">
      <div className="flex items-center gap-0.5 px-1 h-full">
        <button className="taskbar-button px-1 h-full flex items-center">
          <img src="/icons/system/volume.ico" alt="Volume" className="w-4 h-4" />
        </button>
        <button className="taskbar-button px-1 h-full flex items-center">
          <img src="/icons/system/network.ico" alt="Network" className="w-4 h-4" />
        </button>
        <button className="taskbar-button px-1 h-full flex items-center">
          <img src="/icons/system/shield.ico" alt="Security" className="w-4 h-4" />
        </button>
      </div>
      <div className="h-full px-2 flex items-center border-l border-[#1E46AA]">
        <span className="text-white text-xs">{time}</span>
      </div>
    </div>
  );
} 