import cafeData from "../../../../../data/nha24h.json";

export default function Contact() {
  const addr = cafeData.address?.full ?? [
    cafeData.address?.street,
    cafeData.address?.ward,
    cafeData.address?.district,
    cafeData.address?.city,
  ].filter(Boolean).join(", ");

  return (
    <section className="container mx-auto max-w-6xl px-4 py-14">
      <div className="grid items-start gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Liên hệ & Địa chỉ</h2>
          <div className="mt-4 space-y-3 text-neutral-300">
            {addr ? <p>{addr}</p> : null}
            {cafeData.address?.note ? <p className="text-sm text-neutral-400">{cafeData.address.note}</p> : null}
            <p className="text-sm text-neutral-400">
              {cafeData.contact?.phone_display ?? cafeData.contact?.phone}
              {cafeData.contact?.facebook ? (
                <>
                  {" · "}
                  <a className="underline hover:text-white" href={cafeData.contact.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </>
              ) : null}
            </p>
            {cafeData.contact?.map_url ? (
              <p>
                <a
                  href={cafeData.contact.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm hover:bg-white/10"
                >
                  Xem bản đồ
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5">
          <p className="text-sm text-neutral-400">Giới thiệu</p>
          {cafeData.long_description ? (
            <p className="mt-2 whitespace-pre-line text-neutral-200">{cafeData.long_description}</p>
          ) : (
            <p className="mt-2 text-neutral-200">{cafeData.short_description}</p>
          )}
          {cafeData.contact?.map_url ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Bản đồ"
                src={cafeData.contact.map_url}
                width="100%"
                height="240"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
