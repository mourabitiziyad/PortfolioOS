'use client';
import React, { useState, useEffect } from 'react';
import { useDragControls, motion } from "framer-motion";
import { MotionDiv } from "./motion-div";
import { MobileOnlyBar } from "./ui/mobile-only-bar";
import { WindowBar } from "./ui/window-bar";
import { usePathname } from 'next/navigation';

export const Window = ({ children }: { children: React.ReactNode }) => {


  const path = usePathname();
  const [parentSize, setParentSize] = useState({ width: 500, height: 500 });
  const dragControls = useDragControls();

  // Initialize size as percentages
  const [size, setSize] = useState({ width: 99.9, height: 90 });

  useEffect(() => {
    setParentSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  function startDrag(event: PointerEvent | React.PointerEvent<Element>) {
    dragControls.start(event, { snapToCursor: false });
  }

  // Convert delta movement to percentage and adjust size
  const handleResizeDrag = (_: any, info: { delta: { x: number; y: number; }; }) => {
    const deltaWidthPercent = (info.delta.x / parentSize.width) * 100;
    const deltaHeightPercent = (info.delta.y / parentSize.height) * 100;

    setSize(currentSize => ({
      width: currentSize.width - deltaWidthPercent,
      height: currentSize.height + deltaHeightPercent,
    }));
  };

  return (
    <MotionDiv
      className="absolute self-center md:m-4 md:relative border-1 rounded-md bg-accent no-cursor"
      style={{
        height: `${size.height}%`, // Using vh for height to keep it responsive
        width: `${size.width}%` // Width as percentage of the parent
      }}
      initial={{ opacity: 0.5, y: -20 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      drag
      dragMomentum={false}
      dragControls={dragControls}
      dragListener={false}
    >
      <div className="h-full flex flex-col">
        <div className="flex-none" onPointerDown={startDrag}>
          <WindowBar />
        </div>
        <div className="flex-none">
          <MobileOnlyBar /> {/* Assuming hasDragged prop is needed */}
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        {path !== '/desktop/CV' &&
          <motion.div
            onDrag={handleResizeDrag}
            drag
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0}
            className="w-2 h-2 m-1 rounded-full bg-gray-500 absolute z-10 left-0 bottom-0 cursor-nesw-resize animate-pulse hidden md:block"
          />
        }
      </div>
    </MotionDiv>
  );
};
