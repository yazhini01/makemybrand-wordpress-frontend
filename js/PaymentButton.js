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

import { useEffect, useState } from "react";
import { Button, Modal } from "@wordpress/components";

const PaymentButton = ({ userInfo }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [paymentOptions, setPaymentOptions] = useState([]);

	useEffect(() => {
		fetch("https://api.makemybrand.ai/payment-options")
			.then((response) => response.json())
			.then((data) => setPaymentOptions(data))
			.catch((error) => console.error("Error fetching payment options:", error));
	}, []);

	const handleOpen = (event) => {
		event.preventDefault();
		setIsOpen(true);
	};

	const handleClose = () => setIsOpen(false);

	if (!userInfo) return null;

	return (
		<>
			<div>
				You have {userInfo.purchased_designs_blog || 0} infographic credits remaining.{" "}
				<a
					href="#"
					onClick={handleOpen}
				>
					Click here to add more.
				</a>
			</div>
			{isOpen && (
				<Modal
					onRequestClose={handleClose}
					title="Purchase Infographic Credits"
				>
					<div style={{ padding: "20px" }}>
						{paymentOptions.length === 0 ? (
							<p>Loading payment options...</p>
						) : (
							paymentOptions.map((option) => (
								<div
									key={option.id}
									style={{
										marginBottom: "20px",
										border: "solid 2px #dfdddd",
										borderRadius: 10,
										padding: 20,
										cursor: "pointer",
									}}
									onClick={() => window.open(option.link + "?checkout[email]=" + userInfo.email, "_blank")}
								>
									<div
										style={{
											fontSize: "1.1rem",
											marginBottom: "1rem",
										}}
									>
										{option.name}
									</div>
									<div
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<div>${option.price}</div>
										{option.discount && (
											<div
												style={{
													background: "#b2f1b2",
													borderRadius: 5,
													padding: 2,
													fontSize: "0.7rem",
													color: "green",
												}}
											>
												{option.discount}
											</div>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</Modal>
			)}
		</>
	);
};

export default PaymentButton;
