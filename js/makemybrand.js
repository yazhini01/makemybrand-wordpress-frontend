/*
 * Plugin Name: MakeMyBrand
 * Plugin URI: https://makemybrand.ai/
 * Description: Adds an infographic to new posts
 * Version: 1.03
 * Author: Make My Brand
 * Author URI: https://makemybrand.ai
 * License: GPLv2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * Copyright (C) 2024 MakeMyBrand.AI
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import ReactDOM from "react-dom";
import MetaBox from "./MetaBox";

document.addEventListener("DOMContentLoaded", () => {
	const rootElement = document.getElementById("metabox-react-root");
	if (rootElement) {
		ReactDOM.render(<MetaBox />, rootElement);
	}
});
