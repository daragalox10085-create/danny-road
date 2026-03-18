"use client"

import { useState } from "react"

const products = [
  {
    id: 1,
    name: "车载充气泵",
    price: 199,
    originalPrice: 299,
    image: "🔧",
    tags: ["必备", "应急"],
    rating: 4.8,
    reviews: 256,
    description: "小米生态链，数显胎压，自动充停"
  },
  {
    id: 2,
    name: "便携式充电枪",
    price: 899,
    originalPrice: 1299,
    image: "⚡",
    tags: ["长途必备"],
    rating: 4.9,
    reviews: 189,
    description: "16A/32A 可调，带漏保，5 米加长线"
  },
  {
    id: 3,
    name: "车载吸尘器",
    price: 159,
    originalPrice: 229,
    image: "🧹",
    tags: ["清洁"],
    rating: 4.7,
    reviews: 432,
    description: "无线手持，大吸力，HEPA 过滤"
  },
  {
    id: 4,
    name: "遮阳挡套装",
    price: 89,
    originalPrice: 129,
    image: "☀️",
    tags: ["夏季必备"],
    rating: 4.6,
    reviews: 567,
    description: "前挡 + 侧窗，钛银胶，隔热防晒"
  },
  {
    id: 5,
    name: "车载冰箱",
    price: 599,
    originalPrice: 799,
    image: "🧊",
    tags: ["长途", "露营"],
    rating: 4.8,
    reviews: 145,
    description: "压缩机制冷，-18℃冷冻，50L 大容量"
  },
  {
    id: 6,
    name: "停车号码牌",
    price: 29,
    originalPrice: 49,
    image: "🅿️",
    tags: ["必备"],
    rating: 4.9,
    reviews: 1023,
    description: "隐藏式，一键遮挡，高档合金"
  },
  {
    id: 7,
    name: "车载睡袋",
    price: 299,
    originalPrice: 399,
    image: "😴",
    tags: ["车上住宿", "露营"],
    rating: 4.7,
    reviews: 98,
    description: "专为 SUV 设计，加厚保暖，可拼接"
  },
  {
    id: 8,
    name: "隐私遮阳帘",
    price: 129,
    originalPrice: 179,
    image: "🔒",
    tags: ["车上住宿", "隐私"],
    rating: 4.8,
    reviews: 234,
    description: "磁吸式，全遮光，车上住宿必备"
  },
  {
    id: 9,
    name: "便携式马桶",
    price: 199,
    originalPrice: 269,
    image: "🚻",
    tags: ["车上住宿", "应急"],
    rating: 4.6,
    reviews: 167,
    description: "车载专用，密封防臭，5L 大容量"
  },
  {
    id: 10,
    name: "露营灯",
    price: 149,
    originalPrice: 199,
    image: "💡",
    tags: ["露营", "车上住宿"],
    rating: 4.8,
    reviews: 312,
    description: "LED 可调光，USB 充电，IP67 防水"
  },
  {
    id: 11,
    name: "折叠桌椅套装",
    price: 399,
    originalPrice: 599,
    image: "🪑",
    tags: ["露营", "野餐"],
    rating: 4.7,
    reviews: 156,
    description: "铝合金，超轻便携，一桌四椅"
  },
  {
    id: 12,
    name: "车载电源转换器",
    price: 259,
    originalPrice: 359,
    image: "🔌",
    tags: ["必备", "露营"],
    rating: 4.9,
    reviews: 278,
    description: "12V 转 220V，1000W 大功率，多 USB 口"
  }
]

const categories = [
  { name: "全部", icon: "📋" },
  { name: "车上住宿", icon: "🚗" },
  { name: "充电设备", icon: "⚡" },
  { name: "清洁用品", icon: "🧹" },
  { name: "露营装备", icon: "⛺" },
  { name: "安全应急", icon: "🆘" },
  { name: "车载电器", icon: "🔌" }
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [sortBy, setSortBy] = useState("default")

  let filteredProducts = selectedCategory === "全部"
    ? products
    : products.filter(p => p.tags.includes(selectedCategory))

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "sales") {
    filteredProducts.sort((a, b) => b.reviews - a.reviews)
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
              <a href="/shop" className="text-blue-600 font-medium">商城</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                购物车 (0)
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Danny Road 精选商城
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            为电车车主严选好物，车上住宿、充电设备、露营装备，一站式购齐
          </p>
          
          {/* Categories */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.name
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-slate-600 dark:text-slate-400">
              共 <span className="font-semibold text-slate-900 dark:text-white">{filteredProducts.length}</span> 件商品
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="default">默认排序</option>
              <option value="price-asc">价格从低到高</option>
              <option value="price-desc">价格从高到低</option>
              <option value="sales">销量优先</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow cursor-pointer group"
              >
                {/* Image */}
                <div className="aspect-square bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-8xl">{product.image}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{product.rating}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">({product.reviews}条评价)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                  <span className="text-sm text-slate-400 line-through">¥{product.originalPrice}</span>
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-colors group-hover:shadow-lg group-hover:shadow-blue-600/25">
                  加入购物车
                </button>
              </div>
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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white mb-16">
            为什么选择 Danny Road 商城
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                电车车主严选
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                所有商品经过真实车主测试，适合电车出行场景
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                团购优惠价
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                集合采购，享受批发价格，比零售价低 30%
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                包邮到家
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                全场包邮，7 天无理由退换，购物无忧
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                会员专享
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                加入会员享额外折扣，积分抵现，专属客服
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            成为 Danny Road 会员
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            注册即享首单 9 折，会员专享价，积分抵现，更多优惠等你发现
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg">
            免费注册会员
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
