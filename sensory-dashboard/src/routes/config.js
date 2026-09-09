require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });
const configPath = path.join(__dirname, '../../config.json');
const soundsDir = path.join(__dirname, '../../public/sounds');

const defaultConfig = {
  sections: {
    sound: true,
    ledStrip: true,
    haptics: true
  }
};

function ensureConfigFile() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf8');
  }
}

function loadConfig() {
  ensureConfigFile();

  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    if (!raw.trim()) {
      return { ...defaultConfig };
    }

    const parsed = JSON.parse(raw);
    return {
      sections: {
        sound: parsed.sections?.sound ?? true,
        ledStrip: parsed.sections?.ledStrip ?? true,
        haptics: parsed.sections?.haptics ?? true
      }
    };
  } catch (error) {
    console.error('Could not read config.json:', error);
    return { ...defaultConfig };
  }
}

function saveConfig(config) {
  ensureConfigFile();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}

function verifyAdminPassword(adminPassword) {
  const configuredPassword = (process.env.ADMIN_PASSWORD || '').trim();

  if (!configuredPassword) {
    return { ok: false, status: 500, error: 'ADMIN_PASSWORD ontbreekt in de .env' };
  }

  if (!adminPassword || String(adminPassword).trim() !== configuredPassword) {
    return { ok: false, status: 401, error: 'Onjuist admin wachtwoord' };
  }

  return { ok: true };
}

function replaceSoundFile(reqFile, soundId) {
  if (!reqFile || !soundId) {
    return;
  }

  if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
  }

  const targetPath = path.join(soundsDir, soundId);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }

  fs.renameSync(reqFile.path, targetPath);
}

router.get('/', (req, res) => {
  res.json(loadConfig());
});

router.post('/save', upload.any(), (req, res) => {
  const { adminPassword, sound, ledStrip, haptics, soundType, soundId, customSoundId } = req.body || {};

  const passwordCheck = verifyAdminPassword(adminPassword);
  if (!passwordCheck.ok) {
    return res.status(passwordCheck.status).json({ success: false, error: passwordCheck.error });
  }

  const nextConfig = {
    sections: {
      sound: sound === true || sound === 'true' || sound === 'on' || sound === '1',
      ledStrip: ledStrip === true || ledStrip === 'true' || ledStrip === 'on' || ledStrip === '1',
      haptics: haptics === true || haptics === 'true' || haptics === 'on' || haptics === '1'
    }
  };

  saveConfig(nextConfig);

  const file = Array.isArray(req.files) ? req.files.find(file => file.fieldname === 'soundFile') : null;
  const requestedSoundId = String(customSoundId || soundId || '').trim();

  if (file && file.path && requestedSoundId && ['music', 'sfx'].includes(soundType)) {
    replaceSoundFile(file, requestedSoundId);
  } else if (file && !requestedSoundId) {
    return res.status(400).json({ success: false, error: 'Ongeldig geluids-ID' });
  }

  res.json({ success: true, config: nextConfig, soundId: requestedSoundId || null });
});

module.exports = {
  router,
  loadConfig,
  saveConfig,
  verifyAdminPassword,
  defaultConfig
};
