const { Schema, model } = require("mongoose")

const recipeSchema = new Schema(
    {
        name: String,
        cuisine: Array,
        ingredients: Array,
        preparationTime: Number, // In minutes
        cookingTime: Number, // In minutes
        picture: String,
        link: String,
        instructions: String,

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

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe
