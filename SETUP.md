# Danny Road 设置指南

## 快速开始（5 分钟）

### 1️⃣ 推送代码到 GitHub

```bash
cd C:\Users\CCL\Projects\danny-road

# 如果还没推送
git push -u origin master

# 如果需要认证，使用 Personal Access Token
# GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
# 生成 token (repo 权限)，然后：
git push https://<your-token>@github.com/simon-danny/danny-road.git master
```

### 2️⃣ 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: `danny-road`
   - **Database Password**: （保存好，后面用不到但需要记住）
   - **Region**: 选择最近的（推荐 `ap-southeast-1` 新加坡）
4. 点击 "Create new project"
5. 等待 2-3 分钟项目创建完成

### 3️⃣ 获取 Supabase 凭证

1. 进入项目 → **Settings** → **API**
2. 复制以下两个值：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbG...` (以 `eyJ` 开头的长字符串)

### 4️⃣ 更新环境变量

编辑 `.env.local` 文件：

```env
# 高德地图 API Key (Web 端) - 已配置 ✅
NEXT_PUBLIC_GAODE_MAP_KEY=2b305f1471d420e03bc3301521556380
NEXT_PUBLIC_GAODE_MAP_SECRET=cc458763a339556b1c71a59068c6e4e5

# Supabase 配置 - 填入你的项目信息 ⬇️
NEXT_PUBLIC_SUPABASE_URL=https://你的项目 ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key
```

### 5️⃣ 运行数据库架构

1. 在 Supabase 项目 → **SQL Editor**
2. 点击 "New query"
3. 复制 `supabase/schema.sql` 的全部内容
4. 粘贴到 SQL Editor
5. 点击 "Run" 执行
6. 确认左侧出现 6 张表：
   - profiles
   - routes
   - route_waypoints
   - charging_stations
   - reviews
   - favorites

### 6️⃣ 启动开发服务器

```bash
cd C:\Users\CCL\Projects\danny-road
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看首页！

---

## 部署到 Vercel

### 方式一：Vercel Dashboard

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New..." → "Project"
3. 选择 `danny-road` GitHub 仓库
4. 点击 "Import"
5. **配置环境变量**（重要！）：
   - `NEXT_PUBLIC_GAODE_MAP_KEY`
   - `NEXT_PUBLIC_GAODE_MAP_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. 点击 "Deploy"

### 方式二：Vercel CLI

```bash
npm i -g vercel
cd C:\Users\CCL\Projects\danny-road
vercel
# 按提示操作，配置环境变量
```

---

## 验证清单

- [ ] GitHub 仓库已推送最新代码
- [ ] Supabase 项目已创建
- [ ] 数据库架构已运行（6 张表）
- [ ] .env.local 已填入 Supabase URL 和 Key
- [ ] 本地开发服务器可正常运行
- [ ] Vercel 部署成功（可选）

---

## 遇到问题？

### Git 推送失败
- 检查 GitHub Personal Access Token 权限（需要 `repo` 范围）
- 或使用 GitHub Desktop 图形界面推送

### Supabase 表创建失败
- 检查 SQL 语法错误
- 确认数据库已完全初始化（项目创建后等待 2 分钟）

### 本地运行报错
- 删除 `node_modules` 和 `package-lock.json`
- 运行 `npm install` 重新安装
- 确认 `.env.local` 文件格式正确

---

**🚗 祝开发顺利！**
