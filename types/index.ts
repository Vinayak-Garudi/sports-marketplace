export interface TennisEquipment {
  _id: string;
  title: string;
  description: string;
  category: "racket" | "shoes" | "bag" | "balls" | "accessories" | "apparel";
  condition: "like-new" | "good" | "fair" | "well-used";
  price: number;
  brand?: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  location: string;
  images?: string[];
  createdAt: string;
}

export interface FilterOptions {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
