export type DesktopNavItem = {
	title: string;
	id: string;
	path: string;
	icon: 'folder' | 'file';
	externalHref?: string;
};

export const navigation: DesktopNavItem[] = [
	{
		title: 'About',
		id: 'ziyad',
		path: '/about',
		icon: 'folder',
	},
	{
		title: 'Work',
		id: 'projects',
		path: '/projects',
		icon: 'folder',
	},
	{
		title: 'Now',
		id: 'now',
		path: '/now',
		icon: 'folder',
	},
	{
		title: 'CV',
		id: 'CV',
		path: '/CV',
		icon: 'file',
	},
	{
		title: 'Writing',
		id: 'blog',
		path: '/blog',
		icon: 'file',
		externalHref: 'https://blog.mourabitiziyad.dev',
	}
]
