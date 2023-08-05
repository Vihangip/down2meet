const queries = require ('../mongoDB/EventQueries');
const { v4: uuid } = require('uuid');


var express = require('express');
const User = require('../mongoDB/User');
// const Calendar = require('../mongoDB/Calendar');
var router = express.Router();

/* GET event listing. */
router.get('/:user_id', async(req, res, next) =>{

  let allEvent = await queries.getAllEvent({userID: req.params.user_id}); //only get the specified user's events
  return res.send(allEvent);       ////////////// not sure if this is userID or user_id
});

/* GET event by ID. */
router.get('/:eventId', async(req, res, next) => {
  const foundEvent = await User.getOneEvent({id: req.params.eventId})
  if(!foundEvent) {
    return res.status(404).send({message: 'Event not found'})
  }

  return res.send(foundEvent);
});

/* POST event. */
router.post('/', async(req, res, next) => {
  const event =  { 
    id: req.body.id ? req.body.id : uuid(),
    email: req.body.email,
    userID: req.body.userID, //uuid(), // TODO: adding dummy var now, will populate with actual userID
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

/* event linked with user. */
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

/* DELETE event. */
router.delete('/:eventId', async(req, res, next) => {
  const eventId = req.params.eventId;
  const deletedEvent = await queries.deleteEvent(eventId);

  if (!deletedEvent) {
    return res.status(404).send('Event not found');
  }

  res.status(204);
  return res.send();
});


// TODO: STRECTCH REQ TO IMPLEMENT UPDATE
// // can edit the description of the event
/*
router.put('/:eventdesc', async function(req, res, next) {
  const eventdesc = req.params.eventdesc;
  const editedEvent = await queries.editEvent(eventdesc);

  if (!editedEvent) {
    return res.status(404).send({ message: 'Event not found' });
  }

  // Set status code to 200 (okay)
  return res.status(200);

});
*/
module.exports = router;
