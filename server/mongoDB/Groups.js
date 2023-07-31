const mongoose = require('mongoose');

// create schema
const groupSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    name: String,
    members:[String] // an array of the userIDs of the members of the group
});

// create model
const Group = mongoose.model('Group', groupSchema);

module.exports = Group;