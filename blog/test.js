const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost:27017/blog_database", {
  useNewUrlParser: true,
});

// create
// BlogPost.create({
//   title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
//   body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:",
// })
//   .then((blogpost) => {
//     console.log("blog post created: ", blogpost);
//   })
//   .catch((error) => {
//     console.log("error: ", error);
//   });

// find - find all(BlogPost.find({}))
// BlogPost.find({
//   title: /Saving Money/,
// })
//   .then((blogpost) => {
//     console.log(blogpost);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// find by id
const id = "65ed96fa84dff5d3ec35da4d";
// BlogPost.findById(id)
//   .then((blogpost) => {
//     console.log(blogpost);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// find by id and update
// BlogPost.findByIdAndUpdate(id, {
//   title: "Updated title",
// })
//   .then((blogpost) => {
//     console.log(blogpost);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// find by id and delete
BlogPost.findByIdAndDelete(id)
  .then((blogpost) => {
    console.log(blogpost);
  })
  .catch((error) => {
    console.log(error);
  });
