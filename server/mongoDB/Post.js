const mongoose = require('mongoose');

// create schema
const postSchema = new mongoose.Schema({
    // id: String,
    content: String,
    date: String,
    time: String,
    location: String
    // userId: String,
});

// create model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;