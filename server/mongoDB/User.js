const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: String,
    email: String,
    name: String,
    picture: String,
    friends: { type: Array, default: [] },
    approvedFriends: { type: Array, default: [] }, 
    groups: [Object],
    events: [Object],
    hangouts: [Object],
    availability: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;