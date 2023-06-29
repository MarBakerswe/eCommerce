// Import the jwt (JSON Web Token) module
const jwt = require("jsonwebtoken")

// Middleware function to verify the token present in the request header
const verifyToken = (req, res, next) => {
  // Get the token from the request header
  const authHeader = req.headers.token

  if(authHeader){
      // Extract the actual token from the "Bearer" string
      const token = authHeader.split(" ")[1]

      // Verify the token using JWT and the secret key
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if(err) 
            // If there's an error (like token expired or not signed properly), send a "Token is not valid" message
            res.status(403).json("Token is not valid!")
        // If the token is valid, add the user info to the request object
        req.user = user
        // Pass control to the next middleware function
        next()
      })
  } else{
      // If there's no token in the request header, send a "You are not authenticated" message
      return res.status(401).json("You are not authenticated!")
  }
}

// Middleware function to verify the token and the user's authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  // First, verify the token
  verifyToken(req, res, () => {
      // If the user's ID matches the ID in the request parameters or if the user is an admin, pass control to the next middleware function
      if (req.user.id === req.params.id || req.user.isAdmin){
        next()
      } else {
        // If the user doesn't have the right authorization, send a "You do not have the authorization to do so!" message
        res.status(403).json("You do not have the authorization to do so!")
      }
  })
}

// Middleware function to verify the token and the admin's authorization
const verifyTokenAndAdmin = (req, res, next) => {
  // First, verify the token
  verifyToken(req, res, () => {
      // If the user is an admin, pass control to the next middleware function
      if (req.user.isAdmin){
        next()
      } else {
        // If the user isn't an admin, send a "You do not have the authorization to do so!" message
        res.status(403).json("You do not have the authorization!")
      }
  })
}

// Export the middleware functions
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }
