const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubscriptionSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("Subscription", SubscriptionSchema);