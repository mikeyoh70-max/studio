import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { AdminVerifier } from '@/components/landing/admin-verifier';
import { FeeCalculator } from '@/components/landing/fee-calculator';
import { WhyUs } from '@/components/landing/why-us';
import { Footer } from '@/components/landing/footer';

const Testimonials = () => (
  <section id="testimoni" className="py-20 bg-background">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
        Apa Kata Mereka?
      </h2>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
        Kepercayaan Anda adalah prioritas kami. Kami akan segera menampilkan testimoni dari para pelanggan yang telah bertransaksi dengan aman dan nyaman melalui Safeguard Trades.
      </p>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AdminVerifier />
        <FeeCalculator />
        <WhyUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
