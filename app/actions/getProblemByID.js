import prisma from "@/app/libs/prismadb";

export default async function getProblemByID(params) {
	try {
		const problem = await prisma.problem.findUnique({
			where: {
				id: params.problemID
			}
		});
		// console.log(problem)

		return problem;
	} catch (error) {
		throw new Error(error);
	}
}