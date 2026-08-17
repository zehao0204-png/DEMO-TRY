function getLevel(completedCount) {
  const completedInLevel = completedCount % 4
  const level = Math.floor(completedCount / 4) + 1
  return {
    level,
    name: '上海城市玩家',
    next: `再完成 ${4 - completedInLevel} 次升级到 LV.${level + 1}`,
    progress: completedInLevel * 25
  }
}

module.exports = { getLevel }
