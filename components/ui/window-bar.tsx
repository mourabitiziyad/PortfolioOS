'use client';
import { usePathname } from "next/navigation";
import { FolderOpenIcon } from "./folder-open-icon";
import Link from "next/link";
import { navigation } from "@/navigation";
import { FileIcon } from "./file-icon";

export function WindowBar() {
  const path = usePathname();
  return (
    <div className="h-6 w-full bg-white rounded-t-md flex justify-between">
      <div className="flex gap-2 items-center ml-2">
        {navigation.filter((nav) => `/desktop${nav.path}` === path)[0]?.icon === 'folder' ?
          <FolderOpenIcon height={20} width={20} />
          :
          <FileIcon height={16} width={16} />
        }
        <p className="text-black text-xs capitalize">{path.split('/')[2]}</p>
      </div>
      <div className="flex gap-2 items-center mr-2">
        {/* {path} FOR DEBUGGING */}
        {/* {JSON.stringify(navigation.filter((nav) => `/desktop${nav.path}` === path)[0]?.icon)} */}
        <Link href={'/desktop'} className="h-3 w-3 bg-green-500 rounded-full"></Link>
        <Link href={'/desktop'} className="h-3 w-3 bg-yellow-500 rounded-full"></Link>
        <Link href={'/desktop'} className="h-3 w-3 bg-red-500 rounded-full"></Link>
      </div>
    </div>
  );
}