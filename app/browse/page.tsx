import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { paginateEquipment } from "@/lib/data";
import SearchBar from "@/components/SearchBar";
import EquipmentList from "@/components/EquipmentList";
import { cookies } from "next/headers";

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

  const {
    items: equipment,
    total,
    hasMore,
  } = await paginateEquipment(filters, 1, 10);

  // Check if user is admin (server-side)
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user-role");
  const isAdmin = userRole?.value === "admin";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse Equipment</h1>
            <p className="text-muted-foreground">
              Found {total} {total === 1 ? "item" : "items"}
            </p>
          </div>
          <SearchBar initialSearch={filters.search} />
        </div>

        <div>
          {equipment.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No equipment found matching your search.
                </p>
                <Link href="/browse">
                  <Button variant="outline">Clear Search</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <EquipmentList
              initialEquipment={equipment}
              filters={filters}
              initialHasMore={hasMore}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </div>
    </div>
  );
}
