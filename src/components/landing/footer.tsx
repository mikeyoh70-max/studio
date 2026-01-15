import Link from 'next/link';
import { Twitter, Instagram, Facebook, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Rekber Nusantara. All rights reserved.</p>
          <p className="max-w-2xl mx-auto md:mx-0">
            Layanan mediasi independen untuk transaksi aman.
          </p>
        </div>
      </div>
    </footer>
  );
}
