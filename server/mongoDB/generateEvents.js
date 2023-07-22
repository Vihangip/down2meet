const Item = require('./Event');

function generateEvents() {
    // make a event
    const event1 = new Item({
        "id": "1",
        "userID": "1.1",
        "title": "Event 1",
        "description": "description 1",
        "start": "2023-07-24T10:00:00",
        "end": "2023-07-24T12:00:00",
        "groups":["friends, family"]
      });
    const event2 = new Item({
        "id": "2",
        "userID": "2.1",
        "title": "Event 2",
        "description": "description 2",
        "start": "2023-07-25T14:00:00",
        "end": "2023-07-25T16:00:00",
        "groups":["friends, family"]
      });
    const event3 = new Item({
        "id": "3",
        "userID": "2.1",
        "title": "Event 3",
        "description": "description 3",
        "start": "2023-07-25T14:00:00",
        "end": "2023-07-25T16:00:00",
        "groups":["friends, family"]
      });
    
    // Save a event to db
    event1.save();
    event2.save();
    event3.save();
}

module.exports = generateEvents;