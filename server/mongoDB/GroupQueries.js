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
        const groupEdited = await Group.updateOne({group: groupName }, {group: "Group completed"});
        return groupEdited;
    },
    findGroups: async function (filter) {
        const filterAsStr = filter.toString();
        const searchResults = await Group.find({ price: { $lt: filterAsStr } });
        return searchResults;
      }
      

}


module.exports = queries;