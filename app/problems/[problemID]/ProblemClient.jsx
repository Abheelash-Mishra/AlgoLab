'use client';

import React from "react";
import "@/app/resizable.css";
import { ResizableBox } from "react-resizable";
import ProblemDescription from "@/app/components/problems/ProblemDescription";
import EditorComp from "@/app/components/EditorComp";
import Dropdown from "@/app/components/Dropdown";

const ProblemClient = ({ problem }) => {
	const languages = ["c", "cpp","csharp","java","javascript","lua","python","r","ruby","typescript"]

	return (
		<div className={ "flex w-full" }>
			<ResizableBox
				className="custom-box box border-r-2 border-black"
				width={ 800 }
				// height={ 1600 }
				axis={ "x" }
				minConstraints={ [400, 400] }
				maxConstraints={ [1000, 1000] }
				handle={ <span className="custom-handle custom-handle-e" /> }
				handleSize={ [8, 8] }
			>
				<ProblemDescription
					problem={ problem }
				/>
			</ResizableBox>

			<div className={"mt-4 px-4 w-[50vw] flex-grow"} >
				<div className={"flex justify-between items-center px-4 py-1 bg-neutral-700/50 rounded-t-xl"}>
					<div className={"text-white font-medium flex items-center"}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
							<path fillRule="evenodd"
								  d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z"
								  clipRule="evenodd" />
						</svg>

						<h1 className={"ml-2"}>Code Editor</h1>

					</div>
					<Dropdown
						items={ languages }
					/>
				</div>

				<EditorComp />
			</div>
		</div>

	);
};

export default ProblemClient;