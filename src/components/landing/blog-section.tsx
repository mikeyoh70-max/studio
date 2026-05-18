'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { blogPosts } from '@/lib/blog-data';

export function BlogSection() {
  return (
    <section id="blog-preview" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-headline mb-4">
            Blog & Berita Terkini
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium px-4">
            Temukan panduan, tips keamanan, dan berita terbaru seputar layanan Rekber Nusantara
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {blogPosts.map((post) => {
                const placeholder = PlaceHolderImages.find(img => img.id === post.imageId);
                return (
                  <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
                    <Card className="border border-slate-100 shadow-sm overflow-hidden h-full group hover:shadow-md transition-all duration-300 bg-white rounded-2xl md:rounded-3xl">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={placeholder?.imageUrl || "https://picsum.photos/seed/blog/800/600"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={placeholder?.imageHint || "blog post"}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/95 text-slate-900 hover:bg-white font-bold border-none shadow-sm text-[10px] md:text-xs">
                            Kategori
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 md:p-8">
                        <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-xs mb-3 md:mb-4 font-medium uppercase tracking-wider">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 font-headline leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-flex items-center gap-2 text-primary font-black text-xs md:text-sm tracking-tight group/link"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Panah navigasi disembunyikan di mobile agar tidak menutupi kartu */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white border-slate-100 shadow-md hover:bg-slate-50 h-10 w-10" />
              <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white border-slate-100 shadow-md hover:bg-slate-50 h-10 w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
