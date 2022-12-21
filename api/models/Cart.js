const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                color: {
                    type: String,
                    default: "",
                },
                size: {
                    type: String,
                    default: "",
                },
            }
        ]
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("Cart", CartSchema);