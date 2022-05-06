const { Schema, model } = require("mongoose")

const deliverySchema = new Schema(
    {
        name: String,
        cuisine: Array,
        area: String,
        city: String,
        app: String,
        link: String,
        picture: String,

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

const Delivery = model("Delivery", deliverySchema)

module.exports = Delivery
