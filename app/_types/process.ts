type Process = {
    id: string;
    type: 'notepad' | 'paint' | 'minesweeper' | 'explorer';
    window: {
      title: string;
      position: { x: number; y: number };
      size: { width: number; height: number };
      isMinimized: boolean;
      isMaximized: boolean;
    };
    fileHandle?: string; // Pour les apps qui travaillent sur des fichiers
  }