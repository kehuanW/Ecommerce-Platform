const express = require('express');
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const { error } = require('console');

const router = express.Router();

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

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const rawPw = req.body.password;
    // console.log(rawPw);

    try {
        const dbUserInfo = await User.findOne({ username: username });
        // console.log(dbUserInfo.password);

        if (!dbUserInfo) {
            res.status(401).json("wrong credentials");

        } else { //Avoid Error: Can't set headers after they are sent to the client
            const { password, ...others } = dbUserInfo._doc;
            const decrypedPw = CryptoJS.AES.decrypt(password, process.env.PASSWORD_SEC).toString(CryptoJS.enc.Utf8);
            // console.log(decrypedPw);

            if (decrypedPw !== rawPw) {
                // console.log("check pw")
                res.status(401).json("wrong credentials");
            } else {
                res.status(201).json(others);
            }
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
