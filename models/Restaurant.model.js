const { Schema, model } = require("mongoose")

const restaurantSchema = new Schema(
    {
        name: String,
        cuisine: Array,
        address: String,
        area: String,
        city: String,
        picture: String,
        website: String,
        menu: String,
        
        poster: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const Restaurant = model("Restaurant", restaurantSchema)

module.exports = Restaurant
