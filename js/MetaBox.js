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

import { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { Button, Modal, Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import PaymentButton from "./PaymentButton";

const templateWidth = 180;
const MetaBox = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [showDialog, setShowDialog] = useState(false);
	const [templates, setTemplates] = useState([]);
	const post_id = makemybrand.post_id;
	const [userInfo, setUserInfo] = useState(null);
	const [templateLoading, setTemplateLoading] = useState(false);

	useEffect(() => {
		fetchUserInfo();
	}, []);

	useEffect(() => {
		if (showDialog) {
			fetchTemplates();
		}
	}, [showDialog]);

	const fetchUserInfo = async () => {
		const formData = new URLSearchParams();
		formData.append("action", "makemybrand_fetch_userinfo");
		formData.append("_ajax_nonce", makemybrand.fetch_userinfo_nonce);
		apiFetch({
			url: makemybrand.ajax_url,
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.success) {
					console.log("User info", response.data);
					setUserInfo(response.data);
				} else {
					console.error("Error fetching user info", response.data);
					setUserInfo(null);
				}
			})
			.catch((e) => {
				if (e.message === "USER_TOKEN_NOT_FOUND") {
					console.log("User not logged in");
					setUserInfo(null);
					return;
				}
				console.error("Error fetching user info", e);
				setUserInfo(null);
			});
	};

	const fetchTemplates = async () => {
		setTemplateLoading(true);
		const response = await fetch("https://api.makemybrand.ai/featured_templates");
		const data = await response.json();
		setTemplates(data);
		setTemplateLoading(false);
	};

	const handleAddInfographic = (selectedTemplate) => {
		if (!selectedTemplate) return;

		setLoading(true);
		setMessage("");

		const formData = new URLSearchParams();
		formData.append("action", "makemybrand_add_infographic");
		formData.append("_ajax_nonce", makemybrand.add_infographic_nonce);
		formData.append("post_id", post_id);
		formData.append("template_id", selectedTemplate.id);

		apiFetch({
			url: makemybrand.ajax_url,
			method: "POST",
			body: formData,
		})
			.then((response) => {
				setLoading(false);
				if (response.success) {
					setMessage(__("Infographic added!", "text-domain"));
					const updatedBlock = response.data.updated_block;
					if (updatedBlock) {
						wp.data.dispatch("core/editor").editPost({ content: updatedBlock });
					}
					setShowDialog(false);
				} else {
					setMessage(__("Error: ", "text-domain") + response.data);
				}
			})
			.catch((e) => {
				setLoading(false);
				console.error("Error adding infographic", e);
				setMessage(__("An error occurred. Please try again.", "text-domain"));
			});
	};

	return (
		<div
			style={{
				marginTop: 10,
			}}
		>
			{userInfo && (
				<>
					<AddInfographicBtn />
					<PaymentButton userInfo={userInfo} />
				</>
			)}
			{!userInfo && (
				<>
					<LoggedoutBtn />
				</>
			)}

			{message && <p>{message}</p>}

			{showDialog && (
				<TemplatesDialog
					setShowDialog={setShowDialog}
					templates={templates}
					templateLoading={templateLoading}
					handleAddInfographic={handleAddInfographic}
					loading={loading}
				/>
			)}
		</div>
	);

	function AddInfographicBtn() {
		return (
			<Button
				isPrimary
				onClick={() => setShowDialog(true)}
				disabled={loading}
			>
				{loading ? __("Loading...", "text-domain") : __("Add Infographic", "text-domain")}
			</Button>
		);
	}
	function LoggedoutBtn() {
		return (
			<Button
				isPrimary
				onClick={() => {
					window.open("https://app.makemybrand.ai/login?redirect=wordpress-token", "_blank");
				}}
				disabled={loading}
			>
				{__("Login to Makemybrand", "text-domain")}
			</Button>
		);
	}
};

function TemplatesDialog({ setShowDialog, templates, templateLoading, handleAddInfographic, loading }) {
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	return (
		<Modal
			title={__("Select a Template", "text-domain")}
			onRequestClose={() => setShowDialog(false)}
			className="custom-modal"
			style={{
				overflow: "hidden",
			}}
		>
			{templateLoading ? (
				<div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
					<Spinner />
				</div>
			) : (
				<div style={{ display: "flex", flexWrap: "wrap", maxHeight: "380px", overflowY: "auto" }}>
					{templates.map((template) => (
						<div
							key={template.id}
							onClick={() => setSelectedTemplate(template)}
							style={{
								margin: "10px",
								padding: "5px",
								border: selectedTemplate?.id === template.id ? "2px solid blue" : "2px solid transparent",
								cursor: "pointer",
								transition: "border-color 0.2s",
							}}
							onMouseEnter={(e) => (e.currentTarget.style.borderColor = "blue")}
							onMouseLeave={(e) => (e.currentTarget.style.borderColor = selectedTemplate?.id === template.id ? "blue" : "transparent")}
						>
							<div
								style={{
									width: templateWidth,
									height: (templateWidth * template.height) / template.width, // Maintain aspect ratio
									position: "relative",
									overflow: "hidden",
									borderRadius: "5px",
									backgroundColor: "#f0f0f0", // Placeholder color
								}}
							>
								<img
									src={`https://movingvectors.s3.amazonaws.com/template-previews/${template.id}`}
									alt={template.id}
									loading="lazy"
									style={{
										width: templateWidth,
										height: (templateWidth * template.height) / template.width, // Maintain aspect ratio
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										borderRadius: "5px",
									}}
								/>
							</div>
						</div>
					))}
				</div>
			)}
			<Button
				isPrimary
				onClick={handleAddInfographic}
				disabled={loading || !selectedTemplate}
				style={{
					marginTop: 10,
					width: "100%",
					justifyContent: "center",
				}}
			>
				{loading ? __("Loading...", "text-domain") : __("Add Selected Template", "text-domain")}
			</Button>
		</Modal>
	);
}

export default MetaBox;
