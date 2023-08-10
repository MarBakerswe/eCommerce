const Product = require("../models/Product")
const router = require("express").Router();


//Get Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get All Products
//no verify token since everyone can see the product
router.get("/", async (req, res) => {
  //we will be fetching our category
  const qNew = req.query.new
  const qCategory = req.query.category
  try {
    let products;

    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(1)
    } else if (qCategory){
      //if the qCategory is inside categories array from models/Product.js, we will fetch the products
      products = await Product.find({
        categories: {
          $in: [qCategory],
        }
      })
    }else{
      products = await Product.find();
    }

    res.status(200).json(products)
  } catch (err) {
    res.status(500).json(err)
  }
})



module.exports = router
