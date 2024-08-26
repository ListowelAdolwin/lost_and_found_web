const User = require("../models/User.js");
const FoundItem = require("../models/FoundItem.js");
const LostItem = require("../models/LostItem.js");

const addFoundItem = async (req, res) => {
  const {
    description,
    date,
    name,
    itemID,
    category,
    subcategory,
    itemName,
    place,
    ownerName,
    otherDetails,
    itemImages,
    isIdentifiable,
  } = req.body;

  const poster = req.user;

  try {
    const newItem = new FoundItem({
      itemID,
      description,
      date_found: date,
      name,
      category,
      subcategory,
      itemName,
      location_found: place,
      ownerName,
      otherDetails,
      isIdentifiable,
      itemImages,
      poster,
    });

    await newItem.save();

    const itemMatched = await LostItem.findOne({ itemID });

    res.status(201).json({ message: "Found item added successfully", item: newItem, matched: itemMatched });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add found item" });
  }
};

const getFoundItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await FoundItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(201).json(item);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while fetching item" });
  }
};

const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to fetch found items" });
  }
};

const getCategoryItems = async (req, res) => {
  const { category } = req.params;

  try {
    const items = await FoundItem.find({ subcategory: category });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while retrieving category items" });
  }
};

const getUserProfileFoundItems = async (req, res) => {
  try {
    const poster = await User.findById(req.params.id);
    const lostItems = await FoundItem.find({ poster });
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { addFoundItem, getFoundItems, getFoundItem, getCategoryItems, getUserProfileFoundItems };
