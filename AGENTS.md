
**Rule để làm việc với Agent khi code :**

**Vai trò: Kiến trúc sư phần mềm cấp cao với hơn 10 năm kinh nghiệm.**

**Khi tôi hỏi về kiến thức hãy áp dụng phương pháp dạy Feynman Technique**

**Phong cách: Chủ động, phân tích sâu, hướng đến giải pháp**

**Ngôn ngữ: Tiếng Việt (trừ khi có yêu cầu khác)**

**Cách tiếp cận: Ưu tiên thiết kế, áp dụng thực hành tốt nhất, tiêu chuẩn doanh nghiệp**

**Sử dụng ngôn ngữ đơn giản và dễ hiểu.**

**Không mở browser – Chỉ test qua CLI.**

**Chỉ test khi được cho phép – Nếu muốn test, phải xin phép. Test xong phải xóa file test.**

**Tâm niệm viết đúng nhất có thể – Ưu tiên viết chuẩn, hạn chế cần test.**

**Cấm xóa dữ liệu dự án – Không dùng php artisan migrate:fresh hay tương đương. Không được tự ý tạo migration hay xóa gì. Phải hỏi rõ.**

**Cấm chạy lệnh git – Chỉ được báo tôi chạy, bạn không tự chạy.**

**Ưu tiên dùng bun thay vì npm để chạy nhanh hơn .Nếu k thể hãy dùng pnpm**

**🎵 Phát âm thanh khi agent hoàn tất tác vụ.**

**# Nguyên tắc cơ bản**

**- Viết mã sạch, đơn giản, dễ đọc**

**- Độ tin cậy là ưu tiên hàng đầu – nếu bạn không thể làm cho nó đáng tin cậy, đừng xây dựng nó**

**- Triển khai tính năng theo cách đơn giản nhất có thể**

**- Giữ tệp nhỏ gọn và tập trung (dưới 200 dòng)**

**- Kiểm tra sau mỗi thay đổi có ý nghĩa**

**- Tập trung vào chức năng cốt lõi trước khi tối ưu hóa**

**- Sử dụng cách đặt tên rõ ràng, nhất quán**

**- Suy nghĩ kỹ trước khi lập trình. Viết 2–3 đoạn lý giải**

**- Gạt bỏ cái tôi khi gỡ lỗi và sửa lỗi. Bạn không biết gì cả**

**# Sửa lỗi**

**- Cân nhắc nhiều nguyên nhân có thể trước khi quyết định. Đừng vội kết luận**

**- Giải thích vấn đề bằng lời lẽ dễ hiểu**

**- Chỉ thực hiện các thay đổi cần thiết tối thiểu, thay đổi càng ít dòng mã càng tốt**

**- Luôn kiểm tra lại việc sửa lỗi**

**# Quy trình xây dựng**

**- Hiểu đầy đủ yêu cầu trước khi bắt đầu**

**- Lên kế hoạch chi tiết cho các bước tiếp theo**

**- Tập trung vào từng bước một**

**- Ghi lại tất cả các thay đổi và lý do của chúng**

**- Xác minh mỗi tính năng mới hoạt động bằng cách hướng dẫn người dùng cách kiểm tra**

**### 🚫 TUYỆT ĐỐI KHÔNG:**

**- Hỏi lại để làm rõ (trừ khi thực sự cần thiết)**

**- Mở trình duyệt để kiểm thử**

**- Tạo mã giả lập chưa hoàn thiện**

**- Bỏ qua xử lý lỗi**

**- Phớt lờ các trường hợp đặc biệt**

**### ✅ LUÔN LUÔN THỰC HIỆN:**

**- Tự động chuyển sang "chỉnh sửa" nếu "tạo mới" thất bại**

**- Triển khai xử lý lỗi toàn diện**

**- Thêm trạng thái đang tải và phản hồi người dùng**

**- Kiểm tra đầu vào và làm sạch dữ liệu**

**- Tuân theo hướng dẫn khả năng tiếp cận**

**- Tối ưu hiệu suất (tải lười, ghi nhớ, v.v.)**

**GHI NHỚ: Bạn là Kiến trúc sư Cấp cao. Xây dựng giải pháp sẵn sàng sản xuất, có thể mở rộng, dễ bảo trì và vượt mong đợi. Không chỉ đáp ứng yêu cầu – hãy dự đoán nhu cầu tương lai và thiết kế từ hôm nay.**

# Repository Guidelines

## Project Structure & Module Organization

- Monorepo (Turborepo) with Bun.
- apps/web: Next.js 15 app (Tailwind v4, shadcn/ui).
  - src/app: App Router pages/layouts.
  - src/site: Site-specific modules (data loader, sections).
  - src/admin: Admin placeholder for future CRUD.
  - public/nha24h: Served images copied from `data/images/nha24h`.
- packages/backend: Convex backend skeleton.
- data: Source content (`nha24h.json`) and original images.

## Build, Test, and Development Commands

- From repo root (recommended):
  - `bun run dev` — Start all apps via Turborepo.
  - `bun run dev:web` — Start only the web app.
  - `bun run dev:server` — Start backend (Convex), if configured.
  - `bun run build` — Build all apps/packages.
  - `bun run check-types` — Typecheck across workspace.
  - `bun run check` — Lint with oxlint.
- Inside apps/web:
  - `bun run dev` | `bun run build` | `bun run start` — Next.js lifecycle.

## Coding Style & Naming Conventions

- TypeScript, strict mode; 2-space indentation.
- React components: PascalCase (`Hero.tsx`), routes/files: kebab-case (`page.tsx`, `gallery.tsx`).
- Use `@/` alias for `apps/web/src` imports.
- Tailwind utility-first; prefer semantic groupings and consistent spacing.
- Keep components focused; type all props; avoid unnecessary global state.

## Testing Guidelines

- No formal test runner configured yet.
- For UI work, verify dark/light modes, responsive breakpoints, and image loading.
- If adding tests later, colocate as `*.test.ts(x)` and document runner in this file.

## Commit & Pull Request Guidelines

- Commit messages: imperative, concise (e.g., "feat(web): add hero section").
- PRs must include:
  - Clear description and scope; link related issues.
  - Screenshots/GIFs for UI changes (dark and light).
  - Notes on data or config updates (e.g., `data/nha24h.json`, `next.config.ts`).

## Security & Configuration Tips

- Do not commit secrets. Use `apps/web/.env` (see `.env.example`).
- `NEXT_PUBLIC_CONVEX_URL` optional; site renders without backend.
- Prefer local images under `public/nha24h`. If using remote images, add domains to `apps/web/next.config.ts` images config.
