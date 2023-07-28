var express = require('express');
const Post = require('../mongoDB/Post');
var router = express.Router();


/* GET posts listing. */
router.get('/', async(req, res, next) => {
  let allposts = await Post.find();
  return res.send(allposts);
});

/* GET posts by id. */
router.get('/:postId', async(req, res, next) => {
  const foundPost = await Post.findOne({id: req.params.postId})
  if(!foundPost) return res.status(404).send({message: 'Item not found'});
  return res.send(foundPost);
});

router.get('/:postId/addViewer/:userId', async (req, res) => {
  try {
    const userID = req.params.userId;
    const postID = req.params.postId;
    const post = await Post.findOne({ post_id: postID });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post.viewers.push(userID);
    post.save();
    return res.status(200).send(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:postId/removeViewer/:userId', async(req, res) => {
  try {
    const userID = req.params.userId;
    const postID = req.params.postId;
    const post = await Post.findOne({ post_id: postID });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    post.viewers = post.viewers.filter(viewer => viewer !== userID);
    post.save();
    return res.status(200).send(post);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

/* POST post. */
router.post('/', async(req, res, next) =>{
  const post = new Post(
    { 
      post_id: req.body.post_id, 
      user_id:  req.body.user_id,
      profilepic: req.body.profilepic,
      status: req.body.status, 
      time: req.body.time,
      date: req.body.date, 
      location: req.body.location,
      viewers: req.body.viewers 
    });
  await post.save()
  res.status(201);
  return res.send(post);
});

/* DELETE post. */
router.delete('/:postId', async(req, res, next) => {
  const postId = req.params.id;
  try {
    await Post.deleteOne({id: postId})
    res.status(200).send(postId)
  } catch {
    return res.status(404).send('Post not found');
  }
});

/* PUT post. */
router.put('/:postId', async(req, res, next) =>{
  const postId = req.params.postId;
  const post = req.body;
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  posts[postIndex] = post;

  res.status(200).send(post);
});

module.exports = router;