'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Link2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  sellerName: z.string()
    .min(2, { message: 'Nama Penjual minimal 2 karakter.' }),
  buyerName: z.string()
    .min(2, { message: 'Nama Pembeli minimal 2 karakter.' }),
  description: z.string()
    .min(10, { message: 'Deskripsi minimal 10 karakter.' }),
  amount: z.number()
    .min(10000, { message: 'Minimal transaksi Rp 10.000.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui aturan layanan.',
  }),
});

export function TransactionForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerName: '',
      buyerName: '',
      description: '',
      amount: 0,
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Login Diperlukan',
        description: 'Silakan login terlebih dahulu untuk membuat link transaksi.',
      });
      setIsLoading(false);
      router.push('/auth');
      return;
    }

    try {
      if (!db) {
        throw new Error("Koneksi Database Gagal.");
      }

      // Simpan transaksi dengan buyerId agar sesuai dengan security rules & history page
      const docRef = await addDoc(collection(db, 'transactions'), {
        buyerId: user.uid,
        creatorName: user.displayName || user.email?.split('@')[0] || 'User',
        sellerName: values.sellerName,
        buyerName: values.buyerName,
        description: values.description,
        amount: values.amount,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Kirim pesan sistem pertama
      await addDoc(collection(db, 'transactions', docRef.id, 'messages'), {
        text: `🛡️ Sistem Keamanan: Room Chat berhasil dibuat. Penjual (${values.sellerName}) dan Pembeli (${values.buyerName}) silakan berdiskusi di sini.`,
        senderId: 'system',
        senderName: 'Sistem',
        timestamp: serverTimestamp(),
      });

      toast({
        title: 'Berhasil!',
        description: 'Link Transaksi telah dibuat.',
      });

      router.push(`/chat/${docRef.id}`);
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      toast({
        variant: 'destructive',
        title: 'Gagal Membuat Link',
        description: error.message || 'Terjadi kesalahan izin database. Pastikan Rules Firestore sudah benar.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="buat-transaksi" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Eksklusif & Aman</Badge>
          <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">Buat Link Transaksi</h2>
          <p className="text-muted-foreground">
            Sistem kami akan membuatkan Link Room Chat untuk Anda dan lawan transaksi.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-border shadow-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Detail Transaksi Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="sellerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Penjual</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Penjual" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buyerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Pembeli</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Pembeli" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nominal Transaksi (Rp)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Minimal 10.000"
                          value={field.value > 0 ? field.value.toLocaleString('id-ID') : ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            field.onChange(Number(val) || 0);
                          }}
                        />
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
                      <FormLabel>Deskripsi Barang/Jasa</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Contoh: Jual akun ML Mythic skin 200+ aman." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/20">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs cursor-pointer">
                          Saya setuju untuk menggunakan sistem Rekber Nusantara dan mematuhi kebijakan keamanan yang berlaku.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full btn-rgb h-12" disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" /> : (
                    <span className="flex items-center gap-2">
                      <Link2 className="h-5 w-5" />
                      Generate Link Room Chat
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
