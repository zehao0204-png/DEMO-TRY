const assert = require('assert')
const { buildBadges } = require('../utils/badges')

const traits = ['walk', 'night', 'culture', 'nature', 'active', 'curious', 'calm', 'budget']
const plays = Array.from({ length: 8 }, (_, index) => ({
  id: `play-${index}`,
  district: `区域${index}`,
  traits
}))
const completed = Array.from({ length: 40 }, (_, index) => ({
  playId: `play-${index % plays.length}`,
  rating: 4,
  note: '值得记录'
}))

const locked = buildBadges([], plays)
const unlocked = buildBadges(completed, plays)

assert.strictEqual(unlocked.length, 20)
assert.strictEqual(new Set(unlocked.map(badge => badge.name)).size, 20)
assert.ok(locked.every(badge => !badge.unlocked))
assert.ok(unlocked.every(badge => badge.unlocked))

console.log('city badge checks passed')
