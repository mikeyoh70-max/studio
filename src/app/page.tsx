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
  ShieldCheck, 
  Wallet, 
  PackageCheck, 
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const steps = [
    {
      icon: <Users className="h-4 w-4" />,
      title: "Kesepakatan",
      desc: "Penjual & Pembeli sepakat menggunakan jasa Rekber Nusantara.",
      color: "bg-blue-500"
    },
    {
      icon: <Wallet className="h-4 w-4" />,
      title: "Pembeli Transfer",
      desc: "Pembeli mentransfer dana ke rekening resmi Admin.",
      color: "bg-orange-500"
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Dana Diamankan",
      desc: "Admin mengonfirmasi dana masuk dan mengamankannya.",
      color: "bg-green-600"
    },
    {
      icon: <PackageCheck className="h-4 w-4" />,
      title: "Penjual Kirim",
      desc: "Penjual menyerahkan data/barang kepada Pembeli.",
      color: "bg-purple-500"
    },
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      title: "Konfirmasi",
      desc: "Pembeli cek barang & konfirmasi ke Admin jika sudah OK.",
      color: "bg-teal-500"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
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
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold mb-4 uppercase tracking-wider">
                  <ShieldCheck className="h-3 w-3" />
                  Keamanan 100% Terjamin
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-headline">
                  Cara Kerja Rekber
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Proses 6 langkah transparan di Rekber Nusantara untuk menjamin keamanan dana Anda.
                </p>
              </div>

              {/* Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative max-w-5xl mx-auto">
                {steps.map((item, i) => (
                  <div key={i} className="relative group p-4 rounded-xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className={`w-8 h-8 ${item.color} text-white rounded-lg flex items-center justify-center mb-3 shadow-sm transform group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    
                    {/* Nomor Langkah - Biru Solid */}
                    <div className="absolute top-3 right-4 text-4xl font-black text-primary transition-all duration-300 pointer-events-none select-none opacity-20 group-hover:opacity-100">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>

                    <h3 className="text-sm font-bold mb-1 text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-[10px]">{item.desc}</p>
                    
                    {/* Animated Arrow for desktop */}
                    {i !== steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-200">
                        {(i + 1) % 3 !== 0 && <ArrowRight className="h-3 w-3" />}
                      </div>
                    )}
                  </div>
                ))}
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
