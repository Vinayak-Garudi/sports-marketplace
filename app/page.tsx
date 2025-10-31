import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllEquipment } from "@/lib/data";
import EquipmentCard from "@/components/EquipmentCard";

export default async function Home() {
  const allEquipment = await getAllEquipment();
  const equipment = allEquipment.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Second-Hand Tennis Equipment Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Buy quality used tennis gear. Connect directly with sellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <Button size="lg">Browse Equipments</Button>
              </Link>
              {/* <Link href="/sell">
                <Button size="lg" variant="outline">Sell Your Gear</Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Browse</CardTitle>
              <CardDescription>
                Search through a wide selection of second-hand tennis equipment
                from local sellers.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Connect</CardTitle>
              <CardDescription>
                Contact sellers directly via email or phone to arrange viewing
                and purchase.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Own</CardTitle>
              <CardDescription>
                Get quality tennis gear at great prices and enjoy your game!
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Recent Listings</h2>
            <Link href="/browse">
              <Button variant="ghost">View All →</Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 container mx-auto px-4">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg mb-6">
              Join our community of tennis enthusiasts buying and selling quality equipment.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell">
                <Button size="lg" variant="secondary">List Your Equipment</Button>
              </Link>
              <Link href="/browse">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </section> */}
    </div>
  );
}
