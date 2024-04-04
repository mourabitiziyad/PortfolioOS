'use client';
import { usePathname } from "next/navigation";
import { FolderOpenIcon } from "./folder-open-icon";
import Link from "next/link";
import { navigation } from "@/navigation";
import { FileIcon } from "./file-icon";
import Image from "next/image";

export function MobileOnlyBar() {
  const path = usePathname();
  return (
    <div className="w-full px-4 bg-slate-300 py-2 overflow-x-scroll no-scrollbar">
      <div className="flex gap-2 items-center">
        <p className="text-black font-medium text-xs">Menus</p>
        {navigation
          .filter((nav) => `/desktop${nav.path}` !== path)
          .map((nav) => (
              <Link href={`/desktop${nav.path}`} key={nav.id} className="gap-2 flex items-center bg-accent px-2 py-1 rounded-md hover:bg-slate-100">
                {
                  nav.icon === "folder" ? (
                    <FolderOpenIcon height={20} width={20} />
                  ) : (
                    <FileIcon height={20} width={20} />
                  )
                }
                <div className="flex content-center">
                  <p className="text-black text-xs mr-1">{nav.title}</p>
                  {nav.path === 'blog' && <Image height={12} width={12} src="/external-icon.svg" alt="External" />}
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  )
}