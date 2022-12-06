const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },

    // timestamps: true, Mongoose will add two properties (createdAt and updatedAt) of type Date to your schema
    { timestamps: true }
);

module.exports = model("User", UserSchema);