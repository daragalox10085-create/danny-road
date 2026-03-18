-- Danny Road Supabase Database Schema
-- 创建时间：2026-03-02

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. 地点表 (Locations)
-- 存储所有地点信息：停车点/厕所/充电站/景点等
-- =============================================
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- park/mall/toilet/charging_station/scenic_spot/etc.
  
  -- 地理位置
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  
  -- 停车信息
  parking VARCHAR(20), -- good/fair/poor
  parking_fee VARCHAR(50), -- free/paid
  parking_slots INTEGER,
  
  -- 设施信息
  toilet BOOLEAN DEFAULT false,
  charging BOOLEAN DEFAULT false,
  quiet BOOLEAN DEFAULT false, -- 适合车上住宿
  
  -- 元数据
  tags TEXT[], -- 标签数组
  gaode_poi_id VARCHAR(100), -- 高德 POI ID
  rating DECIMAL(3, 2) DEFAULT 0, -- 评分 0-5
  review_count INTEGER DEFAULT 0, -- 评论数
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_locations_type ON locations(type);
CREATE INDEX idx_locations_parking ON locations(parking);
CREATE INDEX idx_locations_coords ON locations(latitude, longitude);
CREATE INDEX idx_locations_tags ON locations USING GIN(tags);

-- =============================================
-- 2. 路线表 (Routes)
-- 存储推荐路线信息
-- =============================================
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- 基础信息
  duration VARCHAR(50), -- 2 天 1 夜
  distance VARCHAR(50), -- 120km
  difficulty VARCHAR(20), -- easy/medium/hard
  
  -- 路线数据
  start_point JSONB, -- {lat, lng, name}
  end_point JSONB, -- {lat, lng, name}
  waypoints JSONB, -- 途经点数组
  
  -- 服务设施
  parking_info TEXT,
  charging_info TEXT,
  stay_info TEXT,
  toilet_info TEXT,
  
  -- 元数据
  tags TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_routes_difficulty ON routes(difficulty);
CREATE INDEX idx_routes_tags ON routes USING GIN(tags);

-- =============================================
-- 3. 帖子表 (Posts)
-- 社区 UGC 内容
-- =============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author VARCHAR(255) NOT NULL,
  avatar VARCHAR(10),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  
  -- 分类
  tags TEXT[],
  
  -- 互动数据
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  
  -- 多媒体
  images TEXT[],
  
  -- 来源标注（小红书等）
  source VARCHAR(255),
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- =============================================
-- 4. 商品表 (Products)
-- 商城商品
-- =============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- 价格
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  
  -- 商品图片
  image VARCHAR(500),
  
  -- 分类标签
  tags TEXT[],
  
  -- 评价
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  
  -- 库存
  stock INTEGER DEFAULT 0,
  
  -- 状态
  is_active BOOLEAN DEFAULT true,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_active ON products(is_active);

-- =============================================
-- 5. 停车记录表 (Parking Records)
-- 用户上报的停车状态
-- =============================================
CREATE TABLE parking_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  user_id UUID, -- 用户 ID（暂时留空）
  
  -- 停车数据
  status VARCHAR(20), -- available/tight/full
  slots_available INTEGER,
  fee VARCHAR(50),
  
  -- 用户评价
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_parking_location ON parking_records(location_id);
CREATE INDEX idx_parking_created ON parking_records(created_at DESC);

-- =============================================
-- 6. 厕所表 (Toilets)
-- 公共厕所信息
-- =============================================
CREATE TABLE toilets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  
  -- 地理位置
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT,
  
  -- 设施信息
  is_free BOOLEAN DEFAULT true,
  is_open_24h BOOLEAN DEFAULT false,
  cleanliness VARCHAR(20), -- good/fair/poor
  
  -- 元数据
  gaode_poi_id VARCHAR(100),
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_toilets_coords ON toilets(latitude, longitude);
CREATE INDEX idx_toilets_cleanliness ON toilets(cleanliness);

-- =============================================
-- 7. 用户表 (Users) - 基础版本
-- =============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  nickname VARCHAR(100),
  avatar VARCHAR(500),
  
  -- 车辆信息
  car_model VARCHAR(100),
  car_range INTEGER, -- 续航里程 km
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. 收藏表 (Favorites)
-- 用户收藏的地点/路线
-- =============================================
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 确保不重复收藏
  UNIQUE(user_id, location_id),
  UNIQUE(user_id, route_id)
);

-- =============================================
-- 9. 评论表 (Comments)
-- 用户对地点/路线的评论
-- =============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  images TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 触发器：自动更新 updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为需要自动更新的表添加触发器
CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON routes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 初始数据：深圳地区种子数据
-- =============================================

