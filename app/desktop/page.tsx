"use client";

import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import type { DragEndEvent } from '@dnd-kit/core';
import Taskbar from "@/app/_components/widgets/desktop/taskbar/taskbar";
import Window from "@/app/_components/ui/window";
import { useWindows } from '@/app/_contexts/WindowContext';
import { useEffect, useRef } from "react";

export default function DesktopPage() {
  const { windows, addWindow, removeWindow, minimizeWindow, focusWindow, updateWindowPosition } = useWindows();
  const initialized = useRef(false);

  // Configuration des sensors pour le drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Distance minimale avant activation du drag
      },
    })
  );

  // Exemple d'ouverture d'une fenêtre au chargement (une seule fois)
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      addWindow({
        id: "my-computer",
        title: "My Computer",
        icon: "/icons/my-computer.ico",
        component: (
          <div className="p-4">
            <h1>My Computer</h1>
            <p>This is the content of my computer window</p>
          </div>
        )
      });
      addWindow({
        id: "my-computer2",
        title: "My Computer 2",
        icon: "/icons/my-computer.ico",
        component: (
          <div className="p-4">
            <h1>My Computer 2</h1>
            <p>This is the content of my computer window 2</p>
          </div>
        )
      });
    }
  }, []); // Suppression de la dépendance addWindow

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const windowId = active.id.replace('window-', '');
    const window = windows.find(w => w.id === windowId);
    
    if (window) {
      focusWindow(windowId);
      updateWindowPosition(windowId, delta.x, delta.y);
    }
  };

  return (
    <DndContext 
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Fond d'écran Bliss */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: "url(/images/wallpapers/bliss.jpg)" }}
        />

        {/* Zone du bureau avec les fenêtres */}
        <div className="absolute inset-0">
          {windows.map((window) => (
            !window.isMinimized && (
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
            )
          ))}
        </div>

        {/* Barre des tâches */}
        <Taskbar />
      </div>
      <DragOverlay />
    </DndContext>
  );
}
