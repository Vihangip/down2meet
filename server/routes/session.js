const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(req.session.user);
});

module.exports = router;