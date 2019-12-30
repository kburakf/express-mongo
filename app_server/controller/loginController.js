const Users = require("../database/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");

module.exports.loginGet = (req, res) => {
  res.render("login");
};
module.exports.authPost = (req, res) => {
  const { username, password } = req.body;

  Users.findOne(
    {
      username
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({
          status: false,
          message: "Yannış kullanıcı adı"
        });
      } else {
        bcrypt.compare(password, user.password).then(result => {
          if (!result) {
            res.json({
              status: false,
              message: "Yannış şifre"
            });
          } else {
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get("api_secret_key"), {
              expiresIn: 720
            });

            res.redirect("/login/kullanicilarListesi");
          }
        });
      }
    }
  );
};

module.exports.usersList = (req, res) => {
  Users.find((err, results) =>
    res.render("kullanicilarListesi", {
      kullanicilar: results
    })
  );
};

module.exports.delUser = (req, res) => {
  Users.findOneAndRemove(
    {
      username: req.params.username
    },
    err => {
      if (err) console.log(err);
      else res.redirect("/login/kullanicilarListesi");
    }
  );
};
