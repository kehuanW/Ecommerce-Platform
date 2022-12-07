const express = require('express');
const CryptoJS = require('crypto-js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const User = require('../models/User');

const router = express.Router();

// GET ONE USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const userInfo = await User.findById(req.params.id);
        const { password, ...others } = userInfo._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(err);
    }
})

// GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allUserInfo = req.query.new
            ? await User.find().sort({ username: -1 }).limit(4)
            : await User.find();
        res.status(200).json(allUserInfo);
    } catch (err) {
        res.status(500).json(err);
    }
})


// GET STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {

    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
})

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SEC
        ).toString();
    }

    try {
        const updatedUserInfo = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedUserInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});


// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(err);
    }
})

module.exports = router;
