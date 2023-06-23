const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
  res.render("auth");
})

router.get("/home",
  (req, res) => {
    res.render("index");
  })

router.get("/register-recipes",
  (req, res) => {
    res.render("recipes");
  })

router.get("/register-ingredients",
  (req, res) => {
    res.render("ingredients");
  })
router.get("/register-recipe-category",
  (req, res) => {
    res.render("recipe_category");
  })

router.get("/logout", (req, res) => {
  res.redirect("/");
})

module.exports = router