const VERIFIED_AT = '2026-08-18'

const SOURCES = {
  artMuseums: {
    title: '上海市文化和旅游局：2025年上海市美术馆名录',
    url: 'https://whlyj.sh.gov.cn/msg/20250928/db0cbc0a1edf478f99c4900522a56e3b.html'
  },
  parks: {
    title: '上海市绿化和市容管理局：星级公园名录',
    url: 'https://www.shanghai.gov.cn/gwk/search/content/cfa0770c-00d3-4733-ae5a-93ec852c1541'
  }
}

const places = [
  {
    id: 'fuxing-ferry', legacyId: 'ferry-sunset', type: 'route', name: '复兴东路轮渡站',
    district: '黄浦', address: '黄浦区复兴东路1号', latitude: 31.2281, longitude: 121.4969,
    coordinateSystem: 'gcj02', openHours: '东复线运营时段', fee: '轮渡票价以现场公告为准',
    sourceTitle: '上海市文旅推广网：上海轮渡码头', sourceUrl: 'https://www.meet-in-shanghai.net/cn/traffic/dock-112479/'
  },
  {
    id: 'north-bund', legacyId: 'north-bund-blue-hour', type: 'route', name: '北外滩国客中心',
    district: '虹口', address: '虹口区东大名路500号', latitude: 31.2492, longitude: 121.5036,
    coordinateSystem: 'gcj02', openHours: '公共滨水空间开放时段', fee: '公共区域免费',
    sourceTitle: '上海市政府：北外滩滨水公共空间', sourceUrl: 'https://www.shanghai.gov.cn/cmsres/7a/7acdfcf1e97340eaa51d11e205b44482/04a890ed80dc86d0eae372da5bf0b6bf.pdf'
  },
  {
    id: 'duolun-road', legacyId: 'duolun-character-hunt', type: 'culture', name: '多伦路文化名人街',
    district: '虹口', address: '虹口区多伦路', latitude: 31.2682, longitude: 121.4788,
    coordinateSystem: 'gcj02', openHours: '街区全天可达，室内场所以各自公告为准', fee: '街区免费',
    sourceTitle: '上海市政府：多伦路城市更新', sourceUrl: 'https://www.shanghai.gov.cn/nw15343/20250507/ccfbbbfe44db45bb9410ad97e97f2a7b.html'
  },
  {
    id: 'postal-museum', legacyId: 'post-office-letter', type: 'museum', name: '上海邮政博物馆',
    district: '虹口', address: '虹口区天潼路395号2楼', latitude: 31.2475, longitude: 121.4868,
    coordinateSystem: 'gcj02', openHours: '周三、周四、周六、周日 9:00-17:00', fee: '免费、无需预约',
    sourceTitle: '上海市文化和旅游局：上海邮政博物馆焕新开放', sourceUrl: 'https://whlyj.sh.gov.cn/gqfc/20241218/b7a180236c7d47cba6b939a6092ae6c1.html'
  },
  {
    id: 'yangpu-riverside', legacyId: 'yangpu-rivet-hunt', type: 'route', name: '杨浦滨江人民城市建设规划展示馆',
    district: '杨浦', address: '杨浦区安浦路461号附近', latitude: 31.2598, longitude: 121.5416,
    coordinateSystem: 'gcj02', openHours: '滨江公共空间开放时段', fee: '公共区域免费',
    sourceTitle: '上海市政府：杨浦滨江公共空间', sourceUrl: 'https://www.shanghai.gov.cn/gwk/search/content/c3c86ace-5ef2-4386-aa14-b5781fd2038a'
  },
  {
    id: 'gongqing-forest', legacyId: 'gongqing-texture', type: 'park', name: '上海共青森林公园',
    district: '杨浦', address: '杨浦区军工路2000号', latitude: 31.3225, longitude: 121.5486,
    coordinateSystem: 'gcj02', openHours: '以公园当日公告为准', fee: '费用以公园公告为准',
    sourceTitle: SOURCES.parks.title, sourceUrl: SOURCES.parks.url
  },
  {
    id: 'm50', legacyId: 'm50-one-artist', type: 'art', name: 'M50创意园',
    district: '普陀', address: '普陀区莫干山路50号', latitude: 31.2473, longitude: 121.4496,
    coordinateSystem: 'gcj02', openHours: '周一至周日 9:00-18:30', fee: '园区免费，各艺术空间以现场为准',
    sourceTitle: '上海市文旅推广网：上海M50创意园', sourceUrl: 'https://www.meet-in-shanghai.net/cn/tourist-attraction/shanghai-m50-creative-park-184096/'
  },
  {
    id: 'suzhou-creek', legacyId: 'suzhou-creek-bridges', type: 'route', name: '浙江路桥',
    district: '静安 → 虹口', address: '浙江北路与北苏州路交叉口', latitude: 31.2435, longitude: 121.4773,
    coordinateSystem: 'gcj02', openHours: '公共步道开放时段', fee: '免费',
    sourceTitle: '上海市文旅推广网：浙江路桥', sourceUrl: 'https://www.meet-in-shanghai.net/cn/shanghai-cultural-relics-protection-unit/zhejiang-road-and-bridge-509241/'
  },
  {
    id: 'xuhui-riverside', legacyId: 'xuhui-riverside-sound', type: 'route', name: '徐汇滨江',
    district: '徐汇', address: '徐汇区龙腾大道3398号附近', latitude: 31.1844, longitude: 121.4661,
    coordinateSystem: 'gcj02', openHours: '公共滨水空间开放时段', fee: '公共区域免费',
    sourceTitle: '上海市政府：徐汇滨江公共空间', sourceUrl: 'https://www.shanghai.gov.cn/tszczq-qtqj4/20260113/0d414870e60a465faa5878023a40e3b7.html'
  },
  {
    id: 'longhua', legacyId: 'longhua-morning', type: 'culture', name: '龙华古镇周边',
    district: '徐汇', address: '徐汇区龙华路2853号附近', latitude: 31.1809, longitude: 121.4527,
    coordinateSystem: 'gcj02', openHours: '公共街区开放时段，宗教场所以现场公告为准', fee: '街区免费',
    sourceTitle: '上海市文旅推广网：龙华塔', sourceUrl: 'https://www.meet-in-shanghai.net/jpn/national-key-cultural-relics-protection-unit/longhua-pagoda-082584/'
  },
  {
    id: 'old-millfun', legacyId: '1933-geometry', type: 'culture', name: '1933老场坊',
    district: '虹口', address: '虹口区溧阳路611号', latitude: 31.2574, longitude: 121.4971,
    coordinateSystem: 'gcj02', openHours: '园区开放时间以现场公告为准', fee: '公共区域免费，活动另计',
    sourceTitle: '上海市文旅推广网：1933老场坊', sourceUrl: 'https://www.meet-in-shanghai.net/cn/news/happy-shanghai-may-day--happy-spring-market-is-here-828739/'
  },
  {
    id: 'shanghai-library-east', legacyId: 'library-random-shelf', type: 'museum', name: '上海图书馆东馆',
    district: '浦东', address: '浦东新区合欢路300号', latitude: 31.2206, longitude: 121.5504,
    coordinateSystem: 'gcj02', openHours: '常规开放日，具体区域时间以馆方公告为准', fee: '公共阅览区域免费',
    sourceTitle: '上海图书馆：东馆参观服务', sourceUrl: 'https://www.library.sh.cn/service/visitDetail?i=0'
  },
  {
    id: 'fuxing-park', legacyId: 'fuxing-park-observe', type: 'park', name: '复兴公园',
    district: '黄浦', address: '黄浦区雁荡路105号', latitude: 31.2174, longitude: 121.4685,
    coordinateSystem: 'gcj02', openHours: '以公园当日公告为准', fee: '免费',
    sourceTitle: SOURCES.parks.title, sourceUrl: SOURCES.parks.url
  },
  {
    id: 'china-art-museum', type: 'art', name: '上海美术馆', district: '浦东', address: '浦东新区上南路205号',
    latitude: 31.1864842, longitude: 121.4899264, coordinateSystem: 'wgs84',
    openHours: '周二至周日 10:00-18:00', fee: '特展收费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'pudong-art-museum', type: 'art', name: '浦东美术馆', district: '浦东', address: '浦东新区滨江大道2777号',
    latitude: 31.2403094, longitude: 121.4919724, coordinateSystem: 'wgs84',
    openHours: '周一至周日 10:00-21:00', fee: '入馆购票', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'moca-warehouse', type: 'art', name: '上海艺仓美术馆', district: '浦东', address: '浦东新区滨江大道4777号',
    latitude: 31.2184737, longitude: 121.5080344, coordinateSystem: 'wgs84',
    openHours: '周二至周日 10:00-18:00', fee: '部分免费，按展收费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'aurora-art-museum', type: 'art', name: '震旦美术馆', district: '浦东', address: '浦东新区富城路99号主楼2-3层',
    latitude: 31.2365031, longitude: 121.495396, coordinateSystem: 'wgs84',
    openHours: '周二至周日 10:00-17:00，周五延长至21:00', fee: '部分免费，按展收费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'power-station-art', type: 'art', name: '上海当代艺术博物馆', district: '黄浦', address: '黄浦区苗江路678号',
    latitude: 31.2030587, longitude: 121.4938965, coordinateSystem: 'wgs84',
    openHours: '周二至周日 11:00-19:00', fee: '特展收费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'rockbund-art', type: 'art', name: '上海外滩美术馆', district: '黄浦', address: '黄浦区虎丘路20号',
    latitude: 31.2431755, longitude: 121.4830203, coordinateSystem: 'wgs84',
    openHours: '周二至周日开放，冬夏令时段不同', fee: '免费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'liu-haisu-art', type: 'art', name: '刘海粟美术馆', district: '长宁', address: '长宁区延安西路1609号',
    latitude: 31.2113561, longitude: 121.4146186, coordinateSystem: 'wgs84',
    openHours: '周二至周日 9:00-17:00', fee: '免费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'cheng-shifa-art', type: 'art', name: '上海中国画院程十发美术馆', district: '长宁', address: '长宁区虹桥路1398号',
    latitude: 31.1992844, longitude: 121.4003435, coordinateSystem: 'wgs84',
    openHours: '周二至周日 10:00-18:00', fee: '免费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'zhu-qizhan-art', type: 'art', name: '朱屺瞻艺术馆', district: '虹口', address: '虹口区欧阳路580号',
    latitude: 31.2763743, longitude: 121.4816107, coordinateSystem: 'wgs84',
    openHours: '周二至周日 9:30-16:30', fee: '免费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'duolun-art-museum', type: 'art', name: '上海多伦现代美术馆', district: '虹口', address: '虹口区多伦路27号',
    latitude: 31.2637786, longitude: 121.4785045, coordinateSystem: 'wgs84',
    openHours: '周二至周日 10:00-18:00', fee: '免费', sourceTitle: SOURCES.artMuseums.title, sourceUrl: SOURCES.artMuseums.url
  },
  {
    id: 'century-park', type: 'park', name: '世纪公园', district: '浦东', address: '浦东新区锦绣路1001号',
    latitude: 31.2187993, longitude: 121.5486275, coordinateSystem: 'wgs84',
    openHours: '以公园当日公告为准', fee: '费用以公园公告为准', sourceTitle: SOURCES.parks.title, sourceUrl: SOURCES.parks.url
  },
  {
    id: 'heping-park', type: 'park', name: '和平公园', district: '虹口', address: '虹口区天宝路891号',
    latitude: 31.2727705, longitude: 121.4980256, coordinateSystem: 'wgs84',
    openHours: '全天候公共公园，特殊安排以园方公告为准', fee: '免费',
    sourceTitle: '上海市文化和旅游局：和平公园无界焕新', sourceUrl: 'https://cmp.whlyj.sh.gov.cn/CMP/news_view.ac?id=284848583060459ab959e1faa3edf6cd'
  }
].map(place => ({ ...place, verifiedAt: VERIFIED_AT }))

