'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

export function TransactionTracker() {
  const [txId, setTxId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId.trim()) return;
    
    setIsLoading(true);
    // User diarahkan ke halaman detail transaksi berdasarkan ID yang diinput
    router.push(`/transactions/${txId.trim()}`);
  };

  return (
    <section className="relative -mt-12 z-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Masukkan ID Transaksi (Contoh: ab12cd34...)"
                  className="pl-10 h-12 md:h-14 text-lg bg-background/50"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 md:h-14 px-8 btn-rgb" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Cek Status'}
              </Button>
            </form>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Masukkan ID transaksi Anda untuk memantau progres secara real-time tanpa harus login.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
