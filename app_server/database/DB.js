const mongoose = require("mongoose")
const express = require("express")
const app = express()
mongoose.Promise = require("bluebird")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const cookieParser = require("cookie-parser")
const mongoDB = "mongodb://localhost/RandomMeal"

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err)
        console.log("MongoDB'ye bağlanamadık kanka...")
    else
        console.log("MongoDB'ye bağlandık olm !")
})
mongoose.Promise = global.Promise