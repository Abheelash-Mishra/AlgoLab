import React from "react";

import getProblemByID from "@/app/actions/getProblemByID";
import ProblemClient from "@/app/problems/[problemID]/ProblemClient";

const Page = async ({ params }) => {
	const problem = await getProblemByID(params);

	return (
		<ProblemClient
			problem={ problem }
		/>
	);
};

export default Page;