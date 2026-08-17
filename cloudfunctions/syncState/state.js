const MAX_RECORDS = 500

function text(value, maxLength) {
  return typeof value === 'string' ? value.slice(0, maxLength) : ''
}

function time(value) {
  return Number.isFinite(value) && value >= 0 ? value : 0
}

function normalizeChallenge(value) {
  const playId = text(value && value.playId, 64)
  if (!playId) return null
  return {
    playId,
    acceptedAt: time(value.acceptedAt),
    status: 'active'
  }
}

function normalizeRecord(value) {
  const playId = text(value && value.playId, 64)
  if (!playId) return null
  const rating = Number(value.rating)
  return {
    playId,
    acceptedAt: time(value.acceptedAt),
    finishedAt: time(value.finishedAt),
    status: value.status === 'completed' ? 'completed' : 'abandoned',
    rating: rating >= 1 && rating <= 4 ? rating : 0,
    feedbackTags: Array.isArray(value.feedbackTags)
      ? value.feedbackTags.slice(0, 8).map(item => text(item, 24)).filter(Boolean)
      : [],
    note: text(value.note, 200)
  }
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') throw new Error('Invalid state')
  const tagScores = {}
  Object.entries(value.tagScores || {}).slice(0, 30).forEach(([key, score]) => {
    if (key.length <= 32 && Number.isFinite(score)) tagScores[key] = Math.max(-20, Math.min(20, score))
  })
  const records = (Array.isArray(value.records) ? value.records : [])
    .slice(0, MAX_RECORDS).map(normalizeRecord).filter(Boolean)
  const recordedCompletions = records.filter(item => item.status === 'completed').length
  return {
    challenges: (Array.isArray(value.challenges) ? value.challenges : [])
      .slice(0, 4).map(normalizeChallenge).filter(Boolean),
    records,
    tagScores,
    seenIds: (Array.isArray(value.seenIds) ? value.seenIds : [])
      .slice(0, 8).map(item => text(item, 64)).filter(Boolean),
    stats: {
      completedCount: Math.max(
        time(value.stats && value.stats.completedCount),
        recordedCompletions
      )
    },
    updatedAt: time(value.updatedAt)
  }
}

module.exports = { normalizeState }
