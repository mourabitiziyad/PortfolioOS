'use client';
import { FolderOpenIcon } from './ui/folder-open-icon';
import { FolderClosedIcon } from './ui/folder-closed-icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FileIcon } from './ui/file-icon';
import type { DesktopNavItem } from '@/navigation';

export function Folder({ nav }: Readonly<{ nav: DesktopNavItem }>) {
  const path = usePathname();
  const isOpen = path === `/desktop${nav.path}`;
  const href = nav.externalHref ?? `/desktop${nav.path}`;

  return (
    <Link
      href={href}
      target={nav.externalHref ? "_blank" : undefined}
      rel={nav.externalHref ? "noopener noreferrer" : undefined}
      className="os-app-icon"
      aria-current={isOpen ? "page" : undefined}
    >
      <span className="os-app-glyph">
        {nav.icon === 'folder'
          ? (isOpen ? <FolderOpenIcon /> : <FolderClosedIcon />)
          : <FileIcon type={isOpen ? 'open' : 'closed'} />}
      </span>
      <span className="os-app-label">
        {nav.title}
        {nav.externalHref ? <span aria-hidden="true"> ↗</span> : null}
      </span>
    </Link>
  );
}
