import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SellForm from '@/components/SellForm';

export default function SellPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Sell Your Equipment</h1>
          <p className="text-muted-foreground">
            List your second-hand tennis equipment for free
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create a Listing</CardTitle>
            <CardDescription>
              Fill in the details below to list your tennis equipment. Buyers will contact you directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SellForm />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Tips for a Successful Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Be honest about the condition of your equipment</li>
              <li>✓ Set a fair and competitive price</li>
              <li>✓ Include detailed descriptions and specifications</li>
              <li>✓ Respond promptly to buyer inquiries</li>
              <li>✓ Mention any defects or wear and tear</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
