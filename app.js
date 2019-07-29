const fs = require("fs")
const bodyParser = require("body-parser")
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejsLayouts = require("express-ejs-layouts")
const db = require("./app_server/database/DB")
const config = require("./config")
const app = express();

// view engine setup
app.set("api_secret_key",config.api_secret_key)
app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(ejsLayouts)

require("./app_server/routes/routeManager")(app)

app.listen(3000)