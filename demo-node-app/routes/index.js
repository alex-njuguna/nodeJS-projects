const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Registration = require("../models/Registration");

router.get("/", (req, res) => {
  res.render("form", { title: "Registration form" });
});

router.post(
  "/",
  [
    body("name").isLength({ min: 1 }).withMessage("Please enter a name"),
    body("email").isLength({ min: 1 }).withMessage("Please enter an email"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body);
    if (errors.isEmpty()) {
      try {
        await Registration.create(req.body);
        res.send("Thank you for your registration");
      } catch (error) {
        res.send("Sorry! something went wrong.");
      }
    } else {
      res.render("form", {
        title: "Registration form",
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

router.get('/registrations', async (req, res) => {
  const registrations = await Registration.find({})
  res.render('index', {registrations, title: 'Listings registrations'})
})

module.exports = router;
