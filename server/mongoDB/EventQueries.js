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
        const event = await Event.deleteMany({id: eventID });
        return event;
    },
    deleteOneEvent: async function (eventID, userID) {
        const event = await Event.deleteOne({id: eventID, userID: userID });
        return event;
    },
    editEvent:  async function (eventName) {
        const eventEdited = await Event.updateOne({event: eventName }, {event: "Event completed"});
        return eventEdited;
    },
    findEvents: async function (filter) {
        const filterAsStr = filter.toString();
        const searchResults = await Event.find({ price: { $lt: filterAsStr } });
        return searchResults;
      }
      

}


module.exports = queries;