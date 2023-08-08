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
    deleteOneUser: async function (filter) {
        await User.deleteOne(filter);
    },
    editUser: async function (user) {
        const editedUser = await User.updateOne({ user_id: user.user_id }, user);
        return editedUser;
    },
    findById: async function (user_id) {
        const user = await User.findOne({user_id: user_id});
        return user;
    }

}


module.exports = queries;