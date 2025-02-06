'use client';

import { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ResizableBox } from 'react-resizable';
import Image from 'next/image';
import 'react-resizable/css/styles.css';
import type { DragEndEvent } from '@dnd-kit/core';
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
  onMaximize
}: WindowProps) {
  const { windows } = useWindows();
  const window = windows.find(w => w.id === id);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `window-${id}`,
    disabled: isMaximized
  });

  const windowStyle = {
    position: 'absolute' as const,
    left: window?.position.x || defaultPosition.x,
    top: window?.position.y || defaultPosition.y,
    width: isMaximized ? '100%' : size.width,
    height: isMaximized ? 'calc(100% - 32px)' : size.height,
    backgroundColor: 'white',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    touchAction: 'none'
  };

  return (
    <div
      id={`window-${id}`}
      ref={(el) => {
        setNodeRef(el);
        if (windowRef) windowRef.current = el;
      }}
      style={windowStyle}
      className={`window ${isActive ? 'active' : ''}`}
      onClick={onFocus}
    >
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
      {!isMaximized ? (
        <ResizableBox
          width={size.width}
          height={size.height - 32} // Soustraction de la hauteur du header
          minConstraints={[minSize.width, minSize.height]}
          className="resize-handle"
        >
          <div className="w-full h-full overflow-auto">
            {children}
          </div>
        </ResizableBox>
      ) : (
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      )}
    </div>
  );
}
