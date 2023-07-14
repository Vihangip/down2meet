

var express = require('express');
const User = require('../mongoDB/User');
const { randomUUID } = require('crypto');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  let allUsers = await User.find();
  return res.send(allUsers);
});

/* GET users by name (search). */
router.get('/search', async (req, res, next) => {
  const searchQuery = req.query.q; // Get the search query from the query parameter
  console.log('Searching user')
  try {
    const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } }); // Perform a case-insensitive search for users by name
    res.send(users);
    console.log('User found')
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

/* GET user by ID. */
router.get('/:userId', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.userId})
  if(!foundUser){ return res.status(404).send({message: 'Item not found'})};
  return res.send(foundUser);
});

/* POST user. */
router.post('/', async(req, res, next) => {
  const user = new User(
    { 
      user_id: req.body.user_id,
      name: req.body.name,
      picture: req.body.picture,
      friends: req.body.friends,
      groups: req.body.groups,
      events: req.body.events,
      availability: req.body.availability
    })
  // const post = req.body;
  // posts.push(post);
  await user.save()
  res.status(201);
  return res.send(user);
});

/* DELETE user. */
router.delete('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  const userIndex = users.findIndex(user => user.id === userId);
  users.splice(userIndex, 1);

  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }

  res.status(200);
  return res.send(userId);
});

module.exports = router;
