const Users = require("../database/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const findOrCreate = require("mongoose-findorcreate")

module.exports.signupGet = (req, res) => {
    res.render("signup")
}

module.exports.signupPost = (req, res) => {

    const obje = {
        name,
        surname,
        email,
        username,
        password
    } = req.body

    bcrypt.hash(password, 10)

        .then(hash => {
            const user = new Users({
                ...obje,
                password: hash
            })
            const promise = user.save()
            promise
                .then(data => {
                    res.redirect("/login")
                    console.log(data)
                })
                .catch(err => res.json(err))
        })
}