const mongoose = require('mongoose');

// create schema
const eventSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    userID: String,
    title: String,
    description: String,
    start: Date,
    end: Date,
    groups:[String],
    location: String,
    participants: [String]
});

// create model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;