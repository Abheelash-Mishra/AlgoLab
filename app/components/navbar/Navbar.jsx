"use client";

import React from "react";

import Container from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import UserMenu from "@/app/components/navbar/UserMenu";
// import Search from "@/app/components/navbar/Search";
// import { SafeUser } from "@/app/types";


const Navbar= ({ currentUser }) => {
	return (
		<div className={ "fixed w-full z-10 shadow-sm" }>
			<div className={ "flex items-center py-4 h-[80px] z-10 border-b-[1px] border-red-600" }>
				<Container>
					<div className={ "flex flex-row items-center justify-between gap-3 md:gap-0" }>
						<Logo/>
						<UserMenu currentUser={currentUser}/>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default Navbar;