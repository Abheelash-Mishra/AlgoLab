'use client'
import Editor from '@monaco-editor/react';

const EditorComp = ({ selected, value, setValue, starterTemplate }) => {
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
				height="57vh"
				// width="100vh"
				// defaultLanguage="javascript"
				language={ selected }
				value={ starterTemplate }
				theme="vs-dark"
				options={ options }
				onChange={ handleEditorChange }
			/>
		</div>
	);
};

export default EditorComp;