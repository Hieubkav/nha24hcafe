export type CurrencyCode = "VND" | "USD";

export interface ImageRef {
  name: string;
  alt?: string;
  role?: "hero" | "gallery" | "social" | "menu";
  source?: "facebook" | "canthoriviu" | "user" | "other";
  source_url?: string | null;
  local?: string; // original local path under data/images/... (we will remap to /nha24h/...)
}

export interface CafeData {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  long_description?: string;
  area_sqm?: number;
  address?: {
    full?: string;
    street?: string;
    ward?: string;
    district?: string;
    city?: string;
    country?: string;
    note?: string;
  };
  coordinates?: { lat: number | null; lng: number | null; source?: string | null };
  contact?: { phone_display?: string; phone?: string; email?: string; facebook?: string; website?: string; map_url?: string };
  links?: { review?: string; facebook?: string };
  price_range?: { min?: number; max?: number; currency?: CurrencyCode; display?: string };
  hours?: { days: string; open: string; close: string; note?: string }[];
  amenities?: string[];
  images?: ImageRef[];
}
