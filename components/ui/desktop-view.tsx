import React from 'react';
import { NavBar } from './navbar';
import { Folder } from '../folder';
import { navigation } from '@/navigation';

export function DesktopView({ children }: { children: React.ReactNode }) {
	return (
		<div className="os-desktop">
			<NavBar />
			<div className="os-desktop-main">
				<ul
					className="os-app-rail"
					aria-label="PortfolioOS desktop navigation"
				>
					{navigation.map((nav) => (
						<li key={nav.title}>
							<Folder nav={nav} />
						</li>
					))}
				</ul>
				<main className="os-desktop-workspace">{children}</main>
			</div>
		</div>
	);
}

// Folder design by https://dribbble.com/ashimadhikari, extracted multiple versions to the design to fit the project's needs

// Morocco Photo by <a href="https://unsplash.com/@nelebki?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Niklas Schweinzer</a> on <a href="https://unsplash.com/photos/a-decorative-fountain-in-the-middle-of-a-courtyard-VqouWpsuziE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
