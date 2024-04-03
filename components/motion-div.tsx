"use client";

import { AnimatePresence, motion } from 'framer-motion';

export const MotionDiv = motion.div;

export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const AnimatePres = AnimatePresence;



// Created this to avoid writing "use client" in every file that uses framer-motion
// TODO: Delete this file and replace all imports with "use client" in the files that use framer-motion