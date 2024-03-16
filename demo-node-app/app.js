const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();

// middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/", routes);

module.exports = app;
