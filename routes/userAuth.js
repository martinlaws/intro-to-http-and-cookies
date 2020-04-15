const express = require("express");
const router = express.Router();

const usersDb = [
  { username: "mlaws", password: "123" },
  { username: "maya", password: "chimken" },
];

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // ☝️ this is the exact same as:
  // const username = req.body.username
  // const password = req.body.password

  // this is the more verbose option of the "one-liner" below
  // const user = usersDb.find((user) => {
  //   return user.username === username && user.password === password;
  // });

  const user = usersDb.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.cookie("isAuthenticated", "true");
    res.cookie("currentUser", user.username);
    res.redirect("/treasure");
  } else {
    res.redirect("/login");
  }
});

router.get("/treasure", (req, res) => {
  if (req.cookies.isAuthenticated) {
    res.render("treasure", { currentUser: req.cookies.currentUser });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
