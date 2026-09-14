const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/:id/vibrate", async (req, res) => {

    //check the IP addresses from the ESP's on the WiFi
    const motors = {
        1: "192.168.1.66", //de blauwe
        2: "192.168.1.73", //de roze
        3: "192.168.1.103"
    };

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

module.exports = router;