const express = require("express");
const axios = require("axios");
const router = express.Router();

const motors = {
    1: "192.168.2.102", //de blauwe
    2: "192.168.2.104", //de roze
    3: "192.168.2.105", //groen
    4: "192.168.2.102" // oranje
};

function validatePatternRequest({ on, duration, interval }) {
    const isOn = typeof on === "string" ? on.toLowerCase() === "true" : Boolean(on);
    const parsedDuration = Number(duration);
    const parsedInterval = Number(interval);

    if (!Number.isFinite(parsedDuration) || parsedDuration < 0) {
        return {
            ok: false,
            status: 400,
            error: "Ongeldige duration. Gebruik een positief getal in milliseconden."
        };
    }

    if (!Number.isFinite(parsedInterval) || parsedInterval < 0) {
        return {
            ok: false,
            status: 400,
            error: "Ongeldige interval. Gebruik een positief getal in milliseconden."
        };
    }

    return {
        ok: true,
        on: isOn,
        duration: Math.round(parsedDuration),
        interval: Math.round(parsedInterval)
    };
}

router.post("/:id/vibrate", async (req, res) => {

    const ip = motors[req.params.id];

    if (!ip) {
        return res.status(404).send("Motor bestaat niet");
    }

    try {

        await axios.get(`http://${ip}/vibrate`, {
            timeout: 3000,
            validateStatus: status => status >= 200 && status < 400
        });

        res.json({
            success: true
        });

    } catch (err) {

        console.error(`Motor ${req.params.id} vibration failed: ${err.message}`);

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

router.post("/:id/pattern", async (req, res) => {
    const ip = motors[req.params.id];

    if (!ip) {
        return res.status(404).send("Motor bestaat niet");
    }

    const validation = validatePatternRequest(req.body || {});

    if (!validation.ok) {
        return res.status(validation.status).json({
            success: false,
            error: validation.error
        });
    }

    try {
        const { on, duration, interval } = validation;

        await axios.get(`http://${ip}/pattern?on=${String(on)}&duration=${duration}&interval=${interval}`, {
            timeout: 3000,
            validateStatus: status => status >= 200 && status < 400
        });

        res.json({
            success: true,
            on,
            duration,
            interval
        });
    } catch (err) {
        console.error(`Motor ${req.params.id} pattern failed: ${err.message}`);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;
module.exports.validatePatternRequest = validatePatternRequest;