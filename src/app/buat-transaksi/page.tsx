
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { NewTransactionForm } from '@/components/landing/new-transaction-form';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BuatTransaksiPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
            <Link href="/" className="hover:text-primary">Member Area</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">Home</span>
          </div>

          <NewTransactionForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
