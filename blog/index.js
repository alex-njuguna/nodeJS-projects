const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
// Set view engine and public directory
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blog_database");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
// home page
app.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.render("index", { blogPosts });
});

//search page
let searchBlogPosts = undefined;
app.post("/posts/search", async (req, res) => {
  const search = req.body.search;
  searchBlogPosts = await BlogPost.find({ title: /search/ });
  console.log(searchBlogPosts);
});
console.log(searchBlogPosts);

app.get("/posts/search-results", (req, res) => {
  res.render("search", { searchBlogPosts });
});

// get single post
app.get("/post/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  res.render("post", { blogPost });
});

app.get("/about", (req, res) => res.render("about"));

app.get("/contact", (req, res) => res.render("contact"));

app.get("/posts/new", (req, res) => res.render("create"));

// Handle form submission
app.post("/posts/store", (req, res) => {
  let image = req.files.image;
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  });
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
