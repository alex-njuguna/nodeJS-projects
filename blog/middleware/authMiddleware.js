const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.redirect("/");
    }
    next();
  } catch (error) {
    console.error("Error in user authentication middleware:", error);
    return res.redirect("/");
  }
};
