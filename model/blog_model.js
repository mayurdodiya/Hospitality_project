const mongoose = require('mongoose');

const Comment = new mongoose.Schema({

    author_name: { type: String },
    author_id: { type: String },
    title: { type: String },
    blog_category: { type: String },
    iteam_details: { type: String },
    likes: { type: Number },
    comment: { 
        commentor_name:{ type: String },
        comment:{ type: String },
    }

});

const blog_model = mongoose.model("Blog",Comment);
module.exports = blog_model;
