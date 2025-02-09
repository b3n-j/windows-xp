import StartButton from '@/app/_components/widgets/taskbar/start-button';
import QuickLaunch from '@/app/_components/widgets/taskbar/quick-launch';
import RunningApps from '@/app/_components/widgets/taskbar/running-apps';
import SystemTray from '@/app/_components/widgets/taskbar/system-tray';

export default function Taskbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-[#245edb] to-[#2c89e3] flex items-center" 
         style={{ zIndex: 9999 }}>
      <StartButton />
      <div className="h-[85%] w-px mx-1 bg-[#0B48B5] shadow-[1px_0_rgba(255,255,255,0.3)]" />
      <QuickLaunch />
      <div className="h-[85%] w-px mx-1 bg-[#0B48B5] shadow-[1px_0_rgba(255,255,255,0.3)]" />
      <RunningApps />
      <SystemTray />
    </div>
  );
} 