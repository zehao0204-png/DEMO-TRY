const cloud = require('wx-server-sdk')
const { normalizeState } = require('./state')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const states = db.collection('user_states')

async function getCurrent(openid) {
  try {
    const result = await states.where({ _id: openid }).limit(1).get()
    return result.data[0]
  } catch (error) {
    const collectionMissing = error.errCode === -502005
      || /collection.*(not exist|不存在)/i.test(error.message || '')
    if (!collectionMissing) throw error
    await db.createCollection('user_states')
    return null
  }
}

exports.main = async event => {
  const { OPENID } = cloud.getWXContext()
  if (!OPENID) throw new Error('Missing user identity')

  const current = await getCurrent(OPENID)

  if (event.action === 'get') {
    return {
      ok: true,
      exists: Boolean(current),
      state: current ? current.state : null
    }
  }

  if (event.action !== 'save') throw new Error('Unsupported action')

  const next = normalizeState(event.state)
  if (current && current.state.updatedAt > next.updatedAt) {
    return { ok: true, saved: false, stale: true, state: current.state }
  }

  await states.doc(OPENID).set({
    data: {
      state: next,
      updatedAt: db.serverDate()
    }
  })
  return { ok: true, saved: true }
}
