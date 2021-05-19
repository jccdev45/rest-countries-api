import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import axios from "axios";
import { fetchData } from "../util/methods";
import { useDarkMode } from "../util/hooks/useDarkMode";
import { api } from "../util/api";
import { Loader } from "../components";

export function CountryDetail() {
	const { darkMode } = useDarkMode().state;
	const history = useHistory();
	const { name } = useParams();
	const [country, setCountry] = useState();
	const [borderCountries, setBorderCountries] = useState([]);
	const [isLoading, toggleLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const cancelToken = axios.CancelToken.source();
		toggleLoading(true);

		const getCountry = async () => {
			await fetchData(name)
				.then((res) => {
					toggleLoading(false);
					setCountry(res[0]);
					return res;
				})
				.then((res) => {
					fetchBorders(res[0].borders);
				})
				.catch((error) => {
					if (axios.isCancel(error)) return;
					setError(error);
				});
		};

		getCountry();
		return () => {
			cancelToken.cancel();
		};
		// eslint-disable-next-line
	}, [name]);

	const fetchBorders = async (borders) => {
		if (!borders.length) return;

		const formatted = borders.join(";");
		return await api
			.get(`/alpha?codes=${formatted}`)
			.then((res) => {
				setBorderCountries(res.data.map((item) => item.name));
				return res;
			})
			.catch((error) => setError(error));
	};

	const renderBorders = () => {
		return borderCountries.length ? (
			borderCountries.map((country) => (
				<li
					key={country}
					className={`${
						darkMode ? "bg-darkblue" : "bg-vlgray"
					} text-sm w-full m-1 px-5 py-2 shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg text-center truncate`}
				>
					<Link
						to={`/country/${country}`}
						className="mb-4 lg:text-lg hover:underline"
					>
						{country}
					</Link>
				</li>
			))
		) : (
			<span
				className={`${
					darkMode ? "bg-darkblue" : "bg-vlgray"
				} w-full col-span-3 m-1 px-5 py-2 shadow text-center`}
			>
				"No bordering countries found"
			</span>
		);
	};

	const formatLanguages = (languages) => {
		let arr = [];
		languages.map((lang) => arr.push(lang.name));
		return <span>{arr.join(", ")}</span>;
	};

	const renderCountry = () => {
		const {
			flag,
			name,
			nativeName,
			region,
			subregion,
			capital,
			population,
			topLevelDomain,
			currencies,
			languages,
		} = country;

		return (
			<>
				<img src={flag} alt={name} className="w-full my-8 lg:w-5/12" />
				<div className="flex flex-col w-full justify-evenly lg:w-1/2">
					<h1 className="my-4 text-xl font-extrabold lg:text-2xl">{name}</h1>
					<div className="flex flex-col lg:flex-row">
						<ul className="flex flex-col w-full lg:w-1/2">
							<li className="my-1">
								<span className="font-bold">Native name: </span>
								<span>{nativeName}</span>
							</li>
							<li className="my-1">
								<span className="font-bold">Population: </span>
								<span>
									{population &&
										population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</span>
							</li>
							<li className="my-1">
								<span className="font-bold">Region: </span>
								<span>{region}</span>
							</li>
							<li className="my-1">
								<span className="font-bold">Sub-Region: </span>
								<span>{subregion}</span>
							</li>
							<li className="my-1">
								<span className="font-bold">Capital: </span>
								<span>{capital}</span>
							</li>
						</ul>
						<ul className="flex flex-col w-full my-8 lg:w-1/2">
							<li className="my-1">
								<span className="font-bold">Top Level Domain: </span>
								<span>{topLevelDomain}</span>
							</li>
							<li className="my-1">
								<span className="font-bold">Currencies: </span>
								{currencies &&
									currencies.map((item, index) => (
										<span key={index}>{item.name}</span>
									))}
							</li>
							<li className="my-1">
								<span className="font-bold">Languages: </span>
								{languages && formatLanguages(languages)}
							</li>
						</ul>
					</div>
					<div className="flex flex-col lg:items-center lg:flex-row">
						<h2 className="w-full text-lg font-bold lg:w-1/6">
							Border Countries:
						</h2>
						<ul className="grid w-full grid-cols-3 gap-3 lg:w-5/6">
							{borderCountries && renderBorders()}
						</ul>
					</div>
				</div>
			</>
		);
	};

	return (
		<section className="p-5 lg:p-16">
			{error && <h1>{JSON.stringify()}</h1>}
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid grid-cols-1">
					<button
						onClick={() => history.push("/")}
						className={`${
							darkMode ? "text-white bg-darkblue" : "text-vdblue_text bg-vlgray"
						} flex items-center justify-center w-5/12 lg:w-32 px-6 py-2 my-4 shadow-lg hover:shadow-xl`}
					>
						<RiArrowLeftLine className="text-lg" />{" "}
						<span className="mx-2">Back</span>
					</button>
					<article
						className={`${
							darkMode ? "text-white" : "text-vdblue_text"
						} my-8 flex flex-col lg:flex-row lg:justify-between`}
					>
						{country && renderCountry()}
					</article>
				</div>
			)}
		</section>
	);
}
