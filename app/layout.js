import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import RegisterModal from "@/app/components/modals/RegisterModal";
import getCurrentUser from "@/app/actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AlgoLab",
	description: "Prepare for your next coding interview with AlgoLab",
};

export default async function RootLayout({ children }) {
	const currentUser = await getCurrentUser()

	return (
		<html lang="en">
            <body className={ inter.className }>
				<ToasterProvider />
				<LoginModal />
				<RegisterModal />

				<Navbar currentUser={currentUser} />

				<div className={"pt-20"}>
					{children}
				</div>
            </body>
		</html>
	);
}
