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
	const languageData = [
		{
			"officialName": "C",
			"codename": "c",
			"id": 50,
			"starterTemplate": "#include <stdio.h>\n\nint main() {\n    // Your code goes here\n\t\n    return 0;\n}"
		},
		{
			"officialName": "C++",
			"codename": "cpp",
			"id": 54,
			"starterTemplate": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Your code goes here\n\t\n    return 0;\n}"
		},
		{
			"officialName": "C#",
			"codename": "csharp",
			"id": 51,
			"starterTemplate": "using System;\n\nclass Program {\n    static void Main(string[] args) {\n        // Your code goes here\n\t\t\n    }\n}"
		},
		{
			"officialName": "Java",
			"codename": "java",
			"id": 62,
			"starterTemplate": "public class Main {\n    public static void main(String[] args) {\n        // Your code goes here\n\t\t\n    }\n}"
		},
		{
			"officialName": "Javascript",
			"codename": "javascript",
			"id": 63,
			"starterTemplate": "function main() {\n    // Your code goes here\n\t\n}\n\nmain();"
		},
		{
			"officialName": "Python",
			"codename": "python",
			"id": 71,
			"starterTemplate": "def main():\n    # Your code goes here\n    \n\nif __name__ == '__main__':\n    main()"
		}
	]

	const [selected, setSelected] = useState(languageData[0].codename);

	// Gets the source code from the editor
	const [code, setCode] = useState(localStorage.getItem("codeValue"));

	// Stores the user input
	const [input, setInput] = useState("");

	// Stores the response data
	const [response, setResponse] = useState("");


	const selectedLanguage = languageData.find(language => language.codename === selected);
	const starterTemplate = selectedLanguage ? selectedLanguage.starterTemplate : "";

	useEffect(() => {
		setSelected(localStorage.getItem("selectedItem"))
	}, [])

	useEffect(() => {
		handleInput();
	}, [isCustom, problem.input]);

	const handleChange = (e) => {
		const inputVal = e.target.value;

		setInput(inputVal);
	}


	const handleCompilation = async () => {
		let token;
		const languageID = selectedLanguage.id;

		console.log(code)
		console.log(languageID)
		console.log(input)

		toast.success("Executing!")

		await axios.post(process.env.JUDGE0 + "submissions/?base64_encoded=false&wait=false", {
			source_code: code,
			language_id: languageID,
			stdin: input
		})
			.then((response) => {
				token = response.data.token
				// toast.success("Executing!")
			}).catch((error) => {
				console.error(error)
			})
			.finally(() => {
				// toast.success("Submitted!")
			})

		console.log(token)
		let statusID = 0;
		let res;

		do {
			res = await axios.get(process.env.JUDGE0 + "submissions/" + token + "?base64_encoded=false")
				.then((response) => {
					statusID = response.data.status.id;
					console.log(statusID);
					setResponse(response.data)
				}).catch((error) => {
					console.error(error);
				});
		} while (statusID === 1 || statusID === 2);


	}

	const handleSubmission = () => {
		console.log("Running test cases!")
	}

	// console.log(code)

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

					<div className={ "my-1.5" }>
						<button
							className={ "bg-red-500/90 text-md text-white font-bold px-4 py-0.5 mx-4 rounded-lg" }
							onClick={ handleCompilation }
						>
							Run
						</button>
						<button
							className={ "bg-red-500/90 text-md text-white font-bold px-4 py-0.5 mx-4 rounded-lg" }
							onClick={ handleSubmission }
						>
							Submit
						</button>

						<Dropdown
							items={ languageData }
							onSelect={ setSelected }
							selected={ selected }
						/>
					</div>

				</div>

				<EditorComp
					selected={ selected }
					value={ code }
					setValue={ setCode }
					starterTemplate={ starterTemplate }
				/>
				{/*<OutputAccordion />*/ }

				<div className={ "flex flex-col justify-between items-center px-4 py-1 bg-neutral-700/50 rounded-b-xl" }>
					{/*<div className={ "text-white text-xl font-medium flex items-center border-b-[1px] w-full border-gray-500" }>*/ }
					{/*	Output*/ }
					{/*</div>*/ }
					<div className={ "flex flex-row justify-between w-full my-4" }>
						<div className={ "w-full mr-2" }>
							<label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Custom Input</label>
							<textarea id="message" rows="8" onChange={ handleChange }
									  className="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<div className={ "w-full ml-2" }>
							<h1 className="block mb-2 text-lg justify-end font-medium text-blue-900 dark:text-white">Output</h1>
							<textarea id="message" rows="8" disabled readOnly
									  value={ response.stderr || response.stdout }
									  className={`block ${response.stderr ? "text-red-600" : "text-gray-200"} font-semibold resize-none p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
							/>
						</div>

					</div>
				</div>
			</div>
		</div>

	);
};

export default ProblemClient;