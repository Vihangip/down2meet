var express = require('express');
var router = express.Router();

var groups = [
  { id: "lossantos", name: "Los Santos Pollos Hermanos", members: ["Cap'n Cook", "Heisenberg", "me"]},
  { id: "dea", name: "Drug Enforcement Administration", members: ["Gomie", "ASAC Schrader", "me"]}
]


/* GET groups listing. */
router.get('/', function(req, res, next) {
  return res.send(groups);
});

/* GET group by ID. */
router.get('/:groupID', function(req, res, next) {
  const group = groups.find((group) => group.id === req.params.id);
  return res.send(group);
});

/* POST group. */
router.post('/', function(req, res, next) {
  const group = req.body;
  groups.push(group);

  res.status(201);
  return res.send(group);
});



module.exports = router;
