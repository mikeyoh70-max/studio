import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { RekberListings } from '@/components/landing/rekber-listings';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import { Faq } from '@/components/landing/faq';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RekberListings />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
