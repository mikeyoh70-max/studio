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
import { Loader2, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

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
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [newTransactionId, setNewTransactionId] = useState('');
  const router = useRouter();

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
    try {
      const response = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerPhone: values.sellerPhone,
          buyerPhone: values.buyerPhone,
          description: values.description,
          amount: values.amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat transaksi di server.');
      }

      const { transactionId } = await response.json();

      toast({
        title: 'Transaksi Dibuat!',
        description: 'Link ruang obrolan berhasil dibuat.',
      });
      
      setNewTransactionId(transactionId);
      setShowSuccessDialog(true);
      form.reset();

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Terjadi Kesalahan',
        description: 'Gagal membuat ruang transaksi.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    const chatUrl = `${window.location.origin}/chat/${newTransactionId}`;
    navigator.clipboard.writeText(chatUrl).then(() => {
      toast({
        title: 'Link Disalin!',
        description: 'Link ruang chat telah disalin ke clipboard.',
      });
    });
  };

  const handleEnterChat = () => {
    setShowSuccessDialog(false);
    router.push(`/chat/${newTransactionId}`);
  };

  return (
    <section id="buat-transaksi" className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Mulai Transaksi Aman
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Isi formulir di bawah ini untuk membuat ruang chat mediasi. Link chat akan dibuat otomatis dan dapat dibagikan ke Penjual & Pembeli.
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
                      Membuat Ruang Transaksi...
                    </>
                  ) : (
                    'Buat Ruang Transaksi'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ruang Transaksi Dibuat!</DialogTitle>
            <DialogDescription>
              Bagikan link ini kepada pihak lain untuk bergabung dalam obrolan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`${typeof window !== 'undefined' ? window.location.origin : ''}/chat/${newTransactionId}`}
                readOnly
              />
            </div>
            <Button type="button" size="icon" className="px-3" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Salin Link</span>
            </Button>
          </div>
          <DialogFooter className="sm:justify-end gap-2 sm:gap-0">
             <Button type="button" variant="secondary" onClick={() => setShowSuccessDialog(false)}>
              Tutup
            </Button>
            <Button type="button" onClick={handleEnterChat}>
              Masuk ke Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
