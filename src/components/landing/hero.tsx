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

const imageCaptions = [
  "Transaksi Akun Game",
  "Jasa & Produk Digital",
  "Top Up & Voucher"
];

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara%20,%20Saya%20ingin%20Memulai%20Transaksi%20Sekarang';

export function Hero() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  return (
    <section id="home" className="relative w-full py-24 sm:py-32 lg:py-40 bg-[#0f172a] overflow-hidden text-white">
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
            <div className="relative inline-flex items-center gap-x-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
              <span className="flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400"></span>
              </span>
              <span className="ml-2">Layanan Rekber Terpercaya #1</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl font-headline mb-6">
            <span className="text-white">Transaksi Aman,</span>
            <span className="block text-sky-400">Hati Tenang.</span>
            <span className="block text-teal-400">Rekber Nusantara.</span>
          </h1>
          
          <p className="text-lg sm:text-xl leading-8 text-slate-300 max-w-2xl mb-10">
            Jasa Rekening Bersama terpercaya untuk semua kebutuhan transaksi digital Anda. Cepat, aman, dan biaya transparan langsung via WhatsApp.
          </p>
          
          <div className="flex items-center justify-center w-full mb-16">
            <Button asChild size="lg" 
              className="btn-rgb h-14 px-12 text-xl shadow-xl transform transition-transform hover:scale-105"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Mulai Transaksi Sekarang
              </a>
            </Button>
          </div>

          <div className="w-full max-w-2xl mx-auto">
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
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                          priority={image.id === 'hero-1'}
                        />
                      </div>
                      <p className="mt-4 text-center text-white font-bold text-xl font-headline">{imageCaptions[index]}</p>
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