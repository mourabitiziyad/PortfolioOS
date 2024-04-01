import React from 'react'

export function LockScreen() {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<p className='rounded-full px-4 py-1 text-white text-base ring-1 ring-white mb-4 tracking-wide'>Currently Cooking</p>
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">PortfolioOS <span className="font-extralight">Merzouga</span></h1>
			<p className="text-white"><button className="text-secondary">Click to continue {"->"}</button></p>
		</div>
	)
}