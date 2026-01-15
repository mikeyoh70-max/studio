
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#cek-fee', label: 'Cek Fee' },
  { href: '#cek-admin', label: 'Cek Admin' },
  { href: '#testimoni', label: 'Testimoni' },
];

const WHATSAPP_LINK = 'https://wa.me/6281234567890?text=Halo%20Admin%20Safeguard%20Trades,%20saya%20tertarik%20menggunakan%20jasa%20rekber.';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="#home" className="mr-6 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline">Safeguard Trades</span>
        </Link>
        
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex" style={{ backgroundColor: '#FFD700', color: '#0A192F' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f0c800'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFD700'}
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Hubungi Admin</a>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px]">
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <Link href="#home" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Safeguard Trades</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                   <Button asChild className="w-full" style={{ backgroundColor: '#FFD700', color: '#0A192F' }}>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">Hubungi Admin</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
