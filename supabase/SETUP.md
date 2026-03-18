# Supabase 设置指南

## 1. 创建 Supabase 项目

1. 访问 https://supabase.com
2. 登录/注册账号
3. 点击 "New Project"
4. 填写项目信息：
   - **Name**: `danny-road`
   - **Database Password**: （保存好，后面要用）
   - **Region**: 选择最近的（推荐 Asia Singapore）
5. 等待项目创建（约 2 分钟）

---

## 2. 运行数据库 Schema

1. 进入项目 Dashboard
2. 点击左侧 "SQL Editor"
3. 点击 "New Query"
4. 复制 `schema.sql` 文件内容
5. 粘贴到 SQL Editor
6. 点击 "Run" 执行

**预期结果**：
- ✅ 9 个表创建成功
- ✅ 索引创建成功
- ✅ 触发器创建成功
- ✅ 种子数据插入成功（10 个车上住宿点 + 10 个厕所 + 4 条路线）

---

## 3. 获取 API 密钥

1. 进入项目 Dashboard
2. 点击 "Settings" → "API"
3. 复制以下两个值：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 4. 配置环境变量

编辑 `.env.local` 文件：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://你的项目 ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key

# Gaode API (Strict Usage - For Testing Only)
NEXT_PUBLIC_GAODE_KEY=2b305f1471d420e03bc3301521556380
NEXT_PUBLIC_GAODE_SECURITY_SECRET=cc458763a339556b1c71a59068c6e4e5
```

---

## 5. 安装 Supabase 客户端

```bash
cd C:\Users\CCL\Projects\danny-road
npm install @supabase/supabase-js
```

---

## 6. 测试连接

创建测试文件 `src/app/test-db/page.tsx`：

```tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestDBPage() {
  const [count, setCount] = useState<any>(null)

  useEffect(() => {
    async function test() {
      // 测试地点表
      const { data, error } = await supabase
        .from('locations')
        .select('*', { count: 'exact' })
        .limit(1)
      
      if (error) {
        console.error('Error:', error)
        setCount({ error: error.message })
      } else {
        setCount({ 
          total: data?.length,
          sample: data?.[0]
        })
      }
    }
    
    test()
  }, [])

  return (
    <div className="min-h-screen p-8">
      <h1>Supabase 连接测试</h1>
      <pre>{JSON.stringify(count, null, 2)}</pre>
    </div>
  )
}
```

访问 `http://localhost:3000/test-db` 查看结果。

---

## 7. 数据库管理

### 在 Supabase Dashboard 添加数据

1. 点击左侧 "Table Editor"
2. 选择表（如 `locations`）
3. 点击 "Insert" → "New Row"
4. 填写数据
5. 点击 "Save"

### 导出/导入数据

1. 点击左侧 "Table Editor"
2. 选择表
3. 点击右上角 "..." → "Export"
4. 选择格式（CSV/JSON）

---

## 8. 数据库表结构

### locations (地点表)
存储所有地点信息：停车点/厕所/充电站/景点等

**关键字段**：
- `parking`: good/fair/poor（停车便利度）
- `quiet`: true/false（是否安静，适合车上住宿）
- `toilet`: true/false（是否有厕所）
- `charging`: true/false（是否有充电桩）

### routes (路线表)
存储推荐路线

**关键字段**：
- `difficulty`: easy/medium/hard
- `start_point`: JSON {lat, lng, name}
- `end_point`: JSON {lat, lng, name}
- `waypoints`: JSON 途经点数组

### posts (帖子表)
社区 UGC 内容

**关键字段**：
- `source`: 来源标注（如 "小红书 @xxx"）
- `images`: 图片数组

### products (商品表)
商城商品

**关键字段**：
- `is_active`: true/false（是否上架）
- `stock`: 库存数量

---

## 9. 种子数据

**已预置数据**：
- 🚗 10 个深圳车上住宿点
- 🚻 10 个大鹏半岛厕所
- 🗺️ 4 条深圳周边路线

**数据来源**：
- 小红书内容（已标注出处）
- 实地测试数据

---

## 10. 常见问题

### Q: 如何删除测试数据？
A: 在 Table Editor 中选择数据行，点击删除按钮。

### Q: 如何备份数据库？
A: Settings → Database → Export → 下载 SQL 备份。

### Q: 如何重置数据库？
A: Settings → Database → Reset Database（谨慎操作！）。

---

## 11. 下一步

1. ✅ 创建 Supabase 项目
2. ✅ 运行 schema.sql
3. ✅ 配置 .env.local
4. ⏳ 安装 @supabase/supabase-js
5. ⏳ 测试数据库连接
6. ⏳ 集成到网站（读取真实数据）

---

**文档位置**: `C:\Users\CCL\Projects\danny-road\supabase\SETUP.md`
