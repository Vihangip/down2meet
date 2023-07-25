const queries = require ('../mongoDB/EventQueries');
const { v4: uuid } = require('uuid');


var express = require('express');
// const Calendar = require('../mongoDB/Calendar');
var router = express.Router();

/* GET event listing. */
router.get('/', async(req, res, next) =>{
  let allEvent = await queries.getAllEvent();
  return res.send(allEvent);
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
    id: uuid(),
    userID: uuid(), // TODO: adding dummy var now, will populate with actual userID
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    groups: req.body.groups, // TODO: adding dummy var now, will populate with actual group names
  };
  const addedEvent = await queries.addEvent(event);
  // console.log(event);
  // console.log(addedEvent);
  res.status(201);
  return res.send(addedEvent);
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
