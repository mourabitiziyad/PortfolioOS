import React from 'react'

export function LockScreen() {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">PortfolioOS <span className="font-extralight">Merzouga</span></h1>
			<p className="text-white"><button className="text-secondary">Click to continue {"->"}</button></p>
		</div>
	)
}