const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post("/login", (req, res) => {
  const username = "admin";
  const password = "1234";

  if (!username) {
    res.status(401).send("Invalid Username");
  } else if (password !== req.body.password && username != req.body.uname) {
    res.status(401).send("Invalid Password");
  } else {
    let payload = { subject: username + password };
    let token = jwt.sign(payload, "secretKey");
    res.status(200).send({ token });
  }
});
module.exports = router;
