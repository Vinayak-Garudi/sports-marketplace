import { TennisEquipment } from '@/types';

// In-memory data store (in a real app, this would be a database)
let equipmentStore: TennisEquipment[] = [
  {
    id: '1',
    title: 'Wilson Pro Staff RF97',
    description: 'Excellent condition tennis racket, barely used. Perfect for intermediate to advanced players.',
    category: 'racket',
    condition: 'like-new',
    price: 150,
    brand: 'Wilson',
    sellerName: 'Nikhil Naidu',
    sellerEmail: 'nikhil@example.com',
    sellerPhone: '+918652051714',
    location: 'Mumbai, India',
    images: [
      'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&q=80',
      'https://images.unsplash.com/photo-1617083278066-d6be49c6a6f8?w=800&q=80',
    ],
    createdAt: new Date('2024-10-15').toISOString(),
  },
  {
    id: '2',
    title: 'Nike Court Air Zoom Vapor Pro',
    description: 'Professional tennis shoes, size 10. Worn only a few times.',
    category: 'shoes',
    condition: 'good',
    price: 80,
    brand: 'Nike',
    sellerName: 'Vinayak Garudi',
    sellerEmail: 'vinayak@example.com',
    sellerPhone: '+918652051715',
    location: 'Delhi, India',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    ],
    createdAt: new Date('2024-10-18').toISOString(),
  },
  {
    id: '3',
    title: 'Head Tour Team Backpack',
    description: 'Spacious tennis bag with multiple compartments. Great for tournaments.',
    category: 'bag',
    condition: 'good',
    price: 60,
    brand: 'Head',
    sellerName: 'Pravin Natsu',
    sellerEmail: 'pravin@example.com',
    sellerPhone: '+918652051715',
    location: 'Bangalore, India',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80',
    ],
    createdAt: new Date('2024-10-20').toISOString(),
  },
];

export function getAllEquipment(): TennisEquipment[] {
  return [...equipmentStore].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getEquipmentById(id: string): TennisEquipment | undefined {
  return equipmentStore.find(item => item.id === id);
}

export function addEquipment(equipment: Omit<TennisEquipment, 'id' | 'createdAt'>): TennisEquipment {
  const newEquipment: TennisEquipment = {
    ...equipment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  equipmentStore.push(newEquipment);
  return newEquipment;
}

export function filterEquipment(filters: {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): TennisEquipment[] {
  let filtered = getAllEquipment();

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  if (filters.condition && filters.condition !== 'all') {
    filtered = filtered.filter(item => item.condition === filters.condition);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(item => item.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(item => item.price <= filters.maxPrice!);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.brand?.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}
