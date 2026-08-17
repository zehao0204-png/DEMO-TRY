const assert = require('assert')

let saved = {
  current: { playId: 'legacy', acceptedAt: 1, status: 'active' },
  records: [],
  tagScores: {},
  seenIds: []
}
let app

global.wx = {
  getStorageSync: () => saved,
  setStorageSync: (key, value) => { saved = value }
}
global.App = config => { app = config }

require('../app')

assert.deepStrictEqual(app.getState().challenges.map(item => item.playId), ['legacy'])
assert.strictEqual(app.acceptChallenge('second'), 'accepted')
assert.strictEqual(app.acceptChallenge('third'), 'accepted')
assert.strictEqual(app.acceptChallenge('fourth'), 'accepted')
assert.strictEqual(app.acceptChallenge('fifth'), 'full')
assert.strictEqual(saved.challenges.length, 4)

app.completeChallenge('second', { rating: 4 }, { id: 'second', traits: ['curious'] })
assert.strictEqual(saved.challenges.length, 3)
assert.strictEqual(saved.records[0].status, 'completed')
assert.strictEqual(saved.stats.completedCount, 1)

app.abandonChallenge('legacy')
assert.strictEqual(saved.challenges.length, 2)
assert.strictEqual(saved.records[0].status, 'abandoned')

console.log('challenge state checks passed')
