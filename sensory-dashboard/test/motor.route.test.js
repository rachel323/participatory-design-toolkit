const test = require('node:test');
const assert = require('node:assert/strict');
const motor = require('../src/routes/motor');

test('pattern request validation accepts valid duration and interval values', () => {
  const validation = motor.validatePatternRequest({
    on: true,
    duration: 250,
    interval: 400
  });

  assert.equal(validation.ok, true);
  assert.equal(validation.on, true);
  assert.equal(validation.duration, 250);
  assert.equal(validation.interval, 400);
});

test('pattern request validation rejects invalid negative duration', () => {
  const validation = motor.validatePatternRequest({
    on: false,
    duration: -10,
    interval: 200
  });

  assert.equal(validation.ok, false);
  assert.equal(validation.status, 400);
  assert.match(validation.error, /duration/i);
});
