/**
 * Simple schema cho hệ thống Nha.24H Coffee (đã tinh gọn có chủ ý)
 * Mục tiêu: đủ dùng cho website + quản trị cơ bản (menu, đơn hàng nhẹ, nội dung),
 * đồng thời tránh bội số bảng/phức tạp chưa cần thiết lúc đầu triển khai.
 *
 * Nguyên tắc rút gọn:
 * - Giữ những bảng lõi: Cafe, MenuCategory, MenuItem, Customer, Order, PageSection, SiteSetting.
 * - Bỏ/hoãn các bảng nâng cao: Branch, Room, TableSeat, OptionGroup, Review, Promotion, NavMenu.
 * - Hợp nhất cấu trúc tuỳ chọn (size/topping) vào ngay MenuItem để giảm số bảng.
 * - Đặt lịch đặt chỗ (Reservation) ở dạng tối giản, không phụ thuộc Room/Table.
 *
 * Lưu ý: Đây là file schema tài liệu/tham khảo. Khi triển khai thật với Convex,
 * có thể sao chép và điều chỉnh sang `convex/schema.ts` theo cú pháp defineTable.
 */

// ===== Kiểu dùng chung =====
export type ID = string; // Tham chiếu _id của Convex (DocId<"table">)
export type ISODate = string; // new Date().toISOString()
export type CurrencyCode = 'VND' | 'USD';
export type Status = 'draft' | 'published' | 'archived' | 'inactive' | 'active';

// ===== Media / Ảnh (giữ đơn giản nhưng đủ thông tin) =====
// Giữ: name, alt, local, role, source, source_url, width/height, priority
// Bỏ: url là tuỳ — nếu có CDN ngoài, dùng source_url; tránh dựa vào URL ngoài không bền.
export interface ImageRef {
  _id?: ID;
  name: string; // Tên file đã chuẩn hoá
  alt?: string;
  local?: string; // Đường dẫn local: data/images/... (ưu tiên dùng ảnh local)
  role?: 'hero' | 'gallery' | 'social' | 'menu';
  source?: 'facebook' | 'canthoriviu' | 'user' | 'other';
  source_url?: string | null; // Link nguồn nếu cần truy xuất
  width?: number;
  height?: number;
  priority?: boolean; // Ưu tiên preload (ảnh hero)
}

// ===== Địa chỉ / Tọa độ / SEO (dùng lại vì hữu ích) =====
export interface Address {
  full?: string;
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
  note?: string;
}

export interface Coordinates {
  lat: number | null;
  lng: number | null;
  source?: string | null; // Nguồn lấy tọa độ
}

export interface OpeningHour {
  // Đơn giản: giờ mở cửa ở cấp Cafe (không tách Branch)
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun' | 'Mon-Sun';
  open: string;  // HH:mm, ví dụ "00:00"
  close: string; // HH:mm, ví dụ "24:00"
  note?: string; // "Mở cửa 24/7"
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  og_image?: ImageRef; // 1200x630
  twitter_image?: ImageRef; // 1200x600
  noindex?: boolean;
}

// ===== Cafe (GIỮ) =====
// Ý đồ: Một quán duy nhất hiện tại → không cần bảng Branch lúc đầu.
// - Giữ trường cần cho trang chủ/giới thiệu/SEO.
// - Thêm hours tại cấp Cafe (thay vì Branch) để khớp dữ liệu thực tế hiện tại.
export interface Cafe {
  _id?: ID;
  name: string; // "Nhà.24H Coffee"
  slug: string; // duy nhất: "nha-24h-coffee"
  short_description?: string; // mô tả ngắn (hero/home)
  long_description?: string;  // mô tả dài (markdown)
  logo?: ImageRef;
  cover?: ImageRef;
  gallery?: ImageRef[]; // Nhúng một số ảnh nổi bật

  contact?: {
    phone_display?: string;
    phone?: string;
    email?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    map_url?: string; // Link Google Map
  };

  price_range?: {
    min?: number;
    max?: number;
    currency?: CurrencyCode;
    display?: string; // "30.000 - 80.000 đ"
  };

  amenities?: string[]; // ví dụ: ["phong_hop_mien_phi", "sleep_box", ...]

  address?: Address;
  coordinates?: Coordinates;
  hours?: OpeningHour[]; // Đặt giờ mở cửa ngay tại Cafe (đơn giản)

