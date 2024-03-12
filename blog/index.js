const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const BlogPost = require("./models/BlogPost");
const validateMiddleWare = require("./middleware/validationMiddleware");
const homeController = require("./controllers/home");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const newPostController = require("./controllers/newPost");
const contactController = require("./controllers/contact");
const aboutController = require("./controllers/about");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");

const app = express();

// Middleware
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts/store", validateMiddleWare);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/blog_database");

// Routes
app.get("/", homeController);

let searchBlogPosts = undefined;
app.post("/posts/search", async (req, res) => {
  const search = req.body.search;
  searchBlogPosts = await BlogPost.find({ title: new RegExp(search, "i") });
  res.redirect("/posts/search-results");
});

app.get("/posts/search-results", (req, res) => {
  res.render("search", { searchBlogPosts });
});

app.get("/post/:id", getPostController);

app.get("/about", aboutController);

app.get("/contact", contactController);

app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController);

// users
app.get("/auth/register", newUserController);
app.post("/users/register", storeUserController);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
