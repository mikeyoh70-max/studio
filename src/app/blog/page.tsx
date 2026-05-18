import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { blogPosts } from '@/lib/blog-data';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BlogListPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-slate-50">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-headline mb-6">
              Blog Edukasi & Berita
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              Pelajari cara bertransaksi dengan aman dan hindari berbagai modus penipuan online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post) => {
              const placeholder = PlaceHolderImages.find(img => img.id === post.imageId);
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="border-none shadow-md overflow-hidden h-full transition-all duration-300 hover:shadow-xl bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={placeholder?.imageUrl || "https://picsum.photos/seed/blog/800/500"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-slate-900 font-bold">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 font-headline leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider">
                        Baca Artikel
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
