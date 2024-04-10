'use client';

import React, { useState } from "react";
import "@/app/resizable.css";
import { ResizableBox } from "react-resizable";
import ProblemDescription from "@/app/components/problems/ProblemDescription";
import EditorComp from "@/app/components/EditorComp";
import Dropdown from "@/app/components/Dropdown";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProblemClient = ({ problem }) => {
	const languages = ["c", "cpp","csharp","java","javascript","lua","python","r","ruby","typescript"]

	const [selected, setSelected] = useState(localStorage.getItem("selectedItem") || items[0]);


	return (
		<div className={ "flex w-full h-full" }>
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

						<FontAwesomeIcon icon={faCode} />
						<h1 className={"ml-2"}>Code Editor</h1>

					</div>
					<Dropdown
						items={ languages }
						onSelect = { setSelected }
						selected = { selected }
					/>
				</div>

				<EditorComp selected = {selected}/>
			</div>
		</div>

	);
};

export default ProblemClient;