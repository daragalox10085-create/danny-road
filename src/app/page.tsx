"use client"

import { useState } from "react"

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)

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
            <div className="hidden md:flex items-center gap-8">
              <a href="#scenarios" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">开始规划</a>
              <a href="/routes" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">路线</a>
              <a href="/community" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">社区</a>
              <a href="/shop" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">商城</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                立即加入
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            别想那么多，<span className="text-blue-600">出发就对了</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
            专为电车车主打造的自驾游平台，<span className="font-semibold text-blue-600">好停车</span>是最高优先级，
            帮你找到好玩、好停、有厕所的目的地
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setSelectedScenario(1)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg shadow-blue-600/25"
            >
              帮我规划行程
            </button>
            <a 
              href="/routes"
              className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              查看精选路线
            </a>
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section id="scenarios" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            你想怎么玩？
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16">
            三种场景，总有一种适合你
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Scenario 1: 起点 + 终点（最高优先级） */}
            <div 
              className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border-2 transition-all cursor-pointer transform hover:scale-105 ${
                selectedScenario === 1 
                  ? "border-blue-600 ring-4 ring-blue-600/20" 
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
              onClick={() => setSelectedScenario(1)}
            >
              <div className="text-5xl mb-6">📍</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                我有起点和终点
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                已经确定目的地？推荐沿途好玩的、好吃的、好停的，一切以停车便利为先
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>起点 + 终点</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>沿途推荐</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>好停车</span>
                </li>
              </ul>
            </div>

            {/* Scenario 2: 不知道去哪 */}
            <div 
              className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border-2 transition-all cursor-pointer hover:border-purple-400 ${
                selectedScenario === 2 
                  ? "border-purple-600 ring-4 ring-purple-600/20" 
                  : "border-slate-200 dark:border-slate-700"
              }`}
              onClick={() => setSelectedScenario(2)}
            >
              <div className="text-5xl mb-6">🗺️</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                我不知道去哪玩
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                只有起点和时间？帮你推荐精选路线，沿途好停车、有厕所、能充电
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>起点 + 时间</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>推荐路线</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>停车充足</span>
                </li>
              </ul>
            </div>

            {/* Scenario 3: 3 小时空闲 */}
            <div 
              className={`bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border-2 transition-all cursor-pointer hover:border-orange-400 ${
                selectedScenario === 3 
                  ? "border-orange-600 ring-4 ring-orange-600/20" 
                  : "border-slate-200 dark:border-slate-700"
              }`}
              onClick={() => setSelectedScenario(3)}
            >
              <div className="text-5xl mb-6">⏰</div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                我有 3 小时空闲
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                工作间隙想放松？推荐附近好停车的公园、商场、海滩，不用规划，说走就走
              </p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>10 公里内</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>停车便利</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>有厕所</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Priority Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-4">
            为什么停车是最高优先级？
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 text-center mb-16">
            因为我们都经历过：到了景点却发现没地方停车的绝望
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border border-red-200 dark:border-red-800">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                其他平台的推荐逻辑
              </h3>
              <ul className="space-y-3 text-red-600 dark:text-red-300">
                <li>1. 景点好玩吗？→ 好玩</li>
                <li>2. 有厕所吗？→ 有</li>
                <li>3. 能充电吗？→ 能</li>
                <li>4. 好停车吗？→ <span className="font-bold">没考虑</span></li>
              </ul>
              <p className="mt-6 text-red-700 dark:text-red-300 font-semibold">
                结果：开了 2 小时，绕着景点找停车位 30 分钟...
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                Danny Road 的推荐逻辑
              </h3>
              <ul className="space-y-3 text-green-600 dark:text-green-300">
                <li>1. <span className="font-bold">好停车吗？</span> → 好停</li>
                <li>2. 有厕所吗？→ 有</li>
                <li>3. 景点好玩吗？→ 好玩</li>
                <li>4. 能充电吗？→ 能</li>
              </ul>
              <p className="mt-6 text-green-700 dark:text-green-300 font-semibold">
                结果：到了直接停，下车就玩，轻松自在！
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-slate-600 dark:text-slate-400">活跃车主</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-400">精选路线</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-slate-600 dark:text-slate-400">充电站点</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-slate-600 dark:text-slate-400">车友社群</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            为什么选择 Danny Road
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
              <div className="text-4xl mb-4">🅿️</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                停车优先
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                所有推荐地点都经过停车便利性验证，免费停车场、充足车位、不排队
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
              <div className="text-4xl mb-4">🚻</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                厕所地图
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                标注每个地点的厕所信息，干净程度、是否免费、24 小时开放
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                充电无忧
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                实时充电站信息，支持多种充电标准，规划最优充电策略
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            准备好开始你的下一次旅程了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            加入 Danny Road，与 1000+ 电车车主一起探索中国最美自驾路线
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
