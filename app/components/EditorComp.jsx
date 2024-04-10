'use client'
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useRef, useState } from "react";

const EditorComp = ({ selected }) => {
	const [value, setValue] = useState("");

	const handleEditorChange = (value) => {
		setValue(value);
		// onChange("code", value);
		// console.log(value)
	};

	const options = {
		autoIndent: 'full',
		contextmenu: true,
		fontFamily: 'monospace',
		// fontSize: 13,
		// lineHeight: 24,
		hideCursorInOverviewRuler: true,
		matchBrackets: 'always',
		minimap: {
			enabled: false,
		},
		scrollbar: {
			horizontalSliderSize: 4,
			verticalSliderSize: 14,
		},
		selectOnLineNumbers: true,
		roundedSelection: false,
		readOnly: false,
		cursorStyle: 'line',
		automaticLayout: true,
	};

	return (
		<div>
			<Editor
				height="60vh"
				// width="100vh"
				// defaultLanguage="javascript"
				language={ selected }
				defaultValue="// Write your code here"
				theme="vs-dark"
				options={ options }
				onChange={handleEditorChange}
			/>
		</div>
	);
};

export default EditorComp;