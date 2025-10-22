'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitEquipment } from '@/app/admin/sell/actions';
import ImageUpload from '@/components/ImageUpload';

export default function SellForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'racket',
    condition: 'good',
    price: '',
    brand: '',
    sellerName: '',
    sellerEmail: '',
    sellerPhone: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!formData.title || !formData.description || !formData.price || 
        !formData.sellerName || !formData.sellerEmail || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    if (Number(formData.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    
    // Add images to form data
    if (images.length > 0) {
      formDataObj.append('images', JSON.stringify(images));
    }

    startTransition(async () => {
      const result = await submitEquipment(formDataObj);
      
      if (result.success) {
        router.push(`/equipment/${result.id}`);
      } else {
        setError(result.error || 'Failed to submit listing');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
          {error}
        </div>
      )}

      <ImageUpload
        images={images}
        onImagesChange={setImages}
        maxImages={5}
      />

      <div>
        <label className="text-sm font-medium mb-2 block">
          Title <span className="text-destructive">*</span>
        </label>
        <Input
          type="text"
          placeholder="e.g., Wilson Pro Staff RF97"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Description <span className="text-destructive">*</span>
        </label>
        <textarea
          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
          placeholder="Describe the equipment, its condition, and any notable features..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Category <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="racket">Racket</SelectItem>
              <SelectItem value="shoes">Shoes</SelectItem>
              <SelectItem value="bag">Bag</SelectItem>
              <SelectItem value="balls">Balls</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="apparel">Apparel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Condition <span className="text-destructive">*</span>
          </label>
          <Select
            value={formData.condition}
            onValueChange={(value) => setFormData({ ...formData, condition: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="like-new">Like New</SelectItem>
              <SelectItem value="good">Good</SelectItem>
              <SelectItem value="fair">Fair</SelectItem>
              <SelectItem value="well-used">Well Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Price (Rs.) <span className="text-destructive">*</span>
          </label>
          <Input
            type="number"
            placeholder="50"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Brand</label>
          <Input
            type="text"
            placeholder="e.g., Wilson, Nike, Head"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Your Contact Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Your Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              placeholder="John Smith"
              value={formData.sellerName}
              onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.sellerEmail}
              onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="+91 "
              value={formData.sellerPhone}
              onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Location <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Create Listing'}
      </Button>
    </form>
  );
}
