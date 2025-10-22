import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { filterEquipment } from '@/lib/data';
import FilterForm from '@/components/FilterForm';

interface BrowsePageProps {
  searchParams: Promise<{
    category?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
  }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const params = await searchParams;
  
  const filters = {
    category: params.category,
    condition: params.condition,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    search: params.search,
  };

  const equipment = filterEquipment(filters);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse Equipment</h1>
            <p className="text-muted-foreground">
              Found {equipment.length} {equipment.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {/* <Link href="/sell">
            <Button>Sell Your Gear</Button>
          </Link> */}
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <FilterForm initialFilters={filters} />
              </CardContent>
            </Card>
          </aside>

          {/* Equipment Grid */}
          <div>
            {equipment.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">No equipment found matching your filters.</p>
                  <Link href="/browse">
                    <Button variant="outline">Clear Filters</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {equipment.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-2xl font-bold text-primary">Rs. {item.price}</div>
                        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded capitalize">
                          {item.condition}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div>📍 {item.location}</div>
                        {item.brand && <div>🏷️ {item.brand}</div>}
                        <div className="capitalize">📦 {item.category}</div>
                        <div className="text-xs">
                          Listed {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Link href={`/equipment/${item.id}`}>
                        <Button className="w-full" size="sm">View Details</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
