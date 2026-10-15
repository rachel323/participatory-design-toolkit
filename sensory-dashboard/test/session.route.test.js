const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const sessionRoutes = require('../src/routes/session');
const { clearLogs } = require('../src/utils/logger');

test('starting a new log file clears actions from previous sessions', () => {
  const logPath = path.join(os.tmpdir(), `dashboard-logs-${process.pid}-${Date.now()}.json`);

  try {
    fs.writeFileSync(logPath, JSON.stringify([
      { sessionId: 'old-session', action: 'PLAY_SOUND' }
    ]));

    clearLogs(logPath);

    assert.deepEqual(JSON.parse(fs.readFileSync(logPath, 'utf8')), []);
  } finally {
    if (fs.existsSync(logPath)) {
      fs.unlinkSync(logPath);
    }
  }
});

test('CSV export includes session actions and escapes spreadsheet formulas', () => {
  const csv = sessionRoutes.logsToCsv([
    {
      timestamp: '2026-10-15T07:00:00.000Z',
      sessionId: 'session-1',
      action: '=HYPERLINK("https://example.com")',
      details: { soundFile: '/sounds/track,1.wav' }
    }
  ]);

  assert.ok(csv.startsWith('\uFEFF"Timestamp","Session ID","Action","Details"'));
  assert.ok(csv.includes(`"'=HYPERLINK(""https://example.com"")"`));
  assert.ok(csv.includes('""soundFile"":""/sounds/track,1.wav""'));
});
