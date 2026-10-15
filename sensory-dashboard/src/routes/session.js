const express = require('express');
const router = express.Router();

const path = require('path');
const { logAction, readLogs } = require('../utils/logger');

function getSessionLogs(req) {
    const sessionId = req.session?.customSessionId;
    if (!sessionId) {
        return [];
    }

    return readLogs().filter(log => log.sessionId === sessionId);
}

function escapeCsvCell(value) {
    let text = value == null ? '' : String(value);
    if (/^[=+\-@\t\r]/.test(text)) {
        text = `'${text}`;
    }
    return `"${text.replace(/"/g, '""')}"`;
}

function logsToCsv(logs) {
    const rows = [
        ['Timestamp', 'Session ID', 'Action', 'Details'],
        ...logs.map(log => [
            log.timestamp,
            log.sessionId,
            log.action,
            JSON.stringify(log.details ?? {})
        ])
    ];

    return `\uFEFF${rows.map(row => row.map(escapeCsvCell).join(',')).join('\r\n')}\r\n`;
}

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

    logAction(req, 'SESSION_START', {
        startTime: req.session.startTime
    });

    console.log(
        'Session gestart:',
        req.session.customSessionId
    );

    res.redirect('/dashboard.html');
});

// Stop sessie
router.post('/stop-session', (req, res) => {

    req.session.endTime = new Date().toISOString();

    try {
        logAction(req, 'SESSION_END', {
            startTime: req.session.startTime,
            endTime: req.session.endTime
        });
    } catch (error) {
        console.error('Could not write session end log:', error);
        return res.status(500).send('Could not save the session log. Please try again.');
    }

    res.redirect('/logs.html');
});

// Haal logs op
router.get('/api/logs', (req, res) => {
    try {
        res.json(getSessionLogs(req));
    } catch (error) {
        console.error('Could not read dashboard logs:', error);
        res.status(500).json({ error: 'Could not read dashboard logs' });
    }
});

router.get('/api/logs/export.csv', (req, res) => {
    try {
        const sessionId = req.session?.customSessionId || 'session';
        const safeSessionId = String(sessionId).replace(/[^a-zA-Z0-9_-]/g, '_');
        res.type('text/csv');
        res.attachment(`dashboard-logs-${safeSessionId}.csv`);
        res.send(logsToCsv(getSessionLogs(req)));
    } catch (error) {
        console.error('Could not export dashboard logs:', error);
        res.status(500).json({ error: 'Could not export dashboard logs' });
    }
});

router.logsToCsv = logsToCsv;

module.exports = router;