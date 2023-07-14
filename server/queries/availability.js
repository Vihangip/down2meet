const Availability = require('./availabilityModel');

const queries = {
    getAllAvailability: async function (filter) {
        const availability = await Availability.find(filter);
        return availability;
    },
    getOneAvailability: async function (filter) {
        const availability = await Availability.findOne(filter);
        return availability;
    },
    addAvailability: async function (newAvailability) {
        const availability = await Availability.create(newAvailability);
        return availability;
    },
    deleteAvailability: async function (availabilityID) {
        const availability = await Availability.deleteOne({id: availabilityID });
        return availability;
    },
    editAvailability:  async function (availabilityName) {
        // can edit the availability's name if given the availability's name
        // given availability id and the fact that update button is pressed, updated all the key value pairs that
        // user entered a value for.
        const availabilityEdited = await Availability.updateOne({availability: availabilityName }, {availability: "Availability completed"});
        return availabilityEdited;
    },
    findAvailabilitys: async function (filter) {
        // Convert the filter to a string
        const filterAsStr = filter.toString();
      
        // returns results where the price is less than $filter.
        const searchResults = await Availability.find({ price: { $lt: filterAsStr } });
        console.log(searchResults);
        return searchResults;
      }
      

}


module.exports = queries;