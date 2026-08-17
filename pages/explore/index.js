const plays = require('../../data/plays')
const { buildProfile } = require('../../utils/recommend')
const { getLevel } = require('../../utils/progress')

const playMap = Object.fromEntries(plays.map(play => [play.id, play]))
const faces = ['', '😕', '😐', '🙂', '🤩']

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

function countTrait(completed, trait) {
  return completed.filter(record => {
    const play = playMap[record.playId]
    return play && play.traits.includes(trait)
  }).length
}

Page({
  data: {
    completedCount: 0,
    districtCount: 0,
    averageRating: '—',
    levelNumber: 1,
    levelName: '上海城市玩家',
    nextLevelText: '再完成 4 次升级到 LV.2',
    levelProgress: 0,
    profile: { title: '', description: '', topTags: [] },
    badges: [],
    timeline: [],
    hasRecords: false
  },

  onShow() {
    this.refresh()
  },

  onCloudStateReady() {
    this.refresh()
  },

  onPullDownRefresh() {
    this.refresh()
    wx.stopPullDownRefresh()
  },

  refresh() {
    const state = getApp().getState()
    const records = state.records
    const completed = records.filter(record => record.status === 'completed')
    const completedCount = state.stats.completedCount
    const districts = new Set(completed.map(record => playMap[record.playId]?.district).filter(Boolean))
    const ratingTotal = completed.reduce((sum, record) => sum + record.rating, 0)
    const level = getLevel(completedCount)
    const badges = [
      { icon: '🚪', name: '周末出逃者', need: '完成1次挑战', unlocked: completed.length >= 1 },
      { icon: '👟', name: '街区漫游者', need: '完成3次步行探索', unlocked: countTrait(completed, 'walk') >= 3 },
      { icon: '🌙', name: '夜行动物', need: '完成2次夜间挑战', unlocked: countTrait(completed, 'night') >= 2 },
      { icon: '🎨', name: '野生文艺青年', need: '完成3次文艺挑战', unlocked: countTrait(completed, 'culture') >= 3 },
      { icon: '🗺️', name: '跨区玩家', need: '点亮4个上海区域', unlocked: districts.size >= 4 },
      { icon: '🎲', name: '隐藏款猎人', need: '完成8次不同挑战', unlocked: completed.length >= 8 }
    ]
    const timeline = records.slice(0, 20).map(record => {
      const play = playMap[record.playId]
      return {
        ...record,
        play,
        dateText: formatDate(record.finishedAt || record.acceptedAt),
        statusText: record.status === 'completed' ? '挑战完成' : '放回盲盒',
        face: record.status === 'completed' ? faces[record.rating] : '↩',
        tagsText: (record.feedbackTags || []).join(' · ')
      }
    }).filter(record => record.play)

    this.setData({
      completedCount,
      districtCount: districts.size,
      averageRating: completed.length ? (ratingTotal / completed.length).toFixed(1) : '—',
      levelNumber: level.level,
      levelName: level.name,
      nextLevelText: level.next,
      levelProgress: level.progress,
      profile: buildProfile(records, plays),
      badges,
      timeline,
      hasRecords: records.length > 0
    })
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  onShareAppMessage() {
    const profile = this.data.profile
    return {
      title: profile ? `我的上海人格：${profile.title}` : '来发现你的上海城市人格',
      path: '/pages/index/index'
    }
  }
})
