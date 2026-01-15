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


const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara,%20saya%20ingin%20mengamankan%20transaksi%20sekarang.';

const imageCaptions = [
  "Jual Beli Akun Game",
  "Jasa Freelance",
  "Transaksi Digital Lainnya"
];

export function Hero() {
  const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

  return (
    <section id="home" className="relative w-full py-24 sm:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
              Transaksi Aman dan Terpercaya.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Jasa Rekber ( Mediator ) Profesional Untuk Semua Kebutuhan transaksi Digital Anda
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Button asChild size="lg" 
                className="shadow-lg transform transition-transform hover:scale-105"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Mulai Transaksi
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
