import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { WhyUs } from '@/components/landing/why-us';
import { TransactionForm } from '@/components/landing/transaction-form';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { Faq } from '@/components/landing/faq';
import { TransactionTracker } from '@/components/landing/transaction-tracker';
import { FeeCalculator } from '@/components/landing/fee-calculator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TransactionTracker />
        {/* Urutan: Form dulu baru WhyUs sesuai request */}
        <TransactionForm />
        <WhyUs />
        {/* Mengembalikan fitur kalkulator yang sempat hilang */}
        <FeeCalculator />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
