const User = require("../models/User")

// Import token verification functions
const {
  verifyToken,
  // verifyTokenAndAuthorization,
  // verifyTokenAndAdmin
} = require("./verifyToken")

// Create Express router instance
const router = require("express").Router();


// // Update user endpoint
// // Users can update their own information
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

//   // If the request body includes a password, encrypt it using CryptoJS and the PASS_SEC environment variable
//   if (req.body.password) {
//     req.body.password = CryptoJS.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SEC
//     ).toString()
//   }

//   try {
//     // Find the user by ID and update with the request body. Respond with the updated user.
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
//       $set: req.body
//     }, {
//       new: true
//     })
//     res.status(200).json(updatedUser)
//   } catch (err) {
//     // If there's an error, respond with the error
//     res.status(500).json(err)
//   }
// })

// // Delete user endpoint
// // Users can delete their own account
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     // Find the user by ID and delete. Respond with a confirmation message.
//     await User.findByIdAndDelete(req.params.id)
//     res.status(200).json("User has been deleted...")
//   } catch (err) {
//     // If there's an error, respond with the error
//     res.status(500).json(err)
//   }
// })

// // Get user endpoint
// // Only admins can retrieve user information
// router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     // Find the user by ID and respond with the user's information
//     const user = await User.findById(req.params.id)

//     // Exclude the password from the returned user data
//     const { password, ...others } = user._doc;
//     res.status(200).json(others)
//   } catch (err) {
//     // If there's an error, respond with the error
//     res.status(500).json(err)
//   }
// })


// Get all users endpoint
// Only admins can retrieve all user information
router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new
  try {
    // Find all users. If the 'new' query param is true, only return the 5 most recently created users.
    const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
    res.status(200).json(users)
  } catch (err) {
    // If there's an error, respond with the error
    res.status(500).json(err)
  }
})


module.exports = router
