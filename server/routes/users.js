var express = require('express');
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
router.get('/', function(req, res, next) {
  return res.send(users);
});

/* GET user by ID. */
router.get('/:userId', function(req, res, next) {
  const user = users.find((user) => user.id === req.params.id);
  return res.send(user);
});

/* POST user. */
router.post('/', function(req, res, next) {
  const user = req.body;
  users.push(user);

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
