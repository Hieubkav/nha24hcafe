/**
 * Mẫu schema cho hệ thống Nha.24H Coffee (dùng tham khảo)
 * - Phù hợp để triển khai /admin CRUD với shadcn/tailwind và Convex
 * - Gợi ý bảng, trường, quan hệ, kèm comment tiếng Việt
 * - Lưu ý: Convex không có JOIN, nên quan hệ thể hiện bằng khóa tham chiếu (_id)
 * - File này chỉ là mẫu/tài liệu, có thể copy sang convex/schema.ts khi triển khai thật
 */

// ===== Nguyên tắc chung =====
// - Tên bảng (collection) dạng snake_case số nhiều.
// - Mỗi doc có: _id (tự sinh bởi Convex), _creationTime (Convex), createdAt, updatedAt, status.
// - Dùng slug duy nhất cho SEO.
// - Trường text dài dùng markdown nếu cần (long_description, content, ...).

// ===== Kiểu dùng chung =====
export type ID = string; // Tham chiếu _id của Convex (DocId<"table">)
export type ISODate = string; // new Date().toISOString()
export type CurrencyCode = 'VND' | 'USD';
export type Status = 'draft' | 'published' | 'archived' | 'inactive' | 'active';

// ===== Bảng lõi về địa điểm/quán =====
export interface Cafe {
  // Thông tin cơ bản
  _id?: ID;
  name: string; // Tên hiển thị: "Nhà.24H Coffee"
  slug: string; // duy nhất: "nha-24h-coffee"
  short_description?: string; // mô tả ngắn (hiển thị trên trang chủ)
  long_description?: string; // mô tả đầy đủ (markdown)
  logo?: ImageRef; // ảnh logo chính
  cover?: ImageRef; // ảnh cover/hero mặc định

  // Liên hệ & mạng xã hội
  contact?: {
    phone_display?: string;
    phone?: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    map_url?: string; // link Google Map
  };

  // Khoảng giá tham khảo
  price_range?: {
    min?: number;
    max?: number;
    currency?: CurrencyCode;
    display?: string; // ví dụ: "30.000 - 80.000 đ"
  };

  // Tiện ích nổi bật (amenities)
  amenities?: string[]; // ví dụ: ["phong_hop_mien_phi", "ban_lam_viec_rieng_tu", ...]

  // Hệ toạ độ & địa chỉ mặc định
  address?: Address;
  coordinates?: Coordinates;

