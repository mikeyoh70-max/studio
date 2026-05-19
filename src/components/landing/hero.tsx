'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { ShieldCheck, Users, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const imageCaptions = [
  "Transaksi Akun Game",
  "Jasa & Produk Digital",
  "Top Up & Voucher"
];

const stats = [
  { icon: <CheckCircle2 className="h-4 w-4 text-teal-400" />, label: "770+ Transaksi Sukses" },
  { icon: <Users className="h-4 w-4 text-sky-400" />, label: "450+ Pelanggan Puas" },
  { icon: <Clock className="h-4 w-4 text-orange-400" />, label: "24/7 Admin Aktif" },
];

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=hallo%20admin%20%2C%20saya%20mau%20Buat%20Rekber%20Sekarang%20Dong';

export function Hero() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  return (
    <section id="home" className="relative w-full py-20 sm:py-32 lg:py-40 bg-[#0f172a] overflow-hidden text-white">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-30"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex items-center gap-x-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
              </span>
              <span className="ml-1 sm:ml-2">100% Amanah - Terverifikasi Sejak 2024</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl font-headline mb-6 leading-[1.1]">
            <span className="text-white">Transaksi Aman,</span>
            <span className="block text-sky-400">Hati Tenang.</span>
            <span className="block text-teal-400">Rekber Nusantara.</span>
          </h1>
          
          <p className="text-base sm:text-xl leading-relaxed text-slate-300 max-w-2xl mb-10">
            Jasa Rekening Bersama terpercaya untuk semua kebutuhan transaksi digital Anda. Cepat, aman, dan biaya transparan dengan bantuan admin Profesional.
          </p>
          
          <div className="flex flex-col items-center justify-center w-full mb-16 gap-8">
            <Button asChild size="lg" 
              className="btn-rgb h-12 px-8 sm:px-10 text-base sm:text-lg shadow-xl transform transition-transform hover:scale-105"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Mulai Transaksi Sekarang
              </a>
            </Button>

            {/* Live Stats Section */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1">
                  {stat.icon}
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            <Carousel
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {heroImages.map((image, index) => (
                    <CarouselItem key={image.id} className="relative">
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-white/10">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                          priority={image.id === 'hero-1'}
                        />
                      </div>
                      <p className="mt-4 text-center text-white font-bold text-lg sm:text-xl font-headline">{imageCaptions[index]}</p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
