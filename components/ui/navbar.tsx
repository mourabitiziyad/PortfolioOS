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
			<div className="flex gap-4 items-center">
				<Suspense fallback={<Spinner />}>
					<Image priority loading="eager" src='/favicon.ico' alt='not the apple logo' className="hover:bg-accent" style={{ objectFit: 'contain' }} width={16} height={24} />
				</Suspense>
				<p className="font-semibold">Dune</p>
				<div className="hidden sm:flex gap-3 text-gray-600">
					<a href="mailto:mourabitiziyad@gmail.com" className="hover:text-black transition-colors">Email</a>
					<a href="https://github.com/mourabitiziyad" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
					<a href="https://linkedin.com/in/ziyadmourabiti" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
				</div>
			</div>
			<div>
				<Suspense fallback={<Spinner />}>
					<Clock />
				</Suspense>
			</div>
		</MotionDiv>
	);
}
