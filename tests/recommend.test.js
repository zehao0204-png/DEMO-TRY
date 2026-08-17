const assert = require('assert')
const { pickPlay, applyFeedback, buildProfile } = require('../utils/recommend')
const shanghaiPlays = require('../data/plays')

const plays = [
  { id: 'quiet', moods: ['healing'], traits: ['calm', 'walk'] },
  { id: 'loud', moods: ['thrill'], traits: ['active', 'social'] }
]

const scores = applyFeedback({}, plays[0], 4)
assert.deepStrictEqual(scores, { calm: 3, walk: 3 })
assert.strictEqual(pickPlay(plays, {
  mood: 'healing',
  tagScores: scores,
  random: () => 0.5
}).play.id, 'quiet')

const profile = buildProfile([
  { status: 'completed', playId: 'quiet', rating: 4 },
  { status: 'completed', playId: 'quiet', rating: 3 },
  { status: 'completed', playId: 'quiet', rating: 4 }
], plays)
assert.strictEqual(profile.title, '安静的城市考古者')

assert.ok(shanghaiPlays.length >= 18)
assert.strictEqual(new Set(shanghaiPlays.map(play => play.id)).size, shanghaiPlays.length)
shanghaiPlays.forEach(play => {
  assert.ok(play.title && play.mission && play.steps.length === 3)
  assert.ok(play.latitude >= -90 && play.latitude <= 90)
  assert.ok(play.longitude >= -180 && play.longitude <= 180)
})

console.log('recommendation checks passed')
