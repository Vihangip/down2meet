const mongoose = require('mongoose');

// create schema
const availabilitySchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    start: Date,
    end: Date,
});

// create model
const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;