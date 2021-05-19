import { api } from "./api";

export const fetchData = async (name) => {
	const res = await api.get(`/name/${name}`);
	return res.data;
};
