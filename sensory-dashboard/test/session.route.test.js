const test = require('node:test');
const assert = require('node:assert/strict');
const sessionRoutes = require('../src/routes/session');

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
