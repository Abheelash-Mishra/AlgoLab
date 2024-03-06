"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();

	return (
		<Image
			onClick={ () => router.push("/") }
			alt={ "AlgoLab" }
			className={ "cursor-pointer hidden md:block" }
			height="100"
			width="100"
			src={ "/images/logo1.png" }
		/>
	);
};

export default Logo;