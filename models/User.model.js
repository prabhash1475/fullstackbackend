const mongoose = require("mongoose");

const userShema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
});

const UserModle = mongoose.model("user", userShema);
module.exports = {
  UserModle,
};
