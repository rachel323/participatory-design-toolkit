//centraliseer logging vanuit wled.js en sound.js

const fs = require('fs');

const logAction = (req, action, details = {}) => {

    const sessionId = req.session?.customSessionId || 'no-session';
    const logEntry = {
        timestamp: new Date().toISOString(),
        sessionId,
        action,
        details
    };

    let logs = [];

    // Lees bestaande logs
    if (fs.existsSync('logs.json')) {
        try {

            const data = fs.readFileSync(
                'logs.json',
                'utf8'
            );
            if (data.trim() !== '') {
                logs = JSON.parse(data);
            }
        } catch (error) {
            console.error(
                'Fout bij lezen logs.json:',
                error
            );
        }
    }

    // Voeg nieuwe log toe
    logs.push(logEntry);

    // Schrijf terug als geldige JSON
    fs.writeFileSync(
        'logs.json',
        JSON.stringify(logs, null, 2),
        'utf8'
    );
    console.log('Logged:', logEntry);
};

module.exports = { logAction };