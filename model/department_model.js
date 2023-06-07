const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    department_name: { type: String },
    massage: { type: String },
    description: { type: String },
    image: { type: Array }

});

const department_model = mongoose.model('Department', Comment);
module.exports = department_model;