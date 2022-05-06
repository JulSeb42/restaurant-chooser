// Packages
require("dotenv/config")
const mongoose = require("mongoose")

// Model
const Delivery = require("../models/Delivery.model")

// Data
const allDeliveries = require("./seeds/deliveries.json")

mongoose.connect(process.env.MONGODB_URI)

let deliveries = []

for (let i = 0; i < allDeliveries.length; i++) {
    deliveries.push({
        name: allDeliveries[i].name,
        cuisine: allDeliveries[i].cuisine,
        area: allDeliveries[i].area,
        city: allDeliveries[i].city,
        app: allDeliveries[i].app,
        link: allDeliveries[i].link,
        picture: allDeliveries[i].picture,
        poster: "6267c3bc8f2106c5e9f8b7c8",
    })
}

Delivery.insertMany(deliveries)
    .then(deliveries => {
        console.log(
            `Success, you added ${deliveries.length} delivery place${
                deliveries.length > 1 ? "s" : ""
            } to the db`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
