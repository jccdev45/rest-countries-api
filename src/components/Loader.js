import React from "react";
import { useDarkMode } from "../util/hooks/useDarkMode";

export function Loader() {
	const { darkMode } = useDarkMode().state;

	return (
		<div
			className={`${
				darkMode ? "text-white bg-vdblue_bg" : "text-vdblue_text bg-vlgray"
			} w-full h-full text-5xl font-extrabold m-auto text-center`}
		>
			<h1>Loading...</h1>
			<div className="text-white animate-spin text-7xl">🌏</div>
		</div>
	);
}
