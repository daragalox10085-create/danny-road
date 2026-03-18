"use client"

import { useState } from "react"

const routes = [
  // 深圳本地路线（P0 优先级）
  {
    id: 1,
    name: "深圳东部海岸线",
    duration: "1 天",
    distance: "80km",
    difficulty: "入门",
    tags: ["深圳", "海滩", "休闲"],
    image: "🏖️",
    description: "深圳最美海岸线，大小梅沙 - 大鹏 - 较场尾，全程好停车",
    charging: "沿途 5 个快充站，大鹏古城有超充",
    stay: "较场尾民宿/大鹏酒店"
  },
  {
    id: 2,
    name: "深圳西部滨海线",
    duration: "1 天",
    distance: "60km",
    difficulty: "入门",
    tags: ["深圳", "海滩", "日落"],
    image: "🌅",
    description: "前海 - 宝安中心 - 西湾红树林，看绝美日落",
    charging: "前海/宝中充电站密集",
    stay: "宝中酒店/南山酒店"
  },
  {
    id: 3,
    name: "深圳山海专线",
    duration: "1 天",
    distance: "50km",
    difficulty: "入门",
    tags: ["深圳", "徒步", "自然"],
    image: "🏞️",
    description: "梧桐山 - 仙湖 - 东湖绿道，登山 + 休闲",
    charging: "仙湖植物园有充电桩",
    stay: "罗湖/莲塘酒店"
  },
  {
    id: 4,
    name: "深圳城市探索",
    duration: "半天",
    distance: "30km",
    difficulty: "入门",
    tags: ["深圳", "城市", "文化"],
    image: "🏙️",
    description: "福田 CBD- 华侨城 - 南头古城，城市文化之旅",
    charging: "市区充电站极多",
    stay: "市区酒店"
  },
  
  // 深圳周边（1-2 小时车程，P1 优先级）
  {
    id: 5,
    name: "惠州巽寮湾",
    duration: "2 天 1 夜",
    distance: "120km",
    difficulty: "入门",
    tags: ["惠州", "海滩", "海鲜"],
    image: "🏖️",
    description: "深圳周边最近的海滩度假胜地，适合周末短途自驾",
    charging: "沿途 3 个快充站",
    stay: "海景酒店/民宿"
  },
  {
    id: 6,
    name: "珠海长隆",
    duration: "2 天 1 夜",
    distance: "140km",
    difficulty: "入门",
    tags: ["珠海", "亲子", "主题公园"],
    image: "🐬",
    description: "全球最大海洋主题公园，亲子游首选",
    charging: "园区停车场有充电桩",
    stay: "主题酒店/市区酒店"
  },
  {
    id: 7,
    name: "佛山顺德",
    duration: "2 天 1 夜",
    distance: "80km",
    difficulty: "入门",
    tags: ["佛山", "美食", "文化"],
    image: "🍜",
    description: "世界美食之都，寻味顺德，粤菜发源地",
    charging: "城区充电站密集",
    stay: "市区酒店/特色民宿"
  },
  {
    id: 8,
    name: "江门开平碉楼",
    duration: "2 天 1 夜",
    distance: "130km",
    difficulty: "入门",
    tags: ["江门", "文化遗产", "碉楼"],
    image: "🏰",
    description: "中西合璧的碉楼建筑群，世界文化遗产",
    charging: "景区有充电站",
    stay: "碉楼酒店/民宿"
  },
  {
    id: 9,
    name: "肇庆鼎湖山",
    duration: "2 天 1 夜",
    distance: "110km",
    difficulty: "入门",
    tags: ["肇庆", "自然保护区", "徒步"],
    image: "🏞️",
    description: "北回归线上的绿宝石，天然氧吧，佛教圣地",
    charging: "景区停车场有充电桩",
    stay: "山顶酒店/山脚民宿"
  },
  {
    id: 10,
    name: "河源万绿湖",
    duration: "2 天 1 夜",
    distance: "150km",
    difficulty: "入门",
    tags: ["河源", "湖景", "客家文化"],
    image: "🏞️",
    description: "华南最大人工湖，湖光山色，客家美食",
    charging: "市区充电站充足",
    stay: "湖景酒店/度假村"
  }
]

export default function RoutesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("全部")

  const filteredRoutes = selectedDifficulty === "全部" 
    ? routes 
    : routes.filter(r => r.difficulty === selectedDifficulty)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚗</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">Danny Road</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">首页</a>
              <a href="/routes" className="text-blue-600 font-medium">路线</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                立即加入
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            精选自驾路线
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            10 条深圳周边电车自驾路线，每条都经过实测，包含充电规划和住宿推荐
          </p>
          
          {/* Filter */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["全部", "入门", "进阶", "高级"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedDifficulty === level
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route, index) => (
              <div
                key={route.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{route.image}</span>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        路线 {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {route.name}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    route.difficulty === "入门"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : route.difficulty === "进阶"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {route.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {route.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                  {route.description}
                </p>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">⏱️</span>
                    <span>{route.duration}</span>
                    <span className="mx-2">·</span>
                    <span className="font-medium">📍</span>
                    <span>{route.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">⚡</span>
                    <span>{route.charging}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">🏨</span>
                    <span>{route.stay}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors group-hover:shadow-lg group-hover:shadow-blue-600/25">
                  查看完整路线
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            找到心仪的路线了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            加入 Danny Road，获取完整路线规划、充电站点和住宿推荐
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
            免费注册加入
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Danny Road</span>
          </div>
          <p>© 2026 Danny Road. 专为电车车主打造的自驾游平台</p>
        </div>
      </footer>
    </div>
  )
}
