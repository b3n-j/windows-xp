export interface Window {
    id: string;
    title: string;
    icon?: string;
    isMinimized: boolean;
    isActive: boolean;
    isMaximized: boolean;
    component: React.ReactNode;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex?: number;
  }