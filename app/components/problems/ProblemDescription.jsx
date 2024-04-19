'use client'

import React, { useEffect, useState } from "react";

const ProblemDescription = ({ problem }) => {
	// const [height, setHeight] = useState(0);
	//
	// useEffect(() => {
	// 	setHeight(window.innerHeight - 110);
	// }, []);
	//
	// console.log(height);

	return (
		<div className={ `text-left text-white m-4 px-6 py-4 bg-neutral-700/50 rounded-xl h-[860px]` }>
			<div className={ "flex justify-between items-center" }>
				<h1 className={ "text-2xl font-bold" }>
					{ problem.title }
				</h1>

				<div className={ "flex" }>
					<h3 className={ "text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary/70 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-default" }>
						{ problem.type }
					</h3>
					<h3 className={ "text-gray-900 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary/70 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-default" }>
						{ problem.difficulty }
					</h3>
				</div>
			</div>

			<p className={ "text-justify my-6" }>
				{ problem.description.split('\n').map((line, index) => (
					<React.Fragment key={ index }>
						{ line }
						<br />
					</React.Fragment>
				)) }
			</p>

			<br />
			<br />

			<div className={ "my-4 border-2 border-gray-800 rounded-lg bg-gray-700 px-4 py-2" }>
				<div className={"pb-4"}>
					<strong>Sample Input<br/></strong>
				</div>
				{ problem.sampleInput.split('\n').map((line, index) => (
					<React.Fragment key={ index }>
						{ line }
						<br />
					</React.Fragment>
				)) }
			</div>

			<div className={ "my-4 border-2 border-gray-800 rounded-lg bg-gray-700 px-4 py-2" }>
				<div className={ "pb-4" }>
					<strong>Sample Output<br /></strong>
				</div>
				{ problem.sampleOutput.split('\n').map((line, index) => (
					<React.Fragment key={ index }>
						{ line }
						<br />
					</React.Fragment>
				)) }
			</div>
		</div>
	);
};

export default ProblemDescription;