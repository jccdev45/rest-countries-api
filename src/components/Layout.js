import React from "react";
import { useDarkMode } from "../util/hooks/useDarkMode";
import { Navbar } from "./";

export function Layout({ children }) {
	const { darkMode } = useDarkMode().state;

	return (
		<div className="font-sans">
			<Navbar />
			<main
				className={`${
					darkMode ? "bg-vdblue_bg" : "bg-vlgray"
				} flex-grow flex-col flex min-h-screen`}
			>
				{children}
			</main>
		</div>
	);
}
