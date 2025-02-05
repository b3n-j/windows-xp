'use client';

import StartButton from '@/app/_components/widgets/desktop/taskbar/start-button';
import QuickLaunch from '@/app/_components/widgets/desktop/taskbar/quick-launch';
import RunningApps from '@/app/_components/widgets/desktop/taskbar/running-apps';
import SystemTray from '@/app/_components/widgets/desktop/taskbar/system-tray';

export default function Taskbar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-[#245EDC] to-[#3C8EF3] flex items-center px-1 shadow-lg">
      <StartButton />
      <div className="h-[85%] w-px mx-1 bg-[#0B48B5] shadow-[1px_0_rgba(255,255,255,0.3)]" />
      <QuickLaunch />
      <div className="h-[85%] w-px mx-1 bg-[#0B48B5] shadow-[1px_0_rgba(255,255,255,0.3)]" />
      <RunningApps />
      <SystemTray />
    </div>
  );
} 