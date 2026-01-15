import { ShieldCheck, Clock, Scale } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Aman & Terverifikasi',
    description: 'Semua admin kami terverifikasi untuk memastikan transaksi Anda bebas dari penipuan.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Proses Cepat',
    description: 'Proses transaksi ditangani dengan cepat dan efisien oleh tim profesional kami.',
  },
  {
    icon: <Scale className="h-8 w-8 text-primary" />,
    title: 'Adil & Netral',
    description: 'Kami bertindak sebagai penengah yang tidak memihak untuk menjamin keadilan bagi kedua belah pihak.',
  },
];

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 sm:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl font-headline">
            Kenapa Memilih Rekber Nusantara?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Kami menawarkan keamanan, kecepatan, dan keadilan dalam setiap transaksi.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-left bg-background p-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 border border-border">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-semibold font-headline">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