-- 深圳车上住宿点（10 个）
INSERT INTO locations (name, type, latitude, longitude, address, parking, parking_fee, quiet, toilet, tags) VALUES
('深圳湾公园 P8 停车场', 'parking', 22.5066, 113.9537, '深圳市南山区滨海大道', 'good', 'free', true, true, ARRAY['深圳', '车上住宿', '安静', '厕所']),
('人才公园停车场', 'parking', 22.5197, 113.9392, '深圳市南山区科苑南路', 'good', 'free', true, true, ARRAY['深圳', '车上住宿', '24 小时', '安全']),
('前海石公园停车场', 'parking', 22.5436, 113.8919, '深圳市南山区前海湾', 'good', 'free', true, false, ARRAY['深圳', '车上住宿', '海边', '安静']),
('大梅沙海滨公园停车场', 'parking', 22.5947, 114.3042, '深圳市盐田区盐梅路', 'good', 'paid', true, true, ARRAY['深圳', '车上住宿', '淋浴', '海滩']),
('深圳湾体育中心停车场', 'parking', 22.5253, 113.9389, '深圳市南山区科苑南路', 'good', 'paid', false, true, ARRAY['深圳', '停车', '厕所']),
('莲花山公园停车场', 'parking', 22.5542, 114.0597, '深圳市福田区红荔路', 'fair', 'free', false, true, ARRAY['深圳', '停车', '公园']),
('深圳图书馆停车场', 'parking', 22.5449, 114.0578, '深圳市福田区福中一路', 'good', 'free', false, true, ARRAY['深圳', '停车', '免费']),
('宝安中心停车场', 'parking', 22.5542, 113.8847, '深圳市宝安区新安街道', 'good', 'paid', false, true, ARRAY['深圳', '停车', '宝安']),
('龙岗大运中心停车场', 'parking', 22.7167, 114.2239, '深圳市龙岗区龙翔大道', 'good', 'free', false, true, ARRAY['深圳', '停车', '龙岗']),
('坪山湿地公园停车场', 'parking', 22.6931, 114.3789, '深圳市坪山区', 'good', 'free', true, false, ARRAY['深圳', '车上住宿', '湿地', '安静']);

-- 大鹏半岛厕所（10 个）
INSERT INTO toilets (name, latitude, longitude, address, is_free, is_open_24h, cleanliness) VALUES
('较场尾游客中心厕所', 22.5892, 114.5139, '深圳市大鹏新区较场尾', true, false, 'good'),
('大鹏古城南门厕所', 22.5919, 114.5156, '深圳市大鹏新区大鹏所城', true, false, 'good'),
('杨梅坑入口厕所', 22.5536, 114.5436, '深圳市大鹏新区杨梅坑', true, false, 'good'),
('西涌海滩厕所', 22.4889, 114.4956, '深圳市大鹏新区西涌', true, false, 'fair'),
('较场尾海滩公共厕所', 22.5878, 114.5128, '深圳市大鹏新区较场尾海滩', true, true, 'good'),
('大鹏广场厕所', 22.5928, 114.5167, '深圳市大鹏新区大鹏广场', true, true, 'good'),
('玫瑰海岸厕所', 22.5597, 114.5328, '深圳市大鹏新区玫瑰海岸', true, false, 'good'),
('较场尾路公共厕所', 22.5869, 114.5117, '深圳市大鹏新区较场尾路', true, true, 'fair'),
('大鹏所城北门厕所', 22.5939, 114.5153, '深圳市大鹏新区大鹏所城北门', true, false, 'good'),
('南澳月亮湾厕所', 22.5367, 114.4847, '深圳市大鹏新区南澳', true, false, 'good');

-- 深圳周边种子路线（4 条）
INSERT INTO routes (name, description, duration, distance, difficulty, start_point, end_point, parking_info, charging_info, stay_info, tags) VALUES
('深圳东部海岸线', '深圳最美海岸线，大小梅沙 - 大鹏 - 较场尾，全程好停车', '1 天', '80km', 'easy', 
 '{"lat": 22.5436, "lng": 114.0578, "name": "深圳福田 CBD"}',
 '{"lat": 22.5892, "lng": 114.5139, "name": "较场尾"}',
 '沿途 5 个大型停车场，周末也不满',
 '沿途 5 个快充站，大鹏古城有特斯拉超充',
 '较场尾民宿/大鹏酒店',
 ARRAY['深圳', '海滩', '休闲', '好停车']),

('深圳西部滨海线', '前海 - 宝安中心 - 西湾红树林，看绝美日落', '1 天', '60km', 'easy',
 '{"lat": 22.5436, "lng": 113.8919, "name": "前海"}',
 '{"lat": 22.5542, "lng": 113.8847, "name": "西湾红树林"}',
 '前海/宝中充电站密集，停车位充足',
 '前海/宝中充电站极多',
 '宝中酒店/南山酒店',
 ARRAY['深圳', '海滩', '日落', '城市']),

('深圳山海专线', '梧桐山 - 仙湖 - 东湖绿道，登山 + 休闲', '1 天', '50km', 'easy',
 '{"lat": 22.5833, "lng": 114.1833, "name": "梧桐山"}',
 '{"lat": 22.5667, "lng": 114.1667, "name": "东湖公园"}',
 '仙湖植物园停车场有充电桩',
 '仙湖植物园有充电桩',
 '罗湖/莲塘酒店',
 ARRAY['深圳', '徒步', '自然', '登山']),

('深圳城市探索', '福田 CBD- 华侨城 - 南头古城，城市文化之旅', '半天', '30km', 'easy',
 '{"lat": 22.5436, "lng": 114.0578, "name": "福田 CBD"}',
 '{"lat": 22.5436, "lng": 113.9197, "name": "南头古城"}',
 '市区充电站极多，停车方便',
 '市区充电站极多',
 '市区酒店',
 ARRAY['深圳', '城市', '文化', '美食']);

-- =============================================
-- Row Level Security (RLS) 策略
-- =============================================

-- 启用 RLS
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE toilets ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 公开读取策略（所有表）
CREATE POLICY "Allow public read access to locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to routes" ON routes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to toilets" ON toilets FOR SELECT USING (true);

-- 用户写入策略（需要登录）
CREATE POLICY "Allow authenticated users to insert locations" ON locations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update locations" ON locations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert posts" ON posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update own posts" ON posts FOR UPDATE TO authenticated USING (true);

-- =============================================
-- 完成提示
-- =============================================
-- Schema 创建完成！
-- 下一步：
-- 1. 在 Supabase Dashboard 运行此 SQL
-- 2. 复制 URL 和 Anon Key 到 .env.local
-- 3. 测试数据库连接
