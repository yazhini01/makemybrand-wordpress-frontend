(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { BlockControls } = wp.blockEditor;
	const { Button } = wp.components;
	const { useSelect } = wp.data;

	wp.domReady(() => {
		registerBlockType("makemybrand/infographic", {
			title: "Infographic", // Add a title for the block
			description: "A block for displaying infographics.", // Optional description
			icon: "format-image", // Optional icon, use WordPress Dashicons or SVG
			category: "common", // Category for the block

			attributes: {
				imageUrl: { type: "string", default: "" },
				designId: { type: "string", default: "" },
			},
			edit: function (props) {
				const block = useSelect((select) => select("core/block-editor").getBlock(props.clientId), [props.clientId]);

				const editThis = function () {
					window.open("https://makemybrand.ai/design/" + block.attributes.designId, "_blank");
				};

				const editButton = wp.element.createElement(
					Button,
					{
						onClick: editThis,
						// className: "components-button",
					},
					"Edit Infographic"
				);

				const content =
					props.attributes.imageUrl &&
					wp.element.createElement("img", {
						src: props.attributes.imageUrl,
						alt: "Infographic",
						style: { maxWidth: "100%" },
					});

				const blockControls = wp.element.createElement(BlockControls, null, editButton);

				return wp.element.createElement(wp.element.Fragment, null, blockControls, content);
			},
			save: function () {
				return null; // This block is rendered server-side, so save is null
			},
		});
	});
})(window.wp);
