const Cart = require("../models/Cart") // Cart model
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken") // JWT verification functions

const router = require("express").Router(); // Express.js Router

// // Create a new cart
// router.post("/", verifyToken, async (req, res) => {
//   const newCart = new Cart(req.body) // Create new Cart instance with request body

//   try {
//     const savedCart = await newCart.save(); // Save new cart to the database
//     res.status(200).json(savedCart) // Respond with the saved cart
//   } catch (err) {
//     res.status(500).json(err) // Respond with error if save failed
//   }
// })

// Update an existing cart
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body)
    const cart = await Cart.findOne({ userId: req.params.userId })
    // Find cart by id and update it with request body
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
      products: [...cart.products, { id: req.body._id, title: req.body.title }],
    }, {
      new: true // Returns the updated document
    })
    res.status(200).json(updatedCart) // Respond with the updated cart
  } catch (err) {
    res.status(500).json(err) // Respond with error if update failed
  }
})

// // Delete a cart
// router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await Cart.findByIdAndDelete(req.params.id) // Find cart by id and delete it
//     res.status(200).json("Cart has been deleted...") // Respond with deletion confirmation
//   } catch (err) {
//     res.status(500).json(err) // Respond with error if deletion failed
//   }
// })

// // Get user's cart
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     // Find cart by user id
//     const cart = await Cart.findOne({ userId: req.params.userId })
//     res.status(200).json(cart) // Respond with the found cart
//   } catch (err) {
//     res.status(500).json(err) // Respond with error if fetch failed
//   }
// })

// // Get all carts (admin only)
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const carts = await Cart.find() // Find all carts
//     res.status(200).json(carts) // Respond with the found carts
//   } catch(err) {
//     res.status(500). json(err) // Respond with error if fetch failed
//   }
// })

module.exports = router
