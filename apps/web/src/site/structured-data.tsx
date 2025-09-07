export default function StructuredData({ data }: { data: any }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: data.name,
    description: data.short_description ?? data.long_description,
    url: data.contact?.website ?? undefined,
    telephone: data.contact?.phone ?? undefined,
    address: data.address?.full
      ? { "@type": "PostalAddress", streetAddress: data.address.full, addressLocality: data.address?.city }
      : undefined,
    geo:
      data.coordinates?.lat && data.coordinates?.lng
        ? { "@type": "GeoCoordinates", latitude: data.coordinates.lat, longitude: data.coordinates.lng }
        : undefined,
    openingHours: data.hours?.map((h: any) => `${h.days} ${h.open}-${h.close}`),
    sameAs: [data.contact?.facebook].filter(Boolean),
  };
  return (
    <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  );
}

