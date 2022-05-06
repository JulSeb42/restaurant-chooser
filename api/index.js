const app = require("express")()
const router = require("express").Router()
const { v4 } = require("uuid")

const auth = require("../routes/auth")
router.use("/auth", auth)

const users = require("../routes/users")
router.use("/users", users)

const restaurant = require("../routes/restaurant")
router.use("/restaurant", restaurant)

const delivery = require("../routes/delivery")
router.use("/delivery", delivery)

const recipes = require("../routes/recipes")
router.use("/recipes", recipes)

module.exports = app
