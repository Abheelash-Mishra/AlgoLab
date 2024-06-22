'use client';

import React, { useCallback, useState } from "react";
import axios from "axios";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";

import { signIn } from "next-auth/react";


const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		axios.post("/api/register", data)
			.then(() => {
				registerModal.onClose()
			})
			.catch((err) => {
				toast.error("Something went wrong!");
				console.log(err)
			})
			.finally(() => setIsLoading(false));
	};

	const onToggle = useCallback(() => {
		loginModal.onOpen();
		registerModal.onClose();
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className={ "flex flex-col gap-4" }>
			<Heading
				title={ "Welcome to AlgoLab" }
				subtitle={ "Create an account!" }
			/>
			<Input
				id={ "email" }
				label={ "Email" }
				disabled={ isLoading }
				register={ register }
				errors={ errors }
				required
			/>
			<Input
				id={ "name" }
				label={ "Name" }
				disabled={ isLoading }
				register={ register }
				errors={ errors }
				required
			/>
			<Input
				id={ "password" }
				type={ "password" }
				label={ "Password" }
				disabled={ isLoading }
				register={ register }
				errors={ errors }
				required
			/>
		</div>
	)

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr/>
			<Button
				outline
				secondary
				label={ "Continue with Google" }
				icon={ FcGoogle }
				onClick={ () => signIn("google") }
			/>
			<div className={ "text-neutral-500 text-center mt-4 font-light" }>
				<div className={ "justify-center flex flex-row items-center gap-2" }>
					<div>
						Already have an account?
					</div>
					<div
						className={ "text-neutral-800 cursor-pointer hover:underline" }
						onClick={ onToggle }
					>
						Log In
					</div>
				</div>
			</div>
		</div>
	)


	return (
		<Modal
			disabled={ isLoading }
			isOpen={ registerModal.isOpen }
			title={ "Register" }
			actionLabel={ "Continue" }
			onClose={ registerModal.onClose }
			onSubmit={ handleSubmit(onSubmit) }
			body={ bodyContent }
			footer={ footerContent }
		/>
	);
};

export default RegisterModal;