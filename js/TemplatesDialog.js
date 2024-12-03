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

import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { Button, Modal, Spinner } from "@wordpress/components";

const templateWidth = 180;

export function TemplatesDialog({ setShowTemplatesDialog, templates, templateLoading, handleAddInfographic, loading }) {
	const [selectedTemplate, setSelectedTemplate] = useState(null);

	return (
		<Modal
			title={__("Select a Template", "text-domain")}
			onRequestClose={() => setShowTemplatesDialog(false)}
			className="custom-modal"
			style={{
				overflow: "hidden",
			}}
		>
			{templateLoading ? (
				<div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
					<Spinner />
				</div>
			) : (
				<Gallery
					templates={templates}
					selectedTemplate={selectedTemplate}
					setSelectedTemplate={setSelectedTemplate}
				/>
			)}
			<Button
				isPrimary
				onClick={() => handleAddInfographic(selectedTemplate)}
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

function Gallery({ templates, selectedTemplate, setSelectedTemplate }) {
	const columnCount = Math.max(1, Math.floor(window.innerWidth / 200)); // Adjust column width threshold as needed
	const columns = Array.from({ length: columnCount }, () => []);

	templates.forEach((template, index) => {
		columns[index % columnCount].push(template);
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 10,
				height: 500,
				overflowY: "auto",
				overflowX: "hidden",
			}}
		>
			{columns.map((columnTemplates, colIndex) => (
				<div
					key={colIndex}
					style={{ display: "flex", flexDirection: "column", gap: 10 }}
				>
					{columnTemplates.map((template) => (
						<div
							key={template.id}
							onClick={() => setSelectedTemplate(template)}
							style={{
								padding: 5,
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
									height: (templateWidth * template.height) / template.width,
									position: "relative",
									overflow: "hidden",
									borderRadius: "5px",
									backgroundColor: "#f0f0f0",
								}}
							>
								<img
									src={preview(template)}
									alt={template.id}
									loading="lazy"
									style={{
										width: templateWidth,
										height: (templateWidth * template.height) / template.width,
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
			))}
		</div>
	);
}

function preview(template) {
	const suffix = template.id.endsWith(".jpg") ? template.id : template.id + ".png";
	return `https://movingvectors.s3.amazonaws.com/template-previews/${suffix}`;
}
