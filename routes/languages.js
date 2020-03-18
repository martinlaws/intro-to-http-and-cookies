const express = require("express");
const router = express.Router();

const availableLanguages = ["english", "french"];

/* GET home page. */
router.get("/", (req, res) => {
  if (
    req.cookies.language &&
    availableLanguages.includes(req.cookies.language)
  ) {
    res.render(req.cookies.language);
  } else {
    res.render("index");
  }
});

router.get("/lang/:languageSelection", (req, res) => {
  const languageSelection = req.params.languageSelection;
  // just a pro tip: the line below is a modern way of doing the exact same thing as the line above
  // const { languageSelection } = req.params;

  // set a cookie
  res.cookie("language", languageSelection);
  // redirect home
  res.redirect("/");
});

module.exports = router;
