
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
    name: 'Rizky "The Invincible" Pratama',
    avatar: 'https://picsum.photos/seed/101/40/40',
    title: 'Pembeli Akun Game',
    rating: 5,
    quote:
      'Prosesnya sat-set banget! Gak sampe 10 menit akun udah aman di tangan. Adminnya juga fast response biarpun tengah malem. Rekomended buat yang mau beli akun!',
  },
  {
    name: 'Siti Nur Aisyah',
    avatar: 'https://picsum.photos/seed/102/40/40',
    title: 'Penjual Jasa Freelance',
    rating: 5,
    quote:
      'Sering pake Rekber Nusantara buat transaksi jasa desain saya. Sangat membantu biar klien juga merasa aman dan saya tenang nunggu dana cair.',
  },
  {
    name: 'Budi Santoso',
    avatar: 'https://picsum.photos/seed/103/40/40',
    title: 'Top Up Game Player',
    rating: 5,
    quote:
      'Awalnya ragu transaksi nominal gede, tapi berkat admin yang netral dan sistem verifikasinya, semuanya lancar. Fee-nya juga paling masuk akal dibanding yang lain.',
  },
   {
    name: 'Andi Wijaya',
    avatar: 'https://picsum.photos/seed/104/40/40',
    title: 'Pemain Pro MLBB',
    rating: 5,
    quote:
      'Layanan mediasi terbaik. Sempat ada salah paham sama seller, tapi admin jadi penengah yang adil banget. Dana balik aman. Makasih Rekber Nusantara!',
  },
  {
    name: 'Rina Kartika',
    avatar: 'https://picsum.photos/seed/105/40/40',
    title: 'Digital Marketer',
    rating: 5,
    quote:
      'Gak perlu ribet daftar akun ini itu. Tinggal klik WA langsung dilayani. Simple, transparan, dan yang paling penting amanah.',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
            Apa Kata Mereka?
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Dengarkan pengalaman langsung dari para pengguna yang telah bertransaksi dengan aman menggunakan jasa kami.
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
