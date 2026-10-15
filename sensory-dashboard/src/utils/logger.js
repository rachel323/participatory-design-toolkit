const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const logFilePath = path.join(__dirname, '../../logs.json');

function readLogs() {
    if (!fs.existsSync(logFilePath)) {
        return [];
    }

    const data = fs.readFileSync(logFilePath, 'utf8');
    if (!data.trim()) {
        return [];
    }

    const logs = JSON.parse(data);
    if (!Array.isArray(logs)) {
        throw new Error('logs.json must contain a JSON array');
    }

    return logs;
}

function writeLogs(logs, targetPath = logFilePath) {
    const temporaryPath = `${targetPath}.${process.pid}.${crypto.randomUUID()}.tmp`;
    try {
        fs.writeFileSync(temporaryPath, JSON.stringify(logs, null, 2), 'utf8');
        fs.renameSync(temporaryPath, targetPath);
    } catch (error) {
        if (fs.existsSync(temporaryPath)) {
            fs.unlinkSync(temporaryPath);
        }
        throw error;
    }
}

function clearLogs(targetPath = logFilePath) {
    writeLogs([], targetPath);
}

function logAction(req, action, details = {}) {
    if (typeof action !== 'string' || !action.trim()) {
        throw new TypeError('Log action must be a non-empty string');
    }

    const sessionId = req.session?.customSessionId || 'no-session';
    const logEntry = {
        timestamp: new Date().toISOString(),
        sessionId,
        action: action.trim(),
        details
    };

    const logs = readLogs();
    logs.push(logEntry);
    writeLogs(logs);
}

module.exports = { logAction, readLogs, clearLogs };