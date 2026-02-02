
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

const rekberSchema = z.object({
  name: z.string().min(3, { message: 'Nama jasa minimal 3 karakter.' }),
  description: z.string().min(20, { message: 'Deskripsi minimal 20 karakter.' }),
  tags: z.string().min(3, { message: 'Masukkan setidaknya satu kategori, pisahkan dengan koma.' }),
});

export default function NewRekberPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof rekberSchema>>({
    resolver: zodResolver(rekberSchema),
    defaultValues: {
      name: '',
      description: '',
      tags: '',
    },
  });

  if (!authLoading && !user) {
    router.push('/auth?redirect=/rekber/new');
  }

  const onSubmit = async (values: z.infer<typeof rekberSchema>) => {
    setIsLoading(true);

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Anda harus login',
        description: 'Silakan login untuk mendaftarkan jasa rekber.',
      });
      setIsLoading(false);
      return;
    }

    if (!db) {
      toast({
        variant: "destructive",
        title: "Database Error",
        description: "Gagal terhubung ke database. Cek konfigurasi Firebase.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const tagsArray = values.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

      await addDoc(collection(db, 'rekbers'), {
        ownerId: user.uid,
        name: values.name,
        description: values.description,
        tags: tagsArray,
        rating: 0,
        reviews: 0,
        isVerified: false, // Perlu verifikasi manual dari admin
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Pendaftaran Berhasil!',
        description: 'Jasa rekber Anda telah dikirim dan akan ditinjau oleh admin.',
      });

      router.push('/');

    } catch (error) {
      console.error("Error adding rekber document: ", error);
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal menyimpan data ke database. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
       <div className="flex flex-col min-h-dvh bg-background items-center justify-center">
         <Loader2 className="h-12 w-12 animate-spin" />
         <p className="mt-4 text-muted-foreground">Memeriksa sesi Anda...</p>
       </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-card border-border shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline">Daftarkan Jasa Rekber Anda</CardTitle>
              <CardDescription>
                Isi formulir di bawah untuk menampilkan jasa Anda di direktori kami.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Jasa Rekber</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Rekber Amanah Jaya" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi Lengkap</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan tentang jasa Anda, keunggulan, dan cakupan layanan."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori Layanan</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: Akun Game, Top Up, Jasa Freelance" {...field} />
                        </FormControl>
                         <p className="text-xs text-muted-foreground">Pisahkan setiap kategori dengan koma.</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full btn-rgb" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      'Daftarkan Jasa Saya'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
