// Packages
require("dotenv/config")
const mongoose = require("mongoose")

// Model
const Recipe = require("../models/Recipe.model")

// Data
const allRecipes = require("./seeds/recipes.json")

mongoose.connect(process.env.MONGODB_URI)

let recipes = []

for (let i = 0; i < allRecipes.length; i++) {
    recipes.push({
        name: allRecipes[i].name,
        cuisine: allRecipes[i].cuisine,
        ingredients: allRecipes[i].ingredients,
        preparationTime: allRecipes[i].preparationTime,
        cookingTime: allRecipes[i].cookingTime,
        picture: allRecipes[i].picture,
        link: allRecipes[i].link,
        instructions: allRecipes[i].instructions,
        poster: "6267c3bc8f2106c5e9f8b7c8",
    })
}

Recipe.insertMany(recipes)
    .then(recipes => {
        console.log(
            `Success, you added ${recipes.length} recipe${
                recipes.length > 1 ? "s" : ""
            } to the db`
        )
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
