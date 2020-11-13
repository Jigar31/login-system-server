const express = require("express");
const router = express.Router();

const { UserModel } = require("../database/schemas/userSchema");

router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await UserModel.findOne({ username });

    console.log("user:", user);
    if (user && user.password === password) {
      res.status(200);
      res.json({ userId: user._id });
    } else {
      res.status(401).end();
    }
  } catch (err) {
    console.log(err);
    res.status(401).end();
  }
});

module.exports = router;
