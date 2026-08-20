const express = require('express');
const router = express.Router();
const axios = require('axios');
const { logAction } = require('../utils/logger');

// Proxy endpoint voor WLED commando's
router.post('/', async (req, res) => {
    console.log('=== Ontvangen WLED commando ===');
    console.log('Body:', req.body);

    const { command, description } = req.body;
    if (!command) {
        console.error('Geen commando ontvangen!');
        return res.status(400).send('Geen commando meegegeven');
    }

    logAction(req, 'WLED_COMMAND', { command, description });

    try {
        let jsonPayload = {};
        if (command.includes('on')) jsonPayload.on = true;
        else if (command.includes('off')) jsonPayload.on = false;
        // brightness command
        else if (command.includes('A=')) {
            const brightness = command.split('A=')[1];
            jsonPayload.bri = parseInt(brightness);
            jsonPayload.on = true;
            jsonPayload.seg = { col: [[255, 255, 255]] };
        }
        // send color command
        else if (command.includes('R=')) {
            const parts = command.split('&');
            const r = parseInt(parts.find(p => p.startsWith('R='))?.split('=')[1] || 0);
            const g = parseInt(parts.find(p => p.startsWith('G='))?.split('=')[1] || 0);
            const b = parseInt(parts.find(p => p.startsWith('B='))?.split('=')[1] || 0);
            jsonPayload.seg = { col: [[r, g, b]] };
            jsonPayload.on = true;
        }
         // send effect command
        else if (command.includes('FX=')) {
            const effect = parseInt(command.split('FX=')[1]);

            jsonPayload.on = true;
            jsonPayload.seg = {
                fx: effect
            };
        }

        console.log('Doorsturen naar WLED (JSON):', jsonPayload);
        const wledUrl = 'http://4.3.2.1/json/state';
        const response = await axios.post(wledUrl, jsonPayload);
        console.log('WLED reactie status:', response.status);
        res.status(200).send('WLED JSON command sent');
    } catch (error) {
        console.error('Fout bij doorsturen naar WLED:', error.message);
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;