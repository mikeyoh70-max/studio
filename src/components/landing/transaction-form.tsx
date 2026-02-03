
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

const formSchema = z.object({
  sellerPhone: z.string().min(8, { message: 'Nomor WhatsApp Penjual wajib diisi.' }).regex(/^[0-9+]+$/, "Gunakan format angka."),
  buyerPhone: z.string().min(8, { message: 'Nomor WhatsApp Pembeli wajib diisi.' }).regex(/^[0-9+]+$/, "Gunakan format angka."),
  description: z.string().min(10, { message: 'Berikan deskripsi barang yang jelas (min. 10 karakter).' }),
  amount: z.number().min(10000, { message: 'Minimal transaksi Rp 10.000.' }),
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
      sellerPhone: '',
      buyerPhone: '',
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
      if (!db) throw new Error("Firestore not initialized");

      const docRef = await addDoc(collection(db, 'transactions'), {
        buyerId: user.uid,
        buyerName: user.displayName || 'Buyer',
        sellerPhone: values.sellerPhone,
        buyerPhone: values.buyerPhone,
        description: values.description,
        amount: values.amount,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Pesan sistem awal
      await addDoc(collection(db, 'transactions', docRef.id, 'messages'), {
        text: `🛡️ Sistem: Room Chat berhasil dibuat. Penjual (${values.sellerPhone}) dan Pembeli (${values.buyerPhone}) silakan berdiskusi di sini.`,
        senderId: 'system',
        senderName: 'Sistem Keamanan',
        timestamp: serverTimestamp(),
      });

      toast({
        title: 'Link Room Berhasil Dibuat!',
        description: 'Mengarahkan Anda ke Room Chat...',
      });

      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: 'destructive',
        title: 'Gagal Membuat Transaksi',
        description: 'Terjadi kesalahan pada server. Silakan coba lagi.',
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
            Sistem kami akan membuatkan Link Room Chat terenkripsi untuk Anda dan lawan transaksi.
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
                    name="sellerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WA Penjual (Identitas)</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: 0812..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buyerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WA Pembeli (Identitas)</FormLabel>
                        <FormControl>
                          <Input placeholder="Contoh: 0812..." {...field} />
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
                          placeholder="Tuliskan detail apa yang ditransaksikan agar Admin mudah memantau." 
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
                        <FormLabel className="text-xs">
                          Saya setuju bahwa transaksi ini akan menggunakan sistem Rekber Nusantara dan mematuhi kebijakan yang berlaku.
                        </FormLabel>
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

import { Badge } from '@/components/ui/badge';
