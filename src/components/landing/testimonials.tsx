'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    name: 'Ahmad "The Invincible" Riyadi',
    avatar: 'https://picsum.photos/seed/101/40/40',
    title: 'Top Up Diamond Tercepat',
    rating: 5,
    quote:
      'Prosesnya cepet banget, gak sampe 5 menit diamond udah masuk. Adminnya juga ramah dan fast response. Puas banget sama layanan Rekber Nusantara!',
  },
  {
    name: 'Siti "The Shadow" Nurhaliza',
    avatar: 'https://picsum.photos/seed/102/40/40',
    title: 'Transaksi Akun Aman',
    rating: 5,
    quote:
      'Awalnya ragu transaksi akun gede, tapi Rekber Nusantara bikin semuanya aman terkendali. Fitur verifikasi adminnya bikin tenang. Recommended!',
  },
  {
    name: 'Budi "The Legend" Santoso',
    avatar: 'https://picsum.photos/seed/103/40/40',
    title: 'Jasa Joki Terpercaya',
    rating: 5,
    quote:
      'Pakai jasa joki di sini hasilnya memuaskan, rank naik drastis. Yang paling penting, akun 100% aman. Gak nyesel pilih Rekber Nusantara.',
  },
   {
    name: 'Rina "The Strategist" Wati',
    avatar: 'https://picsum.photos/seed/104/40/40',
    title: 'Layanan Mediasi Andal',
    rating: 5,
    quote:
      'Sempat ada sedikit masalah dengan penjual, tapi tim Rekber Nusantara jadi penengah yang adil dan solutif. Transaksi jadi aman dan kedua pihak puas.',
  },
  {
    name: 'Eko "The Flash" Prasetyo',
    avatar: 'https://picsum.photos/seed/105/40/40',
    title: 'Sangat Direkomendasikan!',
    rating: 5,
    quote:
      'Ini rekber terbaik yang pernah saya coba. Fee-nya transparan, prosesnya jelas, dan yang pasti terpercaya. Pasti akan langganan di sini.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Lihat bagaimana kami membantu para Pengguna bertransaksi dengan aman dan tanpa Khawatir.
          </p>
        </div>
        <div className="mt-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 h-full">
                    <Card className="bg-slate-50 border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-8 flex flex-col flex-grow">
                        <div className="flex mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-slate-700 italic flex-grow text-lg leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900">{testimonial.name}</p>
                            <p className="text-sm text-slate-500 font-medium">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}