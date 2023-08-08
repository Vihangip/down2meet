const express = require('express');
const router = express.Router();
const User = require('./users');


router.get('/', (req, res) => {
    res.json(req.session.user);
});

module.exports = router;