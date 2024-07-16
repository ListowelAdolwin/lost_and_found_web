const User = require('../models/User.js')
const LostItem = require('../models/LostItem.js')


const addLostItem = async (req, res) => {
  const {
    description,
    date,
    name,
    contact,
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

  const newItem = new LostItem({
    itemID,
    description,
    date_lost: date,
    name,
    contact,
    category,
    subcategory,
    itemName,
    location_lost:place,
    ownerName,
    otherDetails,
    isIdentifiable,
    itemImages,
    poster,
  });

  try {
    await newItem.save();
    res.status(201).json({ message: 'Lost item added successfully', item: newItem });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to add found item' });
  }
};

const getLostItem = async (req, res) => {
  const {id} = req.params

  try {
    const item = await FoundItem.findById(id)
    if (!item){
      return res.status(404).json({message: "Item not found"})
    }
    return res.status(201).json(item)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error while fetching item"})
  }
}

const getLostItems = async (req, res) => {
  try {
     const items = await LostItem.find()
     res.status(200).json(items)
  } catch (error) {
    console.log(error)
    res.json({message: 'Failed to fetch lost items'})
  }
}

const getCategoryItems = async(req, res) => {
  const {category} = req.params
  
  try {
    const items = await FoundItem.find({subcategory: category})
    return res.status(200).json(items)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Error while retrieving category items"})
  }
}

const getUserProfileLostItems = async (req, res) => {
  try {
    const poster = await User.findById(req.params.id)
    const lostItems = await LostItem.find({ poster });
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


module.exports = { addLostItem, getLostItem, getLostItems, getCategoryItems, getUserProfileLostItems };