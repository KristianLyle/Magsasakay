require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());

// For local database connection
const mongoUrl = "mongodb://127.0.0.1:27017/magsasakaydb";

// For cloud database connection
// const mongoUrl =
//   "mongodb+srv://magsasakay:magsasakay@cluster0.y2i34yq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

require("./userDetails");

const userModel = mongoose.model("users");
const restaurantModel = mongoose.model("restaurants");
const reviewModel = mongoose.model("reviews");
// const routesModel = mongoose.model("routes");

// Login route
app.post("/login", async (req, res) => {
  const { email, password, color } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    if (color !== user.color) {
      return res.json({ error: "Invalid Color" });
    }
    const token = jwt.sign(
      { email: user.email, username: user.username, color: user.color },
      process.env.ACCESS_TOKEN_SECRET
    );

    if (res.status(201)) {
      return res.json({ status: "ok", token: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password, color } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "Email already exists" });
    }

    // If email is not found, create a new user
    const newUser = new userModel({
      email,
      username,
      password: encryptedPassword,
      color,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

// Define a new route for fetching restaurant data
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModel.aggregate([
      { $sample: { size: 3 } },
    ]);
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurant data." });
  }
});

// Define a new route for fetching all restaurant data
app.get("/view-more-restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching restaurant data." });
  }
});

// Add a new route for fetching reviews by restaurant name
app.post("/fetch-reviews", async (req, res) => {
  const { restaurantName } = req.body;

  try {
    // Find all reviews for the specific restaurant
    const reviews = await reviewModel.find({ restaurant: restaurantName });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching reviews for the restaurant.",
    });
  }
});

// Add a new route for submitting reviews
app.post("/submit-review", async (req, res) => {
  const { restaurantName, username, userimage, reviewText, color } = req.body;

  try {
    const newReview = new reviewModel({
      restaurant: restaurantName,
      username: username,
      userimage: userimage,
      review: reviewText,
      color: color,
    });
    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the review." });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
