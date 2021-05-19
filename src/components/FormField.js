import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { useDarkMode } from "../util/hooks/useDarkMode";

export function FormField({ name, label, onChange }) {
	const { darkMode } = useDarkMode().state;

	return (
		<label
			htmlFor={name}
			className={`${
				darkMode ? "bg-darkblue text-white" : "shadow-lg text-darkgray"
			} w-full mx-auto flex justify-between items-center rounded-lg`}
		>
			<button type="submit" className="flex items-center w-1/12 mx-8">
				<RiSearchLine className="text-2xl" />
			</button>

			<input
				id="search"
				type="search"
				name={name}
				placeholder={label}
				onChange={(e) => onChange(e)}
				className={`${
					darkMode ? "bg-darkblue text-white" : "bg-vlgray text-vdblue_text"
				} py-4 w-11/12 rounded focus:outline-none`}
			/>
		</label>
	);
}
