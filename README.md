# Danny Road 🚗

**电车自驾游平台** - 专为电动车主打造的自驾游社区

发现最美自驾路线，分享电车出行体验

## 技术栈

- **前端**: Next.js 15 + Tailwind CSS + TypeScript
- **后端**: Supabase (PostgreSQL + Auth + Storage)
- **地图**: 高德地图 API
- **部署**: Vercel

## 快速开始

### 1. 环境配置

```bash
# 复制环境变量示例文件
cp .env.local.example .env.local

# 编辑 .env.local 填入你的配置
```

### 2. 环境变量

```env
# 高德地图 API (Web 端)
NEXT_PUBLIC_GAODE_MAP_KEY=your_gaode_key
NEXT_PUBLIC_GAODE_MAP_SECRET=your_gaode_secret

# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Supabase 设置

1. 访问 [supabase.com](https://supabase.com) 创建新项目
2. 进入 SQL Editor，运行 `supabase/schema.sql`
3. 在项目设置中获取 URL 和 Anon Key
4. 填入 `.env.local`

### 4. 安装依赖

```bash
npm install
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
danny-road/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # 首页
│   │   ├── layout.tsx    # 根布局
│   │   └── globals.css   # 全局样式
│   └── lib/              # 工具库
│       └── supabase.ts   # Supabase 客户端
├── supabase/
│   └── schema.sql        # 数据库架构
├── public/               # 静态资源
└── .env.local            # 环境变量 (不提交)
```

## 功能规划

### MVP (本周)
- [x] 首页落地页
- [ ] Supabase 数据库设置
- [ ] 用户认证
- [ ] 路线浏览

### V1.0
- [ ] 路线详情页面
- [ ] 路线搜索/筛选
- [ ] 用户创建路线
- [ ] 高德地图集成

### V2.0
- [ ] 充电站地图
- [ ] 游记/评价系统
- [ ] 收藏功能
- [ ] 微信小程序

## 社区资源

- **车友群**: 4 个活跃群，1000+ 电车车主
- **种子用户**: 本品群 1&2 (100 人)
- **调研渠道**: 普通群 (问卷调研)
- **高端测试**: 智驾群 (V3.0 测试)

## 部署

### Vercel 部署

1. 安装 Vercel CLI: `npm i -g vercel`
2. 运行 `vercel` 按提示部署
3. 在 Vercel 控制台配置环境变量

### 生产环境变量

确保在 Vercel 中配置所有 `.env.local` 中的变量

## 开发规范

- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 组件使用 Tailwind CSS
- 提交前运行 `npm run lint`

## 许可证

MIT © 2026 Danny Road

---

**🚗 让每一次出发都充满期待**
