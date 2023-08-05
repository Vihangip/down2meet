const mongoose = require('mongoose');

// create schema
const eventSchema = new mongoose.Schema({
    id: String,
    email: String,
    userID: String,
    title: String,
    description: String,
    start: Date,
    end: Date,
    groups:[String],
    location: String,
    participants: [String],
    repetitionRule: [Object]
});

// create model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;