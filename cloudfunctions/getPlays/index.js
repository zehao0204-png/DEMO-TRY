const cloud = require('wx-server-sdk')
const seed = require('./seed.json')
const { sanitizePlay } = require('./catalog')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const plays = db.collection('plays')

async function ensureCollection() {
  try {
    await plays.limit(1).get()
  } catch (error) {
    const missing = error.errCode === -502005 || /collection.*(not exist|不存在)/i.test(error.message || '')
    if (!missing) throw error
    try {
      await db.createCollection('plays')
    } catch (createError) {
      if (!/(exist|已存在)/i.test(createError.message || '')) throw createError
    }
  }
}

async function readPublished() {
  const result = []
  const pageSize = 100
  for (let offset = 0; ; offset += pageSize) {
    const page = await plays.where({ status: 'published' }).skip(offset).limit(pageSize).get()
    result.push(...page.data)
    if (page.data.length < pageSize) return result
  }
}

async function seedMissing() {
  const current = await readPublished()
  const currentIds = new Set(current.map(play => play.id))
  const missing = seed.filter(play => !currentIds.has(play.id))
  for (let index = 0; index < missing.length; index += 20) {
    const batch = missing.slice(index, index + 20)
    await Promise.all(batch.map(play => plays.doc(play.id).set({ data: play })))
  }
  return missing.length ? readPublished() : current
}

exports.main = async () => {
  await ensureCollection()
  const documents = await seedMissing()
  const published = documents.map(sanitizePlay).filter(Boolean)
  return { ok: true, count: published.length, plays: published }
}
