const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")

const mongoDB = "mongodb://localhost/RandomMeal"

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err)
        console.log("MongoDB'ye bağlanamadık kanka..")
    else
        console.log("MongoDB'ye bağlandık olm !")
})
mongoose.Promise = global.Promise