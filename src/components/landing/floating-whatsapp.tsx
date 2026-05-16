'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=Halo%20Admin%20Rekber%20Nusantara%20,%20Saya%20ingin%20Memulai%20Transaksi%20Sekarang';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <div className="absolute -inset-2 bg-green-500 rounded-full blur opacity-20 group-hover:opacity-40 animate-pulse transition-opacity"></div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-3 bg-green-500 text-white p-3 sm:px-6 sm:py-3 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline font-bold text-sm tracking-wide">Chat Admin</span>
        
        {/* Notif Dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center font-bold">1</span>
        </span>
      </a>
    </div>
  );
}
