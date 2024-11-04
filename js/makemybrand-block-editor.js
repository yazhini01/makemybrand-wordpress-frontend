/*
 * Plugin Name: Infographic Generator by MakeMyBrand.AI
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

(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { BlockControls } = wp.blockEditor;
	const { Button } = wp.components;
	const { useSelect } = wp.data;

	wp.domReady(() => {
		registerBlockType("makemybrand/infographic", {
			title: "Infographic",
			description: "A block for displaying infographics.",
			icon: "format-image",
			category: "common",

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
					},
					"Edit Infographic"
				);

				const content =
					props.attributes.imageUrl &&
					wp.element.createElement("img", {
						src: props.attributes.imageUrl + "?t=" + new Date().getTime(),
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
