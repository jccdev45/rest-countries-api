import React from "react";
import { NavLink } from "react-router-dom";
import { useDarkMode } from "../util/hooks/useDarkMode";
import { Toggle } from "./Toggle";

export function Navbar() {
	const { darkMode } = useDarkMode().state;

	return (
		<header
			className={`${
				darkMode
					? "bg-darkblue text-white"
					: "shadow bg-vlgray text-vdblue_text"
			} flex justify-between px-4 py-8 lg:px-16 sticky top-0`}
		>
			<NavLink exact to="/" className="font-extrabold hover:underline">
				Where in the world?
			</NavLink>
			<Toggle />
		</header>
	);
}
