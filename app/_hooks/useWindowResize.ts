import { useState, useEffect } from 'react';
import { useWindow } from '@/app/_hooks/useWindow';

interface Size {
  width: number;
  height: number;
}

interface UseWindowResizeProps {
  id: string;
  defaultSize: Size;
  minSize: Size;
}

export function useWindowResize({ id, defaultSize, minSize }: UseWindowResizeProps) {
  const { windows, updateWindowSize, updateWindowPosition } = useWindow();
  const windowData = windows.find((w) => w.id === id);
  const [size, setSize] = useState(windowData?.size || defaultSize);
  const [maxConstraints, setMaxConstraints] = useState([1200, 800]);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    function updateMaxConstraints() {
      if (typeof window !== "undefined") {
        setMaxConstraints([
          document.documentElement.clientWidth - 50,
          document.documentElement.clientHeight - 82,
        ]);
      }
    }

    updateMaxConstraints();
    window.addEventListener("resize", updateMaxConstraints);
    return () => window.removeEventListener("resize", updateMaxConstraints);
  }, []);

  useEffect(() => {
    if (windowData?.size) {
      setSize(windowData.size);
    }
  }, [windowData?.size]);

  const handleResize = (
    e: any,
    {
      size: newSize,
      handle,
    }: { size: { width: number; height: number }; handle: string }
  ) => {
    e.preventDefault();

    const updatedSize = {
      width: Math.round(Math.max(newSize.width, minSize.width)),
      height: Math.round(Math.max(newSize.height, minSize.height)),
    };

    if (handle === "n") {
      const deltaY = Math.round(size.height - updatedSize.height);
      if (windowData) {
        updateWindowPosition(id, 0, deltaY);
      }
    }

    if (handle === "w") {
      const deltaX = Math.round(size.width - updatedSize.width);
      if (windowData) {
        updateWindowPosition(id, deltaX, 0);
      }
    }

    setSize(updatedSize);
    updateWindowSize(id, updatedSize.width, updatedSize.height);
  };

  const handleResizeStart = () => setIsResizing(true);
  const handleResizeStop = () => setIsResizing(false);

  return {
    size,
    maxConstraints,
    isResizing,
    handleResize,
    handleResizeStart,
    handleResizeStop
  };
} 