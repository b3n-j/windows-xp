'use client';

import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import Image from 'next/image';
import { useWindows } from '@/app/_contexts/WindowContext';

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  children: React.ReactNode;
  isActive: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

export default function Window({
  id,
  title,
  icon,
  children,
  isActive,
  defaultPosition = { x: 150, y: 100 },
  defaultSize = { width: 640, height: 480 },
  minSize = { width: 200, height: 150 },
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
}: WindowProps) {
  const { windows, updateWindowSize, updateWindowPosition } = useWindows();
  const windowData = windows.find(w => w.id === id);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [maxConstraints, setMaxConstraints] = useState([1200, 800]);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function updateMaxConstraints() {
      if (typeof window !== 'undefined') {
        setMaxConstraints([
          document.documentElement.clientWidth - 50,
          document.documentElement.clientHeight - 82
        ]);
      }
    }

    updateMaxConstraints();
    window.addEventListener('resize', updateMaxConstraints);
    return () => window.removeEventListener('resize', updateMaxConstraints);
  }, []);

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    if (windowData && !isMaximized) {
      const deltaX = data.x - windowData.position.x;
      const deltaY = data.y - windowData.position.y;
      updateWindowPosition(id, deltaX, deltaY);
    }
  };

  const handleResize = (e: any, { size: newSize, handle }: { size: { width: number; height: number }, handle: string }) => {
    e.preventDefault();

    const updatedSize = {
      width: Math.round(Math.max(newSize.width, minSize.width)),
      height: Math.round(Math.max(newSize.height, minSize.height))
    };

    if (handle === 'n') {
      const deltaY = Math.round(size.height - updatedSize.height);
      if (windowData) {
        updateWindowPosition(id, 0, deltaY);
      }
    }

    if (handle === 'w') {
      const deltaX = Math.round(size.width - updatedSize.width);
      if (windowData) {
        updateWindowPosition(id, deltaX, 0);
      }
    }

    requestAnimationFrame(() => {
      setSize(updatedSize);
      updateWindowSize(id, updatedSize.width, updatedSize.height);
    });
  };

  const handleResizeStart = () => setIsResizing(true);
  const handleResizeStop = () => setIsResizing(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize();
  };

  const windowStyle = {
    width: isMaximized ? '100%' : size.width,
    height: isMaximized ? 'calc(100% - 32px)' : size.height,
    backgroundColor: 'white',
    borderRadius: isMaximized ? 0 : '8px 8px 0 0',
    boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.3)' : '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    position: 'absolute' as const,
    zIndex: windowData?.zIndex || 50,
  };

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      handle=".window-title-bar"
      position={isMaximized ? { x: 0, y: 0 } : windowData?.position || defaultPosition}
      onDrag={handleDrag}
      onMouseDown={onFocus}
      disabled={isMaximized}
    >
      <div
        ref={nodeRef}
        className={`window ${isActive ? 'active' : ''} ${isResizing ? 'resizing' : ''}`}
        style={windowStyle}
      >
        <Resizable
          width={size.width}
          height={size.height}
          minConstraints={[minSize.width, minSize.height] as [number, number]}
          maxConstraints={maxConstraints as [number, number]}
          onResize={handleResize}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
          resizeHandles={isMaximized ? [] : ['s', 'w', 'e', 'n', 'se']}
          className="resize-handle"
        >
          <div style={{ width: '100%', height: '100%' }}>
            <div
              className={`
                window-title-bar h-9 flex items-center justify-between px-1 pt-1
                ${isActive 
                  ? 'bg-gradient-to-r from-[#0058ee] to-[#3591ff] text-white'
                  : 'bg-gradient-to-r from-[#7ba4e3] to-[#a7c7ff] text-gray-100'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {icon && (
                  <div className="relative w-4 h-4">
                    <Image src={icon} alt={title} fill className="object-contain" />
                  </div>
                )}
                <span className="text-sm font-bold">{title}</span>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={onMinimize} className="window-button">
                  <Image src="/icons/minimize.png" alt="Minimize" width={25} height={25} />
                </button>
                
                <button onClick={handleMaximize} className="window-button">
                  <Image src={isMaximized ? "/icons/restore.png" : "/icons/maximize.png"} alt={isMaximized ? "Restore" : "Maximize"} width={25} height={25} />
                </button>
                
                <button onClick={onClose} className="window-button close-button">
                  <Image src="/icons/exit.png" alt="Close" width={25} height={25} />
                </button>
              </div>
            </div>

            <div className="w-full overflow-auto bg-white" style={{ height: 'calc(100% - 32px)' }}>
              {children}
            </div>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}
