// Packages
require("dotenv/config")
const mongoose = require("mongoose")

// Model
const Restaurant = require("../models/Restaurant.model")

// Data
const allRestaurants = require("./seeds/restaurants.json")

mongoose.connect(process.env.MONGODB_URI)

let restaurants = []

for (let i = 0; i < allRestaurants.length; i++) {
    restaurants.push({
        name: allRestaurants[i].name,
        cuisine: allRestaurants[i].cuisine,
        address: allRestaurants[i].address,
        area: allRestaurants[i].area,
        city: allRestaurants[i].city,
        picture: allRestaurants[i].picture,
        website: allRestaurants[i].website,
        menu: allRestaurants[i].menu,
        poster: "6267c3bc8f2106c5e9f8b7c8",
    })
}

Restaurant.insertMany(restaurants)
    .then(restaurants => {
        console.log(
            `Success, you added ${restaurants.length} restaurant${
                restaurants.length > 1 ? "s" : ""
            } to the db`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
