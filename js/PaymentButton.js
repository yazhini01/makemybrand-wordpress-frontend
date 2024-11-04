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
									onClick={() => window.open(option.link, "_blank")}
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
