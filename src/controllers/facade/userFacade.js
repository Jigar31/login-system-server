const path = require("path");

const { moveProfilePicture } = require("../../util/fileUtil");
const { UserModel } = require("../../database/schemas/userSchema");

const { v4: uuidv4 } = require("uuid");

async function createUser({
  username,
  password,
  firstname,
  lastname,
  age,
  phone,
  address,
  profilePicture,
}) {
  try {
    let userId = uuidv4();

    let profilePicturePath = path.join(
      path.resolve(__dirname, "../../.."),
      "uploads",
      "temp",
      profilePicture
    );

    let newPath = path.join(
      path.resolve(__dirname, "../../.."),
      "uploads",
      "profilePictures",
      userId,
      "v1"
    );

    console.log(
      "profilePicturePath:",
      profilePicturePath,
      "\nNewPath:",
      newPath
    );

    await moveProfilePicture(profilePicturePath, newPath, profilePicture);

    let user = new UserModel({
      _id: userId,
      username,
      password,
      firstname,
      lastname,
      age,
      phone,
      address,
      profilePicture,
      profilePictureVersion: 1,
    });

    await user.save();

    return userId;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateUser({
  userId,
  username,
  password,
  firstname,
  lastname,
  age,
  phone,
  address,
  profilePicture,
  profilePictureVersion,
}) {
  try {
    console.log("updating user", userId);
    let user = await UserModel.findOne({ _id: userId });

    if (profilePicture !== user.profilePicture) {
      profilePictureVersion = user.profilePictureVersion + 1;

      let profilePicturePath = path.join(
        path.resolve(__dirname, "../../.."),
        "uploads",
        "temp",
        profilePicture
      );

      let newPath = path.join(
        path.resolve(__dirname, "../../.."),
        "uploads",
        "profilePictures",
        userId,
        "v" + profilePictureVersion
      );

      console.log(
        "profilePicturePath:",
        profilePicturePath,
        "\nNewPath:",
        newPath
      );

      await moveProfilePicture(profilePicturePath, newPath, profilePicture);
    }

    user.username = username;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.age = age;
    user.phone = phone;
    user.address = address;
    user.profilePicture = profilePicture;
    user.profilePictureVersion = profilePictureVersion;

    let newUser = await user.save();
    console.log(newUser);
    return newUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  createUser,
  updateUser,
};
