const express = require('express');
const router = express.Router();

const path = require('path');
const { logAction, readLogs, clearLogs } = require('../utils/logger');

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
    const requestedSessionId = typeof req.body.sessionId === 'string'
        ? req.body.sessionId.trim()
        : '';
    const sessionId = requestedSessionId || `session-${Date.now()}`;
    const startTime = new Date().toISOString();

    try {
        clearLogs();
        req.session.startTime = startTime;
        req.session.customSessionId = sessionId;
        logAction(req, 'SESSION_START', { startTime });
    } catch (error) {
        console.error('Could not start session and reset dashboard logs:', error);
        return res.status(500).send('Could not start the session or reset its log. Please try again.');
    }

    console.log(
        'Session gestart:',
        sessionId
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