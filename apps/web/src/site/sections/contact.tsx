import cafeData from "../../../../../data/nha24h.json";
import FacebookCard from "@/components/facebook-card";

export default function Contact() {
  const addr = cafeData.address?.full ?? [
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
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-5">
          <p className="text-sm text-neutral-400">Giới thiệu</p>
          {cafeData.long_description ? (
            <p className="mt-2 whitespace-pre-line text-neutral-200">{cafeData.long_description}</p>
          ) : (
            <p className="mt-2 text-neutral-200">{cafeData.short_description}</p>
          )}
          
          {cafeData.socials?.facebook && (
            <FacebookCard 
              url={cafeData.socials.facebook}
              title="Nhà.24H Coffee"
              description="Theo dõi chúng tôi trên Facebook để cập nhật tin tức & khuyến mãi mới nhất."
            />
          )}
        </div>
      </div>
    </section>
  );
}
