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
import { Loader2, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  sellerPhone: z.string().min(8, { message: 'Nomor Penjual harus diisi.' }).regex(/^[0-9+]+$/, "Hanya angka dan karakter '+' yang diperbolehkan."),
  buyerPhone: z.string().min(8, { message: 'Nomor Pembeli harus diisi.' }).regex(/^[0-9+]+$/, "Hanya angka dan karakter '+' yang diperbolehkan."),
  description: z.string().min(10, { message: 'Deskripsi harus diisi (min. 10 karakter).' }),
  amount: z.number().min(10000, { message: 'Nominal transaksi minimal Rp 10.000.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Anda harus menyetujui Aturan & Ketentuan yang berlaku.',
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
        title: 'Anda harus login',
        description: 'Silakan login terlebih dahulu untuk membuat transaksi.',
      });
      setIsLoading(false);
      return;
    }

    if (!db) {
      toast({
        variant: 'destructive',
        title: 'Database Error',
        description: 'Gagal terhubung ke database.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'transactions'), {
        buyerId: user.uid,
        sellerPhone: values.sellerPhone,
        buyerPhone: values.buyerPhone,
        description: values.description,
        amount: values.amount,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, 'transactions', docRef.id, 'messages'), {
        text: `Halo! Transaksi baru telah dibuat dengan ID: ${docRef.id}. Silakan tunggu Admin bergabung ke dalam chat room ini.`,
        senderId: 'system',
        senderName: 'Sistem',
        timestamp: serverTimestamp(),
      });

      toast({
        title: 'Transaksi Berhasil Dibuat',
        description: 'Membuka Room Chat Anda...',
      });

      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal membuat transaksi. Silakan coba lagi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="buat-transaksi" className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Mulai Transaksi Aman
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Isi formulir di bawah ini untuk membuka Room Chat eksklusif dengan Admin kami.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto mt-12 bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-center font-headline text-2xl">Formulir Transaksi</CardTitle>
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
                        <FormLabel>Nomor WhatsApp Penjual</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nomor penjual" {...field} />
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
                        <FormLabel>Nomor WhatsApp Pembeli</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nomor pembeli" {...field} />
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
                      <FormLabel>Nominal Transaksi (IDR)</FormLabel>
                      <FormControl>
                         <Input
                          placeholder="Contoh: 150000"
                          {...field}
                          type="text"
                          value={field.value > 0 ? field.value.toLocaleString('id-ID') : ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            field.onChange(Number(value) || 0);
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
                      <FormLabel>Deskripsi Transaksi</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Contoh: Jual beli akun game MLBB, level 30, skin legend." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                       <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Saya akan mematuhi Aturan & Ketentuan yang berlaku.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full btn-rgb" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Membuka Room Chat...
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Buat & Mulai Chat
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
