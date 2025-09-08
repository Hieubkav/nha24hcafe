import cafeData from "../../../../../data/nha24h.json";

export default function Footer() {
  const phone = cafeData.contact?.phone ?? cafeData.contact?.phone_display;
  return (
    <footer className="border-t border-white/10 bg-black/70 text-neutral-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="text-lg font-semibold text-white">Nhà.24H Coffee</div>
          {cafeData.short_description ? (
            <p className="mt-2 text-sm text-neutral-400">{cafeData.short_description}</p>
          ) : null}
        </div>

        {/* Links */}
        <div>
          <div className="mb-3 text-sm font-semibold text-white">Điều hướng</div>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="#amenities" className="hover:text-white">Tiện ích</a>
            <a href="#experience" className="hover:text-white">Trải nghiệm</a>
            <a href="#spaces" className="hover:text-white">Không gian</a>
            <a href="#contact" className="hover:text-white">Liên hệ</a>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <div className="mb-3 text-sm font-semibold text-white">Liên hệ</div>
          <div className="space-y-2 text-sm">
            {cafeData.address?.full ? <div>{cafeData.address.full}</div> : null}
            {phone ? (
              <div>
                <a className="hover:text-white" href={`tel:${phone}`}>{cafeData.contact?.phone_display ?? phone}</a>
              </div>
            ) : null}
            <div className="flex gap-4">
              {cafeData.contact?.facebook ? (
                <a className="hover:text-white" href={cafeData.contact.facebook} target="_blank" rel="noreferrer noopener">Facebook</a>
              ) : null}
              {cafeData.links?.review ? (
                <a className="hover:text-white" href={cafeData.links.review} target="_blank" rel="noreferrer noopener">Bài review</a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {cafeData.name}. All rights reserved.
      </div>
    </footer>
  );
}
