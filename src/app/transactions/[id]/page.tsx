'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, ShieldCheck, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  sellerPhone: string;
  buyerPhone: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return 'N/A';
  return new Date(timestamp.seconds * 1000).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Selesai', color: 'success', progress: 100, icon: <CheckCircle2 className="h-5 w-5" /> };
    case 'cancelled':
      return { label: 'Dibatalkan', color: 'destructive', progress: 0, icon: <Clock className="h-5 w-5" /> };
    case 'pending':
    default:
      return { label: 'Dalam Proses', color: 'secondary', progress: 40, icon: <Clock className="h-5 w-5" /> };
  }
};

export default function TransactionDetailPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!id || !db) return;
      try {
        const docRef = doc(db, 'transactions', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTransaction({ id: docSnap.id, ...docSnap.data() } as Transaction);
        } else {
          setError('Transaksi tidak ditemukan.');
        }
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data transaksi.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <Card>
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{error || 'Data tidak ditemukan'}</h2>
        <Button asChild variant="outline">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda</Link>
        </Button>
      </div>
    );
  }

  const statusInfo = getStatusConfig(transaction.status);

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/transactions"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali</Link>
        </Button>
        <Badge variant="outline" className="font-mono">{transaction.id}</Badge>
      </div>

      <div className="space-y-8">
        <Card className="border-border shadow-xl">
          <CardHeader className="border-b bg-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-headline">Status Transaksi</CardTitle>
                <CardDescription>Pembaruan terakhir: {formatDate(transaction.createdAt)}</CardDescription>
              </div>
              <Badge variant={statusInfo.color as any} className="text-lg py-1 px-4 gap-2">
                {statusInfo.icon}
                {statusInfo.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Progres Transaksi</span>
                  <span>{statusInfo.progress}%</span>
                </div>
                <Progress value={statusInfo.progress} className="h-3" />
                <div className="grid grid-cols-3 text-[10px] text-muted-foreground pt-1 uppercase tracking-wider font-semibold">
                  <span className="text-left">Dibuat</span>
                  <span className="text-center">Diproses</span>
                  <span className="text-right">Selesai</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t">
                <div className="space-y-4">
                  <h4 className="font-bold text-primary flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Detail Produk
                  </h4>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Deskripsi:</p>
                    <p className="font-medium">{transaction.description}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Nominal Transaksi:</p>
                    <p className="text-xl font-bold">{formatCurrency(transaction.amount)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-primary flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Informasi Kontak
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Pembeli:</p>
                      <p className="font-mono text-xs">{transaction.buyerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Penjual:</p>
                      <p className="font-mono text-xs">{transaction.sellerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold">Butuh bantuan transaksi ini?</h4>
            <p className="text-sm text-muted-foreground">Hubungi admin kami untuk pertanyaan seputar status.</p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
             <a href={`https://wa.me/62895323091263?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20transaksi%20ID:%20${transaction.id}`} target="_blank" rel="noopener noreferrer">
              Hubungi Admin
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
