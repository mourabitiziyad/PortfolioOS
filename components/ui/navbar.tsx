import Image from "next/image";
import { Clock } from "./clock";
import { Suspense } from "react";

export function NavBar() {
	return (
		<div className='w-full h-6 bg-[#EBEAE3] text-black text-xs py-1 px-4 flex justify-between'>
			<div className="flex gap-2">
				<Suspense fallback={<p>Loading...</p>}>
					<Image src='/dune.png' alt='not the apple logo' className="hover:bg-accent" style={{ objectFit: 'contain' }} width={16} height={24} />
				</Suspense>
				<p className="font-semibold">Dune</p>
			</div>
			<div>
				<Suspense fallback={<p>Loading...</p>}>
					<Clock />
				</Suspense>
			</div>
		</div>
	);
}
