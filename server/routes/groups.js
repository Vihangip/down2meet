const queries = require ('../mongoDB/GroupQueries');

var express = require('express');
var router = express.Router();

// var groups = [
//   { id: "lossantos", name: "Los Santos Pollos Hermanos", members: ["Cap'n Cook", "Heisenberg", "me"]},
//   { id: "dea", name: "Drug Enforcement Administration", members: ["Gomie", "ASAC Schrader", "me"]}
// ]


/* GET groups listing. */
router.get('/', async (req, res, next) => {
    let allGroups = await queries.getAllGroup();
  return res.send(allGroups);
});

/* GET group by ID. */
router.get('/:id', async (req, res, next) => {
  const group = await queries.getOneGroup({id: req.params.groupId});
  if(!foundGroup) {
    return res.status(404).send({message: 'Group not found'})
  }
  return res.send(group);
});

/* POST group. */
router.post('/', async(req, res, next) => {
  const group =  { 
    id: uuid(),
    name: req.body.name,
    members: req.body.members, // TODO: adding dummy var now, will populate with actual userIDs
  };
  const addedGroup = await queries.addGroup(group);
  res.status(201);
  return res.send(addedGroup);
});

/** GET USER'S GROUPS */
router.get('/:user_id/groups', async(req, res, next) => {
  const foundUser = await User.findOne({user_id: req.params.user_id});
  if(!foundUser) {
    return res.status(404).send({message: 'User not found'});
  } else {
    return res.send(foundUser.friends);
  }
  
});


module.exports = router;
