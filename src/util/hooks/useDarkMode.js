import React, { useContext, createContext, useReducer } from "react";

const themeReducer = (state, action) => {
	switch (action.type) {
		case "light": {
			return { darkMode: false };
		}
		case "dark": {
			return { darkMode: true };
		}
		default:
			return state;
	}
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [state, dispatch] = useReducer(themeReducer, {
		darkMode: true,
	});

	return (
		<ThemeContext.Provider value={{ state, dispatch }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useDarkMode() {
	return useContext(ThemeContext);
}
