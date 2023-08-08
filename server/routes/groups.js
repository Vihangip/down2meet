const queries = require ('../mongoDB/GroupQueries');

var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    let allGroups = await queries.getAllGroup();
  return res.send(allGroups);
});

router.get('/:id', async (req, res, next) => {
  const group = await queries.getOneGroup({id: req.params.groupId});
  if(!foundGroup) {
    return res.status(404).send({message: 'Group not found'})
  }
  return res.send(group);
});

router.post('/', async(req, res, next) => {
  const group =  { 
    id: uuid(),
    name: req.body.name,
    members: req.body.members,
  };
  const addedGroup = await queries.addGroup(group);
  res.status(201);
  return res.send(addedGroup);
});

router.get('/:user_id/groups', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    return res.send(foundUser.friends);
  }
});


module.exports = router;
