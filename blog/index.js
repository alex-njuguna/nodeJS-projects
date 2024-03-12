const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const BlogPost = require("./models/BlogPost");
const newPostController = require("./controllers/newPost");
const contactController = require("./controllers/contact");
const aboutController = require("./controllers/about");

const app = express();

// Middleware
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title === null || req.body.body === null) {
    return res.redirect("/posts/new");
  }
  next();
};
app.use("/posts/store", validateMiddleWare);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/blog_database");

// Routes
app.get("/", async (req, res) => {
  const blogPosts = await BlogPost.find({});
  res.render("index", { blogPosts });
});

let searchBlogPosts = undefined;
app.post("/posts/search", async (req, res) => {
  const search = req.body.search;
  searchBlogPosts = await BlogPost.find({ title: new RegExp(search, "i") });
  res.redirect("/posts/search-results");
});

app.get("/posts/search-results", (req, res) => {
  res.render("search", { searchBlogPosts });
});

app.get("/post/:id", async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  res.render("post", { blogPost });
});

app.get("/about", aboutController);

app.get("/contact", contactController);

app.get("/posts/new", newPostController);

app.post("/posts/store", async (req, res) => {
  try {
    const image = req.files.image;
    await image.mv(path.resolve(__dirname, "public/img", image.name));
    await BlogPost.create({ ...req.body, image: "/img/" + image.name });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
