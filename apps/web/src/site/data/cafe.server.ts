"use server";
import fs from "node:fs/promises";
import path from "node:path";
import type { CafeData, ImageRef } from "@/site/types";
import { mapImages, type MenuHighlight } from "@/site/data/cafe";

export async function getCafeData(): Promise<
  CafeData & { images_mapped: (ImageRef & { src?: string })[] }
> {
  const file = path.resolve(process.cwd(), "../../data/nha24h.json");
  const raw = await fs.readFile(file, "utf8");
  const data = JSON.parse(raw) as CafeData;
  const images_mapped = mapImages(data.images);
  return { ...data, images_mapped };
}

export async function getMenuHighlights(): Promise<MenuHighlight[] | null> {
  try {
    const file = path.resolve(process.cwd(), "../../data/menu_highlights.json");
    const raw = await fs.readFile(file, "utf8");
    const list = JSON.parse(raw) as MenuHighlight[];
    return list;
  } catch {
    return null;
  }
}

