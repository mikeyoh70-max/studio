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
} from "@/components/ui/dialog"

const paymentBrands = [
  { name: "BCA", color: "text-[#0066AE]" },
  { name: "QRIS", color: "text-[#ED1C24]" },
  { name: "DANA", color: "text-[#118EEA]" },
  { name: "OVO", color: "text-[#4C2A86]" },
  { name: "SeaBank", color: "text-[#FF5100]" },
];

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara,%20Saya%20ingin%20bertransaksi.%0A%0A*Format%20Transaksi*%0AProduk:%20%0ANominal:%20%0APenjual:%20%0APembeli:%20';
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
    <footer className="bg-[#0a0f1e] border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center space-x-3">
            <ShieldCheck className="h-8 w-8 text-sky-400" />
            <span className="text-xl font-bold font-headline text-white tracking-tight">PT Rekber Nusantara</span>
          </Link>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 pt-10 pb-6 border-t border-white/5 text-center bg-white/5 rounded-xl">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 font-headline">Metode Pembayaran Terverifikasi</h3>
          <PaymentTextLogos />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/5">
          <div className="col-span-1">
            <h3 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Perusahaan</h3>
            <ul className="space-y-3">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left">Tentang Kami</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white text-slate-900 border-slate-200">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl text-slate-900">Tentang PT Rekber Nusantara</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4 text-slate-600 text-sm leading-relaxed">
                      <p>
                        PT Rekber Nusantara adalah platform jasa Rekening Bersama (Rekber) independen yang didirikan pada tahun 2024. Kami hadir untuk menjawab tantangan keamanan dalam transaksi produk dan jasa digital di Indonesia.
                      </p>
                      <p>
                        Misi utama kami adalah menjadi penengah yang adil, netral, and aman bagi penjual maupun pembeli. Dengan sistem verifikasi admin yang ketat, kami berkomitmen untuk memberantas praktik penipuan di dunia digital.
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" className="bg-sky-500 hover:bg-sky-600 text-white">Tutup</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
              <li><Link href="#why-us" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Mengapa Kami</Link></li>
              <li><Link href="#testimonials" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Testimoni</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Legalitas</h3>
            <ul className="space-y-3">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left">Syarat & Ketentuan</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] bg-white text-slate-900 border-slate-200 max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl text-slate-900">Syarat & Ketentuan</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4 text-slate-600 text-sm leading-relaxed">
                      <p>Dengan menggunakan layanan PT Rekber Nusantara, Anda setuju untuk mematuhi aturan berikut:</p>
                      <ul className="space-y-2 list-decimal list-inside">
                        <li>PT Rekber Nusantara bertindak sebagai mediator (pihak ketiga) untuk mengamankan dana transaksi.</li>
                        <li>Transaksi hanya dianggap sah jika dilakukan melalui <strong>Admin Resmi</strong> yang nomornya terverifikasi di website ini.</li>
                        <li>Pembeli wajib mentransfer dana sesuai nominal dan kode unik yang diberikan Admin.</li>
                        <li>Penjual dilarang mengirimkan data/barang sebelum Admin mengonfirmasi dana masuk.</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" className="bg-sky-500 hover:bg-sky-600 text-white">Saya Setuju</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left">Kebijakan Privasi</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-200">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl text-slate-900">Kebijakan Privasi</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4 text-slate-600 text-sm">
                      <p>Kami sangat menjaga kerahasiaan data Anda:</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>Data nomor WhatsApp dan bukti transfer hanya digunakan untuk kepentingan verifikasi transaksi.</li>
                        <li>Kami tidak akan menyebarkan data pribadi Anda kepada pihak manapun tanpa izin.</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" className="bg-sky-500 hover:bg-sky-600 text-white">Tutup</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-sky-400 transition-colors text-sm text-left">Kebijakan Refund</button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white text-slate-900 border-slate-200">
                    <DialogHeader>
                      <DialogTitle className="font-headline text-2xl text-slate-900">Kebijakan Pengembalian</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <ul className="space-y-3 list-disc list-inside text-slate-600 text-sm">
                        <li>Refund dapat diajukan jika Penjual tidak mengirim barang lebih dari 24 jam.</li>
                        <li>Refund berlaku jika barang tidak sesuai deskripsi.</li>
                        <li>Biaya Admin & Fee Transfer Bank tidak dapat dikembalikan jika proses refund dilakukan.</li>
                      </ul>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" className="bg-sky-500 hover:bg-sky-600 text-white">Saya Mengerti</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
          <div className="col-span-2">
            <h3 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Pusat Bantuan</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-400 leading-relaxed">Butuh bantuan atau ingin melaporkan kendala transaksi? Hubungi tim support kami.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 justify-start gap-3 h-12 bg-white/5 border-white/10 text-white hover:bg-white/10" asChild>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4 text-green-500" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">WhatsApp</p>
                      <p className="text-sm">{WHATSAPP_NUMBER}</p>
                    </div>
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 justify-start gap-3 h-12 bg-white/5 border-white/10 text-white hover:bg-white/10" asChild>
                  <a href={`mailto:${EMAIL_SUPPORT}`}>
                    <Mail className="h-4 w-4 text-sky-400" />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 leading-none">Support CS</p>
                      <p className="text-xs sm:text-sm lowercase">{EMAIL_SUPPORT}</p>
                    </div>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between gap-4">
          <p>&copy; 2026 PT Rekber Nusantara. All rights reserved.</p>
          <p className="max-w-2xl mx-auto md:mx-0">
            Layanan mediasi independen terpercaya sejak 2024.
          </p>
        </div>
      </div>
    </footer>
  );
}
