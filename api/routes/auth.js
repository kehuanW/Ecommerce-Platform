const express = require('express');
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SEC).toString(),
    });

    //TODO: check if input values exist in advance
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const rawPw = req.body.password;
    // console.log(rawPw);

    try {
        const dbUserInfo = await User.findOne({ username: username });
        // console.log("auth", dbUserInfo._id.toString());
        // console.log("auth", dbUserInfo.isAdmin);

        if (!dbUserInfo) {
            res.status(401).json("wrong credentials");

        } else { //Avoid Error: Can't set headers after they are sent to the client

            const accessToken = jwt.sign(
                {
                    id: dbUserInfo._id.toString(),
                    isAdmin: dbUserInfo.isAdmin,
                },
                process.env.JWT_SEC,
                { expiresIn: "3d" }
            )

            const { password, ...others } = dbUserInfo._doc;
            const decrypedPw = CryptoJS.AES.decrypt(password, process.env.PASSWORD_SEC).toString(CryptoJS.enc.Utf8);

            if (decrypedPw !== rawPw) {
                // console.log("check pw")
                res.status(401).json("wrong credentials");
            } else {
                res.status(201).json({ ...others, accessToken });
            }
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/usernames', async (req, res) => {
    try {
        const users = await User.find();
        usernames = users.map(user => user.username);
        res.status(200).json(usernames);
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;
