'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertTriangle, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OFFICIAL_NUMBER = '0895323091263';
const WHATSAPP_LINK = `https://wa.me/62895323091263?text=hallo%20admin%20%2C%20saya%20mau%20Buat%20Rekber%20Sekarang%20Dong`;

export function AdminVerification() {
  return (
    <section id="verify-admin" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-headline mb-6">
            Pusat Verifikasi Admin
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Hati-hati penipuan! Pastikan Anda hanya menghubungi kontak resmi kami di bawah ini. Rekber Nusantara tidak bertanggung jawab atas transaksi di luar nomor resmi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden rounded-[40px] bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Kolom Kiri - Info Nomor */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-6">
                  <ShieldCheck className="h-4 w-4" />
                  Admin Resmi Terverifikasi
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2 font-headline">WhatsApp Official</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Gunakan tombol di bawah untuk langsung terhubung dengan admin tanpa perlu simpan nomor.
                </p>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8 group hover:border-primary/30 transition-colors">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nomor Tunggal</div>
                  <div className="text-3xl font-black text-slate-900 font-headline tracking-tighter">
                    {OFFICIAL_NUMBER}
                  </div>
                </div>

                <Button asChild className="btn-rgb h-14 rounded-2xl text-lg shadow-xl shadow-blue-500/20" size="lg">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="gap-3">
                    <MessageCircle className="h-6 w-6 fill-white" />
                    Chat Admin Sekarang
                  </a>
                </Button>
              </div>

              {/* Kolom Kanan - Peringatan */}
              <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-red-500/20">
                  <AlertTriangle className="h-4 w-4" />
                  Peringatan Keras
                </div>

                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Admin Rekber Nusantara <span className="text-white font-bold underline decoration-green-500">HANYA</span> memiliki satu nomor WhatsApp resmi.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Waspada terhadap akun kloningan dengan foto profil atau nama yang sama tapi <span className="text-white font-bold">NOMOR BERBEDA</span>.
                    </p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <ShieldCheck className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Selalu buka website <span className="text-white font-bold">rekbernusantara.biz.id</span> untuk memastikan keaslian kontak sebelum transfer.
                    </p>
                  </li>
                </ul>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
                    Satu nomor untuk semua transaksi aman Anda.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
