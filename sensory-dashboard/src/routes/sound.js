const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { logAction } = require('../utils/logger');

// Configuur multer voor tijdelijke opslag
const upload = multer({ dest: 'uploads/' });

// Pad naar de sounds map
const soundsDir = path.join(__dirname, '../../public/sounds');

// Zorg dat de sounds map bestaat
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// Lijst van bestaande geluiden (statisch, gebaseerd op je HTML)
const existingSounds = {
  music: [
    { id: 'bg_1.wav', name: '1' },
    { id: 'bg_2.wav', name: '2' },
    { id: 'bg_3.wav', name: '3' },
    { id: 'bg_4.wav', name: '4' },
    { id: 'bg_5.wav', name: '5' },
    { id: 'bg_6.wav', name: '6' }
  ],
  sfx: [
    { id: 'sfx_1.1.wav', name: 'Pling' },
    { id: 'sfx_1.2.wav', name: 'Plop' },
    { id: 'sfx_1.3.wav', name: 'Honk' },
    { id: 'sfx_2.1.wav', name: 'Whoosh' },
    { id: 'sfx_2.2.wav', name: 'Spring' },
    { id: 'sfx_2.3.wav', name: 'Drum' }
  ]
};

// Endpoint om de lijst met geluiden op te halen
router.get('/list', (req, res) => {
  res.json(existingSounds);
});

// Upload endpoint (alleen voor admins)
router.post('/upload', upload.single('soundFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Geen bestand geüpload' });
  }

  // Verplaats het bestand naar de public/sounds map
  const newPath = path.join(soundsDir, req.file.originalname);
  fs.renameSync(req.file.path, newPath);

  res.json({
    success: true,
    filePath: `/sounds/${req.file.originalname}`
  });
});

function validateReplaceRequest({ soundId, file, soundType }) {
  if (!soundId || !String(soundId).trim()) {
    return { ok: false, status: 400, error: 'Ongeldig geluids-ID' };
  }

  if (!file) {
    return { ok: false, status: 400, error: 'Geen bestand geüpload' };
  }

  if (!['music', 'sfx'].includes(soundType)) {
    return { ok: false, status: 400, error: 'Ongeldig geluids-type' };
  }

  return { ok: true, soundType };
}

// Endpoint om een geluid te vervangen
router.post('/replace', upload.single('soundFile'), (req, res) => {
  const { soundId, soundType } = req.body;

  const validation = validateReplaceRequest({
    soundId,
    file: req.file,
    soundType
  });

  if (!validation.ok) {
    return res.status(validation.status).json({ success: false, error: validation.error });
  }

  const cleanSoundId = String(soundId).trim();
  const category = soundType === 'music' ? 'music' : 'sfx';
  const existingLookup = [...existingSounds.music, ...existingSounds.sfx].some(item => item.id === cleanSoundId);

  if (!existingLookup) {
    existingSounds[category].push({ id: cleanSoundId, name: cleanSoundId });
  }

  // Verplaats het nieuwe bestand naar de sounds map met de bestaande naam
  const targetPath = path.join(soundsDir, cleanSoundId);

  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }

  fs.renameSync(req.file.path, targetPath);

  res.json({
    success: true,
    filePath: `/sounds/${cleanSoundId}`,
    message: `Geluid ${cleanSoundId} vervangen door ${req.file.originalname}`
  });
});

router.validateReplaceRequest = validateReplaceRequest;

module.exports = router;