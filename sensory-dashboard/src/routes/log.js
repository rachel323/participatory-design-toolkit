const express = require('express');
const router = express.Router();
const { logAction } = require('../utils/logger');

router.post('/', (req, res) => {
    const { action, details } = req.body;

    if (typeof action !== 'string' || !action.trim()) {
        return res.status(400).json({ error: 'A non-empty action is required' });
    }

    try {
        logAction(req, action, details);
        res.sendStatus(201);
    } catch (error) {
        console.error('Could not write dashboard log:', error);
        res.status(500).json({ error: 'Could not write dashboard log' });
    }
});

module.exports = router;