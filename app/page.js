import getProblems from "@/app/actions/getProblems";
import ProblemList from "@/app/components/problems/ProblemList";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Home() {
	const problems = await getProblems();
	const currentUser = await getCurrentUser();

	return (
		<main className="">
			<div className={ "w-full flex flex-col items-center" }>
				<div className={ "w-1/2 p-2 flex flex-row text-lg text-white font-semibold bg-gray-800 border-gray-500 border-y-[1px]" }>
					<div className={ "w-1/6 mx-2 flex" }>
						<div className={ "px-2" }>
							S.No
						</div>
					</div>

					<div className={ "w-3/6 px-6" }>
						Problem
					</div>
					<div className={ "w-1/6 px-6" }>
						Topic
					</div>
					<div className={ "w-1/6 px-2 text-center" }>
						Difficulty
					</div>
				</div>

				{ problems.map((problem, index) => (
					<ProblemList
						key={ problem.id }
						user={ currentUser }
						id={ problem.id }
						sno={ index + 1 }
						title={ problem.title }
						difficulty={ problem.difficulty }
						type={ problem.type }
					/>
				)) }
			</div>
		</main>
	);
}
