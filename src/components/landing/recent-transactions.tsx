'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const mockTransactions = [
  { id: 1, item: "Akun Mobile Legends - Mythic", price: "Rp 350.000", time: "Baru saja" },
  { id: 2, item: "Jasa Joki Rank Valorant", price: "Rp 150.000", time: "2 menit yang lalu" },
  { id: 3, item: "Akun Genshin Impact AR 55", price: "Rp 1.200.000", time: "3 jam yang lalu" },
  { id: 4, item: "Top Up Diamond FF", price: "Rp 50.000", time: "5 jam yang lalu" },
  { id: 5, item: "Jasa Desain Banner", price: "Rp 200.000", time: "6 jam yang lalu" },
  { id: 6, item: "Akun PUBG Mobile - Skin M416", price: "Rp 850.000", time: "8 jam yang lalu" },
];

export function RecentTransactions() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-headline">
              Aktivitas Transaksi
            </h2>
            <p className="mt-2 text-slate-600">
              Pantau transaksi yang baru saja diselesaikan.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-xs">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            LIVE MONITORING
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {mockTransactions.map((tx) => (
              <CarouselItem key={tx.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <Card className="border-none shadow-md hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="success" className="gap-1 px-2 text-[10px]">
                        <CheckCircle2 className="h-3 w-3" /> Selesai
                      </Badge>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" /> {tx.time}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 truncate text-sm">{tx.item}</h3>
                    <p className="text-lg font-black text-success font-headline">{tx.price}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verified System</span>
                      <CheckCircle2 className="h-3 w-3 text-primary/40" />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
