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

export function Hero() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  return (
    <section id="home" className="relative w-full py-24 sm:py-32 lg:py-40 bg-background overflow-hidden">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative inline-flex items-center gap-x-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary/80 ring-1 ring-inset ring-border">
              <span className="flex h-2.5 w-2.5">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <span className="ml-2">Layanan Rekber Terpercaya #1</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl font-headline mb-6">
            <span className="text-foreground">Transaksi Aman,</span>
            <span className="block text-sky-400">Hati Tenang.</span>
            <span className="block text-teal-400">Rekber Nusantara.</span>
          </h1>
          
          <p className="text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mb-10">
            Jasa Rekening Bersama terpercaya untuk semua kebutuhan transaksi digital Anda. Cepat, aman, dan biaya transparan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button asChild size="lg" 
              className="btn-rgb h-14 px-10 text-lg shadow-xl transform transition-transform hover:scale-105"
            >
              <a href="#buat-transaksi">
                Mulai Transaksi Aman
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
                      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-2xl border border-border">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                          priority={image.id === 'hero-1'}
                        />
                      </div>
                      <p className="mt-4 text-center text-primary font-bold text-xl font-headline">{imageCaptions[index]}</p>
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
