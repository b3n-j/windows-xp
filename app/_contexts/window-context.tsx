'use client';

import { createContext, useState } from 'react';
import type { Window } from '@/app/_types/window';

interface WindowContextType {
  windows: Window[];
  activeWindowId: string | null;
  addWindow: (window: Omit<Window, 'isMinimized' | 'isActive' | 'position'>) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, deltaX: number, deltaY: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  toggleMaximize: (id: string) => void;
}

export const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);

  const addWindow = (window: Omit<Window, 'isMinimized' | 'isActive' | 'position'>) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => [
      ...prev.map(w => ({ ...w, isActive: false })),
      { 
        ...window, 
        isMinimized: false, 
        isActive: true,
        position: { x: 100, y: 100 },
        size: { width: 800, height: 600 },
        zIndex: zIndexCounter,
        isMaximized: false
      }
    ]);
    setActiveWindowId(window.id);
  };

  const removeWindow = (id: string) => {
    setWindows(prev => {
      const updatedWindows = prev.filter(w => w.id !== id);
      
      if (activeWindowId === id && updatedWindows.length > 0) {
        const visibleWindows = updatedWindows.filter(w => !w.isMinimized);
        const topWindow = visibleWindows.reduce((top, current) => {
          return (!top || (current.zIndex || 0) > (top.zIndex || 0)) ? current : top;
        }, visibleWindows[0]);

        if (topWindow) {
          const windowsWithNewActive = updatedWindows.map(w => ({
            ...w,
            isActive: w.id === topWindow.id
          }));
          
          setActiveWindowId(topWindow.id);
          return windowsWithNewActive;
        }
      }
      
      return updatedWindows;
    });

    if (windows.length === 1) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true, isActive: false } : w
    ));
    
    const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
    if (visibleWindows.length > 0) {
      const lastWindow = visibleWindows[visibleWindows.length - 1];
      focusWindow(lastWindow.id);
    } else {
      setActiveWindowId(null);
    }
  };

  const restoreWindow = (id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, isMinimized: false, isActive: true, zIndex: zIndexCounter }
        : { ...w, isActive: false }
    ));
    setActiveWindowId(id);
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id 
        ? { ...w, isMaximized: !w.isMaximized }
        : w
    ));
  };

  const focusWindow = (id: string) => {
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => ({
      ...w,
      isActive: w.id === id,
      zIndex: w.id === id ? zIndexCounter : w.zIndex || 50
    })));
    setActiveWindowId(id);
  };

  const updateWindowPosition = (id: string, deltaX: number, deltaY: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { 
            ...w, 
            position: { 
              x: w.position.x + deltaX, 
              y: w.position.y + deltaY 
            } 
          }
        : w
    ));
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id 
        ? { 
            ...w, 
            size: { width, height }
          }
        : w
    ));
  };

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindowId,
      addWindow,
      removeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      toggleMaximize,
    }}>
      {children}
    </WindowContext.Provider>
  );
} 