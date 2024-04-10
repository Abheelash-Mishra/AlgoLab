'use client'
import Editor from '@monaco-editor/react';

const EditorComp = ({ selected }) => {
	const options = {
		autoIndent: 'full',
		contextmenu: true,
		fontFamily: 'monospace',
		fontSize: 13,
		lineHeight: 24,
		hideCursorInOverviewRuler: true,
		matchBrackets: 'always',
		minimap: {
			enabled: true,
		},
		scrollbar: {
			horizontalSliderSize: 4,
			verticalSliderSize: 18,
		},
		selectOnLineNumbers: true,
		roundedSelection: false,
		readOnly: false,
		cursorStyle: 'line',
		automaticLayout: true,
	};

	console.log(selected);

	return (
		<div>
			<Editor
				height="90vh"
				// width="100vh"
				defaultLanguage="javascript"
				language={ selected }
				defaultValue="// Write your code here"
				theme="vs-dark"
			/>
		</div>
	);
};

export default EditorComp;