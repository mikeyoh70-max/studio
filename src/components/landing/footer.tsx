
'use client';

import Link from 'next/link';
import { Twitter, Instagram, Facebook, ShieldCheck, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"

const paymentBrands = [
  { name: "BCA", color: "text-[#0066AE]" },
  { name: "QRIS", color: "text-[#ED1C24]" },
  { name: "DANA", color: "text-[#118EEA]" },
  { name: "OVO", color: "text-[#4C2A86]" },
  { name: "SeaBank", color: "text-[#FF5100]" },
];

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara%20,%20Saya%20ingin%20Memulai%20Transaksi%20Sekarang';
const WHATSAPP_NUMBER = '+62 895-3230-91263';
const EMAIL_SUPPORT = 'rekbernusantara777@gmail.com';

const PaymentTextLogos = () => (
  <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
    {paymentBrands.map((brand) => (
      <span 
        key={brand.name} 
        className={`text-2xl md:text-3xl font-black tracking-tighter ${brand.color} drop-shadow-sm`}
      >
        {brand.name}
      </span>
    ))}
  </div>
);

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Rekber Nusantara</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 pt-10 pb-6 border-t border-border text-center bg-white/5 rounded-xl">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] mb-8 font-headline">Metode Pembayaran Terverifikasi</h3>
          <PaymentTextLogos />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-border">
          <div>
            <h3 className="font-bold text-foreground mb-4">PERUSAHAAN</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Tentang Kami</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Hubungi Kami</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Karir & Tim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">LEGALITAS</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Kebijakan Privasi</Link></li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary text-sm text-left">Kebijakan Refund</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl">Kebijakan Pengembalian</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>Refund dapat diajukan jika Penjual tidak mengirim barang lebih dari 24 jam.</li>
                        <li>Refund berlaku jika barang tidak sesuai deskripsi (Wajib Video Unboxing).</li>
                        <li>Biaya Admin & Fee Transfer tidak dapat dikembalikan.</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button">
                          Tutup
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary text-sm text-left">Pusat Bantuan</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl">Hubungi Dukungan</DialogTitle>
                      <DialogDescription>
                        Tim kami siap membantu kendala transaksi Anda.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-lg border bg-green-900/20 border-green-500/30 hover:bg-green-900/40 transition-colors"
                      >
                        <div className="flex-shrink-0 bg-green-500/20 text-green-300 rounded-full p-3">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-green-300">WHATSAPP ADMIN</p>
                          <p className="text-lg font-bold text-foreground">{WHATSAPP_NUMBER}</p>
                        </div>
                      </a>
                      <a
                        href={`mailto:${EMAIL_SUPPORT}`}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/40 transition-colors"
                      >
                        <div className="flex-shrink-0 bg-blue-500/20 text-blue-300 rounded-full p-3">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-300">EMAIL SUPPORT</p>
                          <p className="text-lg font-bold text-foreground">{EMAIL_SUPPORT}</p>
                        </div>
                      </a>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">Tutup</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
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
