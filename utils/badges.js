function buildBadges(completed, plays) {
  const playMap = Object.fromEntries(plays.map(play => [play.id, play]))
  const traitCounts = {}
  const districts = new Set()
  const playIds = new Set()
  let perfectCount = 0
  let noteCount = 0

  completed.forEach(record => {
    const play = playMap[record.playId]
    if (!play) return
    playIds.add(play.id)
    districts.add(play.district)
    play.traits.forEach(trait => { traitCounts[trait] = (traitCounts[trait] || 0) + 1 })
    if (record.rating === 4) perfectCount += 1
    if (record.note && record.note.trim()) noteCount += 1
  })

  const count = trait => traitCounts[trait] || 0
  return [
    { icon: '🚪', name: '周末出逃者', need: '完成1次挑战', unlocked: completed.length >= 1 },
    { icon: '⭐', name: '四次元周末', need: '完成4次挑战', unlocked: completed.length >= 4 },
    { icon: '🧭', name: '城市熟客', need: '完成12次挑战', unlocked: completed.length >= 12 },
    { icon: '🏙️', name: '周末常驻民', need: '完成20次挑战', unlocked: completed.length >= 20 },
    { icon: '🏆', name: '上海老玩家', need: '完成40次挑战', unlocked: completed.length >= 40 },
    { icon: '👟', name: '街区漫游者', need: '完成3次步行探索', unlocked: count('walk') >= 3 },
    { icon: '🥾', name: '马路丈量师', need: '完成10次步行探索', unlocked: count('walk') >= 10 },
    { icon: '🌙', name: '夜行动物', need: '完成2次夜间挑战', unlocked: count('night') >= 2 },
    { icon: '🎨', name: '野生文艺青年', need: '完成3次文艺挑战', unlocked: count('culture') >= 3 },
    { icon: '🖼️', name: '城市策展人', need: '完成10次文艺挑战', unlocked: count('culture') >= 10 },
    { icon: '🌿', name: '绿洲收藏家', need: '完成3次自然挑战', unlocked: count('nature') >= 3 },
    { icon: '⚡', name: '能量玩家', need: '完成3次运动挑战', unlocked: count('active') >= 3 },
    { icon: '🔎', name: '细节侦探', need: '完成5次猎奇挑战', unlocked: count('curious') >= 5 },
    { icon: '☕', name: '慢生活专家', need: '完成5次治愈挑战', unlocked: count('calm') >= 5 },
    { icon: '🪙', name: '精打细玩家', need: '完成5次低预算挑战', unlocked: count('budget') >= 5 },
    { icon: '🗺️', name: '跨区玩家', need: '点亮4个上海区域', unlocked: districts.size >= 4 },
    { icon: '🧩', name: '地图拼图师', need: '点亮8个上海区域', unlocked: districts.size >= 8 },
    { icon: '🎲', name: '隐藏款猎人', need: '完成8个不同挑战', unlocked: playIds.size >= 8 },
    { icon: '💯', name: '满分体验官', need: '给出5次满分评价', unlocked: perfectCount >= 5 },
    { icon: '✍️', name: '城市记录员', need: '写下5次探索感受', unlocked: noteCount >= 5 }
  ]
}

module.exports = { buildBadges }
