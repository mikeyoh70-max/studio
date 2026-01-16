'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function FeeCalculator() {
  const [amount, setAmount] = useState<number>(150000);

  const calculatedFee = useMemo(() => {
    if (isNaN(amount) || amount <= 0) {
      return 0;
    }
    if (amount < 100000) {
      return 3000;
    }
    if (amount >= 100000 && amount < 500000) {
      return 8000;
    }
    if (amount >= 500000 && amount <= 1000000) {
      return 20000;
    }
    if (amount > 1000000) {
      return amount * 0.01;
    }
    return 0;
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(Number(value));
  };

  return (
    <section id="cek-fee" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky top-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
              Kalkulator Biaya Jasa
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Transparansi adalah kunci. Hitung estimasi biaya jasa rekber untuk transaksi Anda dengan mudah.
            </p>
            <Card className="mt-10 shadow-lg bg-card border-border">
              <CardHeader>
                <CardTitle>Hitung Fee Rekber</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="transaction-amount" className="block text-sm font-medium text-muted-foreground">Nominal Transaksi (IDR)</label>
                    <Input
                      id="transaction-amount"
                      type="text"
                      value={amount > 0 ? amount.toLocaleString('id-ID') : ''}
                      onChange={handleAmountChange}
                      placeholder="Contoh: 150000"
                      className="mt-1 text-lg p-6 bg-input border-border"
                    />
                  </div>
                  <div className="p-6 rounded-lg bg-primary text-primary-foreground">
                    <p className="text-sm">Estimasi Fee Rekber</p>
                    <p className="text-4xl font-bold tracking-tight">
                      {formatCurrency(calculatedFee)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 lg:mt-0">
            <Card className="shadow-lg bg-card border-border">
              <CardHeader>
                <CardTitle>Tabel Biaya</CardTitle>
                <CardDescription>Biaya jasa kami dirancang agar terjangkau dan transparan untuk semua skala transaksi.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nominal Transaksi</TableHead>
                      <TableHead className="text-right">Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Rp 1 - Rp 99.999</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">Rp 3.000</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rp 100.000 - Rp 499.999</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">Rp 8.000</Badge></TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>Rp 500.000 - Rp 1.000.000</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">Rp 20.000</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>&gt; Rp 1.000.000</TableCell>
                      <TableCell className="text-right"><Badge variant="secondary">1%</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
