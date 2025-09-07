import type { CafeData } from "@/site/types";

export default function Contact({ cafe }: { cafe: CafeData }) {
  const addr = cafe.address?.full ?? [
    cafe.address?.street,
    cafe.address?.ward,
    cafe.address?.district,
    cafe.address?.city,
  ].filter(Boolean).join(", ");

  return (
    <section className="container mx-auto max-w-6xl px-4 py-14">
      <div className="grid items-start gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Liên hệ & Địa chỉ</h2>
          <div className="mt-4 space-y-3 text-neutral-300">
            {addr ? <p>{addr}</p> : null}
            {cafe.address?.note ? <p className="text-sm text-neutral-400">{cafe.address.note}</p> : null}
            <p className="text-sm text-neutral-400">
              {cafe.contact?.phone_display ?? cafe.contact?.phone}
              {cafe.contact?.facebook ? (
                <>
                  {" · "}
                  <a className="underline hover:text-white" href={cafe.contact.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </>
              ) : null}
            </p>
            {cafe.contact?.map_url ? (
              <p>
                <a
                  href={cafe.contact.map_url}
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
          {cafe.long_description ? (
            <p className="mt-2 whitespace-pre-line text-neutral-200">{cafe.long_description}</p>
          ) : (
            <p className="mt-2 text-neutral-200">{cafe.short_description}</p>
          )}
          {cafe.contact?.map_url ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
              <iframe
                title="Bản đồ"
                src={cafe.contact.map_url}
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
