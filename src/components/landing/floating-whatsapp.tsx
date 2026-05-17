'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Go,%20Saya%20ingin%20bertransaksi.%0A%0A*Format%20Transaksi*%0AProduk:%20%0ANominal:%20%0APenjual:%20%0APembeli:%20';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <div className="absolute -inset-1.5 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-bold text-[11px] sm:text-xs tracking-wide">Chat Admin</span>
        
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 text-[9px] items-center justify-center font-bold">1</span>
        </span>
      </a>
    </div>
  );
}
