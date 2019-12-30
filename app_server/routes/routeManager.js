const home = require("./homeRouter");
const login = require("./loginRouter");
const signup = require("./signupRouter");
const randomYemek = require("./randomYemekRouter");
const yemekTarifleri = require("./yemekTarifleriRouter");

module.exports = app => {
  app.use("/", home);
  app.use("/login", login);
  app.use("/randomYemek", randomYemek);
  app.use("/signup", signup);
  app.use("/yemektarifleri", yemekTarifleri);
};
