const Event = require('./Event');

const queries = {
    getAllEvent: async function (filter) {
        const event = await Event.find(filter);
        return event;
    },
    getOneEvent: async function (filter) {
        const event = await Event.findOne(filter);
        return event;
    },
    addEvent: async function (newEvent) {
        const event = await Event.create(newEvent);
        return event;
    },
    deleteEvent: async function (eventID) {
        const event = await Event.deleteOne({id: eventID });
        return event;
    },
    editEvent:  async function (eventName) {
        // can edit the event's name if given the event's name
        // given event id and the fact that update button is pressed, updated all the key value pairs that
        // user entered a value for.
        const eventEdited = await Event.updateOne({event: eventName }, {event: "Event completed"});
        return eventEdited;
    },
    findEvents: async function (filter) {
        // Convert the filter to a string
        const filterAsStr = filter.toString();
      
        // returns results where the price is less than $filter.
        const searchResults = await Event.find({ price: { $lt: filterAsStr } });
        return searchResults;
      }
      

}


module.exports = queries;