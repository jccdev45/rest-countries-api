import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/";
import { CountryDetail, Home } from "./screens";
import { ThemeProvider } from "./util/hooks/useDarkMode";

function App() {
	return (
		<ThemeProvider>
			<Layout>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/country/:name" component={CountryDetail} />
				</Switch>
			</Layout>
		</ThemeProvider>
	);
}

export default App;
