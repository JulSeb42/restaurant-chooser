// Vercel deployment
const app = require("express")()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
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
