'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Timestamp;
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
  return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getStatusBadgeVariant = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'destructive';
    case 'pending':
    default:
      return 'secondary';
  }
};


export default function TransactionsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user && db) {
        try {
          const q = query(
            collection(db, 'transactions'),
            where('buyerId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const userTransactions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Transaction[];
          setTransactions(userTransactions);
        } catch (error) {
          console.error("Error fetching transactions: ", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!authLoading && user) {
      fetchTransactions();
    }
  }, [user, authLoading]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline mb-8">
        Riwayat Transaksi Saya
      </h1>

      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
          <CardDescription>
            Berikut adalah semua transaksi yang pernah Anda mulai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Nominal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{tx.description}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(tx.status)} className="capitalize">
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(tx.createdAt)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(tx.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <h3 className="text-xl font-semibold">Belum Ada Transaksi</h3>
              <p className="text-muted-foreground mt-2">
                Anda belum pernah memulai transaksi.
              </p>
              <Button asChild className="mt-4">
                <Link href="/#buat-transaksi">Mulai Transaksi Baru</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
