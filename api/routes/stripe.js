const router = require("express").Router();
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post('/payment', async (req, res) => {
    console.log(req.body);
    const { cart, user } = req.body;
    const { products, quantity, total } = cart;
    const line_items = products.map((item) => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.img],
                    description: item.desc,
                    metadata: {
                        id: item._id,
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.amount,
        };
    });
    // console.log("myline_items", line_items);
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.CLIENT_DOMAIN}/success`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/cart`,
    });
    res.send({ "url": session.url });
});

module.exports = router;