'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterFormProps {
  initialFilters: {
    category?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  };
}

export default function FilterForm({ initialFilters }: FilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState({
    category: initialFilters.category || 'all',
    condition: initialFilters.condition || 'all',
    minPrice: initialFilters.minPrice?.toString() || '',
    maxPrice: initialFilters.maxPrice?.toString() || '',
    search: initialFilters.search || '',
  });

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filters.category && filters.category !== 'all') {
      params.set('category', filters.category);
    } else {
      params.delete('category');
    }

    if (filters.condition && filters.condition !== 'all') {
      params.set('condition', filters.condition);
    } else {
      params.delete('condition');
    }

    if (filters.minPrice) {
      params.set('minPrice', filters.minPrice);
    } else {
      params.delete('minPrice');
    }

    if (filters.maxPrice) {
      params.set('maxPrice', filters.maxPrice);
    } else {
      params.delete('maxPrice');
    }

    if (filters.search) {
      params.set('search', filters.search);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.push(`/browse?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      condition: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
    startTransition(() => {
      router.push('/browse');
    });
  };

  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <Input
          type="text"
          placeholder="Search equipment..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="racket">Rackets</SelectItem>
            <SelectItem value="shoes">Shoes</SelectItem>
            <SelectItem value="bag">Bags</SelectItem>
            <SelectItem value="balls">Balls</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Condition</label>
        <Select
          value={filters.condition}
          onValueChange={(value) => setFilters({ ...filters, condition: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Conditions</SelectItem>
            <SelectItem value="like-new">Like New</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="well-used">Well Used</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            min="0"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Applying...' : 'Apply Filters'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={clearFilters}
          disabled={isPending}
        >
          Clear All
        </Button>
      </div>
    </form>
  );
}
