const express = require("express");
const router = express.Router();

router.post("/:id/vibrate", async (req, res) => {

    //check the IP addresses from the ESP's on the WiFi
    const motors = {
        1: "192.168.1.155",
        2: "192.168.1.102",
        3: "192.168.1.103"
    };

    const ip = motors[req.params.id];

    if (!ip) {
        return res.status(404).send("Motor bestaat niet");
    }

    try {

        await fetch(`http://${ip}/vibrate`);

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = router;