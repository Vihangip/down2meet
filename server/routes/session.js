const express = require('express');
const router = express.Router();
const User = require('./users');


router.get('/', (req, res) => {
    // Return the user data stored in req.session.user
    res.json(req.session.user);
});

module.exports = router;