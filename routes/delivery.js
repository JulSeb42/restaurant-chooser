// Packages
const router = require("express").Router()

// Model
const Delivery = require("../models/Delivery.model")

// All deliveries
router.get("/all-deliveries", (req, res, next) => {
    Delivery.find()
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Find delivery by ID
router.get("/delivery/:id", (req, res, next) => {
    Delivery.findById(req.params.id)
        .populate("poster")
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// New delivery
router.post("/new-delivery", (req, res, next) => {
    const { name, cuisine, area, city, app, link, picture, poster } = req.body

    if (!name) {
        return res.status(400).json({ message: "Name can not be empty." })
    }

    if (!cuisine) {
        return res.status(400).json({ message: "Cuisine can not be empty." })
    }

    if (!area) {
        return res.status(400).json({ message: "Area can not be empty." })
    }

    if (!city) {
        return res.status(400).json({ message: "City can not be empty." })
    }

    if (!app) {
        return res.status(400).json({ message: "App can not be empty." })
    }

    if (!link) {
        return res.status(400).json({ message: "Link can not be empty." })
    }

    Delivery.create({ name, cuisine, area, city, app, link, picture, poster })
        .then(createdDelivery => res.status(200).json(createdDelivery))
        .catch(err => next(err))
})

// Edit delivery
router.put("/edit-delivery/:id", (req, res, next) => {
    const { name, cuisine, area, app, city, link, picture } = req.body

    if (!name) {
        return res.status(400).json({ message: "Name can not be empty." })
    }

    if (!cuisine) {
        return res.status(400).json({ message: "Cuisine can not be empty." })
    }

    if (!area) {
        return res.status(400).json({ message: "Area can not be empty." })
    }

    if (!city) {
        return res.status(400).json({ message: "City can not be empty." })
    }

    if (!app) {
        return res.status(400).json({ message: "App can not be empty." })
    }

    if (!link) {
        return res.status(400).json({ message: "Link can not be empty." })
    }

    Delivery.findByIdAndUpdate(
        req.params.id,
        { name, cuisine, area, app, city, link, picture },
        { new: true }
    )
        .then(createdDelivery => res.status(200).json(createdDelivery))
        .catch(err => next(err))
})

// Delete delivery
router.delete("/delete-delivery/:id", (req, res, next) => {
    Delivery.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Delivery deleted." }))
        .catch(err => next(err))
})

module.exports = router
