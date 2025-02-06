'use client';

import { createContext, useContext, useState } from 'react';

interface Window {
  id: string;
  title: string;
  icon?: string;
  isMinimized: boolean;
  isActive: boolean;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex?: number;
}

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
}

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);

  const addWindow = (window: Omit<Window, 'isMinimized' | 'isActive' | 'position'>) => {
    setWindows(prev => [...prev, { 
      ...window, 
      isMinimized: false, 
      isActive: true,
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 }
    }]);
    setActiveWindowId(window.id);
  };

  const removeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const lastWindow = windows[windows.length - 2];
      setActiveWindowId(lastWindow?.id || null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true, isActive: false } : w
    ));
    setActiveWindowId(null);
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, isActive: true } : { ...w, isActive: false }
    ));
    setActiveWindowId(id);
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
      updateWindowSize
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider');
  }
  return context;
} 