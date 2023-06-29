const mongoose = require("mongoose")

// Creating a new order schema using mongoose.Schema
const OrderSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true }, // User Id associated with the order, it's a required field
    products: [ 
        {
            productId: {
              type: String // Product Id associated with the product being ordered
            },
            quantity:{
              type: Number, // Quantity of the product being ordered, default is 1
              default: 1,
            }
        }
    ],
    amount: {type: Number, required: true }, // Total amount of the order, it's a required field
    address: { type: Object, required: true }, // Shipping address for the order, it's a required field
    status: { type: String, default: "pending" }, // Status of the order, default is "pending"
  },
  { timestamps: true } // Enable automatic timestamps for createdAt and updatedAt
)

// Exporting the order model. This model will use the order schema to communicate with the 'Order' collection in the database
module.exports = mongoose.model("Order", OrderSchema)
