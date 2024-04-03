import Image from "next/image";
import { Clock } from "./clock";
import { Suspense } from "react";
import { Spinner } from "./spinner";
import { MotionDiv } from "../motion-div";

export function NavBar() {
	return (
		<MotionDiv
		initial={{ x: 0, y: -20, opacity: 1 }}
		animate={{ x: 0, y: 0, opacity: 1 }}
		transition={{ duration: 1 }}
		 className='w-full h-6 bg-[#EBEAE3] text-black text-xs py-1 px-4 flex justify-between'>
			<div className="flex gap-2">
				<Suspense fallback={<Spinner />}>
					<Image priority loading="eager" src='/favicon.ico' alt='not the apple logo' className="hover:bg-accent" style={{ objectFit: 'contain' }} width={16} height={24} />
				</Suspense>
				<p className="font-semibold">Dune</p>
			</div>
			<div>
				<Suspense fallback={<Spinner />}>
					<Clock />
				</Suspense>
			</div>
		</MotionDiv>
	);
}
