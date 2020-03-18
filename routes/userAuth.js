const express = require("express");
const router = express.Router();

const usersDb = [
  {
    username: "mlaws",
    password: "123"
  },
  {
    username: "maya",
    password: "chimken"
  }
];

/* GET home page. */
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // ☝️ this is the exact same as:
  // const username = req.body.username
  // const password = req.body.password

  const user = usersDb.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    res.cookie("username", user.username);
    res.redirect("/treasure");
  } else {
    res.redirect("/login");
  }
});

router.get("/treasure", (req, res) => {
  const username = req.cookies.username;

  const user = usersDb.find(user => user.username === username);

  if (user) {
    res.render("treasure", { currentUser: username });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
