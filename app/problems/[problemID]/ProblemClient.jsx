'use client';

import "@/app/resizable.css";

import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProblemDescription from "@/app/components/problems/ProblemDescription";
import EditorComp from "@/app/components/EditorComp";
import Dropdown from "@/app/components/Dropdown";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-hot-toast";

const ProblemClient = ({ problem }) => {
	// const languages = ["c", "cpp", "csharp", "java", "javascript", "lua", "python", "ruby", "typescript"]
	const languages = ["c", "cpp", "csharp", "java", "python"]
	const ids = [1, 2, 22, 4, 10]

	const [selected, setSelected] = useState(languages[0]);

	useEffect(() => {
		setSelected(localStorage.getItem("selectedItem"))
	}, [])

	const handleSubmission = async () => {
		let token;

		await axios.post(process.env.JUDGE0 + "submissions/?base64_encoded=false&wait=false", {
			source_code: "x = input()\nprint(x)",
			language_id: ids[languages.indexOf(selected)],
			stdin: "Hello World!"
		})
			.then((response) => {
				token = response.data.token
			}).catch((error) => {
				console.error(error)
			})
			.finally(() => {
				toast.success("Submitted!")
			})

		const response = axios.get(process.env.JUDGE0 + "submissions/" + token + "?base64_encoded=false")
			.then((response) => {
				console.log(response)
			}).catch((error) => {
				console.error(error)
			})
	}


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

			<div className={ "mt-4 px-4 w-[50vw] flex-grow" }>
				<div className={ "flex justify-between items-center px-4 py-1 bg-neutral-700/50 rounded-t-xl" }>
					<div className={ "text-white font-medium flex items-center" }>

						<FontAwesomeIcon icon={ faCode } />
						<h1 className={ "ml-2" }>Code Editor</h1>

					</div>

					<div>
						<button
							className={ "bg-red-600/90 text-lg text-white font-bold px-4 py-0.5 mx-4 rounded-lg" }
							onClick={ handleSubmission }
						>
							Submit
						</button>
						<Dropdown
							items={ languages }
							onSelect={ setSelected }
							selected={ selected }
						/>
					</div>

				</div>

				<EditorComp selected={ selected } />
				{/*<OutputAccordion />*/ }

				<div className={ "flex justify-between items-center px-4 py-1 bg-neutral-700/50 rounded-b-xl" }>
					<div className={ "text-white font-medium flex items-center" }>
						Output

					</div>
				</div>
			</div>
		</div>

	);
};

export default ProblemClient;