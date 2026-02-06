'use client';
import { useState, useEffect } from 'react';
import { MotionDiv, MotionH1, MotionP } from '../motion-div';
import { Spinner } from './spinner';
import { useRouter } from 'next/navigation';

export function LockScreen() {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		router.prefetch('/desktop');
	}, [router]);
	// Define variants for the animations
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
		exit: { opacity: 10, y: 100, transition: { duration: 1.5 } }, // Same as hidden but used for exiting
	};

	// Variants for individual items, including the exit variant
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
		exit: { opacity: 0, y: 100, transition: { duration: 1.5 } }, // Same as hidden but used for exiting
	};

	return (
		<MotionDiv
			className="flex flex-col justify-center items-center h-full w-full"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			{/* Conditional rendering based on isOpen using the 'exit' property for animation */}
			{!isOpen && (
				<>
					<MotionP
						className='rounded-full px-4 py-1 text-white text-base ring-1 ring-white mb-2 tracking-wide'
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit={isOpen ? "exit" : "hidden"}
					>
						Ziyad Mourabiti — Full-Stack SWE @ SAP
					</MotionP>
					<MotionH1
						className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center"
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						PortfolioOS <span className="font-extralight">Merzouga</span>
					</MotionH1>
				</>
			)}
			<MotionDiv
				className="text-white w-full flex justify-center items-center"
				variants={itemVariants}
				layout
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<MotionDiv layout className="min-w-full flex justify-center">
					{isOpen ? (
						<Spinner className='h-5 w-5' />
					) : (
						<button onClick={() => {
							setIsOpen(!isOpen);
							setTimeout(() => {
								router.push('/desktop')
							}, 100);
						}} className="text-secondary text-center">Click to continue {"->"}</button>
					)}
				</MotionDiv>
			</MotionDiv>
		</MotionDiv>
	);
}
