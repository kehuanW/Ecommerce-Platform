const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    res.send("GET")
});


router.post('/post', (req, res) => {
    console.log(req.headers);
})

module.exports = router;
