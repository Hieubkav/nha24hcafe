import type { Metadata } from 'next';
import cafeData from '../../../../../data/nha24h.json';

export const siteMetadata: Metadata = {
  title: cafeData.name,
  description: cafeData.short_description,
  keywords: [
    "Nhà.24H Coffee",
    "cafe Cần Thơ",
    "cafe tone đen",
    "không gian làm việc Cần Thơ",
    "phòng họp miễn phí Cần Thơ",
    "coffee in bed",
    "cafe 24/7 Cần Thơ",
    "cafe không gian rộng"
  ],
  openGraph: {
    title: cafeData.name,
    description: cafeData.long_description,
    type: "website",
    locale: "vi_VN",
    url: "https://nha24hcafe.vercel.app", // Update with your actual domain
    images: [
      {
        url: cafeData.images.find(img => img.role === "hero")?.url || "",
        width: 1200,
        height: 630,
        alt: cafeData.images.find(img => img.role === "hero")?.alt || cafeData.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: cafeData.name,
    description: cafeData.short_description,
    images: [cafeData.images.find(img => img.role === "hero")?.url || ""],
  },
};