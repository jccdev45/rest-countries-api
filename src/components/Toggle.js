import React from "react";
import { RiMoonClearFill } from "react-icons/ri";
import { useDarkMode } from "../util/hooks/useDarkMode";

export function Toggle() {
	const theme = useDarkMode();
	const { darkMode } = theme.state;

	return (
		<button
			className={`${
				darkMode ? "focus:outline-white" : "focus:outline-black"
			} flex items-center hover:underline`}
			onClick={() => theme.dispatch({ type: darkMode ? "light" : "dark" })}
		>
			{darkMode ? (
				<>
					<RiMoonClearFill className="mx-4 font-semibold text-yellow-300" />{" "}
					<span className="font-semibold">Light Mode</span>
				</>
			) : (
				<>
					<RiMoonClearFill className="mx-4 font-semibold text-blue-300" />{" "}
					<span className="font-semibold">Dark Mode</span>
				</>
			)}
		</button>
	);
}
