const express = require("express");

const { createUser } = require("./facade/userFacade");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    // add user in db
    const userId = await createUser(req.body);
    console.log(userId);
    res.status(201);
    res.json({ userId });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

router.get("/", (req, res) => {
  res.status(400).end();
});

module.exports = router;
