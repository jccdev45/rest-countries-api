import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../util/hooks/useDarkMode";

export function Country({ country }) {
	const { darkMode } = useDarkMode().state;

	return (
		<article
			className={`${
				darkMode
					? "bg-darkblue text-white"
					: "shadow-lg bg-vlgray text-vdblue_text"
			} grid grid-cols-1 lg:grid-cols-none lg:grid-rows-2 rounded-lg w-5/6 transform hover:scale-105 hover:shadow-lg transition-transform ease-in-out duration-200 lg:w-full mx-auto mb-10 lg:m-0`}
		>
			<div className="h-full grid-rows-1">
				<img
					src={country.flag}
					alt={country.name}
					className="object-cover w-full h-full rounded-tl-lg rounded-tr-lg"
				/>
			</div>
			<div className="h-full grid-cols-1 px-6 pt-8 pb-10">
				<span className="w-full mb-4">
					<Link
						to={`/country/${country.name}`}
						className="text-lg font-extrabold lg:text-xl hover:underline"
					>
						{country.name}
					</Link>
				</span>
				<ul className="flex flex-col">
					<li className="flex items-center">
						<span className="mr-2 font-bold">Population: </span>
						<span>
							{country.population
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 font-bold">Region: </span>
						<span>{country.region}</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 font-bold">Capital: </span>
						<span>{country.capital}</span>
					</li>
				</ul>
			</div>
		</article>
	);
}
