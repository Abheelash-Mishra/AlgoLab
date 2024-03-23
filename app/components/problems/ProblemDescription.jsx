'use client'

import React from "react";

const ProblemDescription = ({ problem }) => {
	return (
		<div className={ "text-left text-white m-4 px-6 py-4 h-[91vh] bg-neutral-700/50 rounded-xl" }>
			<div className={ "flex justify-between items-center" }>
				<h1 className={ "text-2xl font-bold" }>
					{ problem.title }
				</h1>

				<div className={ "flex" }>
					<h3 className={ "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary/70 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-default" }>
						{ problem.type }
					</h3>
					<h3 className={ "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary/70 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-default" }>
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

			<p className={ "my-4" }>
				<strong>Sample Input<br /></strong>
				{ problem.sampleInput.split('\n').map((line, index) => (
					<React.Fragment key={ index }>
						{ line }
						<br />
					</React.Fragment>
				)) }
			</p>
			<p className={ "my-4" }>
				<strong>Sample Output<br /></strong>
				{ problem.sampleOutput.split('\n').map((line, index) => (
					<React.Fragment key={ index }>
						{ line }
						<br />
					</React.Fragment>
				)) }
			</p>

		</div>
	);
};

export default ProblemDescription;