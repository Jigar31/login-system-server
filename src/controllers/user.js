const express = require("express");
const path = require("path");

const { UserModel } = require("../database/schemas/userSchema");
const { updateUser } = require("../controllers/facade/userFacade");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let userId = req.params.id;

    let user = await UserModel.findOne({ _id: userId });

    res.status(200);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message);
  }
});

router.get("/:userId/:version/:filename", (req, res) => {
  try {
    let userId = req.params.userId;
    let version = "v" + req.params.version;
    let filename = req.params.filename;

    console.log(userId, version, filename);

    let filepath = path.join(
      path.resolve(__dirname, "../.."),
      "uploads",
      "profilePictures",
      userId,
      version,
      filename
    );

    res.sendFile(filepath);
  } catch (err) {
    console.error(err);
    res.status(404);
    res.json({ error: "Image not found" });
  }
});

router.patch("/", async (req, res) => {
  try {
    // add user in db
    const user = await updateUser(req.body);
    res.status(204);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});

module.exports = router;
