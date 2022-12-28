const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
    {
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // },
        userId: { type: String, required: true, unique: true },
        products: [
            {
                productId: {
                    type: String,
                },
                amount: {
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
                title: { type: String, required: true },
                desc: { type: String, required: true },
                img: { type: String, required: true },
                price: { type: Number, required: true },
            }
        ],
        quantity: {
            type: Number
        }
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("Cart", CartSchema);