const Group = require('./Groups');

const queries = {
    getAllGroup: async function (filter) {
        const group = await Group.find(filter);
        return group;
    },
    getOneGroup: async function (filter) {
        const group = await Group.findOne(filter);
        return group;
    },
    addGroup: async function (newGroup) {
        const group = await Group.create(newGroup);
        return group;
    },
    deleteGroup: async function (groupID) {
        const group = await Group.deleteOne({id: groupID });
        return group;
    },
    editGroup:  async function (groupName) {
        // can edit the group's name if given the group's name
        // given group id and the fact that update button is pressed, updated all the key value pairs that
        // user entered a value for.
        const groupEdited = await Group.updateOne({group: groupName }, {group: "Group completed"});
        return groupEdited;
    },
    findGroups: async function (filter) {
        // Convert the filter to a string
        const filterAsStr = filter.toString();
      
        // returns results where the price is less than $filter.
        const searchResults = await Group.find({ price: { $lt: filterAsStr } });
        console.log(searchResults);
        return searchResults;
      }
      

}


module.exports = queries;