const test = require('node:test');
const assert = require('node:assert/strict');
const router = require('../src/routes/sound');
const config = require('../src/routes/config');

test('config password validation rejects wrong password before save proceeds', () => {
  process.env.ADMIN_PASSWORD = 'AdminPassword123!';

  const validation = config.verifyAdminPassword('wrong-password');

  assert.equal(validation.ok, false);
  assert.equal(validation.status, 401);
  assert.equal(validation.error, 'Onjuist admin wachtwoord');
});

test('sound replacement validation is file-aware and does not depend on config password', () => {
  const validation = router.validateReplaceRequest({
    soundId: 'bg_jazz.mp3',
    file: undefined,
    soundType: 'music'
  });

  assert.equal(validation.ok, false);
  assert.equal(validation.status, 400);
  assert.equal(validation.error, 'Geen bestand geüpload');
});
