'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MotionDiv } from '../motion-div';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function CRTMonitor({ children }: Readonly<{ children: React.ReactNode }>) {
	const pathname = usePathname();
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration: 1 } },
	};
	return (
		<MotionDiv
			className="bg-grey rounded-lg flex flex-wrap justify-center shadow-2xl border-2 h-full"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<div className="bg-grey rounded-lg flex flex-wrap justify-center shadow-2xl border-2 h-full">
				<Image placeholder='blur' blurDataURL='/merzouga-resized.jpg' src="/merzouga-full.jpg" alt="CRT Monitor" fill style={{ objectFit: 'cover' }} className='-z-1' />
				<div className='bg-grey h-full w-full crt-glow scan-lines'></div>
				<div className='absolute inset-0'>
					<div
						className={clsx(
							'absolute bottom-1 right-2 text-right font-light tracking-wide text-xs text-accent transition-opacity duration-150 ease-in',
							{
								'opacity-40 hover:opacity-100': pathname === '/',
								'opacity-0': pathname !== '/',
							}
						)}
					>
						Merzouga Photo by {' '}
						<Link className='text-secondary underline' href="https://unsplash.com/@ferparmur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Fernando Paredes Murillo</Link>
						{' '} on {' '}
						<Link className='text-secondary underline' href="https://unsplash.com/photos/dessert-illustration-yWbxfKurMH0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Link>
					</div>
					{children}
				</div>
			</div>
		</MotionDiv>
	);
}


// Morocco Photo by <a href="https://unsplash.com/@nelebki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Niklas Schweinzer</a> on <a href="https://unsplash.com/photos/a-decorative-fountain-in-the-middle-of-a-courtyard-VqouWpsuziE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
