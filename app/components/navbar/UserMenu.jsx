"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Container from "@/app/components/Container";
import Button from "@/app/components/Button";

const UserMenu = ({ currentUser }) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const handleLogin = useCallback(() => {
		return loginModal.onOpen();
	}, [loginModal]);

	const handleRegister = useCallback(() => {
		return registerModal.onOpen();
	}, [registerModal]);

	return (
		<div className={ "flex flex-row text-md text-white w-[600px] items-center font-bold justify-end px-8" }>
			{ currentUser ? (
				<>
					<div className={"pr-16"}>
						Hi, { currentUser.name }!
					</div>
					<Button
						width_not_full
						label={ "Log out" }
						onClick={ () => signOut() }
					/>
				</>
			) : (
				<>
					<Button
						width_not_full
						secondary
						label={ "Login" }
						onClick={ handleLogin }
					/>
					<span className={"px-4"}>

					</span>
					<Button
						width_not_full
						label={ "Register" }
						onClick={ handleRegister }
					/>
				</>
			) }

		</div>
	);
};

export default UserMenu;