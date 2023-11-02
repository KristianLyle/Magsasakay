const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());

const mongoUrl =
  "mongodb+srv://magsasakay:magsasakay@cluster0.y2i34yq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

require("./userDetails");

const userModel = mongoose.model("users");
const routesModel = mongoose.model("routes");

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user with the provided email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });
    // You can add code to generate a session or token for the user here.
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "Email already exists" });
    }

    // If email is not found, create a new user
    const newUser = new userModel({ email, username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
