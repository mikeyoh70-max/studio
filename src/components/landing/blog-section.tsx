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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-headline mb-4">
            Blog & Pembaruan Terbaru
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Temukan panduan, tips keamanan, dan berita terkini seputar layanan Rekber Nusantara
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {blogPosts.map((post) => {
                const placeholder = PlaceHolderImages.find(img => img.id === post.imageId);
                return (
                  <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden h-full group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={placeholder?.imageUrl || "https://picsum.photos/seed/blog/800/500"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          data-ai-hint={placeholder?.imageHint || "blog post"}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-slate-900 hover:bg-white font-bold border-none shadow-sm">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 font-headline leading-tight min-h-[3.5rem] line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider group/link"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white border-slate-100 shadow-lg hover:bg-slate-50 h-12 w-12" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white border-slate-100 shadow-lg hover:bg-slate-50 h-12 w-12" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
