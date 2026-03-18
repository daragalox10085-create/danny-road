# Danny Road 技术架构

## 数据库设计

### 1. locations (地点表)

```prisma
model Location {
  id          String   @id @default(uuid())
  name        String   // 地点名称
  type        String   // 公园/商场/厕所/充电站/住宿
  latitude    Float    // 纬度
  longitude   Float    // 经度
  
  // 停车信息
  parking     String   // 好/一般/差
  parkingFee  String   // 免费/收费
  parkingSlots Int     // 车位数量
  
  // 设施信息
  toilet      Boolean  // 有厕所
  charging    Boolean  // 有充电
  quiet       Boolean  // 安静（车上住宿用）
  
  // 元数据
  address     String   // 地址
  tags        String[] // 标签
  gaodePoiId  String   // 高德 POI ID
  rating      Float    // 评分
  reviewCount Int      // 评论数
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([latitude, longitude])
  @@index([type])
  @@index([parking])
}
```

---

### 2. routes (路线表)

```prisma
model Route {
  id          String   @id @default(uuid())
  name        String   // 路线名称
  description String   // 描述
  
  // 基础信息
  duration    String   // 时长（2 天 1 夜）
  distance    String   // 距离（120km）
  difficulty  String   // 入门/进阶/高级
  
  // 路线数据
  startPoint  Json     // 起点 {lat, lng, name}
  endPoint    Json     // 终点 {lat, lng, name}
  waypoints   Json     // 途经点数组
  
  // 服务设施
  parkingInfo String   // 停车信息
  chargingInfo String  // 充电信息
  stayInfo    String   // 住宿信息
  toiletInfo  String   // 厕所信息
  
  // 元数据
  tags        String[] // 标签
  rating      Float    // 评分
  reviewCount Int      // 评论数
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([difficulty])
  @@index([tags])
}
```

---

### 3. parking_records (停车记录表)

```prisma
model ParkingRecord {
  id          String   @id @default(uuid())
  locationId  String   // 地点 ID
  userId      String   // 用户 ID
  
  // 停车数据
  status      String   // 充足/紧张/已满
  slotsAvailable Int   // 剩余车位
  fee         String   // 实际费用
  
  // 用户评价
  rating      Int      // 1-5 分
  comment     String   // 评论
  
  createdAt   DateTime @default(now())
  
  @@index([locationId])
  @@index([createdAt])
}
```

---

### 4. toilets (厕所表)

```prisma
model Toilet {
  id          String   @id @default(uuid())
  name        String   // 厕所名称
  latitude    Float    // 纬度
  longitude   Float    // 经度
  
  // 设施信息
  isFree      Boolean  // 免费
  isOpen24h   Boolean  // 24 小时开放
  cleanliness String   // 干净程度（好/一般/差）
  
  // 元数据
  address     String   // 地址
  gaodePoiId  String   // 高德 POI ID
  
  createdAt   DateTime @default(now())
  
  @@index([latitude, longitude])
}
```

---

## 高德 API 集成

### 核心 API

| API | 用途 | 调用频率 |
|-----|------|---------|
| **POI 搜索** | 搜索地点/设施 | 高 |
| **周边搜索** | 搜索附近设施 | 高 |
| **路线规划** | 规划驾驶路线 | 中 |
| **天气查询** | 获取天气数据 | 低 |
| **地理编码** | 地址转坐标 | 中 |

---

### POI 分类代码速查

```javascript
const POI_TYPES = {
  // 停车相关
  PARKING: '110000',
  PARKING_LOT: '110100',
  
  // 充电相关
  CHARGING_STATION: '110300',
  
  // 厕所相关
  TOILET: '110600',
  
  // 服务相关
  SERVICE_AREA: '110200',
  
  // 景点相关
  SCENIC_SPOT: '110400',
  
  // 餐饮相关
  RESTAURANT: '120000'
}
```

---

### API 调用封装

```typescript
// services/gaode.ts
const GAODE_KEY = process.env.NEXT_PUBLIC_GAODE_KEY

export async function searchPOI(params: {
  keywords: string
  location: string
  radius: number
  type: string
}) {
  const url = `https://restapi.amap.com/v3/place/around?key=${GAODE_KEY}&${new URLSearchParams(params)}`
  const res = await fetch(url)
  return res.json()
}

