const mongoose = require('mongoose');

// create schema
const availabilitySchema = new mongoose.Schema({
    availability_id: String,
    title: String,
    description: String,
    start: Date,
    end: Date,
});

// create model
const Item = mongoose.model('Availability', availabilitySchema);

module.exports = Item;