import axios from "axios";

let apiURL = "https://restcountries.eu/rest/v2";

export const api = axios.create({
	baseURL: apiURL,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/x-www-form-urlencoded",
	},
});
