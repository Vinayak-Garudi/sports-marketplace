import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';
import { TennisEquipment } from '@/types';

interface EquipmentCardProps {
  equipment: TennisEquipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Link href={`/equipment/${equipment.id}`}>
      <Card className="hover:shadow-lg transition-shadow flex flex-col overflow-hidden h-full">
        {/* Image Section */}
        <div className="relative w-full aspect-video bg-muted">
          {equipment.images && equipment.images.length > 0 ? (
            <img
              src={equipment.images[0]}
              alt={equipment.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground opacity-50" />
            </div>
          )}
          <div className="absolute top-2 right-2 text-xs bg-primary/90 text-primary-foreground px-2 py-1 rounded capitalize backdrop-blur-sm">
            {equipment.condition}
          </div>
        </div>
        
        <CardHeader className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div className="text-2xl font-bold text-primary">Rs. {equipment.price}</div>
          </div>
          <CardTitle className="line-clamp-1">{equipment.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {equipment.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div>📍 {equipment.location}</div>
            {equipment.brand && <div>🏷️ {equipment.brand}</div>}
            <div className="capitalize">📦 {equipment.category}</div>
            <div className="text-xs">
              Listed {new Date(equipment.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
