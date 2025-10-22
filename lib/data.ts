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
    sellerName: 'John Smith',
    sellerEmail: 'john@example.com',
    sellerPhone: '+1234567890',
    location: 'New York, NY',
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
    sellerName: 'Sarah Johnson',
    sellerEmail: 'sarah@example.com',
    sellerPhone: '+1234567891',
    location: 'Los Angeles, CA',
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
    sellerName: 'Mike Chen',
    sellerEmail: 'mike@example.com',
    sellerPhone: '+1234567892',
    location: 'Chicago, IL',
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
