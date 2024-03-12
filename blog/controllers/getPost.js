const BlogPost = require("../models/BlogPost");

module.exports = async (res, req) => {
  const blogPost = await BlogPost.findById(req.params.id);
  res.render("post", { blogPost });
};
