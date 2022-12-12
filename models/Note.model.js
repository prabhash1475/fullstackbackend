const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  note: String,
  category: [],
  auther: String,
  userID: String,
});

const NoteModle = mongoose.model("note", noteSchema);

module.exports = {
  NoteModle,
};
