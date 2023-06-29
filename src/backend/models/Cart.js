const mongoose = require("mongoose")

// Define the schema for a Cart,
const CartSchema = new mongoose.Schema(
  {
    // The user who owns this cart. This is required.
    userId: {type: String, required: true },

    // An array of products in the cart. Each product is an object that includes
    // the product ID and the quantity of the product in the cart.
    products: [
        {
            // The unique identifier for the product.
            productId: {
              type: String
            },
            
            quantity:{
              type: Number,
              default: 1,
            }
        }
    ],

  },
  // Use timestamps for this schema. This will add `createdAt` and `updatedAt` fields.
  { timestamps: true }
)

// Create the Cart model using the Cart schema and export it. This allows other files to 
// use the Cart model by requiring this file.
module.exports = mongoose.model("Cart", CartSchema)
