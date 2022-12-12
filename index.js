const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const { UserModle } = require("./models/User.model");
const { notesRouter } = require("./routes/notes.route");
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authentication");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("welcome");
});

// * signup
app.post("/signup", async (req, res) => {
  // const payload = req.body;
  console.log(req.body);
  const { email, password, name, age } = req.body;

  // *for checking duplicate user
  const userPrsent = await UserModle.findOne({ email });
  if (userPrsent?.email) {
    res.send({ masg: "Try login, User already exist" });
  } else {
    try {
      //* for hashing the password
      bcrypt.hash(password, 5, async function (err, hash) {
        // Store hash in your password DB.
        const user = new UserModle({ email, password: hash, name, age });
        await user.save();
        res.send("signup in successfull");
      });
    } catch (er) {
      console.log("err somthing went wrong");
      console.log(er);
      res.send("Plese try againg leter");
    }
  }
});

// *login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await UserModle.find({ email });
    // console.log(user);
    if (user.length >= 1) {
      const hash_password = user[0].password;
      const id = user[0]._id;
      bcrypt.compare(password, hash_password, function (err, result) {
        // result == true
        if (result) {
          // for ceating token
          const token = jwt.sign({ userID: id }, "masai");
          res.send({ msg: "login succes", token: token });
          console.log(token);
        } else {
          res.send({ msg: "login fail" });
        }
      });
    }
  } catch (err) {
    console.log("Invalid entries");
    console.log(err);
  }
});

app.get("/about", (req, res) => {
  res.send("About");
});

//*authenticate middleware below all route need to authinticate
app.use(authenticate);

app.use("/notes", notesRouter);

// for listning

app.listen(process.env.port, async () => {
  console.log(`listning on port ${process.env.port}`);
  try {
    await connection;
    console.log("Connected to DB successfuly");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
});
