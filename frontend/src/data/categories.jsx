import books from "../assets/upload_items/books.jpg";
import devices from "../assets/upload_items/devices.jpg";
import cards from "../assets/upload_items/cards.jpg";
import others from "../assets/upload_items/others.jpg";

const categories = {
	cards: {
		name: "Cards",
		url: "cards",
		image: cards,
		subcategories: [
			{ name: "Student ID Card", url: "student_id" },
			{ name: "ATM Card", url: "atm_card" },
			{ name: "Driver's License", url: "drivers_license" },
			{ name: "E Zwich Card", url: "e_zwich" },
			{ name: "Any Other Card", url: "other_cards" },
		],
	},
	books: {
		name: "Books",
		url: "books",
		image: books,
		subcategories: [
			{ name: "Notebook", url: "notebook" },
			{ name: "Book", url: "book" },
			{ name: "Novel", url: "novel" },
			{ name: "Any Other Book", url: "other_books" },
		],
	},
	electronic_devices: {
		name: "Electronic Devices",
		url: "electronic_devices",
		image: devices,
		subcategories: [
			{ name: "Mobile Phone", url: "mobile_phone" },
			{ name: "Laptop", url: "laptop" },
			{ name: "Smart Watch", url: "smart_watch" },
			{ name: "Charger", url: "charger" },
			{ name: "Any Other Device", url: "other_devices" },
		],
	},
	others: {
		name: "Others",
		url: "others",
		image: others,
		subcategories: [
			{ name: "Bottle", url: "bottle" },
			{ name: "Wallet", url: "wallet" },
			{ name: "Bag", url: "bag" },
			{ name: "Any other Item", url: "other_items" },
		],
	},
};

export default categories;
