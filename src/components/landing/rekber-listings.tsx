'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface RekberService {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  tags: string[];
  isVerified: boolean;
  ownerId: string;
}

export function RekberListings() {
  const [rekberServices, setRekberServices] = useState<RekberService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRekber = async () => {
      if (!db) {
        setIsLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'rekbers'),
          orderBy('isVerified', 'desc'),
          orderBy('rating', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const services = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as RekberService[];
        setRekberServices(services);
      } catch (error) {
        console.error("Error fetching rekber services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRekber();
  }, []);

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
          {isLoading && (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="bg-background shadow-lg flex flex-col">
                <CardHeader><Skeleton className="h-16 w-full" /></CardHeader>
                <CardContent><Skeleton className="h-24 w-full" /></CardContent>
                <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
              </Card>
            ))
          )}

          {!isLoading && rekberServices.map((service) => (
            <Card key={service.id} className="bg-background shadow-lg flex flex-col hover:border-primary transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
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
                    <span className="font-bold">{service.rating.toFixed(1)}</span>
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
            <Card className="bg-background/50 border-2 border-dashed border-border flex flex-col items-center justify-center text-center p-8 hover:border-primary transition-all">
                <h3 className="font-bold text-lg text-foreground">Daftarkan Jasa Rekber Anda</h3>
                <p className="text-muted-foreground text-sm mt-2">Ingin jasa rekber Anda tampil di sini? Klik untuk mendaftar.</p>
                <Button variant="outline" className="mt-4" asChild>
                    <Link href="/rekber/new">Daftar Sekarang</Link>
                </Button>
            </Card>
        </div>
      </div>
    </section>
  );
}
