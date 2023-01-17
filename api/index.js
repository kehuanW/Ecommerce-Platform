const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path')
// const { createProxyMiddleware } = require('http-proxy-middleware');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const subscriptioRoute = require("./routes/subscription");


dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((error) => console.log(error));

const app = express();

// app.use(express.json());
app.use((req, res, next) => {
    if (req.originalUrl.includes("/api/checkout/webhook")) {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(cors());

// app.use(createProxyMiddleware('/api/**', {
//     target: 'http://localhost:5000/api',
// }));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);
app.use('/api/checkout', stripeRoute);
app.use('/api/subscribe', subscriptioRoute);

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../client/build");

app.use(express.static(buildPath))
// console.log(buildPath)
// console.log(_dirname)


app.get("/*", function (req, res) {

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );

})

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running!")
})