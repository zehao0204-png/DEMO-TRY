const { applyFeedback } = require('./utils/recommend')

const STORAGE_KEY = 'weekend-unboxed-state-v1'
function emptyState() {
  return {
    current: null,
    records: [],
    tagScores: {},
    seenIds: []
  }
}

App({
  getState() {
    const saved = wx.getStorageSync(STORAGE_KEY)
    return saved && saved.records ? saved : emptyState()
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
    if (state.current && state.current.playId !== playId) {
      state.records.unshift({
        ...state.current,
        status: 'abandoned',
        finishedAt: Date.now()
      })
    }
    state.current = { playId, acceptedAt: Date.now(), status: 'active' }
    return this.saveState(state)
  },

  abandonChallenge() {
    const state = this.getState()
    if (!state.current) return state
    state.records.unshift({
      ...state.current,
      status: 'abandoned',
      finishedAt: Date.now()
    })
    state.current = null
    return this.saveState(state)
  },

  completeChallenge(feedback, play) {
    const state = this.getState()
    if (!state.current || state.current.playId !== play.id) return state
    const record = {
      ...state.current,
      ...feedback,
      status: 'completed',
      finishedAt: Date.now()
    }
    state.records.unshift(record)
    state.tagScores = applyFeedback(state.tagScores, play, feedback.rating)
    state.current = null
    return this.saveState(state)
  }
})
