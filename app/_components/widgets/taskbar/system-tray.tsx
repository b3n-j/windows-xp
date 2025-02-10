'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    <div className="stray flex items-center h-full ml-auto gap-2">
      <div className="flex items-center h-full">
        <button className="taskbar-button-stray h-full flex items-center">
          <div className="flex">
            <Image src="/icons/folder.ico" alt="Volume" width={15} height={15} className="object-contain" />
          </div>
        </button>
        <button className="taskbar-button-stray h-full flex items-center">
          <div className="flex">
            <Image src="/icons/what.ico" alt="Network" width={15} height={15} className="object-contain" />
          </div>
        </button>
        <button className="taskbar-button-stray h-full flex items-center">
          <div className="flex">
            <Image src="/icons/trash.ico" alt="Security" width={15} height={15} className="object-contain" />
          </div>
        </button>
      </div>
      <div className="h-full flex items-center">
        <span className="hour">{time}</span>
      </div>
    </div>
  );
} 