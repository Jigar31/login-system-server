const formidable = require("formidable");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const { saveProfilePicture } = require("../util/fileUtil");
const router = express.Router();

router.post("/profilePicture", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      let oldPath = files.profilePicture.path;
      let fileName = files.profilePicture.name;
      let filesplit = fileName.split(".");
      let fileExtension = filesplit[filesplit.length - 1];
      let newFileName = uuidv4();

      let newPath =
        path.join(path.resolve(__dirname, "../.."), "uploads", "temp") +
        "/" +
        newFileName +
        "." +
        fileExtension;

      await saveProfilePicture(oldPath, newPath);
      return res.json({ filename: newFileName + "." + fileExtension });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Error" });
  }
});

module.exports = router;
