const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    mobile: { type: Number },
    address: { type: String },
    enter_date: { type: String },
    age: { type: String },
    gender: { type: String },
    email: { type: String },
    doctor_name: { type: String },
    staff_on_duty: { type: String },
    ward_no: { type: String },
    choose_date: { type: String },
    choose_time: { type: String },
    health_description: { type: String }   

});

const patient_profile_model = mongoose.model('Patients_profile', Comment);
module.exports = patient_profile_model;