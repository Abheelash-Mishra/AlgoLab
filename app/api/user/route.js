import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request) {
	// Parse the request body
	const body = await request.json();
	const { problemID } = body;

	// Get the current user
	const currUser = await getCurrentUser();

	// Ensure completedIds is an array
	if (!Array.isArray(currUser.completedIDs)) {
		currUser.completedIDs = [];
	}

	if (!currUser.completedIDs.includes(problemID)) {
		currUser.completedIDs.push(problemID);
	}

	// Update the user in the database
	const user = await prisma.user.update({
		where: {
			id: currUser.id
		},
		data: {
			completedIDs: currUser.completedIDs
		}
	});

	// Return the updated user
	return NextResponse.json(user);
}