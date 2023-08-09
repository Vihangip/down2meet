const Post = require('./Post');

const queries = {
    getUserPosts: async function (filter) {
        const posts = await Post.find(filter);
        return posts;
    },
    getAllPosts: async function (filter) {
        const posts = await Post.find(filter);
        return posts;
    },
    deleteOnePost: async function (filter) {
        await Post.deleteOne(filter);
    }

}


module.exports = queries;