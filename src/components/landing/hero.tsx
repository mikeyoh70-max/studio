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
    <section id="home" className="relative w-full py-24 sm:py-32 lg:py-40 bg-background">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-4">
              <div className="relative inline-flex items-center gap-x-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-primary/80 ring-1 ring-inset ring-border">
                <span className="flex h-2.5 w-2.5">
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                </span>
                <span className="ml-2">Layanan Rekber Terpercaya #1</span>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-headline">
              <span className="text-foreground">Transaksi Aman,</span>
              <span className="block text-sky-400">Hati Tenang.</span>
              <span className="block text-teal-400">Rekber Nusantara.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Jasa Rekening Bersama terpercaya untuk semua kebutuhan transaksi digital Anda. Cepat, aman, dan biaya transparan.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Button asChild size="lg" 
                className="btn-rgb shadow-lg transform transition-transform hover:scale-105"
              >
                <a href="#buat-transaksi">
                  Mulai Transaksi Aman
                </a>
              </Button>
               <Button asChild size="lg" variant="outline">
                <a href="#cek-fee">
                  Cek Biaya Jasa
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
          <Carousel
              className="w-full max-w-md mx-auto"
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
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl object-cover aspect-[3/2]"
                      priority={image.id === 'hero-1'}
                    />
                     <p className="mt-4 text-center text-primary font-semibold text-lg">{imageCaptions[index]}</p>
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
