import prisma from "@/app/libs/prismadb";

export default async function getProblems() {
	try {
		const problem = await prisma.problem.findMany();

		return problem;
	} catch (error) {
		throw new Error(error);
	}
}