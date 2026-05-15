
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { WhyUs } from '@/components/landing/why-us';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { Faq } from '@/components/landing/faq';
import { FeeCalculator } from '@/components/landing/fee-calculator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Step by Step Section - White Background */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-headline">
                  Hanya 3 Langkah Mudah
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Proses transaksi di Rekber Nusantara didesain sangat simpel dan cepat agar Anda tidak perlu menunggu lama.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { 
                    step: "01", 
                    title: "Klik Mulai Transaksi", 
                    desc: "Klik tombol di website ini untuk terhubung langsung ke WhatsApp Admin Resmi kami." 
                  },
                  { 
                    step: "02", 
                    title: "Dipandu Admin", 
                    desc: "Admin akan membuatkan grup transaksi dan memandu proses serah terima barang/jasa." 
                  },
                  { 
                    step: "03", 
                    title: "Transaksi Selesai", 
                    desc: "Dana diteruskan ke penjual setelah pembeli mengkonfirmasi pesanan diterima dengan aman." 
                  }
                ].map((item, i) => (
                  <div key={i} className="relative text-center group">
                    <div className="text-8xl font-black text-primary/5 absolute -top-10 left-1/2 -translate-x-1/2 select-none group-hover:text-primary/10 transition-colors">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3 relative z-10 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
                  </div>
                ))}
              </div>
           </div>
        </section>

        <WhyUs />
        <FeeCalculator />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
