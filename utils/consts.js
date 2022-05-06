const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://localhost/random-restaurant"

module.exports = MONGO_URI
