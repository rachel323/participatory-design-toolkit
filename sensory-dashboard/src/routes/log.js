const express = require('express');
const router = express.Router();
const { logAction } = require('../utils/logger');

router.post('/', (req, res) => {
    const { action, details } = req.body;
    logAction(req, action, details);
    res.sendStatus(200);
});

module.exports = router;