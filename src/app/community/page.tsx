"use client"

import { useState } from "react"

const posts = [
  // 深圳本地内容（P0 优先级）
  {
    id: 1,
    author: "深圳电车群群主",
    avatar: "👨‍💼",
    title: "深圳车上住宿地图｜10 个安静过夜点实测",
    content: "整理了深圳 10 个适合车上住宿的地点：1. 深圳湾公园 P8 停车场（安静，有厕所）2. 人才公园停车场（24 小时，安全）3. 前海石公园（海边，安静）4. 大梅沙海滨公园（有淋浴）... 每个点都实测过，远离公路，有厕所，安全监控覆盖。",
    tags: ["深圳", "车上住宿", "安静"],
    likes: 523,
    comments: 89,
    time: "1 小时前",
    images: ["🚗", "🌙", "🅿️"],
    source: "小红书 @电车在深圳"
  },
  {
    id: 2,
    author: "大鹏本地通",
    avatar: "👩",
    title: "大鹏半岛厕所地图｜20 个干净公厕位置",
    content: "在大鹏开了 3 年民宿，整理了 20 个干净公厕：1. 较场尾游客中心（⭐⭐⭐⭐⭐）2. 大鹏古城南门（⭐⭐⭐⭐）3. 杨梅坑入口（⭐⭐⭐⭐）4. 西涌海滩（⭐⭐⭐）... 附开放时间和干净程度评分。",
    tags: ["深圳", "厕所地图", "大鹏"],
    likes: 412,
    comments: 67,
    time: "3 小时前",
    images: ["🚻", "📍", "⭐"],
    source: "小红书 @大鹏民宿主"
  },
  {
    id: 3,
    author: "宝安车友会",
    avatar: "👨‍🔧",
    title: "宝安中心区停车攻略｜15 个免费/低价停车场",
    content: "宝中停车太贵？分享 15 个免费/低价停车场：1. 前海演艺公园（免费，200 位）2. 西湾红树林（¥5/小时，500 位）3. 宝安图书馆（免费，300 位）... 附营业时间、车位数量、步行距离。",
    tags: ["深圳", "停车分享", "宝安"],
    likes: 356,
    comments: 45,
    time: "5 小时前",
    images: ["🅿️", "💰", "📍"],
    source: "小红书 @宝安停车指南"
  },
  
  // 深圳周边内容（P1 优先级）
  {
    id: 4,
    author: "惠州巽寮湾实测",
    avatar: "👨",
    title: "惠州巽寮湾实测，停车超级方便！",
    content: "周末去了巽寮湾，分享几个好停车的点：1. 金海湾大道沿线有很多免费停车位 2. 磨子石公园停车场很大，周末也不满 3. 海世界酒店附近停车方便，还能充电...",
    tags: ["惠州", "巽寮湾", "停车分享"],
    likes: 128,
    comments: 23,
    time: "2 小时前",
    images: ["🏖️", "🅿️", "⚡"]
  },
  {
    id: 5,
    author: "自驾小李",
    avatar: "👩",
    title: "发现一个超级安静的车上住宿点",
    content: "在清远英德发现一个绝佳的床上住宿点：1. 在峰林小镇的停车场深处 2. 非常安静，远离公路 3. 旁边就有公共厕所 24 小时开放 4. 免费停车...",
    tags: ["车上住宿", "清远", "安静"],
    likes: 256,
    comments: 45,
    time: "5 小时前",
    images: ["🚗", "🌙", "🚻"]
  },
  {
    id: 6,
    author: "珠海长隆攻略",
    avatar: "👨‍👩‍👧",
    title: "珠海长隆亲子游，停车 + 充电攻略",
    content: "带娃去长隆，分享停车 + 充电经验：1. 长隆度假区有多个停车场，推荐横琴湾酒店停车场 2. 停车场有特斯拉超充和国标快充 3. 停车费¥20/天，住酒店免费...",
    tags: ["亲子游", "珠海", "充电"],
    likes: 167,
    comments: 31,
    time: "1 天前",
    images: ["🐬", "⚡", "👨‍👩‍👧"]
  },
  {
    id: 7,
    author: "顺德美食地图",
    avatar: "👨‍🍳",
    title: "顺德美食路线，全程好停车",
    content: "上周去了顺德寻味，规划了一条全程好停车的路线：1. 华侨城欢乐海岸 PLUS（停车充足）2. 清晖园（旁边有大型停车场）3. 华盖路步行街（建议停外围）...",
    tags: ["美食", "顺德", "路线推荐"],
    likes: 234,
    comments: 38,
    time: "2 天前",
    images: ["🍜", "🅿️", "😋"],
    source: "小红书 @顺德寻味"
  },
  {
    id: 8,
    author: "丹霞山徒步者",
    avatar: "🧔",
    title: "丹霞山徒步路线，沿途厕所分布",
    content: "刚走完丹霞山徒步路线，标注一下沿途厕所：1. 阳元山入口（干净）2. 长老峰索道站（一般）3. 翔龙湖码头（干净）4. 锦江温泉终点（很好）...",
    tags: ["徒步", "韶关", "厕所地图"],
    likes: 94,
    comments: 18,
    time: "3 天前",
    images: ["🏔️", "🚻", "🥾"]
  }
]

const categories = [
  { name: "全部", icon: "📋", count: 128 },
  { name: "停车分享", icon: "🅿️", count: 45 },
  { name: "充电经验", icon: "⚡", count: 32 },
  { name: "路线推荐", icon: "🗺️", count: 28 },
  { name: "车上住宿", icon: "🚗", count: 15 },
  { name: "厕所地图", icon: "🚻", count: 8 }
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")

  const filteredPosts = selectedCategory === "全部"
    ? posts
    : posts.filter(p => p.tags.includes(selectedCategory))

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
              <a href="/community" className="text-blue-600 font-medium">社区</a>
              <a href="/shop" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">商城</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                发布帖子
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            电车车主社区
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            分享停车经验、充电攻略、路线推荐，让每一次出发都有迹可循
          </p>
          
          {/* Categories */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.name
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow cursor-pointer"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{post.avatar}</span>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{post.author}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{post.time}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* Images */}
                <div className="flex gap-2 mb-4">
                  {post.images.map((img, i) => (
                    <span key={i} className="text-4xl">{img}</span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Source Attribution (小红书 content) */}
                {post.source && (
                  <div className="flex items-center gap-2 mb-4 text-xs text-slate-400 dark:text-slate-500">
                    <span>📌</span>
                    <span>内容参考：</span>
                    <a 
                      href="https://xiaohongshu.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 hover:underline"
                    >
                      小红书 @{post.source.replace('小红书 ', '')}
                    </a>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
                  <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <span>💬</span>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                    <span>🔗</span>
                    <span>分享</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-xl font-medium transition-colors">
              加载更多
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            有停车经验想分享？
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            发布你的停车攻略、充电经验、路线推荐，帮助更多电车车主
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
            立即发布
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
