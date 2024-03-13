const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    await User.create({
      username: req.body.username,
      password: hashedPass,
    });
    res.redirect("/");
  } catch (error) {
    const validationErrors = error.errors
      ? Object.keys(error.errors).map((key) => error.errors[key].message)
      : [];
    req.flash("validationErrors", validationErrors);
    res.redirect("/auth/register");
  }
};
