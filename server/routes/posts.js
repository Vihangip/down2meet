var express = require('express');
const Post = require('../mongoDB/Post');
const User = require('../mongoDB/User');
var router = express.Router();


router.get('/', async(req, res, next) => {
  let allposts = await Post.find();
  return res.send(allposts);
});

router.get('/:postId', async(req, res, next) => {
  const foundPost = await Post.findOne({id: req.params.postId})
  if(!foundPost) return res.status(404).send({message: 'Item not found'});
  return res.send(foundPost);
});

router.post('/', async(req, res, next) =>{
  const post = new Post(
    { 
      post_id: req.body.post_id, 
      user_id:  req.body.user_id,
      profilepic: req.body.profilepic,
      status: req.body.status, 
      time: req.body.time,
      start: req.body.start,
      end: req.body.end,
      date: req.body.date, 
      location: req.body.location,
      viewers: req.body.viewers,
      participants: req.body.participants
    });
  await post.save()
  res.status(201);
  return res.send(post);
});

router.delete('/:postId', async(req, res, next) => {
  const postId = req.params.postId;
  try {
    await Post.deleteOne({post_id: postId})
    res.status(200).send(postId)
  } catch {
    return res.status(404).send('Post not found');
  }
});

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

router.get('/friends/:user_id', async(req, res, next) => {
  const targetUserId = req.params.user_id;

  try {
    const targetUser = await User.findOne({ user_id: targetUserId });

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    const friendUserIds = targetUser.friends;

    const posts = await Post.aggregate([
      {
        $match: {
          $or: [
            { user_id: targetUserId },
            { user_id: { $in: friendUserIds } }, 
          ],
        },
      },
    ]);

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;