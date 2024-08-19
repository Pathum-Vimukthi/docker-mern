const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB: ", err);
  });

//Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json({ message: "User created sucessfully", data: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});

//Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "User data fetched successfully",data: users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});

//Listen for PORT
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
