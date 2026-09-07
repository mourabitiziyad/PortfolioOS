'use client';

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { WindowBar } from './ui/window-bar';

type Frame = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Interaction = {
  kind: 'drag' | 'resize';
  pointerId: number;
  startX: number;
  startY: number;
  frame: Frame;
};

const DESKTOP_QUERY = '(min-width: 761px) and (hover: hover) and (pointer: fine)';
const MIN_WIDTH = 420;
const MIN_HEIGHT = 300;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function Window({ children }: { children: React.ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<Interaction | null>(null);
  const frameRef = useRef<Frame | null>(null);
  const desktopInteractiveRef = useRef(false);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [desktopInteractive, setDesktopInteractive] = useState(false);
  const [interactionKind, setInteractionKind] = useState<Interaction['kind'] | null>(null);

  const updateFrame = useCallback((nextFrame: Frame | null) => {
    frameRef.current = nextFrame;
    setFrame(nextFrame);
  }, []);

  const getWorkspace = useCallback(() =>
    windowRef.current?.closest<HTMLElement>('.os-desktop-workspace') ?? null, []);

  const measureFrame = useCallback(() => {
    const element = windowRef.current;
    const workspace = getWorkspace();

    if (!element || !workspace) return null;

    const elementRect = element.getBoundingClientRect();
    const workspaceRect = workspace.getBoundingClientRect();

    return {
      x: elementRect.left - workspaceRect.left,
      y: elementRect.top - workspaceRect.top,
      width: elementRect.width,
      height: elementRect.height,
    };
  }, [getWorkspace]);

  const constrainFrame = useCallback((nextFrame: Frame) => {
    const workspace = getWorkspace();
    if (!workspace) return nextFrame;

    const bounds = workspace.getBoundingClientRect();
    const minimumWidth = Math.min(MIN_WIDTH, bounds.width);
    const minimumHeight = Math.min(MIN_HEIGHT, bounds.height);
    const width = clamp(nextFrame.width, minimumWidth, bounds.width);
    const height = clamp(nextFrame.height, minimumHeight, bounds.height);

    return {
      x: clamp(nextFrame.x, 0, bounds.width - width),
      y: clamp(nextFrame.y, 0, bounds.height - height),
      width,
      height,
    };
  }, [getWorkspace]);

  useLayoutEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const workspace = getWorkspace();

    const syncMode = () => {
      desktopInteractiveRef.current = media.matches;
      setDesktopInteractive(media.matches);
      interactionRef.current = null;
      setInteractionKind(null);

      if (!media.matches) {
        updateFrame(null);
        return;
      }

      const measured = measureFrame();
      if (measured) updateFrame(constrainFrame(measured));
    };

    syncMode();
    media.addEventListener('change', syncMode);

    const resizeObserver = workspace
      ? new ResizeObserver(() => {
          if (!desktopInteractiveRef.current) return;

          const current = frameRef.current ?? measureFrame();
          if (current) updateFrame(constrainFrame(current));
        })
      : null;

    if (workspace) resizeObserver?.observe(workspace);

    return () => {
      media.removeEventListener('change', syncMode);
      resizeObserver?.disconnect();
    };
  }, [constrainFrame, getWorkspace, measureFrame, updateFrame]);

  const beginInteraction = (
    kind: Interaction['kind'],
    event: PointerEvent<HTMLElement>,
  ) => {
    if (!desktopInteractive || event.button !== 0) return;

    const current = frameRef.current ?? measureFrame();
    if (!current) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      kind,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      frame: current,
    };
    setInteractionKind(kind);
  };

  const handleTitlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea, [role=button]')) return;
    beginInteraction('drag', event);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const interaction = interactionRef.current;
    const workspace = getWorkspace();

    if (!interaction || interaction.pointerId !== event.pointerId || !workspace) return;

    const deltaX = event.clientX - interaction.startX;
    const deltaY = event.clientY - interaction.startY;
    const bounds = workspace.getBoundingClientRect();

    if (interaction.kind === 'drag') {
      updateFrame({
        ...interaction.frame,
        x: clamp(interaction.frame.x + deltaX, 0, bounds.width - interaction.frame.width),
        y: clamp(interaction.frame.y + deltaY, 0, bounds.height - interaction.frame.height),
      });
      return;
    }

    const maximumWidth = bounds.width - interaction.frame.x;
    const maximumHeight = bounds.height - interaction.frame.y;
    updateFrame({
      ...interaction.frame,
      width: clamp(
        interaction.frame.width + deltaX,
        Math.min(MIN_WIDTH, maximumWidth),
        maximumWidth,
      ),
      height: clamp(
        interaction.frame.height + deltaY,
        Math.min(MIN_HEIGHT, maximumHeight),
        maximumHeight,
      ),
    });
  };

  const endInteraction = (event: PointerEvent<HTMLElement>) => {
    if (interactionRef.current?.pointerId !== event.pointerId) return;

    interactionRef.current = null;
    setInteractionKind(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleResizeKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!desktopInteractive || !frameRef.current) return;

    const direction = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    }[event.key];

    if (!direction) return;

    event.preventDefault();
    const step = event.shiftKey ? 40 : 10;
    updateFrame(constrainFrame({
      ...frameRef.current,
      width: frameRef.current.width + direction[0] * step,
      height: frameRef.current.height + direction[1] * step,
    }));
  };

  const frameStyle: CSSProperties | undefined = frame
    ? {
        left: frame.x,
        top: frame.y,
        width: frame.width,
        height: frame.height,
        transform: 'none',
      }
    : undefined;

  return (
    <div
      ref={windowRef}
      className="os-window"
      data-interactive={desktopInteractive ? 'true' : 'false'}
      data-dragging={interactionKind === 'drag' ? 'true' : 'false'}
      style={frameStyle}
    >
      <WindowBar
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
      />
      <div className="os-window-content">{children}</div>
      <button
        type="button"
        className="os-window-resize"
        aria-label="Resize window. Use the arrow keys, or hold Shift for larger steps."
        onPointerDown={(event) => beginInteraction('resize', event)}
        onPointerMove={handlePointerMove}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
        onKeyDown={handleResizeKeyDown}
      >
        <span aria-hidden="true" />
      </button>
    </div>
  );
}
