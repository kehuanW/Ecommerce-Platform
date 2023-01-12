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

// UPDATE Profile
router.put('/profile/:userId', verifyTokenAndAuthorization, async (req, res) => {
    // console.log(req.body);
    try {
        const updatedUserInfo = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: req.body,
            },
            { new: true }
        )
        res.status(200).json(updatedUserInfo);
        // throw "hello"
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE Password
router.put('/pw/:userId', verifyTokenAndAuthorization, async (req, res) => {
    console.log("##########", req.body);

    const username = req.body.username;
    const originalPassword = req.body.originalPassword;

    try {
        const dbUserInfo = await User.findOne({ "username": username });
        // console.log("auth", dbUserInfo._id.toString());
        // console.log("auth", dbUserInfo.isAdmin);

        if (!dbUserInfo) {
            res.status(401).json("wrong credentials");
        } else {
            const { password } = dbUserInfo._doc;
            const decrypedPw = CryptoJS.AES.decrypt(password, process.env.PASSWORD_SEC).toString(CryptoJS.enc.Utf8);

            if (decrypedPw !== originalPassword) {
                // console.log("check pw", decrypedPw !== originalPassword)
                res.status(401).json("wrong credentials");
            } else {
                if (req.body.newPassword) {
                    req.body.password = CryptoJS.AES.encrypt(
                        req.body.newPassword,
                        process.env.PASSWORD_SEC
                    ).toString();
                }
                const updatedUserInfo = await User.findByIdAndUpdate(
                    req.params.userId,
                    {
                        $set: req.body,
                    },
                    { new: true }
                )
                res.status(201).json("success");
            }
        }

    }
    catch (err) {
        res.status(500).json(err);
    }



    // try {
    //     const updatedUserInfo = await User.findByIdAndUpdate(
    //         req.params.userId,
    //         {
    //             $set: req.body,
    //         },
    //         { new: true }
    //     )
    //     res.status(200).json(updatedUserInfo);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
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
