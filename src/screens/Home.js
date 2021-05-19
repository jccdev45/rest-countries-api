import React, { useEffect, useState } from "react";
import axios from "axios";

import { Country, Filter, FormField, Loader } from "../components";
import { useDarkMode } from "../util/hooks/useDarkMode";

const BASE_URL = "https://restcountries.eu/rest/v2";

export function Home() {
	const { darkMode } = useDarkMode().state;
	const [search, setSearch] = useState("");
	const [countries, setCountries] = useState([]);
	const [regions, setRegions] = useState([]);
	const [isLoading, toggleLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();

		const fetchData = async () => {
			toggleLoading(true);
			try {
				const res = await axios.get(`${BASE_URL}/all`);
				toggleLoading(false);
				setCountries(res.data);

				let arr = [];
				res.data.map((item) => arr.push(item.region));
				let unique = [...new Set(arr.flat())];
				unique.sort();
				unique[0] = "Filter by Region...";
				setRegions(unique);
			} catch (error) {
				setError(error);
			}
		};

		if (!search) fetchData();
		return () => {
			cancelToken.cancel();
		};
	}, [search]);

	const handleChange = (e) => {
		const { name, value, id } = e.target;
		id === "search" ? setSearch(value) : searchAPI(name, value);
	};

	const handleSubmit = (e, searchField) => {
		e.preventDefault();
		return searchAPI(searchField, search);
	};

	const searchAPI = async (searchField, searchTerm) => {
		if (searchTerm === "Filter by Region...") {
			setSearch();
			return;
		}
		const res = await axios.get(`${BASE_URL}/${searchField}/${searchTerm}`);
		setCountries(res.data);
	};

	const renderFilter = () => {
		return regions.map((region) => <Filter key={region} field={region} />);
	};

	const renderCountries = () => {
		return countries.map((country) => (
			<Country key={country.name} country={country} />
		));
	};

	return (
		<div className="w-full p-4 mx-auto lg:p-8">
			{error && <h1>{error}</h1>}
			<div className="flex flex-col w-full lg:flex-row lg:justify-between">
				<form
					onSubmit={(e) => handleSubmit(e, "name")}
					className="w-full lg:w-1/3"
				>
					<FormField
						name="name"
						label="Search for a country..."
						value={search}
						onChange={handleChange}
					/>
				</form>
				{regions && (
					<select
						onChange={(e) => handleChange(e)}
						id="filter"
						name="region"
						className={`${
							darkMode ? "bg-darkblue text-white" : "shadow-lg text-darkgray"
						} w-7/12 py-4 px-6 rounded-lg my-10 lg:my-0 lg:w-1/5`}
					>
						{renderFilter()}
					</select>
				)}
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-16 lg:pt-8">
					{countries && renderCountries()}
				</div>
			)}
		</div>
	);
}
