const express = require("express") 
const app = express(); 
const mongoose = require("mongoose") // Mongoose for MongoDB interactions
const dotenv = require("dotenv") // Dotenv to load environment variables from a .env file

// Import routes
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/products")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")

// Cross-Origin Resource Sharing (CORS) package
const cors = require("cors")

// The Path module provides a way of working with directories and file paths.
const path = require('path')

// loading environment variables
dotenv.config();

// Connect to MongoDB database using connection URL from environment variables
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err)
  });

// Middleware for handling CORS issues
app.use(cors())

// Middleware to parse incoming JSON requests
app.use(express.json())

// Setting up routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

// Catch All
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'dist', "index.html"));
});

// Start server on port 5000
app.listen(process.env.port || 5000, () => {
  console.log("MCM server is running!") // Log message to indicate successful start
})
