import React from "react";
import { ThemeProvider } from "styled-components";
import App from "./App";

const theme = {
	fonts: {
		primary: "'Roboto', sans-serif", // 기본 폰트
		secondary: "'Montserrat', sans-serif", // 다른 폰트
	},
};

const Root = () => (
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);

export default Root;
