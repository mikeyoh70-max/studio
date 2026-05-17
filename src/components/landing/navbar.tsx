'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, HelpCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline text-slate-900 text-base sm:text-lg">Rekber Go</span>
        </Link>
        
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary">
                <HelpCircle className="h-5 w-5" />
                <span className="sr-only">Informasi Rekber</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-200">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl font-headline flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Info Transaksi
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base pt-2 text-slate-600">
                  Panduan aman bertransaksi di Rekber Go.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <h4 className="font-bold">Apa itu Rekber?</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Rekening Bersama (Rekber) adalah layanan pihak ketiga untuk mengamankan transaksi antara penjual dan pembeli agar terhindar dari penipuan.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold">Bagaimana Caranya?</h4>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">1</div>
                      <p className="text-sm text-slate-600">Klik tombol <strong>"Mulai Transaksi Sekarang"</strong> di halaman utama.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">2</div>
                      <p className="text-sm text-slate-600">Anda akan diarahkan langsung ke <strong>WhatsApp Admin Resmi</strong>.</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">3</div>
                      <p className="text-sm text-slate-600">Admin kami akan memandu proses transaksi secara manual langkah demi langkah hingga selesai.</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden px-2">
                <Menu className="h-6 w-6 text-slate-900" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-white border-r-slate-200">
              <div className="flex flex-col h-full pt-10">
                <Link href="/" className="flex items-center space-x-2 mb-10" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-slate-900">Rekber Go</span>
                </Link>
                <nav className="flex flex-col gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-slate-600 transition-colors hover:text-primary"
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
