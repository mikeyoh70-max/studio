import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rekber Nusantara - Jasa Rekening Bersama Terpercaya',
  description: 'Jasa Rekening Bersama (Rekber) terpercaya untuk transaksi game online, akun, dan produk digital Anda. Aman, cepat, dan biaya transparan.',
  openGraph: {
    title: 'Rekber Nusantara - Jasa Rekening Bersama Terpercaya',
    description: 'Aman, cepat, dan transparan untuk transaksi produk digital Anda.',
    images: ['https://i.ibb.co.cc/Vv8t05kP/Rekber-Nusantara.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18164855355"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18164855355');
          `}
        </Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
