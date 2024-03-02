const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    userimage: String,
    bio: String,
  },
  { collection: "users" }
);

mongoose.model("users", userSchema);

const routesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    coordinates: [
      {
        lon: Number,
        lat: Number,
      },
    ],
    establishments: [
      {
        name: String,
        type: String,
        lon: Number,
        lat: Number,
      },
    ],
  },
  { collection: "routes" }
);

mongoose.model("routes", routesSchema);

const restaurantSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    averageRating: Number,
  },
  { collection: "restaurants" }
);

mongoose.model("restaurants", restaurantSchema);

const reviewSchema = new mongoose.Schema(
  {
    restaurant: String,
    username: String,
    userimage: String,
    review: String,
    rating: Number,
  },
  { collection: "reviews" }
);

mongoose.model("reviews", reviewSchema);
