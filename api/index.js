const app = require("express")()

const allRoutes = require("../routes")
app.use("/api", allRoutes)

module.exports = app
