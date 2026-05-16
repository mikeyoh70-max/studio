import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { WhyUs } from '@/components/landing/why-us';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { Faq } from '@/components/landing/faq';
import { FeeCalculator } from '@/components/landing/fee-calculator';
import { FloatingWhatsApp } from '@/components/landing/floating-whatsapp';
import { RecentTransactions } from '@/components/landing/recent-transactions';
import { MessageSquare, Users, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Visual Transaction Flow Section */}
        <section className="py-24 bg-white overflow-hidden">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
                  Alur Transaksi Aman
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Proses di Rekber Nusantara sangat transparan dan diawasi langsung oleh Admin untuk menjamin keamanan Anda.
                </p>
              </div>

              <div className="relative">
                {/* Connecting Line (Desktop Only) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                  {[
                    { 
                      step: "01", 
                      icon: <MessageSquare className="h-8 w-8" />,
                      title: "Hubungi Admin", 
                      desc: "Klik tombol mulai transaksi untuk terhubung otomatis ke WhatsApp Admin." 
                    },
                    { 
                      step: "02", 
                      icon: <Users className="h-8 w-8" />,
                      title: "Grup Transaksi", 
                      desc: "Admin akan membuat grup khusus untuk Penjual & Pembeli berdiskusi aman." 
                    },
                    { 
                      step: "03", 
                      icon: <ShieldCheck className="h-8 w-8" />,
                      title: "Dana Cair", 
                      desc: "Dana diteruskan ke penjual setelah pembeli menerima barang dengan selamat." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-primary mb-6 shadow-sm group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative bg-white">
                        {item.icon}
                        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-4 border-white">
                          {item.step}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed max-w-[280px]">{item.desc}</p>
                    </div>
                  ))}
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
