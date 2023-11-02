const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
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
