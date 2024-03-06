'use client';

import React from "react";

const Button= ({ label, onClick, width_not_full, disabled, outline, small, secondary = false, icon: Icon }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition
							${width_not_full ? 'w-1/4' : 'w-full'}
							${outline ? 'bg-white' : ''}
							${outline ? 'border-black' : 'border-rose-500'}
							${outline ? 'text-black' : 'text-rose-500 font-extrabold'}
							${small ? 'py-1 text-sm font-light border-[1px]' : 'py-3 text-md font-semibold border-[2px]'}
							${secondary ? 'text-black' : 'text-white bg-rose-500'}
							`}
		>
			{Icon && (
				<Icon className={"absolute left-4 top-3"} size={24}/>
			)}

			{label}
		</button>
	);
};

export default Button;

