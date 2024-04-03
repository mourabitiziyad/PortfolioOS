'use client';
import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import Image from 'next/image';

export function Folder({ title = 'Untitled' }: Readonly<{ title: string }>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
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
    <button
      className="flex flex-col items-center justify-center m-4 box-border h-20 w-16"
      tabIndex={0}
      onClick={handleButtonClick}
    >
      <LayoutGroup>
        {isOpen ? (
          <motion.div
            key="open"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image className='h-50 w-50' loading='eager' placeholder='blur' blurDataURL='/folder-closed.svg' src={'/folder-open-paper.svg'} alt='Folder' width={50} height={50} />
          </motion.div>
        ) : (
          <motion.div
            key="closed"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Image className='h-50 w-50' loading="eager" src={'/folder-closed.svg'} alt='Folder' width={50} height={50} />
          </motion.div>
        )}
      </LayoutGroup>
      <p className='text-xs font-semiBold text-white'>{title}</p>
    </button>
  );
}
