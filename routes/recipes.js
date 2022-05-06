// Packages
const router = require("express").Router()

// Model
const Recipe = require("../models/Recipe.model")

// Get all recipes
router.get("/all-recipes", (req, res, next) => {
    Recipe.find()
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Get recipe by ID
router.get("/recipe/:id", (req, res, next) => {
    Recipe.findById(req.params.id)
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// New recipe
router.post("/new-recipe", (req, res, next) => {
    const {
        name,
        cuisine,
        ingredients,
        preparationTime,
        cookingTime,
        picture,
        link,
        instructions,
        poster,
    } = req.body

    if (!name) {
        return res.status(400).json({ message: "Name can not be empty." })
    }

    if (!cuisine) {
        return res.status(400).json({ message: "Cuisine can not be empty." })
    }

    if (!ingredients) {
        return res.status(400).json({ message: "Ingredients can not be empty." })
    }

    if (!preparationTime) {
        return res.status(400).json({ message: "Preparation time can not be empty." })
    }

    if (!cookingTime) {
        return res.status(400).json({ message: "Coolking time can not be empty." })
    }

    if (!link && !instructions) {
        return res
            .status(400)
            .json({ message: "You have to put at least link or instructions." })
    }

    Recipe.create({
        name,
        cuisine,
        ingredients,
        preparationTime,
        cookingTime,
        picture,
        link,
        instructions,
        poster,
    })
        .then(createdRecipe => res.status(200).json(createdRecipe))
        .catch(err => next(err))
})

// Edit recipe
router.put("/edit-recipe/:id", (req, res, next) => {
    const {
        name,
        cuisine,
        ingredients,
        preparationTime,
        cookingTime,
        picture,
        link,
        instructions,
    } = req.body

    if (!name) {
        return res.status(400).json({ message: "Name can not be empty." })
    }

    if (!cuisine) {
        return res.status(400).json({ message: "Cuisine can not be empty." })
    }

    if (!ingredients) {
        return res
            .status(400)
            .json({ message: "Ingredients can not be empty." })
    }

    if (!preparationTime) {
        return res
            .status(400)
            .json({ message: "Preparation time can not be empty." })
    }

    if (!cookingTime) {
        return res
            .status(400)
            .json({ message: "Coolking time can not be empty." })
    }

    if (!link && !instructions) {
        return res
            .status(400)
            .json({ message: "You have to put at least link or instructions." })
    }

    Recipe.findByIdAndUpdate(
        req.params.id,
        {
            name,
            cuisine,
            ingredients,
            preparationTime,
            cookingTime,
            picture,
            link,
            instructions,
        },
        { new: true }
    )
        .then(updatedRecipe => res.status(200).json(updatedRecipe))
        .catch(err => next(err))
})

// Delete recipe
router.delete("/recipe/:id", (req, res, next) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Recipe deleted." }))
        .catch(err => next(err))
})

module.exports = router
