import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Rekber Nusantara',
  description: 'Halaman dashboard khusus untuk admin.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4 relative">
       <div className="absolute top-8 text-center">
        <Link href="/" className="inline-flex items-center space-x-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Rekber Nusantara</span>
        </Link>
      </div>
      <main className="flex items-center justify-center flex-1 w-full">
        {children}
      </main>
    </div>
  );
}