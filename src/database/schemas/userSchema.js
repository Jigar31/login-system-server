const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  age: Number,
  phone: Number,
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
  },
  profilePicture: String,
  profilePictureVersion: Number,
});

let UserModel = mongoose.model("UserModel", UserSchema);

module.exports = {
  UserModel,
};
