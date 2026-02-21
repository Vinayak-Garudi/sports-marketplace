import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactSellerButton from "@/components/ContactSellerButton";
import ImageGallery from "@/components/ImageGallery";
import { apiRequest } from "@/lib/api";
import { TennisEquipment } from "@/types";

interface EquipmentPageProps {
  params: Promise<{
    _id: string;
  }>;
}

export default async function EquipmentPage({ params }: EquipmentPageProps) {
  const { _id } = await params;
  const equipment = (await apiRequest(`equipments/${_id}`))
    .data as TennisEquipment | null;

  if (!equipment) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/browse">
          <Button variant="ghost" className="mb-6">
            ← Back to Browse
          </Button>
        </Link>

        <div className="grid gap-8">
          {/* Image Gallery */}
          {equipment.images && equipment.images.length > 0 && (
            <ImageGallery images={equipment.images} title={equipment.title} />
          )}

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <CardTitle className="text-3xl mb-2">
                    {equipment.title}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full capitalize">
                      {equipment.category}
                    </span>
                    <span className="text-sm bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full capitalize">
                      {equipment.condition}
                    </span>
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary">
                  Rs.{equipment.price}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {equipment.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4">Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {equipment.brand && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Brand
                      </div>
                      <div className="font-medium">{equipment.brand}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Category
                    </div>
                    <div className="font-medium capitalize">
                      {equipment.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Condition
                    </div>
                    <div className="font-medium capitalize">
                      {equipment.condition}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Location
                    </div>
                    <div className="font-medium">{equipment.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Listed
                    </div>
                    <div className="font-medium">
                      {new Date(equipment.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
              <CardDescription>
                Contact the seller to arrange viewing or purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Seller Name
                </div>
                <div className="font-medium">{equipment.sellerName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Location
                </div>
                <div className="font-medium">{equipment.location}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="font-medium">{equipment.sellerEmail}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Phone Number
                </div>
                <div className="font-medium">{equipment.sellerPhone}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <ContactSellerButton
                  sellerEmail={equipment.sellerEmail}
                  sellerPhone={equipment.sellerPhone}
                  itemTitle={equipment.title}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
