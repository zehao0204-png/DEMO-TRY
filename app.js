const { applyFeedback } = require('./utils/recommend')

const STORAGE_KEY = 'weekend-unboxed-state-v1'
function emptyState() {
  return {
    challenges: [],
    records: [],
    tagScores: {},
    seenIds: []
  }
}

App({
  getState() {
    const saved = wx.getStorageSync(STORAGE_KEY)
    if (!saved || !saved.records) return emptyState()
    const challenges = Array.isArray(saved.challenges)
      ? saved.challenges
      : saved.current ? [saved.current] : []
    const { current, ...rest } = saved
    return { ...emptyState(), ...rest, challenges: challenges.slice(0, 4) }
  },

  saveState(state) {
    wx.setStorageSync(STORAGE_KEY, state)
    return state
  },

  recordSeen(playId) {
    const state = this.getState()
    state.seenIds = [playId, ...state.seenIds.filter(id => id !== playId)].slice(0, 8)
    return this.saveState(state)
  },

  acceptChallenge(playId) {
    const state = this.getState()
    if (state.challenges.some(item => item.playId === playId)) return 'exists'
    if (state.challenges.length >= 4) return 'full'
    state.challenges.push({ playId, acceptedAt: Date.now(), status: 'active' })
    this.saveState(state)
    return 'accepted'
  },

  abandonChallenge(playId) {
    const state = this.getState()
    const challenge = state.challenges.find(item => item.playId === playId)
    if (!challenge) return state
    state.records.unshift({
      ...challenge,
      status: 'abandoned',
      finishedAt: Date.now()
    })
    state.challenges = state.challenges.filter(item => item.playId !== playId)
    return this.saveState(state)
  },

  completeChallenge(playId, feedback, play) {
    const state = this.getState()
    const challenge = state.challenges.find(item => item.playId === playId)
    if (!challenge || playId !== play.id) return state
    const record = {
      ...challenge,
      ...feedback,
      status: 'completed',
      finishedAt: Date.now()
    }
    state.records.unshift(record)
    state.tagScores = applyFeedback(state.tagScores, play, feedback.rating)
    state.challenges = state.challenges.filter(item => item.playId !== playId)
    return this.saveState(state)
  }
})
