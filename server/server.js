require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

//const mongoUrl = "mongodb://127.0.0.1:27017/magsasakaydb";
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
const restaurantModel = mongoose.model("restaurants");
const reviewModel = mongoose.model("reviews");
// const routesModel = mongoose.model("routes");

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, username: user.username },
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

// Signup route
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

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

app.post("/fetch-restaurant-details", async (req, res) => {
  try {
    const { restaurantName } = req.body;

    const restaurant = await restaurantModel.findOne({
      name: restaurantName,
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    let roundedRating = Math.floor(restaurant.averageRating);
    if (restaurant.averageRating % 1 >= 0.5) {
      roundedRating += 1; // Round up if decimal is 0.5 or above
    }

    // Return relevant restaurant details
    const restaurantDetails = {
      name: restaurant.name,
      image: restaurant.image,
      description: restaurant.description,
      averageRating: roundedRating,
    };

    //add conditions that if the decimal value of the rating is 0-4, it rounds down, if 5 above, rounds up

    res.json(restaurantDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching restaurant details.",
    });
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
  const { restaurantName, username, userimage, reviewText, starRating } =
    req.body;

  try {
    // Create a new review document
    const newReview = new reviewModel({
      restaurant: restaurantName,
      username: username,
      userimage: userimage,
      review: reviewText,
      rating: starRating,
    });
    // Save the review document to the database
    await newReview.save();

    // Calculate the new averageRating for the specific restaurant
    const reviews = await reviewModel.find({ restaurant: restaurantName });
    const totalRatings = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatings / reviews.length;

    // Update the averageRating of the specific restaurant
    await restaurantModel.updateOne(
      { name: restaurantName },
      { averageRating }
    );

    res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the review." });
  }
});

// Add a new route for fetching user-specific reviews
app.post("/fetch-user-reviews", async (req, res) => {
  try {
    // Extract username from the decoded token
    const { userName } = req.body;

    // Find all reviews for the specific user
    const userReviews = await reviewModel.find({ username: userName });
    res.json(userReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching user reviews.",
    });
  }
});

// Add a new route for updating user-specific reviews
app.post("/update-review", async (req, res) => {
  try {
    const { reviewId, reviewText } = req.body;

    // Validate if reviewId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid reviewId" });
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      { review: reviewText },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res
      .status(201)
      .json({ message: "Review updated successfully.", updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the review.",
    });
  }
});

app.post("/delete-review", async (req, res) => {
  try {
    const { reviewId } = req.body;

    // Validate if reviewId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid reviewId" });
    }

    // Find and delete the review
    const deletedReview = await reviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Calculate the new averageRating for the specific restaurant
    const reviews = await reviewModel.find({
      restaurant: deletedReview.restaurant,
    });
    const totalRatings = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const numReviews = reviews.length;
    const averageRating = numReviews ? totalRatings / numReviews : 0; // Check if numReviews is not zero before calculating average

    // Update the averageRating of the specific restaurant
    await restaurantModel.updateOne(
      { name: deletedReview.restaurant },
      { averageRating }
    );

    res.status(201).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while deleting the review.",
    });
  }
});

// Add a new route for fetching user details
app.post("/fetch-user-details", async (req, res) => {
  try {
    const { userName } = req.body;

    const user = await userModel.findOne({ username: userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return relevant user details
    const userDetail = {
      email: user.email,
      username: user.username,
      userimage: user.userimage,
      bio: user.bio,
    };

    res.json(userDetail);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details." });
  }
});

// Add a new route for updating user profile
app.post("/update-user-bio", async (req, res) => {
  try {
    const { email, bio } = req.body;

    const updatedProfile = await userModel.findOneAndUpdate(
      { email },
      { $set: { bio } },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res
      .status(201)
      .json({ message: "Profile updated successfully.", updatedProfile });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile." });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
const multer = require("multer");

// ... (other code remains unchanged)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../magsasakay/public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const fullPath = `${uniqueSuffix}${file.originalname}`;
    cb(null, fullPath);
  },
});

const upload = multer({ storage: storage });

// Modify the /upload-image route
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const imageName = `./uploads/${req.file.filename}`;
    const { email } = req.body;

    // Update the user's profile image in the userModel with the full path
    const updatedProfile = await userModel.findOneAndUpdate(
      { email },
      { $set: { userimage: imageName } }, // Update the userimage field
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
