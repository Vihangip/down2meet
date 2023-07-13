const User = require('./User');

const queries = {
    getUserData: async function (filter) {
        const users = await User.find(filter);
        return users;
    },
    getAllUsers: async function (filter) {
        const users = await User.find(filter);
        return users;
    },
    // getOneUser: async function (filter) {
    //     const user = await User.findOne(filter);
    //     return user;
    // }
    deleteOneUser: async function (filter) {
        await User.deleteOne(filter);
    }

}


module.exports = queries;