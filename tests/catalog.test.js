const assert = require('assert')
const plays = require('../data/plays')
const seed = require('../cloudfunctions/getPlays/seed.json')
const { isValidPlay, sanitizePlay } = require('../cloudfunctions/getPlays/catalog')
const { wgs84ToGcj02 } = require('../utils/location')

const officialHosts = new Set([
  'whlyj.sh.gov.cn',
  'cmp.whlyj.sh.gov.cn',
  'www.shanghai.gov.cn',
  'www.meet-in-shanghai.net',
  'www.library.sh.cn'
])
const published = plays.filter(play => play.recommendable !== false && play.status === 'published')

assert.strictEqual(published.length, 100)
assert.strictEqual(seed.length, 100)
assert.strictEqual(new Set(plays.map(play => play.id)).size, plays.length)
assert.deepStrictEqual(seed.map(play => play.id), published.map(play => play.id).sort())

published.forEach(play => {
  assert.ok(isValidPlay(play), play.id)
  assert.strictEqual(sanitizePlay(play).id, play.id)
  assert.ok(officialHosts.has(new URL(play.sourceUrl).host), play.sourceUrl)
  assert.strictEqual(play.verifiedAt, '2026-08-18')
  assert.ok(!/(附近正规|就近匹配|根据当天)/.test(`${play.location}${play.address}`))
})

const converted = wgs84ToGcj02(31.2403094, 121.4919724)
assert.ok(converted.latitude > 31.23 && converted.latitude < 31.25)
assert.ok(converted.longitude > 121.49 && converted.longitude < 121.51)
assert.notStrictEqual(converted.longitude, 121.4919724)

console.log('verified catalog checks passed')