  seo?: SeoMeta;
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Menu (GIỮ) =====
// Ý đồ: đủ để dựng menu trên web + quản trị đơn giản.
export interface MenuCategory {
  _id?: ID;
  name: string; // "Cà phê", "Trà", "Nước trái cây"
  slug: string;
  description?: string;
  order?: number; // Thứ tự hiển thị
  cover?: ImageRef;
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// Hợp nhất OptionGroup vào ngay MenuItem:
// - variants: cho size/chọn 1 (S/M/L) — optional, max 1 lựa chọn.
// - addons: cho topping/chọn nhiều — optional, nhiều lựa chọn.
export interface Variant {
  name: string;         // "S", "M", "L"
  plus_price?: number;  // chênh lệch so với giá gốc
  default?: boolean;
}

export interface Addon {
  name: string;        // "Thêm shot espresso", "Ít đường"
  plus_price?: number; // 0 nếu chỉ là ghi chú không tính tiền
}

export interface MenuItem {
  _id?: ID;
  category_id: ID; // tham chiếu MenuCategory
  name: string;    // "Cà phê sữa đá"
  slug: string;
  description?: string;
  price: number;           // giá gốc (khi không chọn variant)
  currency: CurrencyCode;  // thường là 'VND'
  images?: ImageRef[];
  tags?: string[];         // ví dụ: ["signature", "new"]
  variants?: Variant[];    // thay cho OptionGroup loại single
  addons?: Addon[];        // thay cho OptionGroup loại multiple
  status?: Status;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Customer & Order (GIỮ — rút gọn) =====
// Ý đồ: đủ để lưu đơn đơn giản (tại quầy/online nhẹ) mà không cần hệ POS đầy đủ.
export interface Customer {
  _id?: ID;
  name?: string;
  phone?: string; // Khuyến khích unique trong app layer
  email?: string;
  note?: string;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

export interface OrderItem {
  menu_item_id: ID;  // tham chiếu MenuItem
  name: string;      // copy tên tại thời điểm đặt (tránh ảnh hưởng rename)
  qty: number;
  unit_price: number; // giá gốc tại thời điểm đặt
  variant?: { name: string; plus_price?: number } | null; // chọn 1
  addons?: { name: string; plus_price?: number }[];       // chọn nhiều
  note?: string;     // ghi chú (ít đường/đá…)
  subtotal: number;  // qty * (unit_price + variant + addons)
}

export interface Order {
  _id?: ID;
  // Không tách Branch: dùng 1 quán duy nhất hiện tại. Nếu mở rộng nhiều chi nhánh sau này,
  // có thể thêm trường branch_id và tách bảng Branch (xem mục Nâng cấp bên dưới).
  customer_id?: ID;
  status: 'cart' | 'pending' | 'paid' | 'cancelled' | 'refunded' | 'completed';
  items: OrderItem[];
  total: number;
  currency: CurrencyCode;
  note?: string;
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Reservation (GIỮ Ở DẠNG RẤT TỐI GIẢN) =====
// Ý đồ: hỗ trợ nhận đặt chỗ cơ bản mà KHÔNG cần bảng Room/Table/Branch ngay từ đầu.
// - resource_type/resource_name: mô tả tự do ("phòng họp", "bàn 4 người").
// - Sau này nếu cần quản lý phòng/bàn chi tiết, có thể bổ sung bảng và thêm resource_id.
export interface Reservation {
  _id?: ID;
  contact_name: string;
  contact_phone: string;
  start_time: ISODate;
  end_time: ISODate;
  party_size?: number;
  resource_type?: 'room' | 'table' | 'area' | 'other';
  resource_name?: string; // Ví dụ: "Phòng họp A", "Bàn T-01"
  note?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  createdAt?: ISODate;
  updatedAt?: ISODate;
}

// ===== Nội dung (GIỮ TỐI THIỂU) =====
// Quyết định: giữ PageSection (chứa các khối nội dung cho từng trang) + SiteSetting.
// Bỏ Post/Promotion/Review ở giai đoạn 1 để nhẹ — khi cần blog/khuyến mãi/đánh giá sẽ thêm sau.
export interface PageSection {
  _id?: ID;
  page: 'home' | 'menu' | 'about' | 'contact';
  key: string;     // ví dụ: "hero", "features", "gallery", "cta"
  title?: string;
  subtitle?: string;
  content?: string; // markdown
  media?: ImageRef[];
  order?: number;
  status?: Status;
}

export interface SiteSetting {
  _id?: ID;
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

// ===== Tóm tắt quyết định giữ/bỏ (có chủ ý) =====
// - GIỮ Cafe: là gốc, gom hours về cấp này để khớp hiện trạng 1 cơ sở.
// - BỎ Branch (tạm thời): hiện chỉ 1 chi nhánh → giảm 1 bảng, sau này mở rộng sẽ thêm lại.
// - GIỮ MenuCategory, MenuItem: lõi để hiển thị menu; HỢP NHẤT tuỳ chọn vào MenuItem (variants/addons),
//   BỎ OptionGroup/OptionGroupRef để giảm độ phức tạp ban đầu.
// - GIỮ Customer, Order (rút gọn): đủ lưu đơn; không tách OrderPayment/OrderStatusHistory… để nhẹ.
// - GIỮ Reservation (tối giản): cho phép đặt chỗ cơ bản mà không cần bảng Room/Table.
// - GIỮ PageSection, SiteSetting: đủ để dựng nội dung trang và cấu hình site.
// - BỎ Post/Promotion/Review/NavMenu: marketing nâng cao — thêm sau khi cần.

// ===== Gợi ý Convex defineSchema (tham khảo) =====
// import { defineSchema, defineTable, v } from 'convex/schema';
// export default defineSchema({
//   cafes: defineTable({
//     name: v.string(), slug: v.string(),
//     short_description: v.optional(v.string()), long_description: v.optional(v.string()),
//     logo: v.optional(v.any()), cover: v.optional(v.any()), gallery: v.optional(v.array(v.any())),
//     contact: v.optional(v.any()), price_range: v.optional(v.any()), amenities: v.optional(v.array(v.string())),
//     address: v.optional(v.any()), coordinates: v.optional(v.any()), hours: v.optional(v.array(v.any())),
//     seo: v.optional(v.any()), status: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_slug', ['slug']).index('by_status', ['status']),
//
//   menu_categories: defineTable({
//     name: v.string(), slug: v.string(), description: v.optional(v.string()), order: v.optional(v.number()),
//     cover: v.optional(v.any()), status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_slug', ['slug']),
//
//   menu_items: defineTable({
//     category_id: v.id('menu_categories'), name: v.string(), slug: v.string(), description: v.optional(v.string()),
//     price: v.number(), currency: v.string(), images: v.optional(v.array(v.any())), tags: v.optional(v.array(v.string())),
//     variants: v.optional(v.array(v.any())), addons: v.optional(v.array(v.any())), status: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_category', ['category_id']).index('by_slug', ['slug']).index('by_status', ['status']),
//
//   customers: defineTable({
//     name: v.optional(v.string()), phone: v.optional(v.string()), email: v.optional(v.string()), note: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_phone', ['phone']).index('by_email', ['email']),
//
//   orders: defineTable({
//     customer_id: v.optional(v.id('customers')),
//     status: v.string(), items: v.array(v.any()), total: v.number(), currency: v.string(), note: v.optional(v.string()),
//     createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_customer', ['customer_id']).index('by_status', ['status']),
//
//   reservations: defineTable({
//     contact_name: v.string(), contact_phone: v.string(), start_time: v.string(), end_time: v.string(),
//     party_size: v.optional(v.number()), resource_type: v.optional(v.string()), resource_name: v.optional(v.string()),
//     note: v.optional(v.string()), status: v.optional(v.string()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }).index('by_status', ['status']).index('by_start_time', ['start_time']),
//
//   page_sections: defineTable({
//     page: v.string(), key: v.string(), title: v.optional(v.string()), subtitle: v.optional(v.string()), content: v.optional(v.string()),
//     media: v.optional(v.array(v.any())), order: v.optional(v.number()), status: v.optional(v.string())
//   }).index('by_page', ['page']).index('by_key', ['key']).index('by_status', ['status']),
//
//   site_settings: defineTable({
//     theme: v.optional(v.any()), social: v.optional(v.any()), seo_default: v.optional(v.any()), createdAt: v.optional(v.string()), updatedAt: v.optional(v.string())
//   }),
// });

// ===== Gợi ý indexes =====
// - cafes.by_slug, cafes.by_status
// - menu_categories.by_slug, menu_items.by_category, menu_items.by_slug, menu_items.by_status
// - customers.by_phone/by_email, orders.by_customer/by_status
// - page_sections.by_page/by_status

// ===== Nâng cấp sau này (định tuyến rõ ràng) =====
// 1) Nhiều chi nhánh: thêm bảng Branch và cập nhật Order/Reservation trỏ branch_id.
// 2) Quản lý phòng/bàn: thêm bảng Room/TableSeat, Reservation đổi sang tham chiếu resource_id + resource_type.
// 3) Tùy chọn phức tạp: tách OptionGroup (single/multiple) nếu menu cần tái sử dụng nhóm chọn giữa nhiều món.
// 4) Marketing: thêm Post/Promotion/Review khi cần blog/chiến dịch/đánh giá người dùng.

