const router = require("express").Router();
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require('../models/Order');

router.post('/payment',
    async (req, res) => {
        // console.log(req.body);
        const { cart, user } = req.body;
        const { products, quantity, total } = cart;

        // console.log("*******************")
        // console.log("cart", cart);
        // console.log("user", user);

        const customer = await stripe.customers.create({
            metadata: {
                userId: user.currentUser._id,
            },
        });

        // console.log("customer in payment", customer);

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
                            size: item.size,
                            color: item.color,
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.amount,
            };
        });
        // console.log("myline_items", line_items[0].price_data.product_data);

        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: { allowed_countries: ['AU', 'US'] },
            line_items,
            mode: 'payment',
            customer: customer.id,
            success_url: `${process.env.CLIENT_DOMAIN}/success`,
            cancel_url: `${process.env.CLIENT_DOMAIN}/cart`,
        });
        res.send({ "url": session.url });
    });

// CREATE ORDER in DB
const creatOrder = async (purchaseCustomer, purchaseItems, purchaseAddress) => {
    let order = { ...purchaseCustomer };
    order.products = purchaseItems;
    order.address = purchaseAddress;
    order.quantity = purchaseItems.length;
    // console.log("creatOrder", order);

    const newOrder = new Order(order);
    try {
        const savedOrder = await newOrder.save();
        console.log("Processed Order:", savedOrder);
    } catch (err) {
        console.log("creatOrder error", err);
    }
}

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e6c2a9bad6da12aa795f4bf08d900bad6f603a9d1f5dcb55167f16ece609bde6";

router.post('/webhook',
    express.raw({ type: 'application/json' }),
    async (request, response) => {
        //Verify that the event calls for the web hook are actually comes from stripe
        const sig = request.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log("Webhook verified");
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        // Handle the event
        if (event.type === "checkout.session.completed") {


            const customer = await stripe.customers.retrieve(event.data.object.customer);
            const purchaseCustomer = customer.metadata;
            // console.log("purchaseCustomer", purchaseCustomer);
            // purchaseCustomer { userId: '639011c32650e0a84c8bb231' }

            //When creating the items on the fly, metadata ends up in the product property, and not in the price property.
            const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id, {
                expand: ['data.price.product'],
            });

            // console.log("*******", line_items.data.price.product);

            const purchaseItems = line_items.data.map(async (i) => {
                let itemMetaDataObject = i.price.product.metadata;
                itemMetaDataObject.quantity = i.quantity;
                return itemMetaDataObject;
            });
            // purchaseItems [
            //     {
            //       id: '6391c0dc745437030d0be281',
            //       color: 'yellow',
            //       size: 'M',
            //       quantity: 2
            //     },
            //     { id: '6391c2e0745437030d0be287', color: 'green', quantity: 1 }
            //   ]
            // console.log("purchaseItems", purchaseItems);

            const session = await stripe.checkout.sessions.retrieve(event.data.object.id);
            const purchaseAddress = session.customer_details.address;
            // console.log("address", address);
            console.log("((((", session)

            try {
                creatOrder(purchaseCustomer, purchaseItems, purchaseAddress);
            } catch (error) {
                console.log(typeof createOrder);
                console.log(err);
            }
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send().end();
    });

module.exports = router;