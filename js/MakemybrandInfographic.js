import { useState } from "react";
import { __ } from "@wordpress/i18n"; // For translation support
import { Button } from "@wordpress/components"; // WordPress components for buttons
import apiFetch from "@wordpress/api-fetch"; // For fetching data from the WordPress API

const MakemybrandInfographic = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const post_id = makemybrand.post_id; // Make sure this is set correctly

	const handleAddInfographic = () => {
		setLoading(true);
		setMessage("");

		const formData = new URLSearchParams();
		formData.append("action", "makemybrand_add_infographic");
		formData.append("post_id", post_id);

		apiFetch({
			url: makemybrand.ajax_url,
			method: "POST",
			body: formData, // Use 'body' instead of 'data'
		})
			.then((response) => {
				setLoading(false);
				if (response.success) {
					setMessage(__("Infographic added!", "text-domain"));
					const updatedBlock = response.data.updated_block;
					if (updatedBlock) {
						wp.data.dispatch("core/editor").editPost({ content: updatedBlock });

						// Force a refresh of the post data
						// var postId = response.data.post_id; // Make sure to include post ID in your PHP response
						// wp.data.dispatch("core/editor").reloadPost(postId);
					}
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
		<div>
			<Button
				isPrimary
				onClick={handleAddInfographic}
				disabled={loading}
			>
				{loading ? __("Loading...", "text-domain") : __("Add Infographic", "text-domain")}
			</Button>
			{message && <p>{message}</p>}
		</div>
	);
};

export default MakemybrandInfographic;
