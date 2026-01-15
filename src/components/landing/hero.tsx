'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const WHATSAPP_LINK = 'https://wa.me/6281234567890?text=Halo%20Admin%20Safeguard%20Trades,%20saya%20ingin%20mengamankan%20transaksi%20sekarang.';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-illustration');

  return (
    <section id="home" className="relative w-full py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl font-headline">
              Transaksi Game Aman, Cepat, & Anti-Ribet.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Dikelola oleh Mahasiswa Hukum. Legalitas Terjamin. Mencegah Penipuan Sejak Transaksi Pertama.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Button asChild size="lg" 
                className="shadow-lg transform transition-transform hover:scale-105 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Amankan Transaksi Sekarang
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl object-cover"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
