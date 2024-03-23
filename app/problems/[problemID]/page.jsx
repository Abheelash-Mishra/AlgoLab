import React from "react";

import getProblemByID from "@/app/actions/getProblemByID";
import Resizable from "react-resizable-layout";
import ProblemClient from "@/app/problems/[problemID]/ProblemClient";
import getLanguages from "@/app/actions/getLanguages";

const Page = async ({ params }) => {
	const problem = await getProblemByID(params);
	// const languages = await getLanguages();
	// console.log("problem", problem);
	// console.log("languages", languages.data);

	return (
		<ProblemClient
			problem={ problem }
			// languages={ languages.data }
		/>
	);
};

export default Page;