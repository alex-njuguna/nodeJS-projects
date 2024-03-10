const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(4000, () => {
  console.log("app listening on port 4000");
});

mongoose.connect("mongodb://localhost:27017/blog_database", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "pages/index.html"));
  res.render("index");
});

app.get("/about", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "pages/about.html"));
  res.render("about");
});

app.get("/post", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "pages/post.html"));
  res.render("post");
});

app.get("/contact", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "pages/contact.html"));
  res.render("contact");
});
