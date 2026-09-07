'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export function CRTMonitor({ children }: Readonly<{ children: React.ReactNode }>) {
	const pathname = usePathname();
	const showCredit = pathname === '/desktop';
	return (
		<div className="os-screen">
			<Image
				priority
				placeholder="blur"
				blurDataURL="/merzouga-resized.jpg"
				src="/merzouga-full.jpg"
				alt=""
				fill
				sizes="(max-width: 700px) 100vw, 96vw"
				className="os-wallpaper"
			/>
			<div className="os-wallpaper-treatment" aria-hidden="true" />
			<div className="os-screen-content">{children}</div>
			{showCredit ? (
				<p className="os-wallpaper-credit">
					<span>Merzouga · photo by </span>
					<Link href="https://unsplash.com/@ferparmur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
						<span className="os-credit-name">Fernando Paredes Murillo</span>
						<span className="os-credit-short">Photo credit</span> ↗
					</Link>
				</p>
			) : null}
		</div>
	);
}


// Morocco Photo by <a href="https://unsplash.com/@nelebki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Niklas Schweinzer</a> on <a href="https://unsplash.com/photos/a-decorative-fountain-in-the-middle-of-a-courtyard-VqouWpsuziE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
