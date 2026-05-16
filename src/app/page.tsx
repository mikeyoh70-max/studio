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
  MessageSquare, 
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
      icon: <Users className="h-6 w-6" />,
      title: "Kesepakatan",
      desc: "Penjual & Pembeli sepakat menggunakan jasa Rekber Nusantara.",
      color: "bg-blue-500"
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Pembeli Transfer",
      desc: "Pembeli mentransfer dana ke rekening resmi Admin.",
      color: "bg-orange-500"
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Dana Diamankan",
      desc: "Admin mengonfirmasi dana masuk dan mengamankannya.",
      color: "bg-green-600"
    },
    {
      icon: <PackageCheck className="h-6 w-6" />,
      title: "Penjual Kirim",
      desc: "Penjual menyerahkan data/barang kepada Pembeli.",
      color: "bg-purple-500"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Konfirmasi",
      desc: "Pembeli cek barang & konfirmasi ke Admin jika sudah OK.",
      color: "bg-teal-500"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
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
        
        {/* Visual Transaction Flow Section */}
        <section className="py-24 bg-white overflow-hidden border-b border-slate-100">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  Keamanan 100% Terjamin
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
                  Alur Transaksi Aman
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Berikut adalah proses 6 langkah transparan di Rekber Nusantara untuk menjamin keamanan dana Anda.
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                {steps.map((item, i) => (
                  <div key={i} className="relative group p-8 rounded-2xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-2xl transition-all duration-300">
                    <div className={`w-14 h-14 ${item.color} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <div className="absolute top-6 right-8 text-4xl font-black text-slate-100 group-hover:text-primary/10 transition-colors">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                    
                    {/* Animated Arrow for desktop (Horizontal) */}
                    {i !== steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-slate-200">
                        {(i + 1) % 3 !== 0 && <ArrowRight className="h-6 w-6 animate-pulse" />}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Trust Badge Below Flow */}
              <div className="mt-16 p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Siap Bertransaksi?</h4>
                    <p className="text-slate-400 text-sm">Dana Anda aman di tangan pihak ketiga yang netral.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <a href="#cek-fee" className="text-sm font-bold hover:text-sky-400 transition-colors">Cek Biaya Jasa →</a>
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
