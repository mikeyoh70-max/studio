'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/62895323091263?text=hallo%20admin%20%2C%20saya%20mau%20Buat%20Rekber%20Sekarang%20Dong';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] group">
      <div className="absolute -inset-1.5 bg-green-500 rounded-full blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 border border-white"></span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[11px] sm:text-xs tracking-wide leading-none">Chat Admin</span>
          <span className="text-[8px] sm:text-[9px] font-medium opacity-90 leading-none mt-1">Online Sekarang</span>
        </div>
        
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-30"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 text-[9px] items-center justify-center font-bold">1</span>
        </span>
      </a>
    </div>
  );
}
