const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
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
                }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("Order", OrderSchema);