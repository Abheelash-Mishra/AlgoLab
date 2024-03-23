'use client'
import Editor from '@monaco-editor/react';

const EditorComp = () => {
	return (
		<div>
			<Editor
				height="90vh"
				// width="100vh"
				defaultLanguage="javascript"
				defaultValue="// Write your code here"
				theme="vs-dark"
			/>
		</div>
	);
};

export default EditorComp;