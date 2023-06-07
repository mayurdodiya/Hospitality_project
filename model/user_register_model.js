const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    otp: { type: Number, default: 0 },
    otp_status: { type: Number, default: 0 }
});

const user_register_model = mongoose.model('User_register', Comment);
module.exports = user_register_model;