  // SEO
  seo?: SeoMeta;

  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface Branch {
  // Chi nhánh (mở rộng tương lai — hiện tại có thể chỉ 1)
  _id?: ID;
  cafe_id: ID; // tham chiếu Cafe
  name: string; // Tên chi nhánh: "Nhà.24H Coffee - 3/2"
  slug: string;
  address: Address;
  coordinates?: Coordinates;
  phone?: string;
  email?: string;
  hours?: OpeningHour[]; // giờ mở cửa theo ngày
  area_sqm?: number; // diện tích (m2)
  amenities?: string[];
  cover?: ImageRef;
  gallery?: ImageRef[];
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface Address {
  full?: string; // "54A đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần Thơ"
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string; // "Việt Nam"
  note?: string; // ghi chú tìm đường
}

export interface Coordinates {
  lat: number | null;
  lng: number | null;
  source?: string | null; // nguồn lấy toạ độ
}

export interface OpeningHour {
  // Cấu hình giờ mở cửa linh hoạt
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun' | 'Mon-Sun';
  open: string; // HH:mm — "00:00"
  close: string; // HH:mm — "24:00"
  note?: string; // ví dụ: "Mở cửa 24/7"
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  og_image?: ImageRef; // 1200x630
  twitter_image?: ImageRef; // 1200x600
  noindex?: boolean;
}

// ===== Media / Ảnh =====
export interface ImageRef {
  _id?: ID;
  name: string; // tên file (đã chuẩn hoá theo nội dung)
  alt?: string; // text thay thế
  local?: string; // đường dẫn local: data/images/nha24h/...
  role?: 'hero' | 'gallery' | 'social' | 'menu' | 'room' | 'post';
  source?: 'facebook' | 'canthoriviu' | 'user' | 'other';
  source_url?: string | null;
  width?: number;
  height?: number;
  priority?: boolean; // ưu tiên preload (hero)
}

// ===== Không gian / phòng / bàn =====
export interface Room {
  _id?: ID;
  branch_id: ID; // chi nhánh
  type: 'meeting' | 'workspace' | 'sleep_box' | 'other'; // loại không gian
  name: string; // "Phòng họp A"
  slug: string;
  capacity?: number; // sức chứa
  features?: string[]; // trang bị: TV, whiteboard, cách âm, ổ cắm
  images?: ImageRef[];
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface TableSeat {
  _id?: ID;
  branch_id: ID;
  code: string; // mã bàn: T-01, T-02
  type?: 'desk' | 'sofa' | 'bar' | 'outdoor';
  capacity?: number;
  status?: 'available' | 'occupied' | 'reserved' | 'maintenance';
  note?: string;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface Reservation {
  _id?: ID;
  branch_id: ID;
  customer_id?: ID;
  room_id?: ID;
  table_id?: ID;
  start_time: ISODate;
  end_time: ISODate;
  party_size?: number;
  note?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Menu / sản phẩm =====
export interface MenuCategory {
  _id?: ID;
  cafe_id: ID;
  name: string; // "Cà phê", "Trà", "Nước trái cây"
  slug: string;
  description?: string;
  order?: number; // thứ tự hiển thị
  cover?: ImageRef;
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface MenuItem {
  _id?: ID;
  category_id: ID; // tham chiếu MenuCategory
  name: string; // "Cà phê sữa đá"
  slug: string;
  description?: string;
  price: number; // giá mặc định (size tiêu chuẩn)
  currency: CurrencyCode;
  images?: ImageRef[];
  tags?: string[]; // ví dụ: ["signature", "new", "best_seller"]
  options?: OptionGroupRef[]; // nhóm tuỳ chọn áp dụng cho item
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface OptionGroupRef {
  group_id: ID; // tham chiếu OptionGroup
  required?: boolean;
  max_select?: number; // số lượng tối đa được chọn
}

export interface OptionGroup {
  _id?: ID;
  name: string; // "Size", "Mức đường", "Đá", "Topping"
  slug: string;
  type: 'single' | 'multiple';
  options: ProductOption[];
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface ProductOption {
  value: string; // "S", "M", "L" hoặc "50% đường"
  plus_price?: number; // chênh lệch giá
  default?: boolean;
}

// ===== Bán hàng / Order cơ bản (mở rộng khi cần) =====
export interface Customer {
  _id?: ID;
  name?: string;
  phone?: string;
  email?: string;
  avatar?: ImageRef;
  note?: string;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface Order {
  _id?: ID;
  branch_id: ID;
  customer_id?: ID;
  status: 'cart' | 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
  items: OrderItem[];
  total: number;
  currency: CurrencyCode;
  note?: string;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface OrderItem {
  item_id: ID; // tham chiếu MenuItem
  name: string;
  qty: number;
  unit_price: number;
  options?: { group: string; value: string; plus_price?: number }[];
  subtotal: number; // qty * (unit_price + options)
}

// ===== Nội dung / Marketing =====
export interface Post {
  _id?: ID;
  cafe_id: ID;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string; // markdown
  cover?: ImageRef;
  tags?: string[];
  status?: Status;
  publishedAt?: ISODate;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface Review {
  _id?: ID;
  cafe_id: ID;
  customer_id?: ID;
  rating: number; // 1..5
  content?: string;
  images?: ImageRef[];
  source?: 'facebook' | 'google' | 'user';
  createdAt?: ISODate;
}

export interface Promotion {
  _id?: ID;
  cafe_id: ID;
  title: string;
  slug: string;
  description?: string;
  start_date?: ISODate;
  end_date?: ISODate;
  banner?: ImageRef;
  status?: Status;
}

// ===== Cấu hình trang & menu điều hướng =====
export interface NavMenu {
  _id?: ID;
  cafe_id: ID;
  code: 'main' | 'footer' | 'secondary';
  items: NavItem[];
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface NavItem {
  label: string;
  href: string; // "/", "/menu", "/phong-hop"
  external?: boolean;
}

export interface PageSection {
  _id?: ID;
  page: 'home' | 'menu' | 'rooms' | 'about' | 'contact';
  key: string; // ví dụ: "hero", "features", "gallery", "cta"
  title?: string;
  subtitle?: string;
  content?: string; // markdown
  media?: ImageRef[];
  order?: number;
  status?: Status;
}

export interface SiteSetting {
  _id?: ID;
  cafe_id: ID;
  theme?: {
    primary?: string;
    secondary?: string;
    darkMode?: boolean;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  seo_default?: SeoMeta;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Gợi ý triển khai Convex (tham khảo) =====
// Khi chuyển qua convex/schema.ts, có thể cấu trúc như sau:
// import { defineSchema, defineTable } from "convex/schema";
// export default defineSchema({
//   cafes: defineTable({
//     name: v.string(), slug: v.string(), short_description: v.optional(v.string()),
//     long_description: v.optional(v.string()), contact: v.optional(v.any()),
//     price_range: v.optional(v.any()), amenities: v.optional(v.array(v.string())),
//     address: v.optional(v.any()), coordinates: v.optional(v.any()), seo: v.optional(v.any()),
//     status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_slug", ["slug"]).index("by_status", ["status"]),
//   branches: defineTable({ cafe_id: v.id("cafes"), name: v.string(), slug: v.string(),
//     address: v.any(), coordinates: v.optional(v.any()), phone: v.optional(v.string()),
//     email: v.optional(v.string()), hours: v.optional(v.array(v.any())), area_sqm: v.optional(v.number()),
//     amenities: v.optional(v.array(v.string())), cover: v.optional(v.any()), gallery: v.optional(v.array(v.any())),
//     status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_cafe", ["cafe_id"]).index("by_slug", ["slug"]),
//   menu_categories: defineTable({ cafe_id: v.id("cafes"), name: v.string(), slug: v.string(),
//     description: v.optional(v.string()), order: v.optional(v.number()), cover: v.optional(v.any()),
//     status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_cafe", ["cafe_id"]).index("by_slug", ["slug"]),
//   menu_items: defineTable({ category_id: v.id("menu_categories"), name: v.string(), slug: v.string(),
//     description: v.optional(v.string()), price: v.number(), currency: v.string(), images: v.optional(v.array(v.any())),
//     tags: v.optional(v.array(v.string())), options: v.optional(v.array(v.any())), status: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_category", ["category_id"]).index("by_slug", ["slug"]).index("by_status", ["status"]),
//   option_groups: defineTable({ name: v.string(), slug: v.string(), type: v.string(), options: v.array(v.any()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_slug", ["slug"]),
//   customers: defineTable({ name: v.optional(v.string()), phone: v.optional(v.string()), email: v.optional(v.string()),
//     avatar: v.optional(v.any()), note: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_phone", ["phone"]).index("by_email", ["email"]),
//   orders: defineTable({ branch_id: v.id("branches"), customer_id: v.optional(v.id("customers")), status: v.string(),
//     items: v.array(v.any()), total: v.number(), currency: v.string(), note: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_branch", ["branch_id"]).index("by_customer", ["customer_id"]).index("by_status", ["status"]),
//   reservations: defineTable({ branch_id: v.id("branches"), customer_id: v.optional(v.id("customers")), room_id: v.optional(v.id("rooms")),
//     table_id: v.optional(v.id("table_seats")), start_time: v.string(), end_time: v.string(), party_size: v.optional(v.number()),
//     note: v.optional(v.string()), status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_branch", ["branch_id"]).index("by_room", ["room_id"]).index("by_table", ["table_id"]).index("by_customer", ["customer_id"]),
//   rooms: defineTable({ branch_id: v.id("branches"), type: v.string(), name: v.string(), slug: v.string(), capacity: v.optional(v.number()),
//     features: v.optional(v.array(v.string())), images: v.optional(v.array(v.any())), status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_branch", ["branch_id"]).index("by_slug", ["slug"]),
//   table_seats: defineTable({ branch_id: v.id("branches"), code: v.string(), type: v.optional(v.string()), capacity: v.optional(v.number()),
//     status: v.optional(v.string()), note: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_branch", ["branch_id"]).index("by_code", ["code"]),
//   posts: defineTable({ cafe_id: v.id("cafes"), title: v.string(), slug: v.string(), excerpt: v.optional(v.string()), content: v.optional(v.string()),
//     cover: v.optional(v.any()), tags: v.optional(v.array(v.string())), status: v.optional(v.string()), publishedAt: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_slug", ["slug"]).index("by_status", ["status"]).index("by_cafe", ["cafe_id"]),
//   reviews: defineTable({ cafe_id: v.id("cafes"), customer_id: v.optional(v.id("customers")), rating: v.number(), content: v.optional(v.string()),
//     images: v.optional(v.array(v.any())), source: v.optional(v.string()), createdAt: v.optional(v.string())
//   }).index("by_cafe", ["cafe_id"]).index("by_rating", ["rating"]),
//   promotions: defineTable({ cafe_id: v.id("cafes"), title: v.string(), slug: v.string(), description: v.optional(v.string()),
//     start_date: v.optional(v.string()), end_date: v.optional(v.string()), banner: v.optional(v.any()), status: v.optional(v.string())
//   }).index("by_slug", ["slug"]).index("by_cafe", ["cafe_id"]),
//   nav_menus: defineTable({ cafe_id: v.id("cafes"), code: v.string(), items: v.array(v.any()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_cafe", ["cafe_id"]).index("by_code", ["code"]),
//   page_sections: defineTable({ page: v.string(), key: v.string(), title: v.optional(v.string()), subtitle: v.optional(v.string()), content: v.optional(v.string()),
//     media: v.optional(v.array(v.any())), order: v.optional(v.number()), status: v.optional(v.string())
//   }).index("by_page", ["page"]).index("by_key", ["key"]).index("by_status", ["status"]),
//   site_settings: defineTable({ cafe_id: v.id("cafes"), theme: v.optional(v.any()), social: v.optional(v.any()), seo_default: v.optional(v.any()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index("by_cafe", ["cafe_id"]),
// });

// ===== Gợi ý form schema (Zod) cho /admin (tham khảo) =====
// Có thể tạo file riêng dùng zod để validate form input của shadcn/ui.
// Ví dụ (giản lược):
// import { z } from 'zod';
// export const cafeFormSchema = z.object({
//   name: z.string().min(2, 'Tên quá ngắn'),
//   slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
//   short_description: z.string().optional(),
//   long_description: z.string().optional(),
//   contact: z.object({ phone_display: z.string().optional(), phone: z.string().optional(), facebook: z.string().url().optional() }).optional(),
//   price_range: z.object({ min: z.number().optional(), max: z.number().optional(), currency: z.enum(['VND','USD']).optional(), display: z.string().optional() }).optional(),
//   amenities: z.array(z.string()).optional(),
// });

// ===== Gợi ý chỉ mục (indexes) =====
// - cafes.by_slug, cafes.by_status
// - branches.by_cafe, branches.by_slug
// - menu_categories.by_cafe, menu_categories.by_slug, menu_categories.by_order
// - menu_items.by_category, menu_items.by_slug, menu_items.by_status, menu_items.by_tag (nếu cần)
// - orders.by_branch, orders.by_customer, orders.by_status, orders.by_createdAt (nếu lưu)
// - page_sections.by_page, page_sections.by_status

// ===== Gợi ý quyền (RBAC) =====
// - roles: owner, manager, staff
// - permissions theo resource: cafes, branches, menu_categories, menu_items, orders, reservations, posts, reviews, promotions, nav_menus, page_sections, site_settings
// - mapping role -> permissions (CRUD + publish)

// Hết — file mẫu schema.ts