const templates = {
  art: [
    ['one-work', '🖼️', '慢看观察员', '只认真认识一件作品', '少看一点，反而记得更久。', ['arts', 'healing'], ['culture', 'calm', 'curious']],
    ['color-hunt', '🎨', '色彩采集员', '收集四种展厅颜色', '把展览压缩成一张私人色卡。', ['arts', 'healing'], ['culture', 'curious', 'walk']],
    ['rename', '✍️', '临时策展人', '给三件作品重新起名', '先不看说明，听听自己的直觉。', ['arts', 'thrill'], ['culture', 'curious']],
    ['one-question', '❓', '问题收藏家', '带着一个问题去看展', '答案不重要，新的问题才重要。', ['arts', 'healing'], ['culture', 'calm', 'curious']]
  ],
  museum: [
    ['one-object', '🔍', '展品侦探', '找到一件最意外的展品', '不追求逛完，只追踪一次意外。', ['arts', 'thrill'], ['culture', 'curious']],
    ['three-story', '🧩', '故事拼图师', '用三件展品拼一个故事', '让互不相干的东西产生联系。', ['arts', 'thrill'], ['culture', 'curious']],
    ['voice-guide', '🎙️', '一分钟讲解员', '录一段一分钟私人导览', '把最喜欢的细节讲给未来的自己。', ['arts', 'healing'], ['culture', 'calm']],
    ['one-room', '🚪', '单厅漫游者', '今天只逛一个展厅', '放弃打卡，换成真正停留。', ['arts', 'healing'], ['culture', 'calm', 'walk']]
  ],
  park: [
    ['nature-card', '🌿', '自然色卡师', '收集五种自然颜色', '把公园装进一张五格色卡。', ['healing', 'outdoors'], ['nature', 'calm', 'walk']],
    ['sound-map', '🎧', '声音地图员', '记录四种公园声音', '关掉耳机，重新听见周末。', ['healing', 'outdoors'], ['nature', 'calm', 'walk']],
    ['slow-lap', '👟', '慢走计时员', '不用导航走完一圈', '不追配速，只追一条陌生支路。', ['outdoors', 'healing'], ['active', 'walk', 'nature']],
    ['no-phone', '🪑', '长椅观察员', '坐满二十分钟不碰手机', '什么都不做，也是一项任务。', ['healing', 'outdoors'], ['calm', 'nature', 'budget']]
  ],
  route: [
    ['sound-map', '🎧', '城市采样师', '收集四种城市声音', '用耳朵而不是榜单认识这里。', ['healing', 'outdoors'], ['walk', 'calm', 'curious']],
    ['four-colors', '📷', '街景取色员', '拍齐四种城市颜色', '给这段路做一张私人色卡。', ['arts', 'outdoors'], ['walk', 'curious']],
    ['wrong-turn', '🧭', '支路探索员', '允许自己拐进一条支路', '安全范围内，错路也可能是答案。', ['thrill', 'outdoors'], ['walk', 'curious']],
    ['one-line', '✍️', '街区记录员', '给这段路写一句标题', '走完以后，只留下一句话。', ['arts', 'healing'], ['walk', 'culture', 'calm']]
  ],
  culture: [
    ['geometry', '📐', '空间解谜者', '寻找四种建筑几何', '楼梯、窗框和光影都是谜面。', ['arts', 'thrill'], ['culture', 'curious', 'walk']],
    ['old-new', '🏙️', '时间观察员', '拍下一组新旧同框', '一张照片里放进两个时代。', ['arts', 'outdoors'], ['culture', 'walk', 'curious']],
    ['detail', '🔎', '细节采集员', '找到三个容易错过的细节', '把速度放慢，城市才会显影。', ['arts', 'healing'], ['culture', 'calm', 'walk']],
    ['postcard', '💌', '城市写信人', '写一张不寄出的明信片', '把今天的城市寄给未来。', ['arts', 'healing'], ['culture', 'calm']]
  ]
}

