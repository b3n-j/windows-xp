"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import Image from "next/image";
import { useWindow } from "@/app/_hooks/useWindow";
import { useWindowResize } from "@/app/_hooks/useWindowResize";
import { useWindowMaximize } from "@/app/_hooks/useWindowMaximize";

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
  const { windows, updateWindowPosition } = useWindow();
  const windowData = windows.find((w) => w.id === id);
  const { isMaximized, handleMaximize } = useWindowMaximize();
  const {
    size,
    maxConstraints,
    isResizing,
    handleResize,
    handleResizeStart,
    handleResizeStop
  } = useWindowResize({ id, defaultSize, minSize });

  const nodeRef = useRef<HTMLElement | null>(null);

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    if (windowData && !isMaximized) {
      const deltaX = data.x - windowData.position.x;
      const deltaY = data.y - windowData.position.y;
      updateWindowPosition(id, deltaX, deltaY);
    }
  };

  const handleMaximizeClick = () => {
    handleMaximize(onMaximize);
  };

  const windowStyle = {
    width: isMaximized ? "100%" : size.width,
    height: isMaximized ? "calc(100% - 32px)" : size.height,
    //  borderRadius: isMaximized ? 0 : "8px 8px 0 0",
    // boxShadow: isActive
    //   ? "0 4px 20px rgba(0,0,0,0.3)"
    //   : "0 0 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column" as const,
    //  overflow: "hidden",
    position: "absolute" as const,
    zIndex: windowData?.zIndex || 50,
  };

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLElement>}
      handle=".window-header"
      position={
        isMaximized ? { x: 0, y: 0 } : windowData?.position || defaultPosition
      }
      onDrag={handleDrag}
      onMouseDown={onFocus}
      disabled={isMaximized}
    >
      <Resizable
        width={size.width}
        height={size.height}
        minConstraints={[minSize.width, minSize.height] as [number, number]}
        maxConstraints={maxConstraints as [number, number]}
        onResize={handleResize}
        onResizeStart={handleResizeStart}
        onResizeStop={handleResizeStop}
        resizeHandles={isMaximized ? [] : ["s", "w", "e", "n", "se"]}
        className="resize-handle"
      >
        <div
          ref={nodeRef as React.RefObject<HTMLDivElement>}
          className={`window ${isActive ? "active" : ""} ${
            isResizing ? "resizing" : ""
          } ${isMaximized ? "maximized" : ""}`}
          style={windowStyle}
        >
          <div className="window-header">
            <div className="window-info">
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
              <div className="title-bar-text">{title}</div>
            </div>{" "}
            <div className="title-bar-controls">
              <button aria-label="Help"></button>
              <button aria-label="Minimize" onClick={onMinimize}></button>
              {isMaximized ? (
                <button aria-label="Restore" onClick={handleMaximizeClick}></button>
              ) : (
                <button aria-label="Maximize" onClick={handleMaximizeClick}></button>
              )}
              <button aria-label="Close" onClick={onClose}></button>
            </div>
          </div>
          <div className="window-body">{children}</div>
        </div>
      </Resizable>
    </Draggable>
  );
}
