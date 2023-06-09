

var express = require('express');
const User = require('../mongoDB/User');
const { randomUUID } = require('crypto');
var router = express.Router();

var users = [
  {id: "Cap'n Cook", 
  name: "Jesse Pinkman",
  email: "captaincook@gmail.com",
  picture: "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png",
  friends: [
    {"name": "Johnny Lau", 
    "profilepic": "https://upload.wikimedia.org/wikipedia/en/c/c6/Jesse_Pinkman_S5B.png", 
    "availability": true},
    {"name": "Lucy Li", 
    "profilepic": "https://i.pinimg.com/564x/54/c8/8a/54c88ad0f7f90e5fc390a5570de18604.jpg", 
    "availability": false},
    {"name": "Chinenye Oluka", 
    "profilepic": "https://e0.pxfuel.com/wallpapers/860/511/desktop-wallpaper-instagram-profile-aesthetic-profile-pic.jpg", 
    "availability": false},
    {"name": "Karat Wannissorn", 
    "profilepic": "https://i.pinimg.com/550x/ac/11/7f/ac117f5ad61740c4392bedc38e131278.jpg", 
    "availability": true},
    {"name": "Vihangi Perera", 
    "profilepic": "https://e0.pxfuel.com/wallpapers/699/264/desktop-wallpaper-love-lovememes-funny-profile-cute-disney-for-your-mobile-tablet-explore-aesthetic-cartoon-aesthetic-cartoon-cartoon-background-aesthetic.jpg", 
    "availability": true},
    {"name": "Peter Pan", 
    "profilepic": "https://pbs.twimg.com/profile_images/1262867614528749568/pkWGZ6Hm_400x400.jpg", 
    "availability": false},
], 
}
]

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  let allUsers = await User.find();
  return res.send(allUsers);
});

/* GET user by ID. */
router.get('/:userId', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id})
  if(!foundUser) {}
  return res.status(404).send({message: 'Item not found'})
  return res.send(foundUser);
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
