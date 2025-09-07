# nha24hcafe

Website chuyên nghiệp cho quán cafe nha24h, được xây dựng với [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack) - một stack TypeScript hiện đại kết hợp Next.js, Convex và các công nghệ tiên tiến.

## Tính năng

- **TypeScript** - Để đảm bảo an toàn kiểu và trải nghiệm phát triển tốt hơn
- **Next.js** - Framework React full-stack mạnh mẽ
- **TailwindCSS** - CSS tiện ích cho phát triển giao diện nhanh chóng
- **shadcn/ui** - Các thành phần UI có thể tái sử dụng
- **Convex** - Nền tảng backend-as-a-service phản hồi
- **Turborepo** - Hệ thống xây dựng monorepo được tối ưu hóa

## Bắt đầu

Đầu tiên, cài đặt các dependencies:

```bash
bun install
```

## Thiết lập Convex

Dự án này sử dụng Convex làm backend. Bạn cần thiết lập Convex trước khi chạy ứng dụng:

```bash
bun dev:setup
```

Làm theo hướng dẫn để tạo một dự án Convex mới và kết nối với ứng dụng của bạn.

Sau đó, chạy máy chủ phát triển:

```bash
bun dev
```

Mở [http://localhost:3001](http://localhost:3001) trong trình duyệt để xem ứng dụng web.

## Cấu trúc dự án

```
nha24hcafe/
├── apps/
│   ├── web/         # Ứng dụng frontend (Next.js)
├── packages/
│   └── backend/     # Hàm backend và schema Convex
```

## Các script có sẵn

- `bun dev`: Khởi động tất cả các ứng dụng ở chế độ phát triển
- `bun build`: Xây dựng tất cả các ứng dụng
- `bun check-types`: Kiểm tra kiểu TypeScript trên tất cả các ứng dụng
- `bun dev:web`: Chỉ khởi động ứng dụng web
- `bun dev:setup`: Thiết lập và cấu hình dự án Convex của bạn

## Về dự án nha24h cafe

Website này được thiết kế để cung cấp trải nghiệm người dùng tuyệt vời cho khách hàng của quán cafe nha24h. Trang web sẽ bao gồm:

- Trang chủ giới thiệu về quán cafe
- Thực đơn với các loại đồ uống và món ăn
- Thông tin về không gian và dịch vụ
- Hệ thống đặt bàn và đặt hàng trực tuyến
- Blog chia sẻ thông tin về cafe và cuộc sống

Website được xây dựng với hiệu suất cao, responsive trên mọi thiết bị và tối ưu SEO để thu hút nhiều khách hàng hơn.