const queries = require ('../mongoDB/EventQueries');
const { v4: uuid } = require('uuid');


var express = require('express');
const User = require('../mongoDB/User');
var router = express.Router();

router.get('/:user_id', async(req, res, next) =>{
  let allEvent = await queries.getAllEvent({userID: req.params.user_id});
  return res.send(allEvent);
});

router.get('/:eventId', async(req, res, next) => {
  const foundEvent = await User.getOneEvent({id: req.params.eventId})
  if(!foundEvent) {
    return res.status(404).send({message: 'Event not found'})
  }
  return res.send(foundEvent);
});

router.post('/', async(req, res, next) => {
  const event =  { 
    id: req.body.id ? req.body.id : uuid(),
    email: req.body.email,
    userID: req.body.userID,
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    groups: req.body.groups,
    location: req.body.location,
    participants: req.body.participants
  };
  const addedEvent = await queries.addEvent(event);
  res.status(201);
  return res.send(addedEvent);
});

router.get('/:userID/addEvent/:eventID', async(req, res, next) => {
  try {
    const userID = req.params.userID;
    const eventID = req.params.eventID;
    const user = await User.updateOne(
      { user_id: userID },
      { $push: { events: eventID } }
    );
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'Internal Server Error'});
  }
});

router.delete('/:eventId', async(req, res, next) => {
  const eventId = req.params.eventId;
  const deletedEvent = await queries.deleteEvent(eventId);
  if (!deletedEvent) {
    return res.status(404).send('Event not found');
  }
  res.status(204);
  return res.send();
});

router.delete('/:eventID/participant/:userID', async(req, res, next) => {
  const eventID = req.params.eventID;
  const userID = req.params.userID;
  const event = await queries.deleteOneEvent(eventID, userID);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  res.status(204).send();
});

module.exports = router;
