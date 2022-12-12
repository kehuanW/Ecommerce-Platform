const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post('/payment', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'glasses',
                        description: 'hello',
                        images: ['https://images.unsplash.com/photo-1670786611555-5218c1407492?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'],
                        // quantity: 2
                    },
                    unit_amount: 2000, //cents
                },
                quantity: 3,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.CLIENT_DOMAIN}/success`,
        cancel_url: `${process.env.CLIENT_DOMAIN}/cart`,
    });
    res.send({ "url": session.url });
});

module.exports = router;