function createPlay(place, template) {
  const [key, emoji, stamp, action, kicker, moods, traits] = template
  const paid = !/(免费|公共区域免费|街区免费)/.test(place.fee)
  return {
    id: `${place.id}-${key}`,
    placeId: place.id,
    emoji,
    stamp,
    title: `去${place.name}${action}`,
    kicker,
    district: place.district,
    location: place.name,
    address: place.address,
    latitude: place.latitude,
    longitude: place.longitude,
    coordinateSystem: place.coordinateSystem,
    duration: place.type === 'park' || place.type === 'route' ? '1.5～3小时' : '1.5～2.5小时',
    budget: paid ? '¥0～180' : '¥0～60',
    bestTime: place.openHours,
    moods,
    traits: [...traits, ...(paid ? [] : ['budget'])],
    mission: `${action}。完成任务即可离开，不需要把${place.name}全部逛完。`,
    steps: ['出发前打开官方来源确认当天开放安排', `到达${place.name}后先熟悉公共区域和现场规则`, `${action}，完成后写下一句感受`],
    tip: `${place.fee}；开放安排可能调整，请以官方来源和现场公告为准。`,
    sourceTitle: place.sourceTitle,
    sourceUrl: place.sourceUrl,
    verifiedAt: place.verifiedAt,
    status: 'published',
    recommendable: true
  }
}

function buildAdditionalPlays() {
  return places.flatMap(place => {
    const candidates = templates[place.type] || templates.culture
    return candidates.slice(place.legacyId ? 1 : 0).map(template => createPlay(place, template))
  })
}

function enrichLegacyPlays(legacyPlays) {
  const byLegacyId = new Map(places.filter(place => place.legacyId).map(place => [place.legacyId, place]))
  return legacyPlays.map(play => {
    const place = byLegacyId.get(play.id)
    if (!place) return { ...play, status: 'legacy', recommendable: false }
    return {
      ...play,
      placeId: place.id,
      address: place.address,
      coordinateSystem: place.coordinateSystem,
      sourceTitle: place.sourceTitle,
      sourceUrl: place.sourceUrl,
      verifiedAt: place.verifiedAt,
      status: 'published',
      recommendable: true
    }
  })
}

module.exports = { places, buildAdditionalPlays, enrichLegacyPlays }
