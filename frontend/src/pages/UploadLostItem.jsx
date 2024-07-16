import { useState, useEffect } from "react";
import axios from "axios";
import "./UploadLostItem.css";
import image from "../assets/upload_lost_item_bg.jpeg";
import dark from "../assets/upload_lost_item_darkbg.jpg";
/* eslint-disable react/prop-types */
import "./UploadFoundItem.css";
import Switch from "react-switch";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories";

const UploadFoundItem = (props) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [subcategory, setSubcategory] = useState("");
	const [itemName, setItemName] = useState("");
	const [itemImages, setItemImage] = useState([]);
	const [place, setPlace] = useState("");
	const [ownerName, setOwnerName] = useState("");
	const [itemID, setItemID] = useState("");
	const [contact, setContact] = useState("");
	const [otherDetails, setDetails] = useState("");
	const [isIdentifiable, setIsIdentifiable] = useState(false);

	const { currentUser } = useSelector((state) => state.user);
	const theme = localStorage.getItem("theme");

	const navigate = useNavigate();

	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
	const apiKey = import.meta.env.VITE_CLOUDINARY_SECRET;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

	const handleImageChange = (e) => {
		setItemImage(Array.from(e.target.files));
		setLoading(false);
		setError("");
	};

	const handleSwitchChange = (checked) => {
		setIsIdentifiable(checked);
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleSubcategoryChange = (e) => {
		setSubcategory(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		let urls;
		let uploaders;
		try {
			uploaders = itemImages.map((image) => {
				const fileData = new FormData();
				fileData.append("file", image);
				fileData.append("upload_preset", uploadPreset);
				fileData.append("api_key", apiKey);
				fileData.append("timestamp", (Date.now() / 1000) | 0);
				fileData.append("folder", "lost_and_found");

				return axios
					.post(
						`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
						fileData,
						{
							headers: {
								"X-Requested-With": "XMLHttpRequest",
							},
						}
					)
					.then((response) => response.data.secure_url);
			});
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError("Error uploading images. Please try again.");
			return;
		}

		urls = await axios.all(uploaders);

		const formData = {
			description,
			date,
			category,
			subcategory,
			itemName,
			place,
			ownerName,
			itemID,
			name,
			contact,
			otherDetails,
			isIdentifiable,
			itemImages: urls,
		};

		try {
			const res = await axios.post(
				`${BASE_URL}/api/lost-items/add`,
				formData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + currentUser.accessToken,
					},
				}
			);
			console.log(res.data);
			// Reset form fields after successful submission
			setDescription("");
			setDate("");
			setCategory("");
			setSubcategory("");
			setItemName("");
			setItemImage(null);
			setPlace("");
			setOwnerName("");
			setDetails("");
			setItemID("");
			setName("");
			setContact("");
			setIsIdentifiable(false);

			setLoading(false);
			setError("");
		} catch (error) {
			setLoading(false);
			console.log("Error submitting form:", error);
		}
	};

	useEffect(() => {
		if (theme !== "dark") {
			document.body.style.background = `url(${image}) `;
			document.body.style.backgroundSize = "cover";
		} else {
			document.body.style.background = "#17153B";
		}

		return () => {
			document.body.style.background = null;
		};
	}, [theme]);

	return (
		<>
			<h1 className="text-3xl font-bold dark:text-white">
				Lost Item details
			</h1>

			<form
				className="upoload-item-form dark:dark:bg-transparent"
				onSubmit={handleFormSubmit}
			>
				{error && (
					<p className="mt-4 ms-3 text-red-500 text-sm">{error}</p>
				)}
				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="description"
					>
						Description
						<input
							type="text"
							id="description"
							value={description}
							style={{
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							placeholder="Enter description of the item"
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</label>
				</div>

				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="name"
					>
						Name
						<input
							type="name"
							id="name"
							value={name}
							style={{
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter name of item"
							required
						/>
					</label>
				</div>

				<div className="col-4">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="date"
					>
						Date
						<input
							type="date"
							id="date"
							value={date}
							style={{
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</label>
				</div>

				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="place"
					>
						Place you Lost the Item
						<input
							type="text"
							id="place"
							placeholder="Enter the place you found the item"
							style={{
								marginTop: "22px",
								paddingBottom: "15px",
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							value={place}
							onChange={(e) => setPlace(e.target.value)}
							required
						/>
					</label>
				</div>

				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="category"
					>
						Category
						<select
							className="pb-1 pt-2"
							id="category"
							name="category"
							value={category}
							style={{
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							onChange={handleCategoryChange}
							required
						>
							<option value="">Select category</option>
							<option value="cards">Cards</option>
							<option value="electronic_devices">
								Electronic Devices
							</option>
							<option value="books">Books</option>
							<option value="others">Others</option>
						</select>
					</label>
				</div>

				{category && (
					<div className="col-3">
						<label
							style={{
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							htmlFor="subcategory"
						>
							Subcategory
							<select
								id="subcategory"
								name="subcategory"
								value={subcategory}
								className="pb-1 pt-2"
								style={{
									backgroundColor: `${
										theme === "dark" ? "rgb(74 72 72)" : ""
									}`,
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								onChange={handleSubcategoryChange}
								required
							>
								<option value="">Select subcategory</option>
								{categories[category]?.subcategories.map(
									(cat) => (
										<option key={cat.url} value={cat.url}>
											{cat.name}
										</option>
									)
								)}

								{/* <option value="College ID Card">
										College ID Card
									</option>
									<option value="ATM Card">ATM Card</option>
									<option value="Driver's License">
										Driver&apos;s License
									</option>
									<option value="Aadhar Card">
										Aadhar Card
									</option>
									<option value="Any other item">
										Any other card
									</option> */}
							</select>
						</label>
					</div>
				)}

				{/* {subcategory === "Any other item" && (
					<div className="col-3">
						<label
							style={{
								color: `${
									theme === "dark" ? "#f5f5f5" : ""
								}`,
							}}
							htmlFor="itemName"
						>
							Name of Item
							<input
								type="text"
								id="itemName"
								style={{
									marginTop: "22px",
									paddingBottom: "15px",
									backgroundColor: `${
										theme === "dark"
											? "rgb(74 72 72)"
											: ""
									}`,
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								value={itemName}
								onChange={(e) => setItemName(e.target.value)}
								required
							/>
						</label>
					</div>
				)} */}

				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="itemImages"
						type="file"
					>
						Image
						<div>
							<input
								className="select pt-1"
								type="file"
								accept="image/*"
								id="itemImages"
								multiple
								style={{
									backgroundColor: `${
										theme === "dark" ? "rgb(74 72 72)" : ""
									}`,
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								onChange={handleImageChange}
								required
							/>
						</div>
					</label>
				</div>
				<div className="col-3">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
						htmlFor="name"
					>
						Your Contact
						<input
							type="contact"
							id="contact"
							value={contact}
							style={{
								backgroundColor: `${
									theme === "dark" ? "rgb(74 72 72)" : ""
								}`,
								color: `${theme === "dark" ? "#f5f5f5" : ""}`,
							}}
							onChange={(e) => setContact(e.target.value)}
							placeholder="Enter your contact number"
							required
						/>
					</label>
				</div>

				<div className="col-4">
					<label
						style={{
							color: `${theme === "dark" ? "#f5f5f5" : ""}`,
						}}
					>
						Is item Identifiable?
						<center
							style={{
								position: "relative",
								marginBottom: "8px",
								paddingTop: "10px",
							}}
						>
							<Switch
								onChange={handleSwitchChange}
								checked={isIdentifiable}
								className="react-switch"
								id="itemIdentifiableSwitch"
							/>
						</center>
					</label>
				</div>

				{isIdentifiable && (
					<>
						<div className="col-3">
							<label
								style={{
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								htmlFor="ownername"
							>
								Name on item
								<input
									type="text"
									id="ownerName"
									value={ownerName}
									placeholder="Enter name on the item"
									style={{
										marginTop: "22px",
										paddingBottom: "15px",
										backgroundColor: `${
											theme === "dark"
												? "rgb(74 72 72)"
												: ""
										}`,
										color: `${
											theme === "dark" ? "#f5f5f5" : ""
										}`,
									}}
									onChange={(e) =>
										setOwnerName(e.target.value)
									}
								/>
							</label>
						</div>
						<div className="col-3">
							<label
								style={{
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								htmlFor="ownername"
							>
								Item ID
								<input
									type="text"
									id="itemID"
									value={itemID}
									placeholder="Enter any ID on item"
									style={{
										marginTop: "22px",
										paddingBottom: "15px",
										backgroundColor: `${
											theme === "dark"
												? "rgb(74 72 72)"
												: ""
										}`,
										color: `${
											theme === "dark" ? "#f5f5f5" : ""
										}`,
									}}
									onChange={(e) => setItemID(e.target.value)}
								/>
							</label>
						</div>

						<div className="col-3">
							<label
								style={{
									color: `${
										theme === "dark" ? "#f5f5f5" : ""
									}`,
								}}
								htmlFor="anydetails"
							>
								Any other details
								<input
									type="text"
									id="anydetails"
									placeholder="Enter any other details"
									style={{
										marginTop: "22px",
										paddingBottom: "15px",
										backgroundColor: `${
											theme === "dark"
												? "rgb(74 72 72)"
												: ""
										}`,
										color: `${
											theme === "dark" ? "#f5f5f5" : ""
										}`,
									}}
									value={otherDetails}
									onChange={(e) => setDetails(e.target.value)}
								/>
							</label>
						</div>
					</>
				)}

				<div className="col-submit">
					<button
						type="submit"
						className="submitbtn upload-lost-button"
						disabled={loading}
					>
						{loading ? "Submiting..." : "Submit"}
					</button>
				</div>
			</form>
		</>
	);
};

export default UploadFoundItem;
