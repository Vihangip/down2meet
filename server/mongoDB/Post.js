const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post_id: String,
    user_id:  String,
    profilepic: String,
    status: String, 
    time: String,
    start: String,
    end: String,
    date: String,
    location: String,
    viewers: [String],
    participants: [String],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;