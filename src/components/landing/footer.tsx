'use client';

import Link from 'next/link';
import { Twitter, Instagram, Facebook, ShieldCheck, Youtube, MessageCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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

const paymentLogos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png", alt: "BCA" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/2560px-Logo_QRIS.svg.png", alt: "QRIS" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png", alt: "Dana" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png", alt: "OVO" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Logo_Indomaret.png/800px-Logo_Indomaret.png", alt: "Indomaret" },
];

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara%20,%20Saya%20ingin%20Memulai%20Transaksi%20Sekarang';
const WHATSAPP_NUMBER = '+62 895-3230-91263';
const EMAIL_SUPPORT = 'rekbernusantara777@gmail.com';


const PaymentLogos = () => (
  <div className="flex flex-wrap justify-center items-center gap-4">
    {paymentLogos.map((logo) => (
      <div key={logo.alt} className="flex items-center justify-center h-12">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={100}
          height={32}
          className="bg-white p-1.5 rounded-md h-8 w-auto object-contain"
          unoptimized
        />
      </div>
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
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4 font-headline">Kami Menerima Pembayaran</h3>
          <PaymentLogos />
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
