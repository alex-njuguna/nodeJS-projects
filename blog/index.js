const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");

const app = express();

// Set view engine and public directory
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blog_database");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  console.log(blogPosts);
  res.render("index", { blogPosts });
});
app.get("/about", (req, res) => res.render("about"));
app.get("/post", (req, res) => res.render("post"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/posts/new", (req, res) => res.render("create"));

// Handle form submission
app.post("/posts/store", async (req, res) => {
  await BlogPost.create(req.body);

  res.redirect("/");
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
