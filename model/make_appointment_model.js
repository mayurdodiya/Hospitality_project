const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    DOB: { type: String },
    gender: { type: String },
    select_service: { type: String },
    date: { type: Date, default: Date.now },
    email: { type: String },    
    mobile: { type: Number },
    massage: { type: String }
});

const make_appointment_model = mongoose.model('Make_Appointment', Comment);
module.exports = make_appointment_model;