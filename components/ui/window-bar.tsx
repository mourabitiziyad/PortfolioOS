'use client';
import type { PointerEventHandler } from 'react';
import { usePathname } from "next/navigation";
import { FolderOpenIcon } from "./folder-open-icon";
import Link from "next/link";
import { navigation } from "@/navigation";
import { FileIcon } from "./file-icon";

type WindowBarProps = {
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onPointerCancel?: PointerEventHandler<HTMLDivElement>;
};

export function WindowBar({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: WindowBarProps) {
  const path = usePathname();
  const current = navigation.find((nav) => `/desktop${nav.path}` === path);

  return (
    <div
      className="os-window-bar"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="os-window-controls">
        <Link
          href="/desktop"
          aria-label="Close window and return to the PortfolioOS desktop"
          className="os-window-control os-window-control-close"
        >
          <span aria-hidden="true">×</span>
        </Link>
        <span aria-hidden="true" className="os-window-control os-window-control-minimize" />
        <span aria-hidden="true" className="os-window-control os-window-control-expand" />
      </div>
      <div className="os-window-title">
        {current?.icon === 'folder'
          ? <FolderOpenIcon height={18} width={18} />
          : <FileIcon height={16} width={16} />}
        <span>{current?.title ?? "PortfolioOS"}</span>
      </div>
      <Link href="/desktop" className="os-window-desktop-link">Desktop</Link>
    </div>
  );
}
