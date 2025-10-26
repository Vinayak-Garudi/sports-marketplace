"use server";

import { paginateEquipment } from "@/lib/data";

export async function loadMoreEquipment(
  filters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  },
  page: number
) {
  const result = paginateEquipment(filters, page, 10);
  return result;
}
