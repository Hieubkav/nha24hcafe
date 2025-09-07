# Kế hoạch Trang chủ Nhà.24H Coffee

Mục tiêu: Trang chủ truyền tải rõ USP (mở 24/7, phòng họp miễn phí, bàn làm việc riêng tư, sleep box, không gian 1000m²), thúc đẩy hành động (đặt phòng/chỉ đường/xem menu), hiển thị hình ảnh đẹp và tối ưu SEO.

## Cấu trúc nội dung
- Hero: ảnh nền ấn tượng + tiêu đề ngắn + 2–3 CTA.
- USP nhanh: 4–6 ô nêu điểm mạnh chính (badge/icon).
- Rooms/Spaces: teaser cho Meeting room, Private desk, Sleep box.
- Menu nổi bật: 4–8 món signature/bán chạy (khi có dữ liệu).
- Gallery: 6–12 ảnh nội thất đẹp nhất.
- Reviews trích dẫn: 1–3 quote ngắn (nếu có).
- Visit us: giờ mở cửa, địa chỉ, chỉ đường (map), liên hệ.
- CTA cuối trang: đặt chỗ/liên hệ.

## Mapping dữ liệu → UI
- Hero: lấy ảnh role `hero` từ `images` hoặc chọn 1 ảnh `gallery` có góc rộng.
- USP: từ `amenities` (map code → tên + icon) hoặc cấu hình tĩnh.
- Rooms/Spaces: từ `rooms` (type: meeting | private | sleep_box) + ảnh `images` role `room`.
- Menu nổi bật: từ `menuItems` có tag `signature` hoặc curated list.
- Gallery: từ `images` role `gallery` (ưu tiên ảnh đã đặt tên có nghĩa).
- Reviews: từ `reviews` (rating, comment, source).
- Visit us: từ `cafes` + `openingHours`.

## Ảnh đề xuất dùng cho trang chủ
- Hero (khuyến nghị): `data/images/nha24h/khong-gian-rong-02.jpg` (góc rộng, thể hiện 1000m²).
- Phương án 2 (tối giản/brand-first): `data/images/nha24h/anh-bia-hero-nha-24h.jpg` (logo mark).
- OG/Social: `data/images/nha24h/anh-chia-se-og-facebook.jpg`.
- Gallery gợi ý: `khong-gian-tone-den-01.jpg`, `goc-khong-gian-am-03.jpg` + 3–6 ảnh từ thư mục `fb/` sau khi đặt tên có nghĩa.
- Banner thương hiệu (About/section phụ): `data/images/nha24h/fb/banner-thuong-hieu-01.jpg`.

## Gợi ý UI (shadcn/ui + Tailwind)
- Hero: section full-bleed, overlay gradient, `Button` (primary/secondary), `Badge` “Open 24/7”.
- USP: `Card` + icon lucide, grid `grid-cols-2 md:grid-cols-3`.
- Rooms: `Card` 3 cột, ảnh đầu thẻ + `Badge` (capacity/features) + CTA “Đặt phòng”.
- Menu: `Tabs` theo danh mục, `Card` món + giá; có thể `Carousel` trên mobile.
- Gallery: `grid` 3–4 cột + lazy-load; hoặc `Carousel` nếu muốn slideshow.
- Visit us: 2 cột (thông tin + map), nút “Chỉ đường”.
- Footer: liên hệ, social, giờ mở cửa tóm tắt.

## SEO kỹ thuật
- Title: `${name} | Coffee 24/7 tại Cần Thơ – Phòng họp miễn phí`.
- Description: rút gọn từ `short_description` (~160–180 ký tự, có từ khóa).
- OG: dùng `anh-chia-se-og-facebook.jpg` (>=1200x630). Khai báo `twitter:card` large.
- Structured Data: `LocalBusiness` + `openingHoursSpecification` + `sameAs` (Facebook).
- Ảnh remote: thêm domain Facebook/CanThoRiviu vào `next.config.js images.remotePatterns` nếu dùng URL ngoài.

## Đổi tên ảnh (đã thực hiện một phần)
- Đã đổi: `anh-bia-hero-nha-24h.jpg`, `anh-chia-se-og-facebook.jpg`, `khong-gian-tone-den-01.jpg`, `khong-gian-rong-02.jpg`, `goc-khong-gian-am-03.jpg` và `fb/banner-thuong-hieu-01.jpg` (cập nhật trong `data/nha24h.json`).
- Quy ước chung: tên ngắn gọn, mô tả nội dung, slug-case; nhóm theo thư mục `nha24h/` và `nha24h/fb/`.
- Kế hoạch tiếp: duyệt thủ công các ảnh còn lại trong `fb/`, đặt tên như `fb-meeting-room-01.jpg`, `fb-workspace-01.jpg`, `fb-coffee-in-bed-01.jpg`, rồi cập nhật `data/nha24h.json` tương ứng.

## Checklist triển khai nhanh (/admin dùng shadcn + Convex)
- Tạo collections theo `data/schema.ts` trong `convex/schema.ts`.
- Seed dữ liệu ban đầu từ `data/nha24h.json` → `cafes`, `images` (role hero/gallery/social), `openingHours`, `amenities`.
- CRUD Forms:
  - Cafes (thông tin chung + SEO + featuredImageId)
  - Images (upload, role, order, alt)
  - Opening Hours (theo ngày, validate giờ)
  - Amenities + gán cho cafe
  - Rooms (type/capacity/features/price/isReservable)
  - Menu Categories/Items (giá, ảnh, tags)
  - Promotions, Reviews, Pages
- UI: import shadcn components: form, input, textarea, select, switch, card, badge, dialog, toast, tabs, navigation-menu.

## Lộ trình mở rộng
- Đặt phòng (rooms): bookings + kiểm tra trùng thời gian.
- Đặt món QR: orders + order_items + customers.
- Bài viết/sự kiện: posts/promotions, highlight trên trang chủ.

Ghi chú phối hợp: File này và `data/schema.ts` là tài liệu chuẩn. Khi luồng kia rename thêm ảnh, nhớ cập nhật lại `data/nha24h.json`. Tôi có thể tiếp tục duyệt và chuẩn hóa ảnh/JSON nếu bạn ok.

