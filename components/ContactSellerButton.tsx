'use client';

import { Button } from '@/components/ui/button';

interface ContactSellerButtonProps {
  sellerEmail: string;
  sellerPhone: string;
  itemTitle: string;
}

export default function ContactSellerButton({
  sellerEmail,
  sellerPhone,
  itemTitle,
}: ContactSellerButtonProps) {
  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Interested in: ${itemTitle}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in your listing "${itemTitle}".\n\nPlease let me know if it's still available.\n\nThank you!`
    );
    window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${body}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${sellerPhone}`;
  };

  return (
    <>
      <Button onClick={handleEmailClick} className="flex-1">
        📧 Email Seller
      </Button>
      <Button onClick={handlePhoneClick} variant="outline" className="flex-1">
        📞 Call Seller
      </Button>
    </>
  );
}
