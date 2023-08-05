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
    },
    editUser: async function (user) {
        const editedUser = await User.updateOne({ user_id: user.user_id }, user);
        return editedUser;
    }

}


module.exports = queries;