

var express = require('express');
var router = express.Router();

var posts = [{name: "Johnny Lau", id: "1", status: "I'm gonna be in Richmond at 8pm, anyone want to hang out", profilepic: "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png", availability: true}]

/* GET posts listing. */
router.get('/', function(req, res, next) {
  return res.send(posts);
});

/* GET posts by id. */
router.get('/:postId', function(req, res, next) {
  const postId = req.params.postId;
  const foundPost = posts.find(post => post.id === postId);
  return res.send(foundPost);
});

/* POST post. */
router.post('/', function(req, res, next) {
  const post = req.body;
  posts.push(post);

  res.status(201);
  return res.send(post);
});

/* DELETE post. */
router.delete('/:postId', function(req, res, next) {
  const postId = req.params.postId;
  console.log(postId);
  const postIndex = posts.findIndex(post => post.id === postId);
  posts.splice(postIndex, 1);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  res.status(200);
  return res.send(postId);
});

/* PUT post. */
router.put('/:postId', function(req, res, next) {
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