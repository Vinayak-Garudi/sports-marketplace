import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎾</span>
            <span className="font-bold text-lg">Tennis Marketplace</span>
          </Link>
          
          <div className="flex items-center gap-4">
                <Link href="/sell">
                  <Button variant={'ghost'}>Sell Equipment</Button>
                </Link>
            <Link href="/browse">
              <Button>Browse</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
