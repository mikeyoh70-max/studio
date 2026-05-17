import { ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-headline mb-6">
            Biaya
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Biaya penanganan bersaing, transparan, dan tanpa kejutan tersembunyi.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-[40px] border border-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
              
              {/* Kolom Kiri - Rekber Nusantara */}
              <div className="lg:pr-16 lg:border-r border-slate-100">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-8 uppercase tracking-widest">
                  Dengan Rekber Nusantara
                </div>
                
                <div className="flex items-start gap-1 mb-6">
                  <span className="text-8xl md:text-9xl font-black tracking-tighter text-slate-900 leading-none">
                    1%
                  </span>
                  <Sparkles className="h-8 w-8 text-yellow-400 fill-yellow-400 mt-4 animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-headline">
                  Mau lebih hemat lagi?
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-8 max-w-sm">
                  Sistem kami memungkinkan Anda berbagi biaya penanganan secara adil antara pembeli dan penjual, sehingga menjadi lebih terjangkau. 💸
                </p>

                <Link href="#cek-fee" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                  + Struktur biaya penanganan
                </Link>
              </div>

              {/* Kolom Kanan - Platform Lain */}
              <div className="lg:pl-16 space-y-12">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
                    Platform Lain
                  </p>

                  <div className="space-y-10">
                    {/* Item 1 */}
                    <div className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Toko Hijau</span>
                        <span className="text-5xl font-black text-slate-200 group-hover:text-slate-300 transition-colors tracking-tighter">10%</span>
                      </div>
                      <p className="text-xs text-slate-400 italic">adminnya *Mulai dari 4% hingga 10%! 🤯</p>
                      <div className="mt-4 h-px w-full bg-slate-50 relative overflow-hidden">
                         <div className="absolute inset-0 bg-slate-100 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Si Orange</span>
                        <span className="text-5xl font-black text-slate-200 group-hover:text-slate-300 transition-colors tracking-tighter">15%</span>
                      </div>
                      <p className="text-xs text-slate-400 italic">adminnya *Mulai dari 4% - 11% bahkan sampai 15% 🫠</p>
                      <div className="mt-4 h-px w-full bg-slate-50 relative overflow-hidden">
                         <div className="absolute inset-0 bg-slate-100 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
