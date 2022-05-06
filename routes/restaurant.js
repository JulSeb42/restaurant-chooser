// Packages
const router = require("express").Router()

// Model
const Restaurant = require("../models/Restaurant.model")

// Get all restaurants
router.get("/all-restaurants", (req, res, next) => {
    Restaurant.find()
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Get restaurant by ID
router.get("/restaurant/:id", (req, res, next) => {
    Restaurant.findById(req.params.id)
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// New restaurant
router.post("/new-restaurant", (req, res, next) => {
    const {
        name,
        cuisine,
        address,
        area,
        city,
        picture,
        website,
        menu,
        poster,
    } = req.body

    if (!name || !cuisine || !city) {
        return res
            .status(400)
            .json({ message: "Please enter the name, cuisine and city." })
    }

    Restaurant.create({
        name,
        cuisine,
        address,
        area,
        city,
        picture,
        website,
        menu,
        poster,
    })
        .then(createdRestaurant => res.status(200).json(createdRestaurant))
        .catch(err => next(err))
})

// Edit restaurant
router.put("/edit-restaurant/:id", (req, res, next) => {
    const { name, cuisine, address, city, picture, website, menu } =
        req.body

    if (!name || !cuisine || !city) {
        return res
            .status(400)
            .json({ message: "Please enter the name, cuisine and city." })
    }

    Restaurant.findByIdAndUpdate(
        req.params.id,
        {
            name,
            cuisine,
            address,
            city,
            picture,
            website,
            menu,
        },
        { new: true }
    )
        .then(updatedRestaurant => res.status(200).json(updatedRestaurant))
        .catch(err => next(err))
})

// Delete restaurant
router.delete("/delete-restaurant/:id", (req, res, next) => {
    Restaurant.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Restaurant deleted" }))
        .catch(err => next(err))
})

module.exports = router
