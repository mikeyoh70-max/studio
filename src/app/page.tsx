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
  Wallet, 
  PackageCheck, 
  CheckCircle2,
  Send
} from 'lucide-react';

export default function Home() {
  const steps = [
    {
      icon: <Send className="h-10 w-10" />,
      title: "Mulai Transaksi",
      desc: "Klik tombol 'Mulai Transaksi Sekarang' untuk terhubung dengan Admin Resmi kami.",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Wallet className="h-10 w-10" />,
      title: "Transfer Dana",
      desc: "Pembeli mentransfer dana ke rekening resmi Admin.",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: <PackageCheck className="h-10 w-10" />,
      title: "Proses Transaksi",
      desc: "Penjual kirim barang & Pembeli melakukan pengecekan.",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: <CheckCircle2 className="h-10 w-10" />,
      title: "Selesai",
      desc: "Dana dicairkan ke Penjual setelah konfirmasi selesai.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Section Cara Kerja */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl font-headline mb-4">
                  Cara Kerja Rekber Nusantara
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                  Proses sederhana dalam 4 langkah untuk transaksi yang aman
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
                {steps.map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    {/* Icon Container */}
                    <div className={`w-24 h-24 ${item.bgColor} ${item.color} rounded-3xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                      {item.icon}
                    </div>
                    
                    {/* Number & Title */}
                    <h3 className="text-xl font-black mb-3 text-slate-900 font-headline">
                      {i + 1}. {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-500 leading-relaxed text-sm max-w-[200px]">
                      {item.desc}
                    </p>
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
