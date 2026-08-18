const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const plays = require(path.join(root, 'data', 'plays'))
  .filter(play => play.recommendable !== false && play.status === 'published')
  .sort((left, right) => left.id.localeCompare(right.id))
const output = `${JSON.stringify(plays, null, 2)}\n`
const target = path.join(root, 'cloudfunctions', 'getPlays', 'seed.json')

if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) {
    console.error('Cloud catalog seed is out of date')
    process.exitCode = 1
  }
} else {
  fs.writeFileSync(target, output)
  console.log(`Wrote ${plays.length} verified plays`)
}
