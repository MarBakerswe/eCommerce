const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js") // CryptoJS for password encryption
const jwt = require("jsonwebtoken") // JWT for creating access tokens

// Register route
router.post("/register", async (req, res) => {
  // Create new User instance
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // Encrypt password using AES before storing it to the database took forever!
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC // Use a secret key defined in environment variables
    ).toString(), // Convert to a string
  })

  try {
    // Save new user to the database
    const savedUser = await newUser.save()
    res.status(201).json(savedUser) // Respond with the saved user
  } catch (err) {
    res.status(500).json(err) // Respond with error if registration failed
  }
})

// Login route
router.post("/login", async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({username: req.body.username})

    // Rrespond with an error If user does not exist
    !user && res.status(401).json("Username or Password is not correct!")

    // Decrypt stored hashed password
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

    // Convert decrypted password to original password
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    // If original password does not match the one provided by user, respond with an error
    OriginalPassword !== req.body.password && res.status(401).json("Username or Password is not correct!")

    // Generate JWT token for the user
    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
    }, process.env.JWT_SEC, { // Use a secret key defined in environment variables
      expiresIn: "3d" // Token will expire in 3 days
    })

    // Remove password from the user object before sending it back
    const {password, ...others} = user._doc;

    // Respond with the user and access token
    res.status(200).json({...others, accessToken})

  } catch (err) {
    res.status(500).json(err) // Respond with error if login failed
  }

})

module.exports = router
