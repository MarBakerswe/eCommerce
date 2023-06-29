// Import Order model
const Order = require("../models/Order")

// Import the verification functions
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken")

// Create express router instance
const router = require("express").Router();

// CREATE Order Endpoint
// This will create a new order
// Only accessible to Admin
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newOrder = new Order(req.body) // Create new order using the body of the request

  try {
    const savedOrder = await newOrder.save(); // Save the order to the database
    res.status(200).json(savedOrder) // Respond with the saved order
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }
})

// UPDATE Order Endpoint
// Only Admin can update an order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    })
    res.status(200).json(updatedOrder) // Respond with the updated order
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }
})

// DELETE Order Endpoint
// Only Admin can delete an order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id) // Delete the order by its ID
    res.status(200).json("Order has been deleted...") // Confirm deletion
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }
})

// GET User Orders Endpoint
// Retrieve orders based on user ID
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Users can have more than one orders
    const orders = await Order.find({
      userId: req.params.userId
    })
    res.status(200).json(orders) // Respond with the found orders
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }
})

// GET All Orders Endpoint
// Only accessible by Admin
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find() // Retrieve all orders from the database
    res.status(200).json(orders) // Respond with all orders
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }
})

// GET Income Endpoint
// Only accessible by Admin
// Aggregates the income of the last two months
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      { $match: { // Match orders that are paid and created within the last two months
        createdAt: {
          $gte: previousMonth}}},
    {
      $project: { // Project the month and the amount of the order
      month: {$month: "$createdAt"},
      sales: "$amount",
    },
      $group:{ // Group the orders by month and sum the total amount
        _id: "$month",
        total:{$sum: "$sales"}, 
      }
    }
  ])
    res.status(200).json(income) // Respond with the aggregated income
  } catch (err) {
    res.status(500).json(err) // Respond with any errors
  }

})

module.exports = router
