import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function CRTMonitor({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-grey rounded-lg flex flex-wrap justify-center shadow-2xl border-2 h-full">
			<Image src="/merzouga.jpg" alt="CRT Monitor" fill objectFit='cover' className='-z-1' />
			<div className='bg-grey h-full w-full crt-glow scan-lines'></div>
			<div className='absolute inset-0'>
				<div className='absolute bottom-1 right-2 text-right font-light tracking-wide text-xs text-accent opacity-40 hover:opacity-100 transition duration-150 ease-in'>
					Merzouga Photo by {' '}
					<Link className='text-secondary underline' href="https://unsplash.com/@ferparmur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Fernando Paredes Murillo</Link>
					{' '} on {' '}
					<Link className='text-secondary underline' href="https://unsplash.com/photos/dessert-illustration-yWbxfKurMH0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Link>
				</div>
				{children}
			</div>
		</div>
	);
}

export default CRTMonitor;


// Morocco Photo by <a href="https://unsplash.com/@nelebki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Niklas Schweinzer</a> on <a href="https://unsplash.com/photos/a-decorative-fountain-in-the-middle-of-a-courtyard-VqouWpsuziE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
