// Node Js Core Module
const fs = require("fs");
const path = require("path");

// Express
const express = require("express"); // express
const uuid = require("uuid"); // unique id
const resData = require("./util/restaurant-data"); // importing restaurant data
const app = express(); // creating express object
// Set view point
app.set("views", "views"); // locating templating folder
app.set("view engine", "ejs"); // setting templating engine

// middleware
app.use(express.static("public")); //static page
app.use(express.urlencoded({ extended: false })); //it parse incoming request

// *** Routes ***

// index route
app.get("/", (req, res) => {
  res.render("index");
});

// Restaurents route
app.get("/restaurants", (req, res) => {
  const restaurants = resData.getStoredRestaurants();
  res.render("restaurants", { restaurants: restaurants });
});
// Dynamic Restaurants
app.get("/restaurants/:id", (req, res) => {
  // fetch :id
  const restaurnatId = req.params.id; //params.id because I use restaurants/:id

  const restaurants = resData.getStoredRestaurants(); //

  for (const restaurant of restaurants) {
    if (restaurant.id === restaurnatId) {
      return res.render("restaurant-details", { restaurant: restaurant });
    }
  }
  res.status(404).render("404");
});
// Recommend
app.get("/recommend", (req, res) => {
  res.render("recommend");
});
// post
app.post("/recommend", (req, res) => {
  // Get data from body
  const formData = req.body;
  // insert uuid in form data
  formData.id = uuid.v4();

  const restaurants = resData.getStoredRestaurants();
  // Push to formData
  storedRestaurants.push(restaurants);
  storeRestaurants(storedRestaurants);
  // Redirect user
  res.redirect("confirm");
});
// Confirm
app.get("/confirm", (req, res) => {
  res.render("confirm");
});
// About
app.get("/about", (req, res) => {
  res.render("about");
});

// For invalid url
app.use(function (req, res) {
  res.status(404).render("404");
});
// for serverside error
app.use(function (err, req, res, next) {
  res.status(500).render("500");
});

// listening
app.listen(3000);
