const Item = require('./availabilityModel');

function generateEvents() {
    // make a event
    const event1 = new Item({
        "id": "1",
        "title": "Event 1",
        "description": "description 1",
        "start": "2023-06-24T10:00:00",
        "end": "2023-06-24T12:00:00"
      });
    const event2 = new Item({
        "id": "2",
        "title": "Event 2",
        "description": "description 2",
        "start": "2023-06-25T14:00:00",
        "end": "2023-06-25T16:00:00"
      });
    const event3 = new Item({
        "id": "3",
        "title": "Event 3",
        "description": "description 3",
        "start": "2023-06-25T14:00:00",
        "end": "2023-06-25T16:00:00"
      });
    
    // Save a event to db
    event1.save();
    event2.save();
    event3.save();
}

module.exports = generateEvents;