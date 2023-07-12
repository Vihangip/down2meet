

var express = require('express');
const Post = require('../mongoDB/Post');
const { randomUUID } = require('crypto');
var router = express.Router();

var posts = [
  {name: "Johnny Lau", 
  id: "1", 
  status: "I'm gonna be in Richmond at 8pm, anyone want to hang out", 
  profilepic: "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png", 
  availability: true,
  time: "8pm",
  date: "July 12",
  location: "Richmond"
}]

/* GET posts listing. */
router.get('/', async(req, res, next) => {
  let allposts = await Post.find();
  return res.send(allposts);
});

/* GET posts by id. */
router.get('/:postId', async(req, res, next) => {
  const foundPost = await Post.findOne({id: req.params.postId})
  if(!foundPost) return res.status(404).send({message: 'Item not found'})
  // const postId = req.params.postId;
  // const foundPost = posts.find(post => post.id === postId);
  return res.send(foundPost);
});

/* POST post. */
router.post('/', async(req, res, next) =>{
  const post = new Post(
    { 
      // id: randomUUID, 
      content: req.body.status, 
      date: req.body.date, 
      time: req.body.time,
      location: req.body.location
      // userId:  req.body.userId,
      // viewers: req.body.viewers 
    })
  // const post = req.body;
  // posts.push(post);
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
  // const postId = req.params.postId;
  // console.log(postId);
  // const postIndex = posts.findIndex(post => post.id === postId);
  // posts.splice(postIndex, 1);

  // if (postIndex === -1) {
  //   return res.status(404).send('Post not found');
  // }

  // res.status(200);
  // return res.send(postId);
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