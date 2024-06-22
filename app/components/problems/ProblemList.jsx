'use client'

import { FaRegCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProblemList = ({ user, id, sno, title, difficulty, type }) => {
	const router = useRouter();
	// console.log(user)
	const handleClick = () => {
		console.log("Problem clicked", id);
		router.push(`/problems/${id}`);
	};
	return (
		<div
			className={ "w-2/3 cursor-pointer p-2 flex flex-row text-md text-white font-semibold bg-gray-800 border-gray-500 border-y-[1px] border-x-[2px]" }
			onClick={handleClick}
		>
			<div className={ "w-1/6 mx-2 flex" }>
				<div className={ "px-1 flex items-center text-green-700" }>
					{ user?.completedIDs.includes(id) ? <FaRegCheckCircle /> : <div className={"w-[15px]"}></div> }
				</div>
				<div className={ "px-2" }>
					{ sno }
				</div>
			</div>

			<div className={ "w-3/6 px-6" }>
				{ title }
			</div>
			<div className={ "w-1/6 px-6" }>
				{ type }
			</div>
			<div className={ "w-1/6 px-2 text-center" }>
				{ difficulty }
			</div>
		</div>
	);
};

export default ProblemList;