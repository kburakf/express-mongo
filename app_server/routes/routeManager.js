const home = require("./homeRouter");
const login = require("./loginRouter");
const signup = require("./signupRouter");
const jsonKullanicilari = require("./jsonKullaniciRouter");
const productRouter = require("./productRouter");


module.exports = app => {
  app.use("/", home);
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/jsonKullanicilari", jsonKullanicilari);
  app.use("/products", productRouter);
};