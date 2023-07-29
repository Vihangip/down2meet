

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
  console.log(searchQuery);

  try {
    const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } }); // Perform a case-insensitive search for users by name
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

/* GET user by ID. */
router.get('/:userId', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.userId})
  console.log('User ID:', req.params.userId);
  if(!foundUser || foundUser === null){ return res.status(404).send({message: 'Item not found'})};
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

router.post('/:userId/addFriend', async(req, res) => {
  try {
    console.log(`Request to add friend for user ${req.params.userId}`);
    const userId = req.params.userId;
    const friendId = req.body.friendId;
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).send({message: 'User not found'});
    }
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.post('/:userId/removeFriend', async(req, res) => {
  const userId = req.params.userId;
  const friendId = req.body.friendId;
  const user = await User.findOne({ user_id: userId });
  if (!user) {
      return res.status(404).send({message: 'User not found'});
  }
  user.friends = user.friends.filter(friend => friend !== friendId);
  await user.save();
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

router.get('/:userID/addPost/:postID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const postID = req.params.postID;
    console.log(userID);
    console.log(postID);
    const user = await User.updateOne(
      { user_id: userID },
      { $push: { events: postID } }
    );
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:user_id/friends', async(req, res, next) => {
  console.log(req.params.user_id);
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    console.log("useruseruser:" + foundUser.friends); 
    return res.send(foundUser.friends);
  }
  
});


router.post('/:userId/addGroup', async(req, res) => {
  try {
    console.log(`Request to add Group for user ${req.params.userId}`);
    const userId = req.params.userId;
    const group = req.body;
    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).send({message: 'User not found'});
    }
    if (group.length != 0) {
      user.groups.push(group);
      await user.save();
    }

    console.log(group);
    return res.send(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


// router.post('/:userId/removeFriend', async(req, res) => {
//   const userId = req.params.userId;
//   const friendId = req.body.friendId;
//   const user = await User.findOne({ user_id: userId });
//   if (!user) {
//       return res.status(404).send({message: 'User not found'});
//   }
//   user.friends = user.friends.filter(friend => friend !== friendId);
//   await user.save();
//   return res.send(user);
// });


module.exports = router;

