const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: String },
        color: { type: String },
        price: { type: Number, required: true },
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("Product", ProductSchema);