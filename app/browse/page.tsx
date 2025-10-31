import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { paginateEquipment } from "@/lib/data";
import FilterForm from "@/components/FilterForm";
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Browse Equipment</h1>
            <p className="text-muted-foreground">
              Found {total} {total === 1 ? "item" : "items"}
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
                  <p className="text-muted-foreground mb-4">
                    No equipment found matching your filters.
                  </p>
                  <Link href="/browse">
                    <Button variant="outline">Clear Filters</Button>
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
    </div>
  );
}
