import Link from 'next/link';
import { Twitter, Instagram, Facebook, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentLogos = () => (
  <div className="flex flex-wrap justify-center items-center gap-4">
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia_logo.svg" alt="BCA" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo.svg" alt="Mandiri" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Bank_Negara_Indonesia_logo.svg" alt="BNI" className="h-5" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_logo.svg" alt="BRI" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/id/archive/3/3b/20210712133822%21CIMB_Niaga_logo.svg" alt="CIMB Niaga" className="h-6" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/QRIS_logo.svg/2560px-QRIS_logo.svg.png" alt="QRIS" className="h-6" />
  </div>
);


export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Rekber Nusantara</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4 font-headline">Kami Menerima Pembayaran</h3>
          <PaymentLogos />
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Rekber Nusantara. All rights reserved.</p>
          <p className="max-w-2xl mx-auto md:mx-0">
            Layanan mediasi independen untuk transaksi aman.
          </p>
        </div>
      </div>
    </footer>
  );
}
