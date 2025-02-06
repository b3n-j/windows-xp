"use client";

import Taskbar from "@/app/_components/widgets/desktop/taskbar/taskbar";
import Window from "@/app/_components/ui/window";
import { useWindows } from '@/app/_contexts/WindowContext';
import { useEffect, useRef } from "react";

export default function DesktopPage() {
  const { windows, addWindow, removeWindow, minimizeWindow, focusWindow } = useWindows();
  const initialized = useRef(false);

  // Exemple d'ouverture d'une fenêtre au chargement (une seule fois)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      addWindow({
        id: "my-computer",
        title: "My Computer",
        icon: "/icons/my-computer.ico",
        size: { width: 640, height: 480 },
        component: (
          <div className="p-4">
            <h1>My Computer</h1>
            <p>This is the content of my computer window</p>
          </div>
        )
      });

      addWindow({
        id: "my-computer-second",
        title: "My Computer",
        icon: "/icons/my-computer.ico",
        size: { width: 640, height: 480 },
        component: (
          <div className="p-4">
            <h1>My Computer</h1>
            <p>This is the content of my computer window</p>
          </div>
        )
      });
    }
  }, []);

  return (
    <div className="h-screen">
      {/* Fond d'écran Bliss */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url(/images/wallpapers/bliss.jpg)" }}
      />

      <div className="relative w-full h-full">
        {/* Zone des fenêtres */}
        <div className="absolute inset-0 pb-8">
          {windows.map(window => !window.isMinimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              icon={window.icon}
              isActive={window.isActive}
              onFocus={() => focusWindow(window.id)}
              onClose={() => removeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              onMaximize={() => console.log("maximize")}
            >
              {window.component}
            </Window>
          ))}
        </div>

        {/* Barre des tâches */}
        <Taskbar />
      </div>
    </div>
  );
}
