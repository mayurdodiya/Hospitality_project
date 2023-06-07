const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    DOB: { type: String },
    gender: { type: String },
    speciality: { type: String },
    mobile: { type: Number },
    email: { type: String },
    website_url: { type: String },
    username: { type: String },
    password: { type: String },
    facebook_acc_name: { type: String },
    linkdin_acc_name: { type: String }
    
});

const doctor_profile_model = mongoose.model('Doctor_profile', Comment);
module.exports = doctor_profile_model;