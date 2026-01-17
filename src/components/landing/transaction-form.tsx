'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const adminPhone = '62895323091263';
      const { sellerPhone, buyerPhone, description, amount } = values;

      const formattedAmount = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      const message = `Halo Admin Rekber Nusantara,

Saya ingin memulai transaksi baru dengan detail:
- Deskripsi: ${description}
- No. Penjual: ${sellerPhone}
- No. Pembeli: ${buyerPhone}
- Nominal: ${formattedAmount}

Mohon segera dibuatkan grup WhatsApp untuk mediasi. Terima kasih.`;

      const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank');
      
      toast({
        title: 'Mengarahkan ke WhatsApp!',
        description: 'Silakan lanjutkan chat dengan admin untuk membuat grup transaksi.',
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal mempersiapkan data untuk WhatsApp.',
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
            Isi formulir di bawah ini untuk memulai transaksi melalui WhatsApp. Admin akan membuatkan grup untuk Anda, Penjual, dan Admin.
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
                        <FormLabel>Nomor Penjual</FormLabel>
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
                        <FormLabel>Nomor Pembeli</FormLabel>
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
                      Mengarahkan ke WhatsApp...
                    </>
                  ) : (
                    'Buat Transaksi via WhatsApp'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
