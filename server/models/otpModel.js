const mongoose = require('mongoose')
const collection = require('../util/collection')

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    expire_at: {
        type: Date,
        default: Date.now(),
        expires: 18000,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model(collection.otpmodel, otpSchema)