'use client';
import React, { useEffect, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { FolderOpenIcon } from './ui/folder-open-icon';
import { FolderClosedIcon } from './ui/folder-closed-icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FileIcon } from './ui/file-icon';
import Image from 'next/image';

export function Folder({ nav }: Readonly<{
  nav: {
    title: string;
    id: string;
    path: string;
    icon: string;
  }
}>) {
  const path = usePathname(); // i want to have the folder open by default if the path matches the title

  const [isOpen, setIsOpen] = useState(
    path === `/desktop${nav.path}`
  );

  useEffect(() => {
    setIsOpen(path === `/desktop${nav.path}`)
  }, [path]);

  const folderVariants = {
    initial: {
      opacity: 0.1,
      scale: 0.5
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: {
      opacity: 0.1,
      scale: 0.5,
      transition: {
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    }
  };

  return (
    <Link
      href={`/desktop${nav.path}`}
      className="flex flex-col items-center justify-center m-4 box-border h-20 w-16"
      tabIndex={0}
    >
      {
        nav.icon === 'folder' ? (
          <LayoutGroup>
            {isOpen ? (
              <motion.div
                className='will-change-transform will-change-opacity'
                key="open"
                style={{ willChange: 'auto' }}
                variants={folderVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* <Image className='h-50 w-50' loading='eager' placeholder='blur' blurDataURL='/folder-closed.svg' src={'/folder-open-paper.svg'} alt='Folder' width={50} height={50} /> */}
                <FolderOpenIcon />
              </motion.div>
            ) : (
              <motion.div
                className='will-change-transform will-change-opacity'
                key="closed"
                style={{ willChange: 'auto' }}
                variants={folderVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* <Image className='h-50 w-50' loading="eager" src={'/folder-closed.svg'} alt='Folder' width={50} height={50} /> */}
                <FolderClosedIcon />
                {/* {path} /desktop{nav.path} */}
              </motion.div>
            )}
          </LayoutGroup>
        ) : (
          <div
            className='will-change-transform will-change-opacity p-2'
            key="file"
            style={{ willChange: 'auto' }}
          >
            <FileIcon type={isOpen ? 'open' : 'closed'} />
          </div>
        )
      }
      <div className='flex content-center'>
      <p className='text-xs font-semiBold text-white mr-1'>{nav.title}</p>
      {nav.id === 'blog' && <Image height={12} width={12} src="/white-external-icon.svg" alt="External" />}
      </div>
    </Link>
  );
}

