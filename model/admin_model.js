const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: Number, default: 0 },
    otp: { type: Number, default: 0 },
    otp_status: { type: Number, default: 0 }
});

const admin_register_model = mongoose.model('Admin_register', Comment);
module.exports = admin_register_model;