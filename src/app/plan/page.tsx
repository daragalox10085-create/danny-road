"use client"

import { useState } from "react"

export default function PlanPage() {
  const [scenario, setScenario] = useState<number | null>(null)
  
  // 场景 1 状态
  const [startPoint, setStartPoint] = useState("")
  const [endPoint, setEndPoint] = useState("")
  const [preferences, setPreferences] = useState<string[]>([])
  
  // 场景 2 状态
  const [timeAvailable, setTimeAvailable] = useState("")
  
  // 场景 3 状态
  const [freeTime, setFreeTime] = useState("3")

  const handleTogglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref))
    } else {
      setPreferences([...preferences, pref])
    }
  }

  const handlePlan = () => {
    // TODO: 调用规划 API
    console.log("开始规划", { scenario, startPoint, endPoint, preferences, timeAvailable, freeTime })
  }

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
              <a href="/routes" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">路线</a>
              <a href="/community" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">社区</a>
              <a href="/shop" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">商城</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            智能行程规划
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            告诉我你的需求，帮你规划最佳行程
          </p>
        </div>
      </section>

      {/* Scenario Selection */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!scenario ? (
            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => setScenario(1)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-all text-left"
              >
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  我有起点和终点
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  推荐沿途好玩的、好吃的、好停的
                </p>
              </button>

              <button
                onClick={() => setScenario(2)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-purple-400 transition-all text-left"
              >
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  我不知道去哪玩
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  只有起点和时间？推荐精选路线
                </p>
              </button>

              <button
                onClick={() => setScenario(3)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-orange-400 transition-all text-left"
              >
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  我有 3 小时空闲
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  推荐附近好停车的放松地
                </p>
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
              {/* Back Button */}
              <button
                onClick={() => setScenario(null)}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
              >
                <span>←</span>
                <span>返回选择</span>
              </button>

              {/* Scenario 1: 起点 + 终点 */}
              {scenario === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    规划沿途推荐
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      起点
                    </label>
                    <input
                      type="text"
                      value={startPoint}
                      onChange={(e) => setStartPoint(e.target.value)}
                      placeholder="例如：深圳福田 CBD"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      终点
                    </label>
                    <input
                      type="text"
                      value={endPoint}
                      onChange={(e) => setEndPoint(e.target.value)}
                      placeholder="例如：惠州巽寮湾"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      你想找什么？（多选）
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { icon: "🅿️", label: "好停车" },
                        { icon: "🚻", label: "厕所" },
                        { icon: "⚡", label: "充电桩" },
                        { icon: "🍜", label: "美食" },
                        { icon: "🏞️", label: "景点" },
                        { icon: "🛍️", label: "购物" }
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleTogglePreference(item.label)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-2 ${
                            preferences.includes(item.label)
                              ? "border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePlan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-600/25"
                  >
                    开始规划
                  </button>
                </div>
              )}

              {/* Scenario 2: 不知道去哪 */}
              {scenario === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    推荐精选路线
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      你的起点
                    </label>
                    <input
                      type="text"
                      placeholder="例如：深圳福田"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      你有多少时间？
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "half-day", label: "半天" },
                        { value: "1day", label: "1 天" },
                        { value: "2days", label: "2 天 1 夜" },
                        { value: "3days", label: "3 天 2 夜" }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setTimeAvailable(option.value)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all ${
                            timeAvailable === option.value
                              ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-purple-400"
                          }`}
                        >
                          <span className="font-medium">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePlan}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-purple-600/25"
                  >
                    查看推荐路线
                  </button>
                </div>
              )}

              {/* Scenario 3: 3 小时空闲 */}
              {scenario === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    附近放松推荐
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      你有多少空闲时间？
                    </label>
                    <select
                      value={freeTime}
                      onChange={(e) => setFreeTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    >
                      <option value="1">1 小时</option>
                      <option value="2">2 小时</option>
                      <option value="3">3 小时</option>
                      <option value="4">4 小时</option>
                      <option value="5">5 小时以上</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      你想去哪里放松？
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: "🏞️", label: "公园" },
                        { icon: "🛍️", label: "商场" },
                        { icon: "🏖️", label: "海滩" },
                        { icon: "☕", label: "咖啡馆" }
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleTogglePreference(item.label)}
                          className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                            preferences.includes(item.label)
                              ? "border-orange-600 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                              : "border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-orange-400"
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePlan}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-orange-600/25"
                  >
                    查找附近
                  </button>
                </div>
              )}
            </div>
          )}
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
