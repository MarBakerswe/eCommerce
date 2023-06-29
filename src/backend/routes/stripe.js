const router = require("express").Router();

// Import the stripe module and initialize it with the stripe key
const stripe = require("stripe")(process.env.STRIPE_KEY)

// POST endpoint to handle payments
router.post("/payment", (req, res) =>{

  // Use stripe's charges.create method to charge the client's card
  stripe.charges.create({
    // The source is the token ID from the Stripe API
    source: req.body.tokenId,

    // The amount to be charged in smallest units (cents for USD)
    amount: req.body.amount,

    // The currency of the charge. This is set to USD
    currency: "usd",
  }, 

  // Callback function to handle the response from the Stripe API
  (stripeErr, stripeRes) => {
    // If there was an error with the Stripe API, send a 500 status code along with the error
    if(stripeErr){
      res.status(500).json(stripeErr)
    }else{
      // If the request was successful, send a 200 status code along with the response from Stripe
      res.status(200).json(stripeRes)
    }
  })
})

module.exports = router
