'use client';

import "@/app/resizable.css";

import axios from "axios";
import { EventEmitter } from "events";
import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProblemDescription from "@/app/components/problems/ProblemDescription";
import EditorComp from "@/app/components/EditorComp";
import Dropdown from "@/app/components/Dropdown";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

const ProblemClient = ({ problem }) => {
	const eventEmitter = new EventEmitter();

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
	const [isLoading, setIsLoading] = useState(false);

	// Gets the source code from the editor
	const [code, setCode] = useState(localStorage.getItem("codeValue"));

	// Stores the user input
	const [input, setInput] = useState("");

	// Stores the response data
	const [response, setResponse] = useState("");

	const [isCustom, setIsCustom] = useState(false);

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
		console.log(input);
	}

	const handleInput = () => {
		if (isCustom) {
			setInput("");
		} else {
			setInput(problem.input);
		}

		return input;
	}

	const handleCompilation = async (isFromSubmission = false) => {
		let token;
		let stdInput = input;
		setIsLoading(true);
		const languageID = selectedLanguage.id;

		if (!isFromSubmission) {
			toast.success("Executing!");
		}

		if (isFromSubmission) {
			console.log(input + ' here: ' + problem.input)
			stdInput = problem.input
		}

		await axios.post(process.env.JUDGE0 + "submissions/?base64_encoded=false&wait=false", {
			source_code: code,
			language_id: languageID,
			stdin: stdInput
		})
			.then((response) => {
				token = response.data.token
			})
			.catch((error) => {
				if (error.response && error.response.status === 404) {
					toast.error('Server is Offline. Please try again later.');
				} else if (error.message === 'Network Error' || error.message.includes('ERR_CONNECTION_REFUSED')) {
					toast.error('Server is Offline. Please try again later.');
				} else {
					console.error(error);
				}
				setIsLoading(false);
			});

		console.log(token)
		let statusID = 0;

		const fetchSubmissionStatus = () => {
			axios.get(process.env.JUDGE0 + "submissions/" + token + "?base64_encoded=false")
				.then((res) => {
					statusID = res.data.status.id;
					setResponse(res.data);
					if (statusID !== 1 && statusID !== 2) {
						clearInterval(intervalId);
						eventEmitter.emit('compilationDone', res.data); // Emit event here
						setIsLoading(false);
					}
				})
				.catch((error) => {
					console.error(error);
					setIsLoading(false);
					clearInterval(intervalId);
				});
		};

		// Call every 2 seconds
		const intervalId = setInterval(fetchSubmissionStatus, 2000);
	}

	// TODO - Test that the submission works smoothly with different types of problem outputs
	const handleSubmission = async () => {
		await handleCompilation(true);

		eventEmitter.on('compilationDone', (data) => { // Listen for event here
			console.log(data.stdout)
			if (!data.stderr) {
				const stdout = data.stdout.trim().replace(/\r?\n|\r/g, '');
				const output = problem.output.trim().replace(/\r?\n|\r/g, '');

				if (stdout === output) {
					toast.success("Accepted Solution!")

				} else {
					toast.error("Incorrect Solution!")
				}
			} else {
				toast.error("Incorrect Submission!")
			}
		});
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
							onClick={ () => handleCompilation(false) }
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
					// value={ code }
					setValue={ setCode }
					starterTemplate={ starterTemplate }
				/>

				<div className={ "flex flex-col justify-between items-center px-4 py-1 bg-neutral-700/50 rounded-b-xl" }>
					<div className={ "flex flex-row justify-between w-full my-4" }>
						<div className={ "w-full mr-2" }>
							<div className={ "flex justify-between items-center" }>
								<h1 className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
									{ isCustom ? "Custom Input" : "Input" }
								</h1>

								<div className="flex items-center mb-2">
									<input id="checked-checkbox" type="checkbox"
										   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										   onChange={ () => setIsCustom(!isCustom) }
										   checked={ isCustom }
									/>
									<label htmlFor="checked-checkbox" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">
										Custom Input
									</label>
								</div>

							</div>

							<textarea id="message" rows="8"
									  value={ input }
									  readOnly={ !isCustom }
									  onChange={ handleChange }
									  className="block text-gray-200 font-semibold resize-none p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							/>
						</div>
						<div className={ "w-full ml-2" }>
							<h1 className="block mb-2 text-lg justify-end font-medium text-blue-900 dark:text-white">Output</h1>
							<textarea id="message" rows="8" disabled readOnly
									  value={ isLoading ? 'Loading...' : (response.stderr || response.stdout) }
									  className={ `block ${ response.stderr ? "text-red-600" : "text-gray-200" } font-semibold resize-none p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500` }
							/>
						</div>
					</div>
				</div>

			</div>
		</div>

	);
};

export default ProblemClient;