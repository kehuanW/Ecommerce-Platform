const express = require('express');
const sgMail = require('@sendgrid/mail');
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');
const Subscription = require('../models/Subscription');

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// SEND EMAIL
router.post('/sendsgmail', verifyToken, async (req, res) => {
    const userEmail = req.body.userEmail
    const msg = {
        to: userEmail, // Change to your recipient
        from: 'projecttesting1024@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        // text: 'and easy to do anywhere, even with Node.js',
        html: `
        <p>Hi there,</p>
        <br/>
        <p>Thanks for subscribing newsletter from TODAY E-commerce Platform!</p>
        <br/>
        <p>Warm regards,</p>
        <p>Kehuan</p>`,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
            res.status(200).json("The email has been sent.");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json("The email can't be sent.");
        })
});

//ADD TO DB EMAIL LIST
router.post('/', verifyToken, async (req, res) => {
    console.log("******", req);
    const userId = req.body.userId;
    const email = req.body.email;
    const date = req.body.date;
    // var date = new Date().toISOString().slice(0, 10);
    try {
        subscriptionList = await Subscription.find({ date: date }).exec();
        numSubscription = subscriptionList.length;
        if (numSubscription < 50) {
            const newSubscription = new Subscription({
                "userId": userId,
                "date": date,
                "email": email
            });
            const savedSubscription = await newSubscription.save();
            res.status(201).json(savedSubscription);
        } else {
            res.status(503).json("Too much subscription for today.")
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;