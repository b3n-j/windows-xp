import StartButton from "@/app/_components/widgets/taskbar/start-button";
import QuickLaunch from "@/app/_components/widgets/taskbar/quick-launch";
import RunningApps from "@/app/_components/widgets/taskbar/running-apps";
import SystemTray from "@/app/_components/widgets/taskbar/system-tray";

export default function Taskbar() {
  return (
    <div
      className="taskbar"
      style={{ zIndex: 9999 }}
    >
      <StartButton />
      <QuickLaunch />
      <RunningApps />
      <SystemTray />
    </div>
  );
}
