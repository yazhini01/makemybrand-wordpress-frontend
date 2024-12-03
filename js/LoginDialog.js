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

import { __ } from "@wordpress/i18n";
import { Button, Modal } from "@wordpress/components";

export function LoginDialog({ setShowLoginDialog, setUserInfo }) {
	return (
		<Modal
			title={__("Copy & Paste Makemybrand Token", "text-domain")}
			onRequestClose={() => setShowLoginDialog(false)}
			className="custom-modal"
			style={{
				overflow: "hidden",
			}}
		>
			<div style={{}}>
				<p>
					<span
						style={{
							fontSize: "1.2em",
						}}
					>
						Step 1:
					</span>
					<span>
						<a
							target="_blank"
							href="https://app.makemybrand.ai/login?redirect=wordpress-token"
						>
							Click here to login to Makemybrand
						</a>
					</span>
				</p>
				<p>
					<span
						style={{
							fontSize: "1.2em",
						}}
					>
						Step 2:
					</span>
					<span>Copy the token displayed after login and paste it here.</span>
					<input
						type="text"
						style={{
							width: "100%",
						}}
						id="makemybrand-token"
					/>
				</p>
			</div>
			<Button
				isPrimary
				onClick={async () => {
					const token = document.querySelector("#makemybrand-token").value;
					const result = await updateToken(token);
					if (result?.success) {
						setUserInfo(result.data.userinfo);
						setShowLoginDialog(false);
					}
				}}
				style={{
					marginTop: 10,
					width: "100%",
					justifyContent: "center",
				}}
			>
				Save
			</Button>
		</Modal>
	);
}

const updateToken = async (newToken) => {
	const formData = new FormData();
	formData.append("action", "update_user_token"); // Action to trigger the appropriate PHP handler
	formData.append("token", newToken); // The new token to update
	formData.append("_ajax_nonce", makemybrand.update_token_nonce); // Nonce for security

	const response = await fetch(makemybrand.ajax_url, {
		method: "POST",
		body: formData,
	});

	const result = await response.json();
	return result;
};
