
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
      return 5000;
    }
    if (amount >= 100000 && amount <= 250000) {
      return 8000;
    }
    if (amount > 250000 && amount <= 500000) {
      return 15000;
    }
    if (amount > 500000 && amount <= 1000000) {
      return 30000;
    }
    if (amount > 1000000) {
      return amount * 0.025;
    }
    return 0;
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(Number(value));
  };

  return (
    <section id="cek-fee" className="py-20 sm:py-28 bg-[#0a0f1e]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky top-24">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl font-headline">
              Kalkulator Biaya Jasa
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Transparansi adalah kunci. Hitung estimasi biaya jasa rekber untuk transaksi Anda dengan mudah.
            </p>
            <Card className="mt-10 shadow-2xl bg-[#161e31] border-white/5">
              <CardHeader>
                <CardTitle className="text-white">Hitung Fee/Biaya Rekber</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="transaction-amount" className="block text-sm font-medium text-slate-400">Nominal Transaksi (IDR)</label>
                    <Input
                      id="transaction-amount"
                      type="text"
                      value={amount > 0 ? amount.toLocaleString('id-ID') : ''}
                      onChange={handleAmountChange}
                      placeholder="Contoh: 150000"
                      className="mt-1 text-lg p-6 bg-[#0a0f1e] border-white/10 text-white placeholder:text-slate-600"
                    />
                  </div>
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/5">
                    <p className="text-sm text-slate-400">Estimasi Fee/Biaya Rekber</p>
                    <p className="text-4xl font-bold tracking-tight text-sky-400">
                      {formatCurrency(calculatedFee)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 lg:mt-0">
            <Card className="shadow-2xl bg-[#161e31] border-white/5 overflow-hidden">
              <CardHeader className="bg-white/5">
                <CardTitle className="text-white">Tabel Biaya</CardTitle>
                <CardDescription className="text-slate-400">Biaya jasa kami dirancang agar terjangkau dan transparan untuk semua skala transaksi.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-white font-bold h-14 px-6">Nominal Transaksi</TableHead>
                      <TableHead className="text-right text-white font-bold h-14 px-6">Fee/Biaya</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-slate-300 px-6">Rp 1 - Rp 99.999</TableCell>
                      <TableCell className="text-right px-6"><Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-400/10">Rp 5.000</Badge></TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-slate-300 px-6">Rp 100.000 - Rp 250.000</TableCell>
                      <TableCell className="text-right px-6"><Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-400/10">Rp 8.000</Badge></TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-slate-300 px-6">Rp 250.001 - Rp 500.000</TableCell>
                      <TableCell className="text-right px-6"><Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-400/10">Rp 15.000</Badge></TableCell>
                    </TableRow>
                    <TableRow className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-slate-300 px-6">Rp 500.001 - Rp 1.000.000</TableCell>
                      <TableCell className="text-right px-6"><Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-400/10">Rp 30.000</Badge></TableCell>
                    </TableRow>
                    <TableRow className="border-none hover:bg-white/5">
                      <TableCell className="text-slate-300 px-6">&gt; Rp 1.000.000</TableCell>
                      <TableCell className="text-right px-6"><Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-400/10 font-bold text-lg">2.5%</Badge></TableCell>
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
