require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const Registration = require("./models/Registration");

// create a database connection
mongoose.connect(process.env.DATABASE);

const server = app.listen(3000, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
