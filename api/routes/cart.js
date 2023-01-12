const express = require('express');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const Cart = require('../models/Cart');

const router = express.Router();

// GET USER CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cartInfo = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cartInfo);
    } catch (error) {
        res.status(500).json(err);
    }
})

// CREATE CART (add the first product to cart)
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE (add or remove products)
router.put('/:userId/:cartId', verifyTokenAndAuthorization, async (req, res) => {
    // console.log(req.body);
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.cartId,
            req.body,
            { new: true } //get new version of doc
        )
        res.status(200).json(updatedCart);
    } catch (err) {
        // console.log("UPDAT500", err)
        res.status(500).json(err);
    }
});


// GET CARTS (ADMIN)
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})


// // DELETE (after checkout)
// router.delete('/:id', async (req, res) => {
//     try {
//         await Cart.findByIdAndDelete(req.params.id);
//         res.status(200).json("Cart has been deleted...");
//     } catch (error) {
//         res.status(500).json(err);
//     }
// })

module.exports = router;
