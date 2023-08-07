var express = require('express');
const User = require('../mongoDB/User');
const Post = require('../mongoDB/Post');
const userQueries = require('../mongoDB/UserQueries')
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

  try {
    const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } }); // Perform a case-insensitive search for users by name
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:user_id/friendsData', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id})

  if(!foundUser || foundUser === null){ 
    return res.status(404).send({message: 'Item not found'})
  };

  // Fetch the friend objects
  const friends = await User.find({ user_id: { $in: foundUser.friends } });
  
  return res.send(friends);
});


/* GET user by ID. */
router.get('/:userId', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.userId})
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
      hangouts: req.body.hangouts,
      availability: req.body.availability
    })
  await user.save()
  res.status(201);
  return res.send(user);
});

router.post('/:userId/addFriend', async(req, res) => {
  try {
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

router.get('/:userId/hangouts', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.userId})
  return res.send(foundUser.hangouts);
});

router.get('/:user_id/friends', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id})
  return res.send(foundUser.friends);
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


router.put('/:userId/availability', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.availability = req.body.availability;
    await user.save();

    res.json({ message: 'User availability updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
  
router.get('/:user_id/friends', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    return res.send(foundUser.friends);
  }
  
});


router.post('/:userId/addGroup', async(req, res) => {
  try {
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

    return res.send(group);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/:user_id/groups', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    return res.send(foundUser.groups);
  }
  
});

router.put('/:post_id/remove-from-hangouts', async (req, res) => {
  try{
  const post_id  = req.params.post_id;

    // Find all users that have the specified post_id in their hangouts array
    const users = await User.find({ hangouts: { $in: [post_id] } });

    // Remove the post_id from each user's hangouts array
    await Promise.all(
      users.map(async (user) => {
        const updatedHangouts = user.hangouts.filter((hangoutId) => hangoutId !== post_id);
        user.hangouts = updatedHangouts;
        return await user.save();
      })
    );
    return res.status(200).send(post_id);
  } catch(err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

});

router.get('/:postId/addParticipant/:userId', async (req, res) => {
  try {
    const userID = req.params.userId;
    const postID = req.params.postId;
    const user = await User.findOne ({ user_id: userID });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const post = await Post.findOne({ post_id: postID });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    user.hangouts.push(postID);
    user.save();
    post.participants.push(userID);
    post.save();
    return res.status(200).send(postID);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/:postId/removeParticipant/:userId', async(req, res) => {
  try {
    console.log('ROUTER REQUEST RECEIVED');
    const userID = req.params.userId;
    const postID = req.params.postId;
    const user = await User.findOne ({ user_id: userID });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const post = await Post.findOne({ post_id: postID });
    if (!post) {
      return res.status(404).send('Post not found');
    }
    user.hangouts = user.hangouts.filter(hangouts => hangouts !== postID);
    user.save();
    post.participants = post.participants.filter(participants => participants !== userID);
    post.save();
    console.log('POST ID ROUTER SIDE!!!');
    console.log(postID);
    return res.status(200).send(postID);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/edit', async function (req, res, next) {

  console.log("server users edit");
  console.log(req.body);

  if (!req.body.user_id) {
    return res.status(400).send({ message: 'Require UserID!' });
  }

  const user = await userQueries.editUser(req.body);
  console.log(user);

  return res.send(user);

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
