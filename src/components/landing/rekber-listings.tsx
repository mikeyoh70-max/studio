'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Star } from 'lucide-react';
import Image from 'next/image';

const rekberServices = [
  {
    id: 'rekber-nusantara',
    name: 'Rekber Nusantara',
    logo: '/logo.png', // We will need a logo image later
    description: 'Jasa Rekber profesional untuk semua kebutuhan transaksi digital. Dikelola oleh mahasiswa hukum untuk legalitas terjamin.',
    rating: 4.9,
    reviews: 125,
    tags: ['Akun Game', 'Top Up', 'Jasa Freelance'],
    isVerified: true,
  },
  // We can add more rekber services here later
];

export function RekberListings() {
  return (
    <section id="rekber-list" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Daftar Rekber Terverifikasi
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Jelajahi daftar Rekening Bersama yang telah kami verifikasi untuk memastikan keamanan transaksi Anda.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rekberServices.map((service) => (
            <Card key={service.id} className="bg-background shadow-lg flex flex-col hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                     {/* Placeholder for logo */}
                     <ShieldCheck className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
                    {service.isVerified && (
                      <Badge variant="success" className="mt-1">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Terverifikasi
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews} ulasan)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <Button className="w-full">
                  Lihat Detail & Hubungi
                </Button>
              </CardFooter>
            </Card>
          ))}
           {/* Placeholder for adding more services */}
            <Card className="bg-background/50 border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-8 hover:border-primary transition-all">
                <h3 className="font-bold text-lg text-foreground">Daftarkan Jasa Rekber Anda</h3>
                <p className="text-muted-foreground text-sm mt-2">Ingin jasa rekber Anda tampil di sini? Hubungi kami untuk proses verifikasi.</p>
                <Button variant="outline" className="mt-4">
                    Hubungi Kami
                </Button>
            </Card>
        </div>
      </div>
    </section>
  );
}
