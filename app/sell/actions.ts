'use server';

import { addEquipment } from '@/lib/data';
import { TennisEquipment } from '@/types';

export async function submitEquipment(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as TennisEquipment['category'];
    const condition = formData.get('condition') as TennisEquipment['condition'];
    const price = Number(formData.get('price'));
    const brand = formData.get('brand') as string;
    const sellerName = formData.get('sellerName') as string;
    const sellerEmail = formData.get('sellerEmail') as string;
    const sellerPhone = formData.get('sellerPhone') as string;
    const location = formData.get('location') as string;

    // Validate required fields
    if (!title || !description || !category || !condition || !price || !sellerName || !sellerEmail || !location) {
      return {
        success: false,
        error: 'All required fields must be filled',
      };
    }

    if (price <= 0) {
      return {
        success: false,
        error: 'Price must be greater than 0',
      };
    }

    // Add equipment to the store
    const newEquipment = addEquipment({
      title,
      description,
      category,
      condition,
      price,
      brand: brand || undefined,
      sellerName,
      sellerEmail,
      sellerPhone,
      location,
    });

    return {
      success: true,
      id: newEquipment.id,
    };
  } catch (error) {
    console.error('Error submitting equipment:', error);
    return {
      success: false,
      error: 'Failed to submit listing. Please try again.',
    };
  }
}
