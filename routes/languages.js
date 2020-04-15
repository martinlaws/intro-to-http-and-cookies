const express = require("express");
const router = express.Router();

const availableLanguages = ["english", "french"];

/* GET home page. */
router.get("/", (req, res) => {
  const { language } = req.cookies;
  // remember that the commented line below does the exact same thing as the line above
  // const language = req.cookies.language;

  if (language && availableLanguages.includes(language)) {
    res.render(language);
  } else {
    res.render("choose-language");
  }
});

router.get("/lang/:language", (req, res) => {
  res.cookie("language", req.params.language);
  res.redirect("/");
});

module.exports = router;
