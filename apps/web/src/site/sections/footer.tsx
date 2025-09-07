import type { CafeData } from "@/site/types";

export default function Footer({ cafe }: { cafe: CafeData }) {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-8 text-neutral-300">
      <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-white">Nha.24H Coffee</div>
          {cafe.address?.full ? <div className="text-sm">{cafe.address.full}</div> : null}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {cafe.contact?.phone_display ?? cafe.contact?.phone ? (
            <a className="hover:text-white" href={`tel:${cafe.contact?.phone ?? cafe.contact?.phone_display}`}>
              {cafe.contact?.phone_display ?? cafe.contact?.phone}
            </a>
          ) : null}
          {cafe.contact?.facebook ? (
            <a className="hover:text-white" href={cafe.contact.facebook} target="_blank" rel="noreferrer noopener">Facebook</a>
          ) : null}
          {cafe.links?.review ? (
            <a className="hover:text-white" href={cafe.links.review} target="_blank" rel="noreferrer noopener">Bai review</a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

