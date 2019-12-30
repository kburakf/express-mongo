const fs = require("fs");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejsLayouts = require("express-ejs-layouts");
const db = require("./app_server/database/DB");
const config = require("./config");
const app = express();

var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
  uri: "mongodb://localhost/RandomMeal",
  collection: "mySessions"
});

app.use(
  require("express-session")({
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: true
  })
);

// view engine setup
app.set("api_secret_key", config.api_secret_key);
app.set("views", path.join(__dirname, "/app_server/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(ejsLayouts);

require("./app_server/routes/routeManager")(app);

console.log("Port:3000");
app.listen(3000);
