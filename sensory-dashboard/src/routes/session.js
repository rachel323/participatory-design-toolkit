const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

// Startpagina
router.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../../public/welkom.html')
    );
});

// Start sessie
router.post('/start-session', (req, res) => {

    req.session.startTime = new Date().toISOString();

    // Gebruik custom ID of fallback
    req.session.customSessionId =
        req.body.sessionId || `session-${Date.now()}`;

    console.log(
        'Session gestart:',
        req.session.customSessionId
    );

    res.redirect('/dashboard.html');
});

// Stop sessie
router.post('/stop-session', (req, res) => {

    req.session.endTime = new Date().toISOString();

    res.redirect('/logs.html');
});

// Haal logs op
router.get('/api/logs', (req, res) => {

    try {

        if (!fs.existsSync('logs.json')) {
            return res.json([]);
        }

        const logs = fs.readFileSync(
            'logs.json',
            'utf8'
        );

        const allLogs =
            logs.trim() === ''
                ? []
                : JSON.parse(logs);

        const sessionLogs = allLogs.filter(
            log =>
                log.sessionId ===
                req.session.customSessionId
        );

        res.json(sessionLogs);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Fout bij ophalen logs'
        });
    }
});

module.exports = router;