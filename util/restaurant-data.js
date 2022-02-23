// Node Js Core Module
const fs = require("fs");
const path = require("path");

function getStoredRestaurants() {
  // Locating restaurant data
  const filePath = path.join(__dirname, "..", "data", "restaurants-data.json");
  // Reading file data
  const fileData = fs.readFileSync(filePath);
  // parse in JSON format
  const storedRestaurants = JSON.parse(fileData);
  return storedRestaurants;
}

function storeRestaurants(storableRestaurants) {
  // convert to string
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants,
};
