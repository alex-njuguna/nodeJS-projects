const express = require("express");
const path = require("path");
const routes = require("./routes/index");

const app = express();

// middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/", routes);

module.exports = app;
