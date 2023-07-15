const mongoose = require('mongoose');

// create schema
const postSchema = new mongoose.Schema({
    post_id: String,
    user_id:  String,
    profilepic: String,
    status: String, 
    time: String,
    date: String,
    location: String,
    viewers: [String],
});

// create model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;