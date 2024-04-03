"use client";
import React from 'react';
import { NavBar } from './navbar';
import { Folder } from '../folder';
import { motion } from 'framer-motion';
import { navigation } from '@/navigation';

export function DesktopView({ children }: { children: React.ReactNode }) {
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2
			}
		}
	}

	const item = {
		hidden: { x: -20, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.2
			}
		}
	}
	return (
		<div className='h-full w-full'>
			<NavBar />
			<div className='h-full xl:h-[97%] w-full flex justify-between flex-1'>
				<motion.ul
					className='h-full'
					variants={container}
					initial="hidden"
					animate="visible"
				>
					{navigation.map((nav, index) => (
						<motion.li className='h-18' key={nav.title} variants={item}>
							<Folder nav={nav} />
						</motion.li>
					))}
				</motion.ul>
				{children}
			</div>
		</div>
	);
}

// Folder design by https://dribbble.com/ashimadhikari, extracted multiple versions to the design to fit the project's needs

// Morocco Photo by <a href="https://unsplash.com/@nelebki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Niklas Schweinzer</a> on <a href="https://unsplash.com/photos/a-decorative-fountain-in-the-middle-of-a-courtyard-VqouWpsuziE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
