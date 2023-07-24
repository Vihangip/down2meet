const queries = require ('../mongoDB/EventQueries');
const { v4: uuid } = require('uuid');


var express = require('express');
// const Calendar = require('../mongoDB/Calendar');
const { randomUUID } = require('crypto');
var router = express.Router();

/* GET event listing. */
router.get('/:user_id', async(req, res, next) =>{

  console.log("server events getting events");
  let allEvent = await queries.getAllEvent({user_id: req.params.user_id}); //only get the specified user's events
  return res.send(allEvent);
});

/* GET event by ID. */
router.get('/:eventId', async(req, res, next) => {
  const foundEvent = await User.getOneEvent({event_id: req.params.event_id})
  if(!foundEvent) {}
  return res.status(404).send({message: 'Event not found'})
  // return res.send(foundEvent);
});

/* POST event. */
router.post('/', async(req, res, next) => {
  const event =  { 
    id: uuid(),
    user_id: req.body.user_id,
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end
  };
  const addedEvent = await queries.addEvent(event);
  // console.log(event);
  // console.log(addedEvent);
  res.status(201);
  return res.send(addedEvent);
});

/* DELETE event. */
router.delete('/:eventId', function(req, res, next) {
  const eventId = req.params.eventId;
  const deletedEvent = queries.deleteEvent(eventId);

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
