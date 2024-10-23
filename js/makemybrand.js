import React from "react";
import ReactDOM from "react-dom";
import MakemybrandInfographic from "./MakemybrandInfographic"; // Import your React component

document.addEventListener("DOMContentLoaded", () => {
	const rootElement = document.getElementById("my-react-root");
	if (rootElement) {
		ReactDOM.render(<MakemybrandInfographic />, rootElement);
	}
});
