var express = require('express');
const User = require('../mongoDB/User');
const Post = require('../mongoDB/Post');
const userQueries = require('../mongoDB/UserQueries')
var router = express.Router();

router.get('/', async(req, res, next) =>{
  let allUsers = await User.find();
  return res.send(allUsers);
});

router.get('/getById/:user_id', async(req, res, next) => {
  const user = await userQueries.findById(req.body.user_id);
  return res.send(user);

});

router.get('/search', async (req, res, next) => {
  const searchQuery = req.query.q;

  try {
    const users = await User.find({ name: { $regex: searchQuery, $options: 'i' } });
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

  const friends = await User.find({ user_id: { $in: foundUser.friends } });
  
  return res.send(friends);
});

router.get('/:user_id/approvedfriends', async (req, res, next) => {
  const foundUser = await User.findOne({ user_id: req.params.user_id });
  if (!foundUser || foundUser === null) {
    return res.status(404).send({ message: 'Item not found' });
  }
  return res.send(foundUser.approvedFriends);
});

router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
      availability: req.body.availability,
      approvedFriends: req.body.approvedFriends
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


router.post('/:user_id/approvedfriends', async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const approvedFriendsIds = req.body.friendsIds;
    
    const foundUser = await User.findOne({ user_id: userId });
    if (!foundUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    foundUser.approvedFriends = approvedFriendsIds;
    await foundUser.save();

    return res.send({ message: 'Approved friends updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'An error occurred' });
  }
});




router.get('/:userId/hangouts', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.userId})
  return res.send(foundUser.hangouts);
});

router.get('/:user_id/friends', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id})
  return res.send(foundUser.friends);
});

router.delete('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  const userIndex = User.findIndex(user => user.id === userId);
  User.splice(userIndex, 1);

  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }

  res.status(200);
  return res.send(userId);
});

/* DELETE user group. */
router.delete('/:userId/:groupId/deleteGroup', async function(req, res, next) {
  try {
  const groupId = req.params.groupId;
  const userId = req.params.userId;
  // find user
  const userWithGroup = await User.findOne({ user_id: userId });
  if (!userWithGroup) {
    return res.status(404).send({message: 'User not found'});
  }
  // get user's group
  const groups = userWithGroup.groups;
  const groupIndex = groups.findIndex((group) => (group.id === groupId));
  if (groupIndex === -1) {
    return res.status(404).send('Group not found');
  }
  groups.splice(groupIndex, 1);

  

  await userWithGroup.save();
  res.status(200).send(groupId);

} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Server Error' });
}
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

router.get('/:user_id/availability', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    return res.send(foundUser.availability);
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

    return res.status(200).send(user.availability);
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

    const users = await User.find({ hangouts: { $in: [post_id] } });

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
    return res.status(200).send(postID);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.put('/edit', async function (req, res, next) {
  if (!req.body.user_id) {
    return res.status(400).send({ message: 'Require UserID!' });
  }

  const user = await userQueries.editUser(req.body);

  return res.send(user);

});

module.exports = router;
