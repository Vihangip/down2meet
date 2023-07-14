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
    // getOnePost: async function (filter) {
    //     const post = await Post.findOne(filter);
    //     return post;
    // }
    deleteOnePost: async function (filter) {
        await Post.deleteOne(filter);
    }

}


module.exports = queries;