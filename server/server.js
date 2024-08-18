const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//import user model
const User = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

//API route to save user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User saved successfully", data: savedUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" + err });
  }
});

//API route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({message: "Users fetched successfully", data: users});
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//listen to port
app.listen(5000, () => {
  console.log("Server is running on port 3000");
});
