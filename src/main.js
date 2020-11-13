const express = require("express");
const path = require("path");

const loginRouter = require("./controllers/login");
const signupRouter = require("./controllers/signup");
const userRouter = require("./controllers/user");
const fileUploadRouter = require("./controllers/fileUpload");
require("../src/database/db-config");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(path.resolve(__dirname, ".."), "public")));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(path.resolve(__dirname, ".."), "public", "index.html")
  );
});

app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", fileUploadRouter);

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }

  console.log(`Server started at ${port}`);
});