export async function planRoute(params: {
  origin: string
  destination: string
}) {
  const url = `https://restapi.amap.com/v3/direction/driving?key=${GAODE_KEY}&${new URLSearchParams(params)}`
  const res = await fetch(url)
  return res.json()
}
```

---

### 调用频率限制

| 接口 | 日配额 | QPS |
|-----|--------|-----|
| POI 搜索 | 100,000 | 50 |
| 路线规划 | 50,000 | 30 |
| 天气查询 | 50,000 | 30 |

**优化策略**：
1. 前端缓存（5 分钟）
2. 后端缓存（1 小时）
3. 批量查询（一次多关键词）

---

## 核心问题解决方案

### 1. 停车便利数据

**方案**：
- 高德 API (70%) - 基础停车信息
- 用户众包 (20%) - 实时状态更新
- 合作伙伴 (10%) - 商场/景区数据

**实现**：
```typescript
async function getParkingInfo(locationId: string) {
  // 1. 从缓存获取
  const cached = await cache.get(`parking:${locationId}`)
  if (cached) return cached
  
  // 2. 从高德 API 获取
  const gaodeData = await gaode.getParking(locationId)
  
  // 3. 合并用户上报数据
  const userReports = await db.parkingRecords
    .findMany({ where: { locationId } })
  
  // 4. 计算综合评分
  const score = calculateScore(gaodeData, userReports)
  
  // 5. 缓存结果
  await cache.set(`parking:${locationId}`, score, 300)
  
  return score
}
```

---

### 2. 安静过夜点筛选

**评分算法**：
```typescript
function calculateQuietScore(location: Location) {
  // 噪音评分（40%）
  const noiseScore = 100 - location.trafficLevel
  
  // 安全评分（40%）
  const safetyScore = location.securityLevel
  
  // 便利评分（20%）
  const convenienceScore = (
    (location.hasToilet ? 33 : 0) +
    (location.hasLight ? 33 : 0) +
    (location.hasSecurity ? 34 : 0)
  )
  
  return (
    noiseScore * 0.4 +
    safetyScore * 0.4 +
    convenienceScore * 0.2
  )
}
```

---

### 3. 充电桩实时检查

**多源数据融合**：
```typescript
async function getChargingStatus(stationId: string) {
  // 1. 运营商 API（最准确）
  const operatorData = await getOperatorData(stationId)
  
  // 2. 用户上报（实时性高）
  const userReports = await getUserReports(stationId)
  
  // 3. 历史数据推算（兜底）
  const historicalData = await getHistoricalData(stationId)
  
  // 4. 加权平均
  return (
    operatorData * 0.6 +
    userReports * 0.3 +
    historicalData * 0.1
  )
}
```

---

## 技术栈

### 前端
- **Web**: Next.js 16 + Tailwind CSS
- **小程序**: Taro 框架
- **状态管理**: React Context
- **地图**: 高德地图 JS API

### 后端
- **数据库**: Supabase (PostgreSQL)
- **API**: Next.js API Routes
- **缓存**: Redis (Upstash)
- **部署**: Vercel

### 第三方服务
- **地图**: 高德地图 API
- **天气**: 高德天气 API
- **认证**: Supabase Auth

---

## 项目文件结构

```
danny-road/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 首页
│   │   ├── routes/
│   │   │   └── page.tsx      # 路线页
│   │   ├── plan/
│   │   │   └── page.tsx      # 规划页
│   │   └── layout.tsx        # 布局
│   ├── components/
│   │   ├── ServiceCard.tsx   # 服务卡片
│   │   ├── RouteCard.tsx     # 路线卡片
│   │   ├── ServiceTab.tsx    # 设施 TAB
│   │   └── Timeline.tsx      # 时间轴
│   ├── services/
│   │   ├── gaode.ts          # 高德 API
│   │   └── supabase.ts       # 数据库
│   └── lib/
│       ├── utils.ts          # 工具函数
│       └── types.ts          # 类型定义
├── docs/
│   ├── PRODUCT_PLAN.md       # 产品规划
│   ├── DESIGN_SYSTEM.md      # 设计规范
│   └── TECH_ARCHITECTURE.md  # 技术架构
└── package.json
```

---

## 实现路线图

### 第 1-2 周：MVP
- [ ] 首页（三种场景入口）
- [ ] 路线列表页
- [ ] 高德 API 集成
- [ ] 基础地图功能

### 第 3-4 周：数据积累
- [ ] 10 条种子路线
- [ ] 100 个停车点数据
- [ ] 50 个厕所数据
- [ ] 用户评价系统

### 第 5-8 周：智能功能
- [ ] AI 推荐算法
- [ ] 实时停车状态
- [ ] 预约功能
- [ ] 天气集成

### 第 9-12 周：社区运营
- [ ] 用户社区
- [ ] UGC 内容
- [ ] 组队出行
- [ ] 会员系统

---

**文档位置**: `C:\Users\CCL\Projects\danny-road\docs\TECH_ARCHITECTURE.md`
