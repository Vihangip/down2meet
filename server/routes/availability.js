const queries = require ('../database/queries');


var express = require('express');
// const Calendar = require('../mongoDB/Calendar');
const { randomUUID } = require('crypto');
var router = express.Router();

/* GET availability listing. */
router.get('/', async(req, res, next) =>{
  let allAvailability = await queries.getAllAvailability();
  return res.send(allAvailability);
});

/* GET availability by ID. */
router.get('/:availabilityId', async(req, res, next) => {
  const foundAvailability = await User.getOneAvailability({availability_id: req.params.availability_id})
  if(!foundAvailability) {}
  return res.status(404).send({message: 'Availability not found'})
  // return res.send(foundAvailability);
});

/* POST availability. */
router.post('/', async(req, res, next) => {
  const availability =  { 
      availability_id: req.body.availability_id,
      title: req.body.title,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end
    };
  const addedAvailability = await queries.addedAvailability(availability);
  res.status(201);
  return res.send(addedAvailability);
});

/* DELETE availability. */
router.delete('/:availabilityId', function(req, res, next) {
  const availabilityId = req.params.availabilityId;
  const deletedAvailability = queries.deleteAvailability(availabilityId);

  if (!deletedAvailability) {
    return res.status(404).send('Availability not found');
  }

  res.status(204);
  return res.send();
});


// can edit the description of the availability
router.put('/:availabilitydesc', async function(req, res, next) {
  const availabilitydesc = req.params.availabilitydesc;
  const editedAvailability = await queries.editAvailability(availabilitydesc);

  if (!editedAvailability) {
    return res.status(404).send({ message: 'Availability not found' });
  }

  // Set status code to 200 (okay)
  return res.status(200);

});
module.exports = router;
