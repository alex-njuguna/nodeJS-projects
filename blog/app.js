// set up to allow foe access to .env in the app
require("dotenv").config();

// set up an express server, layout and port
const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static("public"));

// templating engine
app.use(expressLayout);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");

// set up the route for the home page
app.use("/", require("./server/routes/main.js"));

// set the app to listen to the specified port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
