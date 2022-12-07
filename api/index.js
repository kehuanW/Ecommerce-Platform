const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((error) => console.log(error));

const app = express();

app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/carts', cartRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running!")
})