import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { WhyUs } from '@/components/landing/why-us';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { Faq } from '@/components/landing/faq';
import { FeeCalculator } from '@/components/landing/fee-calculator';
import { FloatingWhatsApp } from '@/components/landing/floating-whatsapp';
import { RecentTransactions } from '@/components/landing/recent-transactions';
import { 
  Users, 
  ShieldCheck, 
  Wallet, 
  PackageCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  const steps = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Kesepakatan",
      desc: "Penjual & Pembeli sepakat menggunakan jasa Rekber Nusantara.",
      color: "bg-blue-500"
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: "Pembeli Transfer",
      desc: "Pembeli mentransfer dana ke rekening resmi Admin.",
      color: "bg-orange-500"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Dana Diamankan",
      desc: "Admin mengonfirmasi dana masuk dan mengamankannya.",
      color: "bg-green-600"
    },
    {
      icon: <PackageCheck className="h-5 w-5" />,
      title: "Penjual Kirim",
      desc: "Penjual menyerahkan data/barang kepada Pembeli.",
      color: "bg-purple-500"
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Konfirmasi",
      desc: "Pembeli cek barang & konfirmasi ke Admin jika sudah OK.",
      color: "bg-teal-500"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Pencairan Dana",
      desc: "Admin mencairkan dana ke Penjual. Transaksi Selesai!",
      color: "bg-sky-500"
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Transaction Flow Section */}
        <section className="py-20 bg-white overflow-hidden border-b border-slate-100">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
                  <ShieldCheck className="h-3 w-3" />
                  Keamanan 100% Terjamin
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-headline">
                  Cara Kerja Rekber
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Proses 6 langkah transparan di Rekber Nusantara untuk menjamin keamanan dana Anda.
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative max-w-6xl mx-auto">
                {steps.map((item, i) => (
                  <div key={i} className="relative group p-6 rounded-xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div className={`w-11 h-11 ${item.color} text-white rounded-lg flex items-center justify-center mb-4 shadow-md transform group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="absolute top-4 right-6 text-3xl font-black text-slate-50 group-hover:text-primary/5 transition-colors pointer-events-none">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-xs">{item.desc}</p>
                    
                    {/* Animated Arrow for desktop (Horizontal) */}
                    {i !== steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-100">
                        {(i + 1) % 3 !== 0 && <ArrowRight className="h-5 w-5" />}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust Badge Below Flow */}
              <div className="mt-12 max-w-4xl mx-auto p-5 rounded-xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Siap Bertransaksi?</h4>
                    <p className="text-slate-400 text-xs">Dana Anda aman di tangan pihak ketiga yang netral.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a href="#cek-fee" className="text-xs font-bold hover:text-sky-400 transition-colors bg-white/10 px-4 py-2 rounded-lg">Cek Biaya Jasa →</a>
                </div>
              </div>
           </div>
        </section>

        <RecentTransactions />
        <WhyUs />
        <FeeCalculator />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
