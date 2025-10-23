import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect, RedirectType } from "next/navigation";

export default async function Navigation() {
  // Check if user-role cookie is 'admin'
  const cookieStore = await cookies();
  const userRole = cookieStore.get("user-role");
  const isAdmin = userRole?.value === "admin";

  const handleLogout = async () => {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("user-role");
    redirect("/", RedirectType.replace);
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎾</span>
            <span className="font-bold text-lg">Tennis Marketplace</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <>
                <Link href="/admin/sell">
                  <Button variant={"ghost"}>Sell Equipment</Button>
                </Link>
                <form action={handleLogout}>
                  <Button type="submit" variant="outline">
                    Logout
                  </Button>
                </form>
              </>
            )}
            <Link href="/browse">
              <Button>Browse</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
