import { TennisEquipment } from "@/types";
import { apiRequest } from "./api";

// Fetch all equipment from API
export async function getAllEquipment(): Promise<TennisEquipment[]> {
  try {
    const response = await apiRequest("equipments", { method: "GET" });

    if (response.success && response.data) {
      const equipment = Array.isArray(response.data) ? response.data : [];
      // Sort by creation date, newest first
      return equipment.sort(
        (a: TennisEquipment, b: TennisEquipment) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return [];
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return [];
  }
}

// Search equipment using backend API
export async function searchEquipment(
  searchTerm: string
): Promise<TennisEquipment[]> {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return getAllEquipment();
    }

    // The backend expects 'q' as the query parameter name
    const response = await apiRequest(
      `equipments/search?q=${encodeURIComponent(searchTerm.trim())}`,
      {
        method: "GET",
      }
    );

    if (response.success && response.data) {
      const equipment = Array.isArray(response.data) ? response.data : [];
      // Sort by creation date, newest first
      return equipment.sort(
        (a: TennisEquipment, b: TennisEquipment) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return [];
  } catch (error) {
    console.error("Error searching equipment:", error);
    return [];
  }
}

export function addEquipment(
  equipment: Omit<TennisEquipment, "id" | "createdAt">
): TennisEquipment {
  // This function should now call the API to add equipment
  // For now, keeping the structure for backward compatibility
  const newEquipment: TennisEquipment = {
    ...equipment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  return newEquipment;
}

// Filter equipment based on criteria
export async function filterEquipment(filters: {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<TennisEquipment[]> {
  // Use search API if search term is provided
  let filtered: TennisEquipment[];

  if (filters.search && filters.search.trim()) {
    filtered = await searchEquipment(filters.search);
  } else {
    filtered = await getAllEquipment();
  }

  // Apply additional filters on the search results
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((item) => item.category === filters.category);
  }

  if (filters.condition && filters.condition !== "all") {
    filtered = filtered.filter((item) => item.condition === filters.condition);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((item) => item.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((item) => item.price <= filters.maxPrice!);
  }

  return filtered;
}

// Paginate equipment results
export async function paginateEquipment(
  filters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  },
  page: number = 1,
  pageSize: number = 10
): Promise<{ items: TennisEquipment[]; total: number; hasMore: boolean }> {
  const allFiltered = await filterEquipment(filters);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = allFiltered.slice(startIndex, endIndex);

  return {
    items,
    total: allFiltered.length,
    hasMore: endIndex < allFiltered.length,
  };
}
