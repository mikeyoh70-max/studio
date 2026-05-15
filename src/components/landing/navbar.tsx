
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#why-us', label: 'Mengapa Kami' },
  { href: '#cek-fee', label: 'Kalkulator Fee' },
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

        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Info Button (Question Mark) */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Informasi Rekber</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Info Transaksi
                </DialogTitle>
                <DialogDescription className="text-base pt-2">
                  Panduan aman bertransaksi di Rekber Nusantara.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">Apa itu Rekber?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Rekening Bersama (Rekber) adalah layanan pihak ketiga untuk mengamankan transaksi antara penjual dan pembeli agar terhindar dari penipuan.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Bagaimana Caranya?</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</div>
                      <p className="text-sm text-muted-foreground">Klik tombol <strong>"Mulai Transaksi Sekarang"</strong> di halaman utama.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</div>
                      <p className="text-sm text-muted-foreground">Anda akan diarahkan langsung ke <strong>WhatsApp Admin Resmi</strong>.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</div>
                      <p className="text-sm text-muted-foreground">Admin kami akan memandu proses transaksi secara manual langkah demi langkah hingga selesai.</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs text-center text-muted-foreground italic">
                    "Dana Anda aman bersama kami hingga transaksi dinyatakan sukses oleh kedua pihak."
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Mobile Menu */}
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
