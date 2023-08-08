const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    name: String,
    members:[String]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;