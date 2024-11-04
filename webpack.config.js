const path = require("path");

module.exports = {
	entry: {
		main: "./js/makemybrand.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "./assets"),
	},
	resolve: {
		alias: {
			"@wordpress": path.resolve(__dirname, "node_modules/@wordpress"),
		},
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
		"@wordpress/i18n": "wp.i18n",
		"@wordpress/components": "wp.components",
		"@wordpress/api-fetch": "wp.apiFetch",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	mode: "development",
};
