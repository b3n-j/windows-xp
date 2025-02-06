'use client';

import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
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
  updateWindowPosition: (id: string, deltaX: number, deltaY: number) => void;
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
  updateWindowPosition
}: WindowProps) {
  const { windows, updateWindowSize, updateWindowPosition: contextUpdateWindowPosition } = useWindows();
  const windowData = windows.find(w => w.id === id);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const [maxConstraints, setMaxConstraints] = useState([1200, 800]);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.style.zIndex = isActive ? '50' : '10';
    }
  }, [isActive]);

  useEffect(() => {
    function updateMaxConstraints() {
      if (typeof window !== 'undefined') {
        setMaxConstraints([
          document.documentElement.clientWidth - 50,
          document.documentElement.clientHeight - 82 // 48px taskbar + 34px marge
        ]);
      }
    }

    updateMaxConstraints();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateMaxConstraints);
      return () => window.removeEventListener('resize', updateMaxConstraints);
    }
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `window-${id}`,
    disabled: isMaximized
  });

  const windowStyle = {
    position: 'absolute' as const,
    left: isMaximized ? 0 : (windowData?.position.x || defaultPosition.x),
    top: isMaximized ? 0 : (windowData?.position.y || defaultPosition.y),
    width: isMaximized ? '100%' : size.width,
    height: isMaximized ? 'calc(100% - 32px)' : size.height,
    backgroundColor: 'white',
    borderRadius: isMaximized ? 0 : '8px 8px 0 0',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    transform: !isMaximized && transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: 'none',
    zIndex: isActive ? 100 : 50
  };

  const handleResize = (e: any, { size: newSize, handle }: { size: { width: number; height: number }, handle: string }) => {
    const updatedSize = {
      width: Math.max(newSize.width, minSize.width),
      height: Math.max(newSize.height, minSize.height)
    };

    if (handle === 'n') {
      const deltaY = size.height - updatedSize.height;
      if (windowData) {
        contextUpdateWindowPosition(id, 0, deltaY);
      }
    }

    if (handle === 'w') {
      const deltaX = size.width - updatedSize.width;
      if (windowData) {
        contextUpdateWindowPosition(id, deltaX, 0);
      }
    }

    setSize(updatedSize);
    updateWindowSize(id, updatedSize.width, updatedSize.height);
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeStop = () => {
    setIsResizing(false);
  };

  return (
    <div
      id={`window-${id}`}
      ref={(el) => {
        setNodeRef(el);
        if (windowRef) windowRef.current = el;
      }}
      style={windowStyle}
      className={`window ${isActive ? 'active' : ''} ${isResizing ? 'resizing' : ''}`}
      onClick={onFocus}
    >
      {!isMaximized && (
        <Resizable
          width={size.width}
          height={size.height}
          minConstraints={[minSize.width, minSize.height]}
          maxConstraints={[maxConstraints[0], maxConstraints[1]]}
          onResize={handleResize}
          resizeHandles={['s', 'w', 'e', 'n', 'se']}
          draggableOpts={{ 
            grid: [1, 1],
            enableUserSelectHack: false
          }}
          className="resize-handle"
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
        >
          <div className="w-full h-full relative">
            {/* Barre de titre */}
            <div
              {...attributes}
              {...listeners}
              className={`
                h-8 flex items-center justify-between px-2
                ${isActive 
                  ? 'bg-gradient-to-r from-[#0058ee] to-[#3591ff] text-white'
                  : 'bg-gradient-to-r from-[#7ba4e3] to-[#a7c7ff] text-gray-100'
                }
              `}
            >
              <div className="flex items-center gap-2">
                {icon && (
                  <div className="relative w-4 h-4">
                    <Image
                      src={icon}
                      alt={title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <span className="text-sm font-bold">{title}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={onMinimize}
                  className="window-button"
                >
                  <Image
                    src="/icons/window/minimize.png"
                    alt="Minimize"
                    width={16}
                    height={16}
                  />
                </button>
                
                <button
                  onClick={() => {
                    setIsMaximized(!isMaximized);
                    onMaximize();
                  }}
                  className="window-button"
                >
                  <Image
                    src={`/icons/window/${isMaximized ? 'restore' : 'maximize'}.png`}
                    alt={isMaximized ? 'Restore' : 'Maximize'}
                    width={16}
                    height={16}
                  />
                </button>
                
                <button
                  onClick={onClose}
                  className="window-button close-button"
                >
                  <Image
                    src="/icons/window/close.png"
                    alt="Close"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            {/* Contenu de la fenêtre */}
            <div className="w-full overflow-auto bg-white" style={{ height: 'calc(100% - 32px)' }}>
              {children}
            </div>
          </div>
        </Resizable>
      )}

      {isMaximized && (
        <>
          {/* Barre de titre */}
          <div
            {...attributes}
            {...listeners}
            className={`
              h-8 flex items-center justify-between px-2
              ${isActive 
                ? 'bg-gradient-to-r from-[#0058ee] to-[#3591ff] text-white'
                : 'bg-gradient-to-r from-[#7ba4e3] to-[#a7c7ff] text-gray-100'
              }
            `}
          >
            <div className="flex items-center gap-2">
              {icon && (
                <div className="relative w-4 h-4">
                  <Image
                    src={icon}
                    alt={title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-sm font-bold">{title}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={onMinimize}
                className="window-button"
              >
                <Image
                  src="/icons/window/minimize.png"
                  alt="Minimize"
                  width={16}
                  height={16}
                />
              </button>
              
              <button
                onClick={() => {
                  setIsMaximized(!isMaximized);
                  onMaximize();
                }}
                className="window-button"
              >
                <Image
                  src={`/icons/window/${isMaximized ? 'restore' : 'maximize'}.png`}
                  alt={isMaximized ? 'Restore' : 'Maximize'}
                  width={16}
                  height={16}
                />
              </button>
              
              <button
                onClick={onClose}
                className="window-button close-button"
              >
                <Image
                  src="/icons/window/close.png"
                  alt="Close"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
          
          {/* Contenu de la fenêtre */}
          <div className="flex-1 overflow-auto bg-white">
            {children}
          </div>
        </>
      )}
    </div>
  );
}
