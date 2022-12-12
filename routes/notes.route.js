const express = require("express");
const { NoteModle } = require("../models/Note.model");
const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  try {
    const note = await NoteModle.find();
    res.send(note);
  } catch (err) {
    console.log(err);
    res.send({ Alert: "Somthing went wrong" });
  }
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  //   console.log(payload);

  //   console.log(userID);
  try {
    const new_note = new NoteModle(payload);
    await new_note.save();
    res.send({ msg: "Note Created Succesfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Somthing went wrong" });
  }
});

notesRouter.patch("/update/:noteID", async (req, res) => {
  const payload = req.body;
  const noteID = req.params.noteID;
  const userID = req.body.userID;
  const note = await NoteModle.find({ _id: noteID });
  if (userID !== note.userID) {
    res.send({ Alert: "Not Autharise" });
  } else {
    try {
      await NoteModle.findByIdAndUpdate({ _id: noteID }, payload);

      res.send({ msg: "Not updated succefully" });
    } catch (err) {
      console.log(err);
      res.send({ Alert: "Somthing went wrong" });
    }
  }
  //   try {
  //     await NoteModle.findByIdAndUpdate({ _id: noteID }, payload);

  //     res.send({ msg: "Not updated succefully" });
  //   } catch (err) {
  //     console.log(err);
  //     res.send({ Alert: "Somthing went wrong" });
  //   }
});

notesRouter.delete("/delete/:noteID", async (req, res) => {
  try {
    const noteID = req.params.noteID;

    const userID = req.body.userID;
    const note = await NoteModle.find({ _id: noteID });
    if (userID !== note.userID) {
      res.send({ Alert: "Not Autharise" });
    } else {
      await NoteModle.findByIdAndDelete({ _id: noteID });

      res.send({ msg: "Note Deleted succesfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ Alert: "Somthing went wrong" });
  }
});

module.exports = {
  notesRouter,
};
