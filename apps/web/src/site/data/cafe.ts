import type { CafeData, ImageRef } from "@/site/types";

export function localToPublicPath(local?: string | null): string | undefined {
  // data/images/nha24h/... -> /nha24h/...
  if (!local) return undefined;
  const idx = local.replace(/\\/g, "/").indexOf("/nha24h/");
  if (idx === -1) return undefined;
  const sub = local.replace(/\\/g, "/").slice(idx + "/".length); // strip leading slash in join below
  return "/" + sub; // public served under /nha24h/...
}

export function mapImages(images: ImageRef[] | undefined): (ImageRef & { src?: string })[] {
  return (images ?? []).map((img) => ({
    ...img,
    src: localToPublicPath(img.local),
  }));
}

export function pickHero(images: (ImageRef & { src?: string })[]): (ImageRef & { src?: string }) | undefined {
  return images.find((i) => i.role === "hero" && i.src) ?? images.find((i) => i.src);
}

export function pickGallery(images: (ImageRef & { src?: string })[]): (ImageRef & { src?: string })[] {
  return images.filter((i) => i.role === "gallery" && i.src);
}

// Server-side data loaders
export type MenuHighlight = {
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  tag?: string; // Signature/New
  image?: { local?: string; alt?: string };
};
