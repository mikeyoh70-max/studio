'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserNav } from '@/components/auth/user-nav';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#buat-transaksi', label: 'Buat Transaksi' },
  { href: '#why-us', label: 'Mengapa Kami' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline">Rekber Nusantara</span>
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
          <div className='flex items-center gap-2'>
             <UserNav />
          </div>
          
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
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">Rekber Nusantara</span>
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
