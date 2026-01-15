import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { AdminVerifier } from '@/components/landing/admin-verifier';
import { WhyUs } from '@/components/landing/why-us';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyUs />
        <AdminVerifier />
      </main>
      <Footer />
    </div>
  );
}
